<?php

namespace App\Helpers;

use App\Models\BitcoinAddress;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class NextBitcoinAddress
{
    public function get(): BitcoinAddress
    {
        $nextAddr = BitcoinAddress::where('bitcoin_addressable_id', null)->first();

        if (!$nextAddr) {
            Artisan::call('generate:addresses');
            $nextAddr = BitcoinAddress::where('bitcoin_addressable_id', null)->first();

            if (!$nextAddr) {
                Log::error('No available bitcoin addresses were generated');
                throw new \Exception('No available bitcoin addresses');
            }
        }

        return $nextAddr;
    }
}
