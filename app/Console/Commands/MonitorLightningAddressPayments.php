<?php

namespace App\Console\Commands;

use App\Enums\BitcoinableStatus;
use App\Models\LightningAddressPayment;
use Illuminate\Console\Command;

class MonitorLightningAddressPayments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'monitor:lightning-address-payments';

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
        $newLightningAddressPayments = LightningAddressPayment::where('status', 'new')->get();

        foreach ($newLightningAddressPayments as $payment) {
            $status = $payment->checkLightningInvoiceStatus();

            if ($status === BitcoinableStatus::NEW && $payment->created_at->diffInMinutes(now()) > 15) {
                $payment->setToExpired();
            }
        }

        return Command::SUCCESS;
    }
}
