<?php

namespace App\Listeners;

use App\Enums\BitcoinableNetworkType;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Jobs\ProcessPrismJob;
use App\Jobs\RecordTransactionJob;
use App\Models\Prism;
use App\Models\Transaction;
use App\Services\LndService;
use App\Services\ReferralService;
use Illuminate\Support\Facades\Log;

class RecordBitcoinableTransaction
{
    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        RecordTransactionJob::dispatch($event);
    }

}
