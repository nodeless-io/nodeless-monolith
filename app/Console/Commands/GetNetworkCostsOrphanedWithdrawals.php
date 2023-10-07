<?php

namespace App\Console\Commands;

use App\Enums\WithdrawalType;
use App\Models\NetworkCost;
use App\Models\Withdrawal;
use Illuminate\Console\Command;
use MempoolSpace\Client\TransactionClient;

class GetNetworkCostsOrphanedWithdrawals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'costs:withdrawals';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Find withdrawals without a cost and create the network cost model for it';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Get all lightning withdrawals without a network cost
        $lightningWithdrawals = Withdrawal::query()
            ->select('withdrawals.id', 'withdrawals.uuid', 'withdrawals.user_id', 'withdrawals.type', 'withdrawals.onchain_address', 'withdrawals.lightning_address', 'withdrawals.lightning_payment_invoice', 'withdrawals.lightning_payment_hash', 'withdrawals.lightning_payment_route', 'withdrawals.lightning_payment_preimage', 'withdrawals.amount', 'withdrawals.status')
            ->leftJoin('network_costs', 'withdrawals.id', '=', 'network_costs.withdrawal_id')
            ->whereNull('network_costs.id')
            ->where('withdrawals.type', WithdrawalType::LIGHTNING)
            ->get();

        foreach($lightningWithdrawals as $withdrawal) {
            $this->info('Lightning cost: ' . $withdrawal->lightning_payment_route['total_fees']);

            NetworkCost::create([
                'withdrawal_id' => $withdrawal->id,
                'type' => WithdrawalType::LIGHTNING,
                'amount' => $withdrawal->lightning_payment_route['total_fees'],
            ]);
        }

        $onchainWithdrawals = Withdrawal::query()
            ->select('withdrawals.id', 'withdrawals.uuid', 'withdrawals.onchain_tx', 'withdrawals.user_id', 'withdrawals.type', 'withdrawals.onchain_address', 'withdrawals.lightning_address', 'withdrawals.lightning_payment_invoice', 'withdrawals.lightning_payment_hash', 'withdrawals.lightning_payment_route', 'withdrawals.lightning_payment_preimage', 'withdrawals.amount', 'withdrawals.status')
            ->leftJoin('network_costs', 'withdrawals.id', '=', 'network_costs.withdrawal_id')
            ->whereNull('network_costs.id')
            ->where('withdrawals.type', WithdrawalType::ONCHAIN)
            ->get();

        if (env('BITCOIN_NETWORK') == 'TESTNET') {
            $network = 'testnet';
        } else {
            $network = 'mainnet';
        }

        foreach($onchainWithdrawals as $withdrawal) {
            sleep(1);
            $mempool = new TransactionClient(network: $network);
            $tx = $mempool->getTransaction($withdrawal->onchain_tx);

            $this->info('Onchain cost: ' . $tx->getFee());

            NetworkCost::create([
                'withdrawal_id' => $withdrawal->id,
                'type' => WithdrawalType::ONCHAIN,
                'amount' => $tx->getFee(),
            ]);
        }

        // get orphaned onchain withdrawals
        return Command::SUCCESS;
    }
}
