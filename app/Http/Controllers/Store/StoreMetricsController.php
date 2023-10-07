<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Repositories\StoreRepository;
use Illuminate\Http\JsonResponse;

class StoreMetricsController extends Controller
{
    public function __construct(private StoreRepository $storeRepository)
    {
    }

    public function getRevenueTodayByHour(string $storeUuid): JsonResponse
    {
        return response()->json($this->storeRepository->getRevenueTodayByHour($storeUuid));
    }

    public function getRevenueYesterdayByHour(string $storeUuid): JsonResponse
    {
        return response()->json($this->storeRepository->getRevenueYesterdayByHour($storeUuid));
    }

    public function getRevenueLastThirtyDaysByDay(string $storeUuid): JsonResponse
    {
        return response()->json($this->storeRepository->getRevenueLastThirtyDaysByDay($storeUuid));
    }

    public function getRevenuePreviousThirtyDaysByDay(string $storeUuid): JsonResponse
    {
        return response()->json($this->storeRepository->getRevenuePreviousThirtyDaysByDay($storeUuid));
    }

    public function getRevenueAllTimeByMonth(string $storeUuid): JsonResponse
    {
        return response()->json($this->storeRepository->getRevenueAllTimeByMonth($storeUuid));
    }
}
