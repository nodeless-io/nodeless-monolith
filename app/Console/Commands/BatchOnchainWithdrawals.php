<?php

namespace App\Console\Commands;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Enums\WithdrawalStatus;
use App\Enums\WithdrawalType;
use App\Models\User;
use App\Notifications\WithdrawalSuccessNotification;
use App\Services\LndService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use MempoolSpace\Client\TransactionClient;
use UtxoOne\LndPhp\Models\Lightning\AddrToAmountEntry;
use UtxoOne\LndPhp\Models\Lightning\AddrToAmountEntryList;

class BatchOnchainWithdrawals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'batch:onchain-withdrawals';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Batch withdraw all outstanding balances to onchain addresses';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $onchainUsers = User::where('default_withdrawal_type', WithdrawalType::ONCHAIN)->where('onchain_address', '!=', null)->get();

        $withdrawalUsers = $onchainUsers
            ->filter(function ($user) {
                return $user->getAvailableBalance() > config('pricing.withdrawals.min_onchain_amount');
            });

        $transactionService = new \App\Services\TransactionService(new \App\Repositories\TransactionRepository());

        $duplicates = false;

        foreach ($withdrawalUsers as $user) {
            $isDuplicate = $transactionService->purgeDuplicates($user);

            if ($isDuplicate) {
                $duplicates = true;
            }
        }

        // if duplicates is true, restart this command
        if ($duplicates) {
            $this->info('Found duplicate transactions, restarting command');
            sleep(5);
            $this->call('batch:onchain-withdrawals');
            return Command::SUCCESS;
        }

        $addrToAmounts = $withdrawalUsers->map(function ($user) {
            $fee = ($user->getAvailableBalance() * config('pricing.fees.fee_rate')) + config('pricing.fees.base_fee');
            $amount = $user->getAvailableBalance() - $fee;

            return new AddrToAmountEntry($user->onchain_address, $amount);
        });

        if ($withdrawalUsers->isEmpty()) {
            $this->info('No users to withdraw to onchain addresses');

            return Command::SUCCESS;
        }

        $addrToAmountList = new AddrToAmountEntryList($addrToAmounts->toArray());

        $lndService = new LndService();

        $transaction = $lndService->sendMany($addrToAmountList);

        $this->info('Sent transaction: ' . $transaction);

        if (env('BITCOIN_NETWORK') == 'TESTNET') {
            $network = 'testnet';
        } else {
            $network = 'mainnet';
        }

        $transactionFee = 0;

        sleep(5);
        $mempoolClient = new TransactionClient(network: $network);
        try {
            $transactionFee = $mempoolClient->getTransaction($transaction)->getFee();
        } catch (\Exception $e) {
            sleep(5);
            try {
                $transactionFee = $mempoolClient->getTransaction($transaction)->getFee();
            } catch (\Exception $e) {
                Log::error('Failed to get transaction fee for ' . $transaction);
                $this->info('Failed to get transaction fee for ' . $transaction);
            }
        }


        $withdrawalUsers->each(function ($user) use ($transaction, $transactionFee, $withdrawalUsers) {
            $fee = ($user->getAvailableBalance() * config('pricing.fees.fee_rate')) + config('pricing.fees.base_fee');
            $amount = $user->getAvailableBalance() - $fee;

            $withdrawal = $user->withdrawals()->create([
                'amount' => $amount,
                'type' => WithdrawalType::ONCHAIN,
                'onchain_address' => $user->onchain_address,
                'onchain_tx' => $transaction,
                'status' => WithdrawalStatus::COMPLETED,
                'completed_at' => Carbon::now(),
            ]);

            if ($transactionFee) {
                $withdrawal->networkCost()->create([
                    'amount' => round($transactionFee / $withdrawalUsers->count()),
                    'type' => WithdrawalType::ONCHAIN,
                ]);
            }

            $withdrawal->transaction()->create([
                'onchain_tx' => $transaction,
                'amount' => $withdrawal->amount,
                'type' => TransactionType::DEBIT,
                'status' => TransactionStatus::SETTLED,
                'user_id' => $user->id,
            ]);

            $withdrawal->transaction()->create([
                'amount' => $fee,
                'user_id' => $user->id,
                'type' => TransactionType::DEBIT,
                'status' => TransactionStatus::SETTLED,
                'is_fee' => true,
            ]);

            if ($user->notification_setting !== null && $user->notification_setting->withdrawal_success == true) {
                Notification::send($user, new WithdrawalSuccessNotification($withdrawal));
            }
        });

        return Command::SUCCESS;
    }
}
