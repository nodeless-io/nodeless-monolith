<?php

namespace App\Repositories;

use App\Enums\StoreInvoiceStatus;
use App\Enums\StoreInvoiceType;
use App\Models\Store;
use App\Models\StoreInvoice;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class StoreRepository
{
    /*
    |--------------------------------------------------------------------------
    | Stores
    |--------------------------------------------------------------------------
    */

    /**
     * Create Store
     *
     * @param integer $userId
     * @param string $name
     * @param array $settings
     * @return Store
     * @throws \Exception
     */
    public function createStore(
        int $userId,
        string $name,
        array $settings,
        string $url = null,
        string $email = null,
    ): Store {
        // if the userId doesn't exist in the database, it will throw an exception
        if (!User::find($userId)) {
            throw new \Exception('User does not exist');
        }

        return Store::create([
            'user_id' => $userId,
            'name' => $name,
            'settings' => $settings,
            'url' => $url,
            'email' => $email,
        ]);
    }

    public function getStoresByUser(User $user): Collection
    {
        return $user->stores()->get();
    }

    /**
     * Get Store By ID
     *
     * @param integer $id
     * @return Store
     */
    public function getStoreById(int $id): Store
    {
        return Cache::remember('store_' . $id, 20, function () use ($id) {
            return Store::findOrFail($id);
        });
    }

    /**
     * Get Store by UUID
     *
     * @param string $uuid
     * @return Store
     */
    public function getStoreByUuid(string $uuid): Store
    {
        return Cache::remember('store_' . $uuid, 3600, function () use ($uuid) {
            return Store::where('uuid', $uuid)->firstOrFail();
        });
    }

    /**
     * Delete Store
     *
     * @param integer $id
     * @return void
     */
    public function deleteStore(string $uuid): void
    {
        Store::where('uuid', $uuid)->delete();
    }

    /**
     * Update Store
     *
     * @param integer $id
     * @param string $name
     * @param array $settings
     * @return Store
     */
    public function updateStore(
        string $uuid,
        array $data
    ): Store {
        $store = $this->getStoreByUuid($uuid);

        $store->update($data);
        Cache::forget('store_' . $uuid);

        return $store->fresh();
    }

    /*
    |--------------------------------------------------------------------------
    | Invoices
    |--------------------------------------------------------------------------
    */

    public function createStoreInvoice(
        string $storeUuid,
        int $amount,
        ?array $metadata = null,
        ?string $buyerEmail = null,
        ?string $redirectUrl = null,
    ): StoreInvoice {
        $store = $this->getStoreByUuid($storeUuid);

        return $store->storeInvoices()->create([
            'amount' => $amount,
            'status' => StoreInvoiceStatus::NEW,
            'type' => StoreInvoiceType::LIGHTNING,
            'metadata' => $metadata,
            'buyer_email' => $buyerEmail,
            'redirect_url' => $redirectUrl,
        ]);
    }

    public function getStoreInvoice(string $invoiceUuid): StoreInvoice
    {
        return StoreInvoice::where('uuid', $invoiceUuid)->firstOrFail();
    }

    public function getStoreInvoices(string $storeUuid, ?int $itemsPerPage = 15): LengthAwarePaginator
    {
        $store = $this->getStoreByUuid($storeUuid);

        return $store
                ->storeInvoices()
                ->where('status', '!=', StoreInvoiceStatus::EXPIRED)
                ->orderBy('created_at', 'DESC')
                ->paginate($itemsPerPage);
    }

    /*
    |--------------------------------------------------------------------------
    | Metrics
    |--------------------------------------------------------------------------
    */

    public function getRevenueLastThirtyDays(string $storeUuid): int
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-last-thirty-days-' . $storeUuid,
            10,
            function () use ($store) {
                return $store
                    ->storeInvoices()
                    ->where('status', [StoreInvoiceStatus::PAID, StoreInvoiceStatus::OVERPAID])
                    ->where('created_at', '>=', Carbon::now()->subDays(30))
                    ->sum('amount');
            }
        );
    }

    public function getRevenueLastSevenDays(string $storeUuid): int
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-last-seven-days-' . $storeUuid,
            10,
            function () use ($store) {
                return $store
                    ->storeInvoices()
                    ->where('status', [StoreInvoiceStatus::PAID, StoreInvoiceStatus::OVERPAID])
                    ->where('created_at', '>=', Carbon::now()->subDays(7))
                    ->sum('amount');
            }
        );
    }

    public function getRevenueAllTime(string $storeUuid): int
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-all-time-' . $storeUuid,
            10,
            function () use ($store) {
                return $store
                    ->storeInvoices()
                    ->where('status', [StoreInvoiceStatus::PAID, StoreInvoiceStatus::OVERPAID])
                    ->sum('amount');
            }
        );
    }

    public function getRevenueLastDay(string $storeUuid): int
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-last-day-' . $storeUuid,
            10,
            function () use ($store) {
                return $store
                    ->storeInvoices()
                    ->where('status', [StoreInvoiceStatus::PAID, StoreInvoiceStatus::OVERPAID])
                    ->where('created_at', '>=', Carbon::now()->subDays(1))
                    ->sum('amount');
            }
        );
    }

    public function getRevenueToday(string $storeUuid): int
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-today-' . $storeUuid,
            10,
            function () use ($store) {
                return $store
                    ->storeInvoices()
                    ->where('status', [StoreInvoiceStatus::PAID, StoreInvoiceStatus::OVERPAID])
                    ->where('created_at', '>=', Carbon::now()->startOfDay())
                    ->sum('amount');
            }
        );
    }

    public function getRevenueByDatetime(string $storeUuid, Carbon $start, Carbon $end): int
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-by-datetime-' . $storeUuid . '-' . $start->timestamp . '-' . $end->timestamp,
            10,
            function () use ($store, $start, $end) {
                return $store
                    ->storeInvoices()
                    ->where('status', [StoreInvoiceStatus::PAID, StoreInvoiceStatus::OVERPAID])
                    ->where('created_at', '>=', $start)
                    ->where('created_at', '<=', $end)
                    ->sum('amount');
            }
        );
    }

    public function getRevenueTodayByHour(string $storeUuid): array
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-today-by-hour-' . $storeUuid,
            10,
            function () use ($store) {
                $revenueByHour = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 23; $i++) {
                    $start = Carbon::now()->startOfDay()->addHours($i);
                    $end = Carbon::now()->startOfDay()->addHours($i + 1);

                    $revenueByHour[$i] = $this->getRevenueByDatetime($store->uuid, $start, $end);
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

    public function getRevenueYesterdayByHour(string $storeUuid): array
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-yesterday-by-hour-' . $storeUuid,
            10,
            function () use ($store) {
                $revenueByHour = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 23; $i++) {
                    $start = Carbon::now()->startOfDay()->subDays(1)->addHours($i);
                    $end = Carbon::now()->startOfDay()->subDays(1)->addHours($i + 1);

                    $revenueByHour[$i] = $this->getRevenueByDatetime($store->uuid, $start, $end);
                    $labels[$i] = Carbon::now()->startOfDay()->subDays(1)->addHours($i)->format('m-d-Y H:i');

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

    public function getRevenueLastThirtyDaysByDay(string $storeUuid): array
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-last-thirty-days-by-day-' . $storeUuid,
            10,
            function () use ($store) {
                $revenueByDay = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 29; $i++) {
                    $start = Carbon::now()->startOfDay()->subDays($i);
                    $end = Carbon::now()->startOfDay()->subDays($i - 1);

                    $revenueByDay[$i] = $this->getRevenueByDatetime($store->uuid, $start, $end);
                    $labels[$i] = Carbon::now()->startOfDay()->subDays($i)->format('m-d-Y H:i');

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

    public function getRevenuePreviousThirtyDaysByDay(string $storeUuid): array
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-previous-thirty-days-by-day-' . $storeUuid,
            10,
            function () use ($store) {
                $revenueByDay = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 29; $i++) {
                    $start = Carbon::now()->startOfDay()->subDays($i + 30);
                    $end = Carbon::now()->startOfDay()->subDays($i + 29);

                    $revenueByDay[$i] = $this->getRevenueByDatetime($store->uuid, $start, $end);
                    $labels[$i] = Carbon::now()->startOfDay()->subDays($i + 30)->format('m-d-Y H:i');

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

    public function getRevenueAllTimeByMonth(string $storeUuid): array
    {
        $store = $this->getStoreByUuid($storeUuid);

        return Cache::remember(
            'store-revenue-metrics-all-time-by-month-' . $storeUuid,
            10,
            function () use ($store) {
                $revenueByMonth = [];
                $labels = [];
                $totalRevenue = 0;

                for ($i = 0; $i <= 11; $i++) {
                    $start = Carbon::now()->startOfMonth()->subMonths($i);
                    $end = Carbon::now()->startOfMonth()->subMonths($i - 1);

                    $revenueByMonth[$i] = $this->getRevenueByDatetime($store->uuid, $start, $end);
                    $labels[$i] = Carbon::now()->startOfMonth()->subMonths($i)->format('m-d-Y H:i');

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

    public function getStoreRevenueMetrics(string $storeUuid): array
    {
        return Cache::remember(
            'store-revenue-metrics-' . $storeUuid,
            10,
            function () use ($storeUuid) {
                return [
                    'all_time' => $this->getRevenueAllTime($storeUuid),
                    'last_thirty_days' => $this->getRevenueLastThirtyDays($storeUuid),
                    'last_seven_days' => $this->getRevenueLastSevenDays($storeUuid),
                    'last_day' => $this->getRevenueLastDay($storeUuid),
                    'today' => $this->getRevenueToday($storeUuid),
                ];
            }
        );
    }
}
