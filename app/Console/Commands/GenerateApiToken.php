<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class GenerateApiToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:api-token';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Generate a new API token for the admin@nodeless.io user
        $user = User::where('email', 'admin@nodeless.io')->first();

        // display the plain text token generated with sanctum
        $this->info($user->createToken('admin')->plainTextToken);

        return Command::SUCCESS;
    }
}
