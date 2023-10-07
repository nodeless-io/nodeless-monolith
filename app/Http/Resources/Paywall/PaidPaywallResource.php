<?php

namespace App\Http\Resources\Paywall;

use App\Repositories\PaywallRepository;
use Illuminate\Http\Resources\Json\JsonResource;

class PaidPaywallResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $paywallRepository = new PaywallRepository();

        $paywall = $paywallRepository->getPaywallByUuid($this->paywall->uuid);

        return [
            'paywall' => [
                'uuid' => $paywall->uuid,
                'name' => $paywall->name,
                'type' => $paywall->type,
                'price' => $paywall->price,
                'settings' => $paywall->settings,
                'content' => $paywall->content,
            ],

            'paywallRequest' => [
                'uuid' => $this->uuid,
                'status' => $this->status,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
                'amount_paid' => $this->amount_paid,
            ],
        ];
    }
}
