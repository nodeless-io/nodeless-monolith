<?php

namespace App\Console\Commands;

use App\Models\BitcoinAddress;
use App\Services\LndService;
use Illuminate\Console\Command;

class GenerateAddresses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:addresses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the next 100 bitcoin addresses if there are less than 100 addresses available.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $lndService = new LndService();

        // check if there are 100 or less unused BitcoinAdress
        $usedAddresses = BitcoinAddress::where('bitcoin_addressable_id', null)->count();

        $this->info("There are $usedAddresses unused BitcoinAddresses");

        if ($usedAddresses <= 100) {
            $this->info('Generating 100 new BitcoinAddresses');

            for ($i = 0; $i < 2; $i++) {
                BitcoinAddress::create([
                    'address' => $lndService->getNextAddr(),
                ]);
            }
        } else {
            $this->info('No need to generate new BitcoinAddresses');
        }
    }
}
