<?php

namespace App\Jobs\Withdrawal;

use App\Services\LndService;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class DispatchLightningWithdrawalsJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public Collection $users;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Collection $users)
    {
        $this->users = $users;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (env('DISABLE_WITHDRAWALS') == true) {
            Log::info('Withdrawals are disabled, exiting');
            return;
        }
        
        foreach ($this->users as $user) {
            if (
                $user->lightning_address &&
                $user->auto_withdraw == true &&
                $user->withdrawal_lock == false &&
                $user->getAvailableBalance() > 1500) {

                dispatch(new PayLightningAddressJob($user))->onQueue('withdrawals');
            }
        }
    }
}
