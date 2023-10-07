<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\Inbox\GatedMessageRequestVolumePerDay;
use App\Nova\Metrics\Inbox\NewGatedMessageRequestsPerDay;
use App\Nova\Metrics\Inbox\NewInboxesPerDay;
use Laravel\Nova\Dashboard;

class InboxDashboard extends Dashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new NewInboxesPerDay(),
            new NewGatedMessageRequestsPerDay(),
            new GatedMessageRequestVolumePerDay(),
        ];
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'inbox-dashboard';
    }
}
