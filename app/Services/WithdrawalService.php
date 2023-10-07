<?php

namespace App\Services;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Enums\WithdrawalStatus;
use App\Enums\WithdrawalType;
use App\Models\User;
use App\Models\Withdrawal;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use UtxoOne\LndPhp\Responses\Lightning\SendResponse;

class WithdrawalService
{
    private LndService $lndService;

    public function __construct()
    {
        $this->lndService = new LndService();
    }

    public function processLightningAddressWithdrawal(User $user, int $amount): Withdrawal
    {
        throw new \Exception('Withdrawals are disabled');

        $randomDelay = random_int(1, 4);
        sleep($randomDelay);

        $executed = RateLimiter::attempt(
            'withdrawal:' . $user->id,
            1,
            function () use ($user, $amount) {
                if (env('DISABLE_WITHDRAWALS') === true) {
                }

                if ($user->withdrawal_lock === true) {
                    Log::alert('Withdrawal lock was set for ' . $user->email . ' while we were processing a withdrawal. This should not happen. Please investigate.');
                    throw new \Exception('You have another pending withdrawal');
                }

                if ($user->getBalance() < $amount) {
                    throw new \Exception('Insufficient balance');
                }

                if ($user->lightning_address === null) {
                    throw new \Exception('No lightning address set');
                }

                Log::debug('Locking withdrawals for ' . $user->email . ' while we process this withdrawal');
                $user->withdrawal_lock = true;
                $user->save();
                Log::debug('Withdrawals locked for ' . $user->email . ' while we process this withdrawal');

                $fee = ($amount * config('pricing.fees.fee_rate')) + config('pricing.fees.base_fee');
                $amountLessFee = $amount - $fee;

                // verify that withdrawal_lock was truly set
                $freshUser = $user->fresh();
                if ($freshUser->withdrawal_lock === false) {
                    throw new \Exception('Withdrawal lock was not set');
                }

                try {
                    Log::debug('Attempting to send lightning payment to ' . $user->lightning_address . ' for ' . $amountLessFee . ' sats for user: ' . $user->email);
                    $sendResponse = $this->lndService->payLightningAddress($amountLessFee, $user->lightning_address);

                    Log::debug('Lightning payment sent to ' . $user->lightning_address . ' for ' . $amountLessFee . ' sats for user: ' . $user->email);

                    $withdrawal = $user->withdrawals()->create([
                        'amount' => $amountLessFee,
                        'type' => WithdrawalType::LIGHTNING,
                        'lightning_address' => $user->lightning_address,
                        'lightning_payment_preimage' => $sendResponse->getPaymentPreimage(),
                        'lightning_payment_route' => $sendResponse->getPaymentRoute()->toArray(),
                        'lightning_payment_hash' => $sendResponse->getPaymentHash(),
                        'status' => WithdrawalStatus::COMPLETED,
                        'completed_at' => Carbon::now(),
                    ]);

                    Log::debug('Withdrawal recorded for ' . $user->email . ' for ' . $amountLessFee . ' sats. Withdrawal ID: ' . $withdrawal->uuid);

                    $withdrawal->transaction()->create([
                        'amount' => $amountLessFee,
                        'user_id' => $user->id,
                        'type' => TransactionType::DEBIT,
                        'status' => TransactionStatus::SETTLED,
                        'lightning_payment_preimage' => $sendResponse->getPaymentPreimage(),
                        'lightning_payment_route' => $sendResponse->getPaymentRoute()->toArray(),
                        'lightning_payment_hash' => $sendResponse->getPaymentHash(),
                    ]);

                    Log::debug('Transaction recorded for ' . $user->email . ' for ' . $amountLessFee . ' sats. Withdrawal ID: ' . $withdrawal->uuid);

                    $withdrawal->transaction()->create([
                        'amount' => $fee,
                        'user_id' => $user->id,
                        'type' => TransactionType::DEBIT,
                        'status' => TransactionStatus::SETTLED,
                        'is_fee' => true,
                    ]);

                    Log::debug('Fee transaction recorded for ' . $user->email . ' for ' . $fee . ' sats. Withdrawal ID: ' . $withdrawal->uuid);

                    Log::debug('Unlocking withdrawals for ' . $user->email . ' after processing this withdrawal');
                    $user->withdrawal_lock = false;
                    $user->save();
                    Log::debug('Withdrawals unlocked for ' . $user->email . ' after processing this withdrawal');

                    return $withdrawal;
                } catch (\Exception $e) {
                    Log::error('Error processing lightning withdrawal for user: ' . $user->email . ' error: ' . $e->getMessage());
                    Log::debug('Unlocking withdrawals for ' . $user->email . ' after processing this withdrawal');
                    $user->withdrawal_lock = false;
                    $user->save();
                    Log::debug('Withdrawals unlocked for ' . $user->email . ' after processing this withdrawal');
                    throw new \Exception('Error processing lightning withdrawal for user: ' . $user->email . ' error: ' . $e->getMessage());
                }
            }
        );

        if ($executed === false) {
            throw new \Exception('You can only withdraw once per minute');
        }

        return $executed;
    }

