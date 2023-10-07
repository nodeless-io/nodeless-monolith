<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\Store\NewInvoicesPerDay;
use App\Nova\Metrics\Store\NewStoresPerDay;
use App\Nova\Metrics\Store\StoreInvoiceVolumePerDay;
use Laravel\Nova\Dashboard;

class StoreDashboard extends Dashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new NewStoresPerDay(),
            new NewInvoicesPerDay(),
            new StoreInvoiceVolumePerDay(),
        ];
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'store-dashboard';
    }
}
