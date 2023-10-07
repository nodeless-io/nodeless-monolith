<?php

namespace App\Http\Resources\Dashboard;

use App\Repositories\DashboardRepository;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $dashboardRepository = new DashboardRepository();
        return [
            'revenue_today' => $dashboardRepository->getRevenue($this->resource, 1),
            'revenue_last_thirty_days' => $dashboardRepository->getRevenue($this->resource, 30),
            'revenue_by_day' => $dashboardRepository->getRevenueByDay($this->resource, 30),
            'activity' => $dashboardRepository->getActivity($this->resource),
        ];
    }
}
