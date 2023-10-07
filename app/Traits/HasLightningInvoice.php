<?php

namespace App\Traits;

use App\Models\LightningInvoice;
use App\Services\LndService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Facades\Log;

trait HasLightningInvoice
{
    public function lightning_invoice(): MorphOne
    {
        return $this->morphOne(LightningInvoice::class, 'lightning_invoiceable');
    }

    protected static function bootHasLightningInvoice()
    {
        static::created(function ($model) {
            $lndService = new LndService();

            if (class_basename(get_class($model)) === 'LightningAddressPayment') {
                Log::info('Creating description hash for LightningAddressPayment to inbox ' . $model->inbox->username . '');

                $metadata = [
                    ['text/identifier', $model->inbox->username],
                    ['text/plain', $model->inbox->username . ' Lightning Address'],
                ];

                $metadataJson = json_encode($metadata);
                $descriptionHash = base64_encode(hex2bin(hash('sha256', $metadataJson)));

                $newInvoice = $lndService->createLightningInvoiceForLnUrl(
                    amount: $model->amount,
                    descriptionHash: $descriptionHash,
                );
            } else {
                $newInvoice = $lndService->createLightningInvoice(
                    amount: $model->amount,
                    memo: class_basename(get_class($model)) . ' ID: ' . $model->uuid,
                );
            }

            $fullInvoice = $lndService->getLightningInvoice($newInvoice->getRHash());

            $thisInvoice = LightningInvoice::create([
                'memo' => $fullInvoice->getMemo(),
                'description_hash' => $fullInvoice->getDescriptionHash(),
                'r_preimage' => $fullInvoice->getRPreimage(),
                'r_hash' => $fullInvoice->getRHash(),
                'payment_request' => $fullInvoice->getPaymentRequest(),
                'amount' => $fullInvoice->getValue(),
                'settled' => $fullInvoice->isSettled(),
                'expiry' => $fullInvoice->getExpiry(),
                'cltv_expiry' => $fullInvoice->getCltvExpiry(),
                'fallback_addr' => $fullInvoice->getFallbackAddr(),
                'amt_paid' => $fullInvoice->getAmtPaid(),
                'payment_addr' => $fullInvoice->getPaymentAddr(),
                'features' => json_encode($fullInvoice->getFeatures()),
                'state' => $fullInvoice->getState(),
                'htlcs' => json_encode($fullInvoice->getHtlcs()),
                'settled_at' => Carbon::createFromTimestamp($fullInvoice->getSettleDate()),
            ]);

            $model->lightning_invoice()->save($thisInvoice);
        });
    }
}
