<?php

namespace Tests\Feature;

use App\Repositories\ExchangeRateRepository;
use Tests\TestCase;

class ExchangeRateTest extends TestCase
{
    private ExchangeRateRepository $exchangeRateRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('save:exchange-rates');

        $this->exchangeRateRepository = new ExchangeRateRepository();
    }

    public function testItCanGetUsdExchangeRate(): void
    {
        $this->assertGreaterThan(0, $this->exchangeRateRepository->getExchangeRate('USD'));
        $this->assertIsFloat($this->exchangeRateRepository->getExchangeRate('USD'));
    }

    public function testItCanGetEurExchangeRate(): void
    {
        $this->assertGreaterThan(0, $this->exchangeRateRepository->getExchangeRate('EUR'));
        $this->assertIsFloat($this->exchangeRateRepository->getExchangeRate('EUR'));
    }
}
