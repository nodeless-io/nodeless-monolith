<?php

namespace App\Services;

use App\Repositories\ExchangeRateRepository;
use Exception;

class StoreService
{
    private ExchangeRateRepository $exchangeRateRepository;

    public function __construct()
    {
        $this->exchangeRateRepository = new ExchangeRateRepository();
    }

    public function getSatAmount(string $amount, string $currency): float
    {
        $satsAmount = 0;
        switch ($currency) {
            case 'USD':
                $exchangeRate = round($this->exchangeRateRepository->getExchangeRate('USD'), 8);
                $satsAmount = bcmul(bcdiv($amount, (string) $exchangeRate, 8), '100000000');
                break;
            case 'EUR':
                $exchangeRate = round($this->exchangeRateRepository->getExchangeRate('EUR'), 8);
                $satsAmount = bcmul(bcdiv($amount, (string) $exchangeRate, 8), '100000000');
                break;
            case 'BTC':
                $satsAmount = bcmul($amount, '100000000');
                break;
            case 'SATS':
                $satsAmount = $amount;
                break;
            case 'CAD':
                $exchangeRate = round($this->exchangeRateRepository->getExchangeRate('CAD'), 8);
                $satsAmount = bcmul(bcdiv($amount, (string) $exchangeRate, 8), '100000000');
                break;
            case 'JPY':
                $exchangeRate = round($this->exchangeRateRepository->getExchangeRate('JPY'), 8);
                $satsAmount = bcmul(bcdiv($amount, (string) $exchangeRate, 8), '100000000');
                break;
            case 'GBP':
                $exchangeRate = round($this->exchangeRateRepository->getExchangeRate('GBP'), 8);
                $satsAmount = bcmul(bcdiv($amount, (string) $exchangeRate, 8), '100000000');
                break;
            case 'CHF':
                $exchangeRate = round($this->exchangeRateRepository->getExchangeRate('CHF'), 8);
                $satsAmount = bcmul(bcdiv($amount, (string) $exchangeRate, 8), '100000000');
                break;
            default:
                throw new Exception('Invalid currency');
        }
        return $satsAmount;
    }



    // public function getSatAmount(string $amount, string $currency): float
    // {
    //     $satsAmount = 0;
    //     match ($currency) {
    //         'USD' => $satsAmount = bcmul(strval($amount / $this->exchangeRateRepository->getExchangeRate('USD')), '100000000'),
    //         'EUR' => $satsAmount = bcmul(strval($amount / $this->exchangeRateRepository->getExchangeRate('EUR')), '100000000'),
    //         'BTC' => $satsAmount = bcmul($amount, '100000000'),
    //         'SATS' => $satsAmount = $amount,
    //     };

    //     return $satsAmount;
    // }
}
