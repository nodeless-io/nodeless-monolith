<?php

namespace App\Http\Resources\Withdrawal;

use App\Repositories\WithdrawalRepository;
use Illuminate\Http\Resources\Json\JsonResource;

class WithdrawalMetricsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $withdrawalRepository = new WithdrawalRepository();

        return [
            'withdrawals_today' => $withdrawalRepository->getWithdrawalSatAmountTodayByUserId(auth()->id()),
            'withdrawals_last_thirty_days' => $withdrawalRepository->getWithdrawalSatAmountLastThirtyDaysByUserId(auth()->id()),
            'withdrawals_all_time' => $withdrawalRepository->getWithdrawalSatAmountAllTimeByUserId(auth()->id()),
            'withdrawals_by_month' => $withdrawalRepository->getWithdrawalSatAmountsByMonthByUserId(auth()->id()),
        ];
    }
}
