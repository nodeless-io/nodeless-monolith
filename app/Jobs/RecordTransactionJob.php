<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use App\Enums\BitcoinableNetworkType;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Prism;
use App\Models\Transaction;
use App\Services\LndService;
use App\Services\ReferralService;
use Illuminate\Support\Facades\Event;

class RecordTransactionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $event;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($event)
    {
        $this->event = $event;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $event = $this->event;

        Log::debug('Recording transaction for ' . $event->bitcoinable->uuid);

        // Weird problem where type is sometimes an enum object and sometimes a string
        if ($event->bitcoinable->type instanceof BitcoinableNetworkType) {
            $type = $event->bitcoinable->type->value;
        } else {
            $type = $event->bitcoinable->type;
        }

        // check that a transaction doesn't already exist for this bitcoinable
        if ($event->bitcoinable->transaction) {
            Log::error('Transaction already exists for ' . $event->bitcoinable->uuid);
            return;
        }

        $className = get_class($event->bitcoinable);

        $credit = Transaction::where('transactable_id', $event->bitcoinable->id)
            ->where('type', TransactionType::CREDIT)
            ->where('transactable_type', $className)
            ->get();

        $creditCount = $credit->count();

        Log::debug('Credit count for ' . $event->bitcoinable->uuid . ' is ' . $creditCount);

        if ($creditCount > 0) {
            Log::error('Bitcoinable Already Credited ' . $event->bitcoinable->uuid);
            return;
        }

        if ($type === BitcoinableNetworkType::ONCHAIN->value) {
            Log::debug('Recording onchain transaction for ' . $event->bitcoinable->uuid);
            $this->recordOnchainTransaction($event);
        }

        if ($type === BitcoinableNetworkType::LIGHTNING->value) {
            Log::debug('Recording lightning transaction for ' . $event->bitcoinable->uuid);
            $this->recordLightningTransaction($event);
        }
    }


    private function recordLightningTransaction($event)
    {
        $lndService = new LndService();
        $referralService = new ReferralService();

        $invoice = $lndService->getLightningInvoice($event->bitcoinable->lightning_invoice->r_hash);

        $amountPaid = $invoice->getAmtPaid() / 1000;

        if ($event->bitcoinable instanceof Prism) {
            $status = TransactionStatus::PENDING;
            ProcessPrismJob::dispatch($event->bitcoinable)
                ->onQueue('withdrawals')
                ->delay(now()->addSeconds(10));
        } else {
            $status = TransactionStatus::SETTLED;
        }

        $credit = $event->bitcoinable->transaction()->create([
            'user_id' => $event->bitcoinable->user()->first()->id,
            'amount' => $amountPaid,
            'status' => $status,
            'type' => TransactionType::CREDIT,
        ]);

        Log::info('Created credit transaction ' . $credit->uuid . ' for ' . $event->bitcoinable->uuid);

        if (class_basename(get_class($event->bitcoinable)) === 'LightningAddressPayment') {
            if ($amountPaid < config('pricing.limits.no_fee_under')) {
                return;
            }
        }

        if (env('CHARGE_FEES') == false) {
            return;
        }

        $debit = $event->bitcoinable->transaction()->create([
            'user_id' => $event->bitcoinable->user()->first()->id,
            'amount' => $this->getFee($amountPaid),
            'status' => TransactionStatus::SETTLED,
            'type' => TransactionType::DEBIT,
            'is_fee' => true,
        ]);

        $referralService->recordReferralFee($debit);

        Log::info('Created fee transaction ' . $debit->uuid . ' for ' . $event->bitcoinable->uuid);
    }

    private function recordOnchainTransaction($event)
    {
        $lndService = new LndService();
        $referralService = new ReferralService();

        foreach ($lndService->getUtxos()->all() as $utxo) {
            if ($utxo->getAddress() === $event->bitcoinable->bitcoin_address->address) {
                $bitcoinableUtxo = $utxo;
            }
        }

        $fee = $this->getFee($bitcoinableUtxo->getAmountSat());

        if ($event->bitcoinable instanceof Prism) {
            $status = TransactionStatus::PENDING;
            ProcessPrismJob::dispatch($event->bitcoinable)
                ->onQueue('withdrawals')
                ->delay(now()->addSeconds(10));
        } else {
            $status = TransactionStatus::SETTLED;
        }

        $credit = $event->bitcoinable->transaction()->create([
            'user_id' => $event->bitcoinable->user()->first()->id,
            'amount' => $bitcoinableUtxo->getAmountSat(),
            'status' => $status,
            'type' => TransactionType::CREDIT,
        ]);

        Log::info('Created credit transaction ' . $credit->uuid . ' for ' . $event->bitcoinable->uuid);

        if (env('CHARGE_FEES') == false) {
            return;
        }

        $debit = $event->bitcoinable->transaction()->create([
            'user_id' => $event->bitcoinable->user()->first()->id,
            'amount' => $fee,
            'status' => TransactionStatus::SETTLED,
            'type' => TransactionType::DEBIT,
            'is_fee' => true,
        ]);

        $referralService->recordReferralFee($debit);

        Log::info('Created credit transaction ' . $credit->uuid . ' for ' . $event->bitcoinable->uuid);
        Log::info('Created fee transaction ' . $debit->uuid . ' for ' . $event->bitcoinable->uuid);
    }

    private function getFee($amount)
    {
        return round($amount * config('pricing.fees.fee_rate')) + config('pricing.fees.base_fee');
    }
}
