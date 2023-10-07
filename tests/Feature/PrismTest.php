<?php

namespace Tests\Feature;

use App\Models\User;
use App\Repositories\PrismRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

class PrismTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private PrismRepository $prismRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();

        $this->prismRepository = new PrismRepository();
    }

    /** @group createPrism */
    public function testItCreatesAPrism(): void
    {
        $response = $this->createPrism();

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'unified_qr_code',
            'lightning_link',
            'onchain_link',
        ]);

        $this->assertDatabaseHas('prisms', [
            'user_id' => $this->user->id,
            'amount' => 1500,
        ]);
    }

    /** @group getPrism */
    public function testItGetsAPrismByUuid(): void
    {
        $prism = $this->createPrism();
        $uuid = $prism->json('prism.uuid');

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('prism.show', $uuid));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                'uuid',
                'amount',
                'settings',
                'type',
                'status',
                'metadata',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    /** @group getPrisms */
    public function testItGetsAllPrisms(): void
    {
        $this->createPrism();
        $this->createPrism();

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('prism.index'));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'uuid',
                    'amount',
                    'settings',
                    'type',
                    'status',
                    'metadata',
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);
    }

    private function createPrism(): TestResponse
    {
        return $this
        ->actingAs($this->user)
        ->postJson(route('prism.create'), [
            'amount' => 1500,
            'settings' => [
                'testing@testnet.nodeless.io' => 50,
                'utxo@testnet.nodeless.io' => 50,
            ],
        ]);
    }
}
