<?php

namespace App\Http\Resources\Referral;

use App\Repositories\ReferralRepository;
use Illuminate\Http\Resources\Json\JsonResource;

class ReferralResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $referralRespository = new ReferralRepository();
        return [
            'total_referrals' => $referralRespository->getTotalReferralCountByUser($this->resource),
            'total_referral_fees' => $referralRespository->getTotalReferralFeesByUser($this->resource),
            'referral_link' => config('app.url') . '/?ref=' . $this->resource->uuid,
        ];
    }
}
