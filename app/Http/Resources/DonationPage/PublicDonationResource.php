<?php

namespace App\Http\Resources\DonationPage;

use Illuminate\Http\Resources\Json\JsonResource;

class PublicDonationResource extends JsonResource
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
            'name' => $this->name,
            'amount' => $this->amount,
            'message' => $this->message,
        ];
    }
}
