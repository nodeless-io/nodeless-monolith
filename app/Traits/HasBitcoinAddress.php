<?php

namespace App\Traits;

use App\Helpers\NextBitcoinAddress;
use App\Models\BitcoinAddress;
use App\Models\LightningAddressPayment;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasBitcoinAddress
{
    public function bitcoin_address(): MorphOne
    {
        return $this->morphOne(BitcoinAddress::class, 'bitcoin_addressable');
    }

    protected static function bootHasBitcoinAddress()
    {
        static::created(function ($model) {
            if ($model instanceof LightningAddressPayment) {
                return;
            }

            $nextAddress = (new NextBitcoinAddress())->get();
            $model->bitcoin_address()->save($nextAddress);
        });
    }
}
