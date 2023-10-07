<?php

namespace App\Http\Resources\Withdrawal;

use App\Http\Resources\Transaction\TransactionResource;
use Illuminate\Http\Resources\Json\JsonResource;

class LightningAddressWithdrawalResource extends JsonResource
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
            'uuid' => $this->uuid,
            'amount' => $this->amount,
            'type' => $this->type,
            'lightning_address' => $this->lightning_address,
            'lightning_payment_preimage' => $this->lightning_payment_preimage,
            'lightning_payment_hash' => $this->lightning_payment_hash,
            'status' => $this->status,
            'completed_at' => $this->completed_at,
            'transaction' => new TransactionResource($this->transaction),
        ];
    }
}
