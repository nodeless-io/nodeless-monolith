<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\Withdrawal\NewWithdrawalsPerDay;
use App\Nova\Metrics\Withdrawal\WithdrawalType;
use App\Nova\Metrics\Withdrawal\WithdrawalVolumePerDay;
use Laravel\Nova\Dashboard;

class WithdrawalDashboard extends Dashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new NewWithdrawalsPerDay(),
            new WithdrawalVolumePerDay(),
            new WithdrawalType(),
        ];
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'withdrawal-dashboard';
    }
}
