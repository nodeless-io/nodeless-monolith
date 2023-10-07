<?php

namespace Tests\Unit;

use App\Services\LndService;
use Tests\TestCase;
use UtxoOne\LndPhp\Models\Lightning\UtxoList;

class LndTest extends TestCase
{
    private LndService $lndService;

    public function setUp(): void
    {
        parent::setUp();

        $this->lndService = new LndService();
    }

    /** @group getUtxos */
    public function testGetUtxos(): void
    {
        $utxos = $this->lndService->getUtxos();

        $this->assertInstanceOf(UtxoList::class, $utxos);
    }
}
