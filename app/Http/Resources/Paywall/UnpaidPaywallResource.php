<?php

namespace App\Http\Resources\Paywall;

use Illuminate\Http\Resources\Json\JsonResource;

class UnpaidPaywallResource extends JsonResource
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
            'name' => $this->name,
            'type' => $this->type,
            'price' => $this->price,
            'settings' => $this->settings,
        ];
    }
}
