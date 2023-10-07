<?php

namespace App\Models;

use App\Enums\BitcoinableStatus;
use App\Enums\BitcoinableNetworkType;
use App\Events\LightningInvoicePaid;
use App\Events\Bitcoinable\BitcoinableExpired;
use App\Events\Bitcoinable\BitcoinableNew;
use App\Events\Bitcoinable\BitcoinableOverpaid;
use App\Events\Bitcoinable\BitcoinablePaid;
use App\Events\Bitcoinable\BitcoinablePendingConfirmation;
use App\Events\Bitcoinable\BitcoinableUnderpaid;
use App\Notifications\Store\StoreOverpaidNotification;
use App\Notifications\Store\StorePaidNotification;
use App\Notifications\Store\StoreUnderpaidNotification;
use App\Services\LndService;
use App\Traits\HasBitcoinAddress;
use App\Traits\HasLightningInvoice;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class Bitcoinable extends Model
{
    use HasBitcoinAddress;
    use HasLightningInvoice;

    protected $guarded = [];

    protected $casts = [
        'paid_at' => 'datetime',
    ];

    protected $dispatchesEvents = [
        'created' => BitcoinableNew::class,
    ];

    public function transaction(): MorphOne
    {
        return $this->morphOne(Transaction::class, 'transactable');
    }

    public function setNetworkType(BitcoinableNetworkType $networkType): void
    {
        $this->type = $networkType;
        $this->save();
    }

    /*
    |--------------------------------------------------------------------------
    | Status Setters (Broadcasts events)
    |--------------------------------------------------------------------------
    */

    public function setToPaid(): void
    {
        $this->status = BitcoinableStatus::PAID;
        $this->paid_at = Carbon::now();
        $this->save();

        event(new BitcoinablePaid($this));

        Log::notice(class_basename($this) . ' ' . $this->uuid . ' is paid');
    }

    public function setToExpired(): void
    {
        $this->status = BitcoinableStatus::EXPIRED;
        $this->save();

        event(new BitcoinableExpired($this));

        Log::info(class_basename($this) . ' ' . $this->uuid . ' is expired');
    }

    public function setToUnderpaid(): void
    {
        $this->status = BitcoinableStatus::UNDERPAID;
        $this->save();

        event(new BitcoinableUnderpaid($this));

        Log::warning(class_basename($this) . ' ' . $this->uuid . ' is underpaid');
    }

    public function setToOverpaid(): void
    {
        $this->status = BitcoinableStatus::OVERPAID;
        $this->save();

        event(new BitcoinableOverpaid($this));

        Log::warning(class_basename($this) . ' ' . $this->uuid . ' is overpaid');
    }

    public function setToPendingConfirmation(): void
    {
        $this->status = BitcoinableStatus::PENDING_CONFIRMATION;
        $this->save();

        event(new BitcoinablePendingConfirmation($this));

        Log::info(class_basename($this) . ' ' . $this->uuid . ' is pending confirmation');
    }

    public function checkLightningInvoiceStatus(): ?BitcoinableStatus
    {
        $lndService = new LndService();

        if (!$this->lightning_invoice) {
            return null;
        }

        $lightningInvoice = $lndService->getLightningInvoice($this->lightning_invoice->r_hash);

        if ($lightningInvoice->isSettled()) {
            $this->setNetworkType(BitcoinableNetworkType::LIGHTNING);

            event(new LightningInvoicePaid($this));

            $amountPaid = $lightningInvoice->getAmtPaid() / 1000; //Lnd Bug, supposed to return satoshis

            if ($amountPaid === $this->amount) {
                $this->update([
                    'amount_paid' => $amountPaid,
                ]);
                $this->lightning_invoice()->update([
                    'settled' => true,
                    'settled_at' => Carbon::now(),
                    'amt_paid' => $amountPaid,
                ]);
                $this->setToPaid();

                return BitcoinableStatus::PAID;
            }

            if ($amountPaid > $this->amount) {
                $this->update([
                    'amount_paid' => $amountPaid,
                ]);
                $this->lightning_invoice()->update([
                    'settled' => true,
                    'settled_at' => Carbon::now(),
                    'amt_paid' => $amountPaid,
                ]);
                $this->setToOverpaid();

                return BitcoinableStatus::OVERPAID;
            }

            if ($amountPaid < $this->amount) {
                $this->update([
                    'amount_paid' => $amountPaid,
                ]);
                $this->lightning_invoice()->update([
                    'settled' => true,
                    'settled_at' => Carbon::now(),
                    'amt_paid' => $amountPaid,
                ]);
                $this->setToUnderpaid();

                return BitcoinableStatus::UNDERPAID;
            }
        }

        return null;
    }

    public function checkOnchainStatus(): ?BitcoinableStatus
    {
        $utxos = Cache::get('utxos');
        if (!$utxos) {
            $utxos = (new LndService())->getUtxos()->all();
            Cache::put('utxos', $utxos, 5);
        }

        foreach ($utxos as $utxo) {
            if ($this->bitcoin_address !== null && $utxo->getAddress() == $this->bitcoin_address?->address) {
                $this->setNetworkType(BitcoinableNetworkType::ONCHAIN);
                $this->setToPendingConfirmation();
                return BitcoinableStatus::PENDING_CONFIRMATION;
            }
        }

        return null;
    }

    public function pollStatus(): BitcoinableStatus
    {
        if ($this->status === BitcoinableStatus::PAID->value) {
            return BitcoinableStatus::PAID;
        }

        if ($this->status === BitcoinableStatus::UNDERPAID->value) {
            return BitcoinableStatus::UNDERPAID;
        }

        if ($this->status === BitcoinableStatus::OVERPAID->value) {
            return BitcoinableStatus::OVERPAID;
        }

        $lightningInvoiceStatus = $this->checkLightningInvoiceStatus();
        if ($lightningInvoiceStatus) {
            return $lightningInvoiceStatus;
        }

        $onchainStatus = $this->checkOnchainStatus();
        if ($onchainStatus) {
            return $onchainStatus;
        }

        if ($this->status === BitcoinableStatus::EXPIRED->value) {
            return BitcoinableStatus::EXPIRED;
        }

        if ($this->created_at->addMinutes(15)->isPast()) {
            $this->setToExpired();
            return BitcoinableStatus::EXPIRED;
        }

        return BitcoinableStatus::NEW;
    }
}
