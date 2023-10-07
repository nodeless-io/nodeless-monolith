<?php

namespace App\Nova\Dashboards;

use App\Nova\Metrics\DonationPage\DonationVolumePerDay;
use App\Nova\Metrics\DonationPage\NewDonationPagesPerDay;
use App\Nova\Metrics\DonationPage\NewDonationsPerDay;
use Laravel\Nova\Dashboard;

class DonationPageDashboard extends Dashboard
{
    /**
     * Get the cards for the dashboard.
     *
     * @return array
     */
    public function cards()
    {
        return [
            new NewDonationPagesPerDay(),
            new NewDonationsPerDay(),
            new DonationVolumePerDay(),
        ];
    }

    /**
     * Get the URI key for the dashboard.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'donation-page-dashboard';
    }
}
