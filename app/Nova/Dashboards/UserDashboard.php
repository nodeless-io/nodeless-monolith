<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\User\NewUsersPerDay;
use Laravel\Nova\Dashboard;

class UserDashboard extends Dashboard
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
        ];
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'user-dashboard';
    }
}
