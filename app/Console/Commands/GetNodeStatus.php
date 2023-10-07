<?php

namespace App\Console\Commands;

use App\Services\LndService;
use Illuminate\Console\Command;

class GetNodeStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'status:node';

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
        $lndService = new LndService();

        try {
            $info = $lndService->getNodeInfo();
            $this->info(var_dump($info));
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }

        return Command::SUCCESS;
    }
}
