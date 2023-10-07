<?php

namespace App\Http\Resources\Transaction;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // strip the App\Models\ from the transactable_type
        $transactableType = explode('\\', $this->transactable_type);
        $transactableType = end($transactableType);

        $data = [
            'uuid' => $this->uuid,
            'transactable_type' => $transactableType,
            'amount' => $this->amount,
            'type' => $this->type,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'is_fee' => $this->is_fee,
            'transactable' => $this->transactable,
        ];

        return $data;
    }
}
