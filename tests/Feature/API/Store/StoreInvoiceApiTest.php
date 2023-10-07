<?php

namespace Tests\Feature\API\Store;

use App\Models\Store;
use App\Models\StoreInvoice;
use App\Models\User;
use App\Repositories\StoreRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StoreInvoiceApiTest extends TestCase
{
    use RefreshDatabase;
    private $user;
    private $store;
    private $userToken;
    private $storeInvoice;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->store = Store::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $this->userToken = $this->user->createToken('test')->plainTextToken;

        $this->artisan('save:exchange-rates');
    }

    public function testItCanCreateAnInvoice(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])->postJson('/api/v1/store/' . $this->store->uuid . '/invoice', [
            'amount' => 1000,
            'currency' => 'SATS',
        ]);

        $response->assertStatus(201);

        $response->assertJsonStructure([
            'data' => [
                'satsAmount',
            ],
        ]);
    }

    public function testItCanGetAnInvoice(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])->postJson('/api/v1/store/' . $this->store->uuid . '/invoice', [
            'amount' => 0.55,
            'currency' => 'USD',
        ]);

        $endpoint = '/api/v1/store/' . $this->store->uuid . '/invoice/' . $response->json('data.id');

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])->get($endpoint);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                'satsAmount', 'store', 'qrCodes',
            ],
        ]);
    }

    /** @group createInvoiceWithoutOwnership */
    public function testItCannotCreateAnInvoiceUnderAStoreItDoesntOwn(): void
    {
        // Create a new user
        $user = User::factory()->create();
        $newToken = $user->createToken('test')->plainTextToken;

        // attempt to make an invoice for a store it doesnt own

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $newToken,
        ])->postJson('/api/v1/store/' . $this->store->uuid . '/invoice', [
            'amount' => 1000,
            'currency' => 'USD',
        ]);

        $response->assertStatus(400);
    }

    /** @group viewInvoiceWithoutOwnership */
    public function testItCannotViewAnInvoiceItDoesntOwn(): void
    {
        // Create a new user
        $user = User::factory()->create();
        $newToken = $user->createToken('test')->plainTextToken;

        // Create an invoice for the store
        $storeRepository = new StoreRepository();

        $storeInvoice = $storeRepository->createStoreInvoice($this->store->uuid, 1000);

        $endpoint = '/api/v1/store/' . $this->store->uuid . '/invoice/' . $storeInvoice->uuid;

        // attempt to view the invoice
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $newToken,
        ])->get($endpoint);

        $response->assertStatus(400);
    }
}
