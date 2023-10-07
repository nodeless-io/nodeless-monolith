<?php

namespace App\Http\Resources\Withdrawal;

use Illuminate\Http\Resources\Json\JsonResource;

class WithdrawalSettingsResource extends JsonResource
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
            'lightning_address' => $this->lightning_address,
            'onchain_address' => $this->onchain_address,
            'auto_withdraw' => $this->auto_withdraw,
            'default_withdrawal_type' => $this->default_withdrawal_type,
        ];
    }
}
