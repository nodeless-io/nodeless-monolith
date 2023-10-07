<?php

namespace Tests\Feature\API\Prism;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\TestResponse;
use Tests\TestCase;

class PrismApiTest extends TestCase
{
    use RefreshDatabase;
    private $user;
    private $userToken;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->userToken = $this->user->createToken('test')->plainTextToken;
    }

    /** @group createPrismApi */
    public function testItCanCreateAPrismFromApi(): void
    {

        $response = $this->createPrismFromApi();
        $response->assertStatus(201);

        $this->assertDatabaseHas('prisms', [
            'amount' => 5000,
            'user_id' => $this->user->id,
        ]);

    }

    /** @group getPrismApi */
    public function testItCanGetAPrismFromApi(): void
    {
        $prism = $this->createPrismFromApi();
        $prismUuid = $prism->json('data.id');

        $response = $this
         ->actingAs($this->user)
            ->getJson(route('api.v1.prisms.show', $prismUuid));

        $response->assertStatus(200);

        $prismUuid = $response->json('data.id');

        $response->assertJson([
            'data' => [
                'id' => $prismUuid,
            ],
        ]);
    }

    /** @group getPrismsApi */
    public function testItCanGetAllPrismsFromApi(): void
    {
        $this->createPrismFromApi();
        $this->createPrismFromApi();

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('api.v1.prisms.index'));

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'satsAmount',
                    'settings',
                ],
            ],
            'meta' => [
                'current_page',
                'from',
                'last_page',
                'links',
                'path',
                'per_page',
                'to',
                'total',
            ],
        ]);
    }

    private function createPrismFromApi(): TestResponse
    {
        return $this
        ->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->postJson(route('api.v1.prisms.create'), [
            'amount' => 5000,
            'settings' => [
                'utxo@testnet.nodeless.io' => 50,
                'testing@testnet.nodeless.io' => 50,
            ],
        ]);
    }
}
