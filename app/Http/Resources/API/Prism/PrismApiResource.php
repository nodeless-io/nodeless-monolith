<?php

namespace App\Http\Resources\API\Prism;

use App\Http\Resources\API\BitcoinableApiResource;

class PrismApiResource extends BitcoinableApiResource
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
            'settings' => $this->settings,
            'payoutStatus' => $this->payout_status,
            'createdAt' => $this->created_at,
            'paidAt' => $this->paid_at,
            'onchainAddress' => $this->bitcoin_address->address,
            'lightningInvoice' => $this->lightning_invoice->payment_request,
            'qrCodes' => [
                'unified' => $this->generateUnifiedQRCode($this->bitcoin_address->address, $this->lightning_invoice->payment_request, $this->amount),
                'onchain' => $this->generateQRCode('bitcoin:' . $this->bitcoin_address->address . '?amount=' . $this->satsToBtc($this->amount)),
                'lightning' => $this->generateQRCode($this->lightning_invoice->payment_request),
            ],
        ];
    }
}