    public function processBolt11Withdrawal(User $user, int $amount, string $bolt11): Withdrawal
    {
        // Check that the user has sufficient available balance
        if ($user->getAvailableBalance() < $amount) {
            throw new \Exception('Insufficient balance');
        }

        // make sure amount matches the bolt11 invoice tbd

        $sendResponse = $this->lndService->sendLightningPayment($bolt11);

        $withdrawal = $user->withdrawals()->create([
            'amount' => $sendResponse->getAmount(),
            'type' => WithdrawalType::LIGHTNING,
            'lightning_invoice' => $bolt11,
            'lightning_payment_preimage' => $sendResponse->getPaymentPreimage(),
            'lightning_payment_route' => $sendResponse->getPaymentRoute()->toArray(),
            'lightning_payment_hash' => $sendResponse->getPaymentHash(),
            'status' => WithdrawalStatus::COMPLETED,
            'completed_at' => Carbon::now(),
        ]);

        $withdrawal->transaction()->create([
            'amount' => $sendResponse->getAmount(),
            'user_id' => $user->id,
            'type' => TransactionType::DEBIT,
            'status' => TransactionStatus::SETTLED,
            'lightning_payment_preimage' => $sendResponse->getPaymentPreimage(),
            'lightning_payment_route' => $sendResponse->getPaymentRoute()->toArray(),
            'lightning_payment_hash' => $sendResponse->getPaymentHash(),
        ]);

        return $withdrawal;
    }

    public function payLightningAddress(int $amount, string $addrress): SendResponse
    {
        $domain = explode('@', $addrress)[1];
        $identifier = explode('@', $addrress)[0];
        $milisatsAmount = $amount * 1000;

        $http = new \GuzzleHttp\Client();
        $callbackResponse = $http->get('https://' . $domain . '/.well-known/lnurlp/' . $identifier);

        $callbackJson = json_decode($callbackResponse->getBody());

        if ($callbackResponse->getStatusCode() !== 200) {
            Log::error('Did not get a 200 response from lnurl endpoint for address: ' . $addrress);
            throw new \Exception('Did not get a 200 response from lnurl endpoint for address: ' . $addrress);
        }

        if ($callbackJson->tag !== 'payRequest') {
            Log::error('Did not get a payRequest tag from lnurl endpoint for address: ' . $addrress);
            throw new \Exception('Did not get a payRequest tag from lnurl endpoint for address: ' . $addrress);
        }

        if ($milisatsAmount < $callbackJson->minSendable || $milisatsAmount > $callbackJson->maxSendable) {
            throw new \Exception('Amount is out of range');
        }

        $paymentRequestResponse = $http->get($callbackJson->callback . '?amount=' . $milisatsAmount);

        $paymentRequestJson = json_decode($paymentRequestResponse->getBody());

        try {
            $sendResponse = $this->lndService->sendLightningPayment($paymentRequestJson->pr);

            if ($sendResponse->getPaymentError() !== '') {
                Log::error($sendResponse->getPaymentError());
                throw new \Exception($sendResponse->getPaymentError());
            }

            return $sendResponse;
        } catch (\Exception $e) {
            Log::error('Error sending payment to lnurl endpoint for address: ' . $addrress);
            throw new \Exception('Error sending payment to lnurl endpoint for address: ' . $addrress);
        }
    }
}
