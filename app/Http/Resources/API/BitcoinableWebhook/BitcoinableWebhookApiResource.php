<?php

namespace App\Http\Resources\API\BitcoinableWebhook;

use Illuminate\Http\Resources\Json\JsonResource;

class BitcoinableWebhookApiResource extends JsonResource
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
            'url' => $this->url,
            'secret' => $this->secret,
            'status' => $this->status,
            'events' => $this->events,
            'createdAt' => $this->created_at,
            'lastDeliveryAt' => $this->last_delivery_at,
        ];
    }
}
