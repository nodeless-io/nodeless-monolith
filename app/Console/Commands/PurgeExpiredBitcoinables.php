<?php

namespace App\Console\Commands;

use App\Enums\BitcoinableStatus;
use App\Services\LndService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class PurgeExpiredBitcoinables extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'purge:expired';

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
        $this->info('Purging expired bitcoinables...');

        $bitcoinables = [
            'App\Models\StoreInvoice',
            'App\Models\Donation',
            'App\Models\GatedMessage',
            'App\Models\PaywallRequest',
        ];

        foreach ($bitcoinables as $bitcoinable) {
            $bitcoinable::query()
                ->where('status', BitcoinableStatus::EXPIRED)
                ->where('created_at', '<', now()->subDays(7))
                ->get()
                ->each(function ($bitcoinable) {
                    $bitcoinableClass = get_class($bitcoinable);
                    $this->info('Checking that the bitcoinable ' . $bitcoinableClass . ' with id ' . $bitcoinable->uuid . ' is expired...');
                    $bitcoinable->pollStatus();
                    $freshBitcoinable = $bitcoinable->fresh();
                    if ($freshBitcoinable->status === BitcoinableStatus::EXPIRED->value) {
                        $this->info('Invoice has not been paid, purging...');
                        // detach the bitcoin address from the bitcoinable
                        $bitcoinAddress = $bitcoinable->bitcoin_address();
                        $bitcoinAddress->update([
                            'bitcoin_addressable_id' => null,
                            'bitcoin_addressable_type' => null,
                        ]);

                        $this->info('Bitcoin address detached.');

                        // detach the lightning invoice from the bitcoinable
                        $lightningInvoice = $bitcoinable->lightning_invoice();
                        $lightningInvoice->update([
                            'lightning_invoiceable_id' => null,
                            'lightning_invoiceable_type' => null,
                        ]);

                        $this->info('Lightning invoice detached.');

                        // delete the lightning invoice
                        $lightningInvoice->delete();
                        $this->info('Lightning invoice deleted.');

                        $bitcoinable->delete();

                        $this->info('Bitcoinable deleted.');
                    } else {
                        $this->alert('Invoice has been paid, not purging...');
                        Log::alert('Expired bitcoinable ' . $bitcoinableClass . ' with id ' . $bitcoinable->uuid . ' has been paid, not purging...');
                    }
                });
        }


        return Command::SUCCESS;
    }
}
