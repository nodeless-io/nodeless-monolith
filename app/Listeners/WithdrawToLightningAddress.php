<?php

namespace App\Listeners;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Enums\WithdrawalStatus;
use App\Enums\WithdrawalType;
use App\Repositories\TransactionRepository;
use App\Services\LndService;
use App\Services\TransactionService;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class WithdrawToLightningAddress implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Create the event listener.
     *
     * @return void
     */
    private LndService $lndService;
    private TransactionService $transactionService;
    private TransactionRepository $transactionRepository;

    public function __construct()
    {
        $this->lndService = new LndService();
        $this->transactionRepository = new TransactionRepository();
        $this->transactionService = new TransactionService($this->transactionRepository);
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        sleep(10); // Wait for the transaction to be confirmed
        Log::debug('Checking if we should send lightning payment to ' . $event->bitcoinable->user()->first()->lightning_address . ' for ' . $event->bitcoinable->amount_paid . ' sats');
        $user = $event->bitcoinable->user()->first();

        if ($user->default_withdrawal_type === WithdrawalType::LIGHTNING->value &&
            $user->lightning_address &&
            $user->auto_withdraw == true && $event->bitcoinable->amount_paid > 999) {
            Log::debug('Sending lightning payment to ' . $user->lightning_address . ' for ' . $event->bitcoinable->amount_paid . ' sats');

            if ($user->getAvailableBalance() < $event->bitcoinable->amount_paid) {
                Log::debug('Not enough balance to send lightning payment to ' . $user->lightning_address . ' for ' . $event->bitcoinable->amount_paid . ' sats');
                throw new \Exception('Not enough balance to send lightning payment to ' . $user->lightning_address . ' for ' . $event->bitcoinable->amount_paid . ' sats');
            }

            $freshBitcoinable = $event->bitcoinable->fresh();

            $balanceFee = round(($freshBitcoinable->amount_paid * config('pricing.fees.fee_rate')) + config('pricing.fees.base_fee'));
            $balanceAmount = $freshBitcoinable->amount_paid - $balanceFee;

            $withdrawFee = round(($balanceAmount * config('pricing.fees.fee_rate')) + config('pricing.fees.base_fee'));
            $withdrawAmount = $balanceAmount - $withdrawFee;

            $sendResponse = $this->lndService->payLightningAddress($withdrawAmount, $user->lightning_address);

            $withdrawal = $user->withdrawals()->create([
                'amount' => $withdrawAmount,
                'type' => WithdrawalType::LIGHTNING,
                'lightning_address' => $user->lightning_address,
                'lightning_payment_preimage' => $sendResponse->getPaymentPreimage(),
                'lightning_payment_route' => $sendResponse->getPaymentRoute()->toArray(),
                'lightning_payment_hash' => $sendResponse->getPaymentHash(),
                'status' => WithdrawalStatus::COMPLETED,
                'completed_at' => Carbon::now(),
            ]);

            $withdrawal->transaction()->create([
                'amount' => $withdrawFee,
                'user_id' => $user->id,
                'type' => TransactionType::DEBIT,
                'status' => TransactionStatus::SETTLED,
                'is_fee' => true,
            ]);

            $withdrawal->transaction()->create([
                'amount' => $withdrawAmount,
                'user_id' => $user->id,
                'type' => TransactionType::DEBIT,
                'status' => TransactionStatus::SETTLED,
                'lightning_payment_preimage' => $sendResponse->getPaymentPreimage(),
                'lightning_payment_route' => $sendResponse->getPaymentRoute()->toArray(),
                'lightning_payment_hash' => $sendResponse->getPaymentHash(),
            ]);

            Log::debug('Sent lightning payment to ' . $user->lightning_address . ' for ' . $freshBitcoinable->amount_paid . ' sats');
        }
    }

    public function viaQueue($event)
    {
        return 'withdrawals';
    }
}
