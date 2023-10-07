<?php

namespace App\Console\Commands;

use App\Models\Inbox;
use Illuminate\Console\Command;

class FakeMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:message';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'send a fake message to an inbox';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // ask the user which inbox to send the message to
        $username = $this->ask('Which inbox should the message be sent to? (username)');

        $inbox = Inbox::where('username', $username)->firstOrFail();

        // create a gated message request
        $gatedMessageRequest = $inbox->requests()->create([
            'body' => 'This is a fake message.',
            'from' => 'fake@fake.com',
            'to' => 'admin@testnet.nodeless.io',
            'subject' => 'Fake Message',
            'signature' => 'testing123',
            'token' => 'token123',
        ]);

        // return the link to the message checkout
        $this->info(env('APP_URL') . '/gated-inbox-request/' . $gatedMessageRequest->uuid);

        return Command::SUCCESS;
    }
}
