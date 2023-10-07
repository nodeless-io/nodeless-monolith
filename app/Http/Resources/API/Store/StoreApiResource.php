<?php

namespace App\Http\Resources\API\Store;

use Illuminate\Http\Resources\Json\JsonResource;

class StoreApiResource extends JsonResource
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
            'name' => $this->name,
            'url' => $this->url,
            'email' => $this->email,
            'createdAt' => $this->created_at,
        ];
    }
}
