<?php

namespace App\Http\Controllers\Paywall;

use App\Http\Controllers\Controller;
use App\Http\Resources\Paywall\PaywallMetrics;
use App\Repositories\PaywallRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaywallMetricsController extends Controller
{
    public function __construct(private PaywallRepository $paywallRepository)
    {
    }

    public function paywallsRevenueAllTimeByUser(): PaywallMetrics
    {
        return new PaywallMetrics($this->paywallRepository->getPaywallsRevenueAllTimeByUserByMonth(auth()->user()->uuid));
    }

    public function paywallsRevenueTodayByUserByHour(): PaywallMetrics
    {
        return new PaywallMetrics($this->paywallRepository->getPaywallsRevenueTodayByUserByHour(auth()->user()->uuid));
    }

    public function paywallsRevenueLastThirtyDaysByUserByDay(): PaywallMetrics
    {
        return new PaywallMetrics($this->paywallRepository->getPaywallsRevenueLastThirtyDaysByUserByDay(auth()->user()->uuid));
    }

    public function paywallRevenueMetricsSummary(string $paywallUuid): PaywallMetrics
    {
        return new PaywallMetrics($this->paywallRepository->getPaywallRevenueMetrics($paywallUuid));
    }

}
