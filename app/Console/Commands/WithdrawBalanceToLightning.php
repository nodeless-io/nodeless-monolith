<?php

namespace App\Console\Commands;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Enums\WithdrawalStatus;
use App\Enums\WithdrawalType;
use App\Jobs\Withdrawal\DispatchLightningWithdrawalsJob;
use App\Models\User;
use App\Notifications\WithdrawalFailureNotification;
use App\Notifications\WithdrawalSuccessNotification;
use App\Services\LndService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class WithdrawBalanceToLightning extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'withdraw:lightning';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Withdraws all available balance to the user\'s lightning address.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $users = User::where('default_withdrawal_type', WithdrawalType::LIGHTNING->value)
            ->where('auto_withdraw', true)
            ->get();

        dispatch(new DispatchLightningWithdrawalsJob($users))->onQueue('withdrawals');

        return Command::SUCCESS;
    }
}
