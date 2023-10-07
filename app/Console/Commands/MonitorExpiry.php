<?php

namespace App\Console\Commands;

use App\Enums\BitcoinableStatus;
use App\Enums\DonationStatus;
use App\Enums\StoreInvoiceStatus;
use App\Models\Donation;
use App\Models\GatedMessage;
use App\Models\LightningAddressPayment;
use App\Models\PaywallRequest;
use App\Models\StoreInvoice;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class MonitorExpiry extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'monitor:expiry';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Monitor new invoices and mark them as expired if they have not been paid within 5 minutes.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        StoreInvoice::where('status', BitcoinableStatus::NEW)
            ->get()
            ->each(function ($invoice) {
                $invoice->pollStatus();
                if ($invoice->status instanceof BitcoinableStatus) {
                    $status = $invoice->status->value;
                } else {
                    $status = $invoice->status;
                }

                $this->info('Polled invoice ' . $invoice->id . ' with status ' . $status);
            });

        Donation::where('status', BitcoinableStatus::NEW)
            ->get()
            ->each(function ($donation) {
                $donation->pollStatus();
                if ($donation->status instanceof BitcoinableStatus) {
                    $status = $donation->status->value;
                } else {
                    $status = $donation->status;
                }
                $this->info('Polled donation ' . $donation->id . ' with status ' . $status);
            });

        PaywallRequest::where('status', BitcoinableStatus::NEW)
            ->get()
            ->each(function ($paywallRequest) {
                $paywallRequest->pollStatus();
                if ($paywallRequest->status instanceof BitcoinableStatus) {
                    $status = $paywallRequest->status->value;
                } else {
                    $status = $paywallRequest->status;
                }
                $this->info('Polled paywall request ' . $paywallRequest->id . ' with status ' . $status);
            });

        GatedMessage::where('status', BitcoinableStatus::NEW)
            ->get()
            ->each(function ($gatedMessage) {
                $gatedMessage->pollStatus();
                if ($gatedMessage->status instanceof BitcoinableStatus) {
                    $status = $gatedMessage->status->value;
                } else {
                    $status = $gatedMessage->status;
                }
                $this->info('Polled gated message ' . $gatedMessage->id . ' with status ' . $status);
            });

        return Command::SUCCESS;
    }
}
