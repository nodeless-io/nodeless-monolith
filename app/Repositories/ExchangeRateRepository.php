<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Cache;

class ExchangeRateRepository
{
    public function getExchangeRate(string $currency): float
    {
        $key = 'exchange_rate_' . strtolower($currency);
        return Cache::get($key);
    }
}
