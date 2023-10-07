<?php

namespace App\Repositories;

use App\Enums\BitcoinableNetworkType;
use App\Enums\BitcoinableStatus;
use App\Models\Paywall;
use App\Models\PaywallRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;

class PaywallRepository
{
    /*
    |--------------------------------------------------------------------------
    | Paywalls
    |--------------------------------------------------------------------------
    */

    public function createPaywall(
        string $name,
        string $type,
        int $price,
        ?string $content = null,
        ?array $settings = null,
    ): Paywall {
        return Paywall::create([
            'user_id' => auth()->id(),
            'name' => $name,
            'type' => $type,
            'price' => $price,
            'content' => $content,
            'settings' => $settings,
        ]);
    }

    public function updatePaywall(
        string $paywallUuid,
        string $name,
        string $type,
        int $price,
        ?string $content = null,
        ?array $settings = null,
    ): Paywall {
        $paywall =  Paywall::where('uuid', $paywallUuid)->firstOrFail();
        $paywall
            ->update([
                'name' => $name,
                'type' => $type,
                'price' => $price,
                'content' => $content,
                'settings' => $settings,
            ]);

        return $paywall;
    }

    public function deletePaywall(string $paywallUuid): bool
    {
        return Paywall::where('uuid', $paywallUuid)->delete();
    }

    public function getPaywallByUuid(string $paywallUuid): Paywall
    {
        return Paywall::where('uuid', $paywallUuid)->firstOrFail();
    }

    public function getPaywallsUserId($userId): LengthAwarePaginator
    {
        return Paywall::where('user_id', $userId)->paginate(15);
    }

    /*
    |--------------------------------------------------------------------------
    | Paywall Requests
    |--------------------------------------------------------------------------
    */

    public function createPaywallRequest(
        string $paywallUuid,
        int $amount,
        ?BitcoinableNetworkType $type = BitcoinableNetworkType::LIGHTNING,
        ?BitcoinableStatus $status = BitcoinableStatus::NEW,
        ?array $metadata = [],
    ): PaywallRequest {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        $request = $paywall->paywallRequests()->create([
            'amount' => $amount,
            'type' => $type,
            'status' => $status,
            'metadata' => $metadata,
        ]);

        return PaywallRequest::where('uuid', $request->uuid)->firstOrFail();
    }

    public function getPaywallRequestByUuid(string $paywallRequestUuid): PaywallRequest
    {
        return PaywallRequest::where('uuid', $paywallRequestUuid)->firstOrFail();
    }

