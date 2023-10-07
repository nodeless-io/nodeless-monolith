<?php

namespace App\Http\Resources\Inbox;

use App\Repositories\InboxRepository;
use Illuminate\Http\Resources\Json\JsonResource;

class InboxMetrics extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $inboxRepository = new InboxRepository();
        return [
            'total_paid' => $inboxRepository->getTotalPaidMessageCount($this->resource->uuid),
            'total_requests' => $inboxRepository->getTotalMessageRequestCount($this->resource->uuid),
            'earnings_by_month' => $inboxRepository->getEarningsByInboxByMonth($this->resource->uuid),
        ];
    }
}
