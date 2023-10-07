<?php

namespace App\Http\Resources\API\Store;

use Illuminate\Http\Resources\Json\JsonResource;

class StoreInvoiceStatusApiResource extends JsonResource
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
            'status' => $this->status,
        ];
    }
}