    public function getPaywallRequestsByPaywallUuid(string $paywallUuid): LengthAwarePaginator
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return $paywall->paywallRequests()->paginate(15);
    }

    public function setPaywallRequestStatus(BitcoinableStatus $status, string $paywallRequestUuid): PaywallRequest
    {
        $paywallRequest = $this->getPaywallRequestByUuid($paywallRequestUuid);
        $paywallRequest->update([
            'status' => $status->value,
        ]);

        return $paywallRequest;
    }

    public function getAllPaywallRequestsByUserUuid(string $userUuid): LengthAwarePaginator
    {
        $user = User::where('uuid', $userUuid)->firstOrFail();

        return $user->paywall_requests()->paginate(15);
    }

    /*
    |--------------------------------------------------------------------------
    | Paywall Metrics
    |--------------------------------------------------------------------------
    */

    public function getPaywallRevenueLastThirtyDays(string $paywallUuid): int
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-last-thirty-days-' . $paywallUuid,
            10,
            function () use ($paywall) {
                return $paywall
                    ->paywallRequests()
                    ->where('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                    ->where('created_at', '>=', Carbon::now()->subDays(30))
                    ->sum('amount');
            }
        );
    }

    public function getPaywallRevenueLastSevenDays(string $paywallUuid): int
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-last-seven-days-' . $paywallUuid,
            10,
            function () use ($paywall) {
                return $paywall
                    ->paywallRequests()
                    ->where('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                    ->where('created_at', '>=', Carbon::now()->subDays(7))
                    ->sum('amount');
            }
        );
    }

    public function getPaywallRevenueLastDay(string $paywallUuid): int
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-last-day-' . $paywallUuid,
            10,
            function () use ($paywall) {
                return $paywall
                    ->paywallRequests()
                    ->where('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                    ->where('created_at', '>=', Carbon::now()->subDay())
                    ->sum('amount');
            }
        );
    }

    public function getPaywallRevenueTodayByHour(string $paywallUuid): array
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-today-by-hour-' . $paywallUuid,
            10,
            function () use ($paywall) {
                $revenueByHour = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 23; $i++) {
                    $start = Carbon::now()->startOfDay()->addHours($i);
                    $end = Carbon::now()->startOfDay()->addHours($i + 1);

                    $revenueByHour[$i] = $this->getPaywallRevenueByDatetime($paywall->uuid, $start, $end);
                    $labels[$i] = Carbon::now()->startOfDay()->addHours($i)->format('m-d-Y H:i');

                    $totalRevenue += $revenueByHour[$i];
                }

                return [
                    'total' => $totalRevenue,
                    'labels' => $labels,
                    'data' => $revenueByHour,
                ];
            }
        );
    }

    public function getPaywallRevenueYesterdayByHour(string $paywallUuid): array
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-yesterday-by-hour-' . $paywallUuid,
            10,
            function () use ($paywall) {
                $revenueByHour = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 23; $i++) {
                    $start = Carbon::now()->subDay()->startOfDay()->addHours($i);
                    $end = Carbon::now()->subDay()->startOfDay()->addHours($i + 1);

                    $revenueByHour[$i] = $this->getPaywallRevenueByDatetime($paywall->uuid, $start, $end);
                    $labels[$i] = Carbon::now()->subDay()->startOfDay()->addHours($i)->format('m-d-Y H:i');

                    $totalRevenue += $revenueByHour[$i];
                }

                return [
                    'total' => $totalRevenue,
                    'labels' => $labels,
                    'data' => $revenueByHour,
                ];
            }
        );
    }

    public function getPaywallRevenuePreviousThirtyDaysByDay(string $paywallUuid): array
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-previous-thirty-days-by-day-' . $paywallUuid,
            10,
            function () use ($paywall) {
                $revenueByDay = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 29; $i++) {
                    $start = Carbon::now()->subDays($i + 1)->startOfDay();
                    $end = Carbon::now()->subDays($i)->startOfDay();

                    $revenueByDay[$i] = $this->getPaywallRevenueByDatetime($paywall->uuid, $start, $end);
                    $labels[$i] = Carbon::now()->subDays($i + 1)->startOfDay()->format('m-d-Y');

                    $totalRevenue += $revenueByDay[$i];
                }

                return [
                    'total' => $totalRevenue,
                    'labels' => $labels,
                    'data' => $revenueByDay,
                ];
            }
        );
    }

    public function getPaywallRevenueAllTimeByMonth(string $paywallUuid): array
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-all-time-by-month-' . $paywallUuid,
            10,
            function () use ($paywall) {
                $revenueByMonth = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 11; $i++) {
                    $start = Carbon::now()->subMonths($i + 1)->startOfMonth();
                    $end = Carbon::now()->subMonths($i)->startOfMonth();

                    $revenueByMonth[$i] = $this->getPaywallRevenueByDatetime($paywall->uuid, $start, $end);
                    $labels[$i] = Carbon::now()->subMonths($i + 1)->startOfMonth()->format('m-Y');

                    $totalRevenue += $revenueByMonth[$i];
                }

                return [
                    'total' => $totalRevenue,
                    'labels' => $labels,
                    'data' => $revenueByMonth,
                ];
            }
        );
    }

    public function getPaywallRevenueByDatetime(string $paywallUuid, Carbon $start, Carbon $end): int
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-by-datetime-' . $paywallUuid . '-' . $start->timestamp . '-' . $end->timestamp,
            10,
            function () use ($paywall, $start, $end) {
                return $paywall
                    ->paywallRequests()
                    ->where('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                    ->where('created_at', '>=', $start)
                    ->where('created_at', '<=', $end)
                    ->sum('amount');
            }
        );
    }

    public function getPaywallRevenueAllTime(string $paywallUuid): int
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-all-time-' . $paywallUuid,
            10,
            function () use ($paywall) {
                return $paywall
                    ->paywallRequests()
                    ->where('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                    ->sum('amount');
            }
        );
    }

    public function getPaywallRevenueToday(string $paywallUuid): int
    {
        $paywall = $this->getPaywallByUuid($paywallUuid);

        return Cache::remember(
            'paywall-revenue-metrics-today-' . $paywallUuid,
            10,
            function () use ($paywall) {
                return $paywall
                    ->paywallRequests()
                    ->where('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                    ->where('created_at', '>=', Carbon::now()->startOfDay())
                    ->sum('amount');
            }
        );
    }

    public function getPaywallRevenueMetrics(string $paywallUuid): array
    {
        return Cache::remember(
            'paywall-revenue-metrics-' . $paywallUuid,
            10,
            function () use ($paywallUuid) {
                return [
                    'all_time' => $this->getPaywallRevenueAllTime($paywallUuid),
                    'last_thirty_days' => $this->getPaywallRevenueLastThirtyDays($paywallUuid),
                    'last_seven_days' => $this->getPaywallRevenueLastSevenDays($paywallUuid),
                    'last_day' => $this->getPaywallRevenueLastDay($paywallUuid),
                    'today' => $this->getPaywallRevenueToday($paywallUuid),
                ];
            }
        );
    }

    public function getPaywallsRevenueAllTimeByUser(string $userUuid): int
    {
        $user = User::where('uuid', $userUuid)->firstOrFail();

        return Cache::remember(
            'paywalls-revenue-metrics-all-time-by-user-' . $userUuid,
            10,
            function () use ($user) {
                $paywalls = $user->paywalls;

                $paywallIds = $paywalls->pluck('id');
                $paywallRequests = PaywallRequest::whereIn('paywall_id', $paywallIds)
                    ->where('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                    ->get();

                return $paywallRequests->sum('amount');
            }
        );
    }

    public function getPaywallsRevenueByUserByDatetime(string $userUuid, Carbon $start, Carbon $end): int
    {
        $user = User::where('uuid', $userUuid)->firstOrFail();

        return Cache::remember(
            'paywalls-by-user-by-datetime-' . $userUuid . '-' . $start->timestamp . '-' . $end->timestamp,
            10,
            function () use ($user, $start, $end) {
                $paywalls = $user->paywalls;

                $paywallIds = $paywalls->pluck('id');
                $paywallRequests = PaywallRequest::whereIn('paywall_id', $paywallIds)
                    ->where('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                    ->where('created_at', '>=', $start)
                    ->where('created_at', '<=', $end)
                    ->sum('amount');

                return $paywallRequests;
            }
        );
    }

    public function getPaywallsRevenueAllTimeByUserByMonth(string $userUuid): array
    {
        $user = User::where('uuid', $userUuid)->firstOrFail();

        return Cache::remember(
            'paywalls-revenue-metrics-all-time-by-user-by-month-' . $userUuid,
            10,
            function () use ($user) {

                $revenueByMonth = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 11; $i++) {
                    $start = Carbon::now()->startOfMonth()->subMonths($i);
                    $end = Carbon::now()->startOfMonth()->subMonths($i - 1);

                    $revenue = $this->getPaywallsRevenueByUserByDatetime($user->uuid, $start, $end);

                    $revenueByMonth[$i] = $revenue;
                    $totalRevenue += $revenue;
                    $labels[$i] = Carbon::now()->startOfMonth()->subMonths($i)->format('m-Y');
                }

                return [
                    'total' => $totalRevenue,
                    'labels' => $labels,
                    'revenue_by_month' => $revenueByMonth,
                ];
            }
        );
    }

    public function getPaywallsRevenueTodayByUserByHour(string $userUuid): array
    {
        $user = User::where('uuid', $userUuid)->firstOrFail();

        return Cache::remember(
            'paywalls-revenue-metrics-today-by-user-by-hour-' . $userUuid,
            10,
            function () use ($user) {

                $revenueByHour = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 23; $i++) {
                    $start = Carbon::now()->startOfDay()->addHours($i);
                    $end = Carbon::now()->startOfDay()->addHours($i + 1);

                    $revenue = $this->getPaywallsRevenueByUserByDatetime($user->uuid, $start, $end);

                    $revenueByHour[$i] = $revenue;
                    $totalRevenue += $revenue;
                    $labels[$i] = Carbon::now()->startOfDay()->addHours($i)->format('H');
                }

                return [
                    'total' => $totalRevenue,
                    'labels' => $labels,
                    'revenue_by_hour' => $revenueByHour,
                ];
            }
        );
    }

    public function getPaywallsRevenueLastThirtyDaysByUserByDay(string $userUuid): array
    {
        $user = User::where('uuid', $userUuid)->firstOrFail();

        return Cache::remember(
            'paywalls-revenue-metrics-last-thirty-days-by-user-by-day-' . $userUuid,
            10,
            function () use ($user) {

                $revenueByDay = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 29; $i++) {
                    $start = Carbon::now()->startOfDay()->subDays($i);
                    $end = Carbon::now()->startOfDay()->subDays($i - 1);

                    $revenue = $this->getPaywallsRevenueByUserByDatetime($user->uuid, $start, $end);

                    $revenueByDay[$i] = $revenue;
                    $totalRevenue += $revenue;
                    $labels[$i] = Carbon::now()->startOfDay()->subDays($i)->format('d-m-Y');
                }

                return [
                    'total' => $totalRevenue,
                    'labels' => $labels,
                    'revenue_by_day' => $revenueByDay,
                ];
            }
        );
    }

}
