<?php

namespace App\Console\Commands;

use App\Enums\BitcoinableModelType;
use App\Enums\BitcoinableNetworkType;
use App\Enums\BitcoinableStatus;
use App\Enums\DonationStatus;
use App\Enums\StoreInvoiceStatus;
use App\Events\BitcoinTransactionConfirmed;
use App\Models\Donation;
use App\Models\StoreInvoice;
use App\Services\LndService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class MonitorOnChainConfirmation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'monitor:confirmations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check each invoice marked as pending confirmation for the first confirmation. If one is found, settle the invoice';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $bitcoinableModels = BitcoinableModelType::values();

        foreach ($bitcoinableModels as $bitcoinableModel) {
            $pendingBitcoinables = $bitcoinableModel::where('status', BitcoinableStatus::PENDING_CONFIRMATION)->get();

            $lndService = new LndService();
            $utxos = $lndService->getUtxos()->all();

            foreach ($pendingBitcoinables as $pendingBitcoinable) {
                Log::debug('Checking ' . $bitcoinableModel . ' ' . $pendingBitcoinable->uuid . ' for first confirmation');
                foreach ($utxos as $utxo) {
                    if ($utxo->getAddress() === $pendingBitcoinable->bitcoin_address->address && $utxo->getConfirmations() > 0) {
                        if ($utxo->getAmountSat() == $pendingBitcoinable->amount) {
                            $pendingBitcoinable->setToPaid();
                        }

                        if ($utxo->getAmountSat() < $pendingBitcoinable->amount) {
                            $pendingBitcoinable->setToUnderpaid();
                        }

                        if ($utxo->getAmountSat() > $pendingBitcoinable->amount) {
                            $pendingBitcoinable->setToOverpaid();
                        }

                        $pendingBitcoinable->update([
                            'amount_paid' => $utxo->getAmountSat(),
                        ]);

                        event(new BitcoinTransactionConfirmed($pendingBitcoinable));
                    }
                }
            }
        }

        return Command::SUCCESS;
    }
}
