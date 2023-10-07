<?php

namespace App\Http\Resources\API\Transaction;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionApiResource extends JsonResource
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

        return [
            'id' => $this->uuid,
            'transactable_type' => $transactableType,
            'transactable' => $this->transactable,
            'amount' => $this->amount,
            'type' => $this->type,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'is_fee' => $this->is_fee,
        ];
    }
}
