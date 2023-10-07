<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\Transaction\TransactionFeeVolumePerDay;
use App\Nova\Metrics\Transaction\TransactionVolumePerDay;
use App\Nova\Metrics\User\NewUsersPerDay;
use App\Nova\Metrics\Withdrawal\WithdrawalVolumePerDay;
use Laravel\Nova\Dashboards\Main as Dashboard;

class Main extends Dashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new NewUsersPerDay(),
            new TransactionVolumePerDay(),
            (new TransactionFeeVolumePerDay()),
            new WithdrawalVolumePerDay(),
        ];
    }
}
