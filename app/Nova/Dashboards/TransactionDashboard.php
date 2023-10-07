<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\Transaction\TransactionFeeVolumePerDay;
use App\Nova\Metrics\Transaction\TransactionsPerDay;
use App\Nova\Metrics\Transaction\TransactionType;
use App\Nova\Metrics\Transaction\TransactionVolumePerDay;
use Laravel\Nova\Dashboard;

class TransactionDashboard extends Dashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new TransactionFeeVolumePerDay(),
            new TransactionsPerDay(),
            new TransactionVolumePerDay(),
            (new TransactionType())->width('1/2')->fixedHeight(),
        ];
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'transaction-dashboard';
    }
}
