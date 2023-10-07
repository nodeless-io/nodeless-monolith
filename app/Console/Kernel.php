<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        if (env('DISABLE_CRON') === true) {
            return;
        }
        
        $schedule->command('monitor:lightning-address-payments')->everyMinute();
        $schedule->command('withdraw:lightning')->everyMinute();
        $schedule->command('purge:expired')->everyOddHour();
        $schedule->command('monitor:expiry')->everyFiveMinutes();
        $schedule->command('monitor:confirmations')->everyFiveMinutes();
        $schedule->command('save:exchange-rates')->everyTwoMinutes();
        $schedule->command('batch:onchain-withdrawals')->everyThirtyMinutes();
        $schedule->command('purge:zero')->everyMinute();
        $schedule->command('withdrawal:unlock')->everySixHours();
        $schedule->command('monitor:utxos')->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
