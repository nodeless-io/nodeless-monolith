<?php

namespace Tests\Feature;

use App\Models\Store;
use App\Models\User;
use App\Repositories\StoreRepository;
use App\Services\StoreService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StoreTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private StoreService $storeService;
    private StoreRepository $storeRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();

        $this->storeService = new StoreService();
        $this->storeRepository = new StoreRepository();
    }

    /** @group createStore */
    public function testItCreatesAStore(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->postJson(route('store.create'), [
                'name' => 'Test Store',
                'settings' => [
                    'test' => 'test',
                ],
            ]);

        $newStore = Store::orderBy('id', 'desc')->first();

        $response->assertStatus(200);

        $response->assertExactJson($newStore->toArray());
    }

    /** @group getStore */
    public function testItGetsAStoreByUuid(): void
    {
        $store = Store::factory()->create([
            'user_id' => $this->user->id,
            'name' => 'Test Store',
            'settings' => json_encode([
                'test' => 'test',
            ]),
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('store.show', ['uuid' => $store->uuid]));

        $response->assertStatus(200);

        $store = Store::where('uuid', $store->uuid)->first();

        $response->assertExactJson($store->toArray());
    }

    /** @group updateStore */
    public function testItUpdatesAStore(): void
    {
        $store = Store::factory()->create([
            'user_id' => $this->user->id,
            'name' => 'Test Store',
            'settings' => json_encode([
                'test' => 'test',
            ]),
        ]);

        $response = $this
            ->actingAs($this->user)
            ->putJson(route('store.update', ['uuid' => $store->uuid]), [
                'name' => 'Test Store 2',
                'settings' => [
                    'test' => 'test 2',
                ],
            ]);

        $response->assertStatus(200);

        $store = Store::where('uuid', $store->uuid)->first();

        $response->assertExactJson($store->toArray());
    }

    /** @group deleteStore */
    public function testItDeletesAStore(): void
    {
        $store = Store::factory()->create([
            'user_id' => $this->user->id,
            'name' => 'Test Store',
            'settings' => json_encode([
                'test' => 'test',
            ]),
        ]);

        $response = $this
            ->actingAs($this->user)
            ->deleteJson(route('store.delete', ['uuid' => $store->uuid]));

        $response->assertStatus(200);

        // assert that it's soft deleted
        $this->assertNotNull($store->fresh()->deleted_at);
    }

    /** @group getInvoiceStatus */
    public function testItGetsInvoiceStatus(): void
    {
        $store = Store::factory()->create([
            'user_id' => $this->user->id,
            'name' => 'Test Store',
            'settings' => json_encode([
                'test' => 'test',
            ]),
        ]);

        $invoice = $this->storeRepository->createStoreInvoice($store->uuid, 1000);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('store.invoice.status', ['invoiceUuid' => $invoice->uuid]));

        $response->assertStatus(200);

        $response->assertExactJson([
            'status' => 'new',
        ]);
    }
}
