<?php

namespace App\Console\Commands;

use App\Models\Donation;
use App\Models\GatedMessage;
use App\Models\LightningInvoice;
use App\Models\PaywallRequest;
use App\Models\StoreInvoice;
use App\Models\Transaction;
use Illuminate\Console\Command;

class PurgeZeroAmountBitcoinables extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'purge:zero';

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
        $lightningInvoices = LightningInvoice::where('amount', 0)->get()->each(function ($invoice) {
            $invoice->delete();
        });

        $donations = Donation::where('amount', 0)->get()->each(function ($donation) {
            $donation->delete();
        });

        $storeInvoices = StoreInvoice::where('amount', 0)->get()->each(function ($invoice) {
            $invoice->delete();
        });

        $paywallRequests = PaywallRequest::where('amount', 0)->get()->each(function ($request) {
            $request->delete();
        });

        $gatedMessageRequest = GatedMessage::where('amount', 0)->get()->each(function ($request) {
            $request->delete();
        });

        $transactions = Transaction::where('amount', 0)->get()->each(function ($transaction) {
            $transaction->delete();
        });

        $this->info('Purged ' . $lightningInvoices->count() . ' Lightning invoices with zero amount.');
        $this->info('Purged ' . $donations->count() . ' donations with zero amount.');
        $this->info('Purged ' . $storeInvoices->count() . ' store invoices with zero amount.');
        $this->info('Purged ' . $paywallRequests->count() . ' paywall requests with zero amount.');
        $this->info('Purged ' . $gatedMessageRequest->count() . ' gated message requests with zero amount.');
        $this->info('Purged ' . $transactions->count() . ' transactions with zero amount.');

        return Command::SUCCESS;
    }
}
