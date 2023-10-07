<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class UnlockWithdrawals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'withdrawals:unlock';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Unlock withdrawals for all users who have been locked for more than 24 hours';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $users = User::query()
            ->where('withdrawal_lock', true)
            ->where('withdrawal_locked_at', '<', now()->subHours(24))
            ->get();

        foreach ($users as $user) {
            $user->update([
                'withdrawal_lock' => false,
                'withdrawal_locked_at' => null,
            ]);

            $this->info('Unlocked withdrawals for ' . $user->email);
        }

        return Command::SUCCESS;
    }
}
