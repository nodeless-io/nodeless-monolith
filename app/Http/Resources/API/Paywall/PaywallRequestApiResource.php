<?php

namespace App\Http\Resources\API\Paywall;

use App\Http\Resources\API\BitcoinableApiResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PaywallRequestApiResource extends BitcoinableApiResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->uuid,
            'satsAmount' => $this->amount,
            'status' => $this->status,
            'metadata' => $this->metadata,
            'createdAt' => $this->created_at,
            'paidAt' => $this->paid_at,
            'onchainAddress' => $this->bitcoin_address->address,
            'lightningInvoice' => $this->lightning_invoice->payment_request,
            'paywall' => new PaywallApiResource($this->paywall),
            'qrCodes' => [
                'unified' => $this->generateUnifiedQRCode($this->bitcoin_address->address, $this->lightning_invoice->payment_request, $this->amount),
                'onchain' => $this->generateQRCode('bitcoin:' . $this->bitcoin_address->address . '?amount=' . $this->satsToBtc($this->amount)),
                'lightning' => $this->generateQRCode($this->lightning_invoice->payment_request),
            ],
        ];
    }
}
