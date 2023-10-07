<?php

namespace App\Jobs;

use App\Enums\PrismPayoutStatus;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Prism;
use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use LightningPrism\LightningPrism;
use UtxoOne\LndPhp\Responses\Lightning\SendResponse;

class ProcessPrismJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public Prism $prism;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Prism $prism)
    {
        $this->prism = $prism;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $paymentFee = round(($this->prism->amount_paid * config('pricing.fees.fee_rate')) + config('pricing.fees.base_fee'));
        $paymentToBalance = $this->prism->amount_paid - $paymentFee;
        $withdrawFee = round(($paymentToBalance * config('pricing.fees.fee_rate')) + config('pricing.fees.base_fee'));
        $withdrawAmount = $paymentToBalance - $withdrawFee;

        $lightningPrism = new LightningPrism(
            settings: json_decode($this->prism->settings, true),
            amount: $withdrawAmount,
            host: env('LND_HOST'),
            port: env('LND_PORT'),
            macaroon: env('LND_MACAROON_HEX'),
            tlsCertificate: env('LND_TLS_CERT'),
        );

        try {
            $this->prism->update([
                'payout_status' => PrismPayoutStatus::PENDING,
            ]);

            $payments = $lightningPrism->zap();

            $failures = 0;

            foreach ($payments as $payment) {
                // If the payment is a string, it's an error message that isn't related to lightning
                if (is_string($payment)) {
                    $failures++;
                } else {
                    // if the payment is a SendResponse, it's a lightning response, check the pre-image
                    if (!$payment->getPaymentPreimage()) {
                        $failures++;
                    }
                }
            }

            if ($failures === 0) {

                $results = [];

                foreach ($payments as $lightningAddress => $response) {
                    $results[$lightningAddress] = [
                        'payment_preimage' => $response->getPaymentPreimage(),
                        'payment_hash' => $response->getPaymentHash(),
                        'payment_route' => $response->getPaymentRoute()->getHops(),
                        'amount_paid' => $response->getPaymentRoute()->getTotalAmount(),
                    ];
                }

                $this->prism->update([
                    'payout_status' => PrismPayoutStatus::PAID,
                    'results' => $results,
                ]);
                Log::info('Making prism as paid: ' . $this->prism->uuid);

                $prismWithdrawal = $this->prism->transaction()->create([
                    'user_id' => $this->prism->user_id,
                    'type' => TransactionType::DEBIT,
                    'amount' => $withdrawAmount,
                    'status' => TransactionStatus::SETTLED,
                ]);
                Log::info('Creating debit transaction for prism withdrawal: ' . $prismWithdrawal->uuid);

                $fee = $this->prism->transaction()->create([
                    'user_id' => $this->prism->user_id,
                    'type' => TransactionType::DEBIT,
                    'amount' => $withdrawFee,
                    'status' => TransactionStatus::SETTLED,
                    'is_fee' => true,
                ]);
                Log::info('Creating debit transaction for prism withdrawal fee: ' . $fee->uuid);

                $settleInitialTransaction = Transaction::where('transactable_id', $this->prism->id)
                    ->where('transactable_type', Prism::class)
                    ->where('type', TransactionType::CREDIT)
                    ->where('status', TransactionStatus::PENDING)
                    ->first()
                    ->update([
                        'status' => TransactionStatus::SETTLED,
                    ]);

                Log::info('Setting initial transaction as settled');

                Log::info('Prism Success: ' . $this->prism->uuid);
            }

            if ($failures > 0 && $failures < count($payments)) {

                $results = [];

                foreach ($payments as $lightningAddress => $response) {
                    if (is_string($response)) {
                        $results[$lightningAddress] = [
                            'error' => $response,
                        ];
                    } else {
                        $results[$lightningAddress] = [
                            'payment_preimage' => $response->getPaymentPreimage(),
                            'payment_hash' => $response->getPaymentHash(),
                            'payment_route' => $response->getPaymentRoute()->getHops(),
                            'amount_paid' => $response->getPaymentRoute()->getTotalAmount(),
                        ];
                    }
                }

                $this->prism->update([
                    'payout_status' => PrismPayoutStatus::PARTIAL,
                    'results' => $results,
                ]);
                Log::info('Making prism as partially paid: ' . $this->prism->uuid);

                $totalPaid = 0;
                foreach ($payments as $payment) {
                    if($payment instanceof SendResponse) {
                        if ($payment->getPaymentPreimage()) {
                            $totalPaid += $payment->getPaymentRoute()->getTotalAmount();
                        }
                    }
                }

                $prismWithdrawal = $this->prism->transaction()->create([
                    'user_id' => $this->prism->user_id,
                    'type' => TransactionType::DEBIT,
                    'amount' => $totalPaid,
                    'status' => TransactionStatus::SETTLED,
                ]);
                Log::info('Creating debit transaction for prism withdrawal: ' . $prismWithdrawal->uuid);

                $fee = $this->prism->transaction()->create([
                    'user_id' => $this->prism->user_id,
                    'type' => TransactionType::DEBIT,
                    'amount' => $withdrawFee,
                    'status' => TransactionStatus::SETTLED,
                    'is_fee' => true,
                ]);
                Log::info('Creating debit transaction for prism withdrawal fee: ' . $fee->uuid);

                $settleInitialTransaction = Transaction::where('transactable_id', $this->prism->id)
                    ->where('transactable_type', Prism::class)
                    ->where('type', TransactionType::CREDIT)
                    ->where('status', TransactionStatus::PENDING)
                    ->first()
                    ->update([
                        'status' => TransactionStatus::SETTLED,
                    ]);

                Log::notice('Prism Partially Failed: ' . $this->prism->uuid);
            }

            if ($failures === count($payments)) {
                $this->prism->update([
                    'payout_status' => PrismPayoutStatus::FAILED,
                    'results' => $payments,
                ]);
                Log::info('Making prism as failed: ' . $this->prism->uuid);

                $settleInitialTransaction = Transaction::where('transactable_id', $this->prism->id)
                    ->where('transactable_type', Prism::class)
                    ->where('type', TransactionType::CREDIT)
                    ->where('status', TransactionStatus::PENDING)
                    ->first()
                    ->update([
                        'status' => TransactionStatus::SETTLED,
                    ]);

                Log::error('Prism Failed: ' . $this->prism->uuid);
            }

        } catch (\Exception $e) {
            $this->prism->update([
                'payout_status' => PrismPayoutStatus::FAILED,
                'results' => json_encode($e->getMessage()),
            ]);
        }
    }
}
