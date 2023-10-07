<?php

namespace App\Console\Commands;

use App\Enums\BitcoinableStatus;
use App\Models\BitcoinAddress;
use App\Services\LndService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class MonitorUtxos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'monitor:utxos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check to see if new utxos appear, and find the corresponding bitcoinable and poll it.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $lndService = new LndService();
        $utxos = $lndService->getUtxos()->all();

        foreach ($utxos as $utxo) {
            $bitcoinAddress = BitcoinAddress::where('address', $utxo->getAddress())->first();
            if (!$bitcoinAddress) {
                continue;
            }
            $bitcoinable = $bitcoinAddress->bitcoin_addressable;
            if ($bitcoinable && $bitcoinable->status === BitcoinableStatus::EXPIRED->value) {
                $this->info('Found utxo for expired bitcoinable ' . $bitcoinable->id . ' with address ' . $utxo->getAddress());
                Log::info('Found utxo for expired bitcoinable ' . $bitcoinable->id . ' with address ' . $utxo->getAddress());
                $bitcoinable->pollStatus();
            }
        }
        return Command::SUCCESS;
    }
}
