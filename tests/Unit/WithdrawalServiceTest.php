<?php

namespace Tests\Unit;

use App\Services\LndService;
use App\Services\WithdrawalService;
use Tests\TestCase;
use UtxoOne\LndPhp\Models\Lightning\UtxoList;

class WithdrawalServiceTest extends TestCase
{
    private LndService $lndService;
    private WithdrawalService $withdrawalService;

    public function setUp(): void
    {
        parent::setUp();

        $this->lndService = new LndService();
        $this->withdrawalService = new WithdrawalService();
    }

    /** @group payLightningAddress */
    public function testPayLightningAddress(): void
    {
        $this->markTestIncomplete('Requires lnd sdk to have a pay invoice method');
        $response = $this->withdrawalService->payLightningAddress(100, 'utxo1@getalby.com');

        dd($response);
    }
}
