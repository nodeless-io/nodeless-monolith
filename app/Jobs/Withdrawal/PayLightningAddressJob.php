<?php

namespace App\Jobs\Withdrawal;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Enums\WithdrawalStatus;
use App\Enums\WithdrawalType;
use App\Models\User;
use App\Notifications\WithdrawalFailureNotification;
use App\Notifications\WithdrawalSuccessNotification;
use App\Services\LndService;
use App\Services\TransactionService;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class PayLightningAddressJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public User $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $user = $this->user;
        Log::debug('User ' . $user->email . ' has ' . $user->getAvailableBalance() . ' sats available to withdraw to ' . $user->lightning_address);
        $transactionService = new TransactionService(new \App\Repositories\TransactionRepository());
        $duplicates = $transactionService->purgeDuplicates($user);

        if ($duplicates) {
            throw new \Exception('Found duplicate transactions, restarting command');
        }

        // Calculate the withdrawal amount and fee.
        $balance = $user->getAvailableBalance();
        $withdrawFee = round(($balance * config('pricing.fees.fee_rate')) + config('pricing.fees.base_fee'));
        $withdrawAmount = $balance - $withdrawFee;

        // Lock the user's account to prevent double withdrawals.
        $user->withdrawal_lock = true;
        $user->withdrawal_locked_at = Carbon::now();
        $user->save();

        try {

            $lndService = new LndService();

            // Send 1 sat first to make sure the lightning address is valid.
            $sendResponse = $lndService->payLightningAddress(1, $user->lightning_address);

            // If we got a preimage back, the payment was successful and we can process the full withdrawal
            if (!$sendResponse->getPaymentPreimage()) {
                Log::error('Could not send 1 sat to ' . $user->lightning_address);
                throw new \Exception('Could not send 1 sat to ' . $user->lightning_address);
            }

            $sendResponse = $lndService->payLightningAddress($withdrawAmount, $user->lightning_address);

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

            $withdrawal->networkCost()->create([
                'amount' => $sendResponse->getPaymentRoute()->getTotalFees(),
                'type' => WithdrawalType::LIGHTNING,
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

            // Unlock the user's account.
            $user->withdrawal_lock = false;
            $user->withdrawal_locked_at = null;
            $user->save();

            // Send Notification to User if they have it enabled
            if ($user->notification_setting !== null && $user->notification_setting->withdrawal_success == true) {
                Notification::send($user, new WithdrawalSuccessNotification($withdrawal));
            }

            Log::debug('Sent lightning payment to ' . $user->lightning_address . ' for automated withdrawal of ' . $withdrawAmount . ' sats');
            Log::debug('collected fee of ' . $withdrawFee . ' sats');
        } catch (\Exception $e) {
            Log::error('Error sending lightning payment to ' . $user->lightning_address . ' for ' . $withdrawAmount . ' sats: ' . $e->getMessage());
            // Send Notification to User if they have it enabled.
            if ($user->notification_setting !== null && $user->notification_setting->withdrawal_failure == true) {
                Notification::send($user, new WithdrawalFailureNotification());
            }
        }
    }
}
