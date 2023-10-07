<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'lightning_address' => $this->lightning_address,
            'onchain_address' => $this->onchain_address,
            'auto_withdraw' => $this->auto_withdraw,
            'default_withdrawal_type' => $this->default_withdrawal_type,
            'available_balance' => $this->getAvailableBalance(),
            '2fa_enabled' => $this->google2fa_secret !== null,
        ];
    }
}
