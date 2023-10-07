<?php

namespace Tests\Feature\API\Store;

use App\Enums\BitcoinableWebhookStatus;
use App\Models\BitcoinableWebhook;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StoreWebhookApiTest extends TestCase
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
    }

    /** @group getStoreWebhooks */
    public function testItCanGetStoreWebhooks(): void
    {
        $webhook = $this->createStoreWebhook();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->getJson(route('api.v1.stores.webhooks.index', $this->store->uuid));

        $this->assertEquals($webhook->uuid, $response->json('data.0.id'));
    }

    /** @group getStoreWebhook */
    public function testItCanGetStoreWebhook(): void
    {
        $webhook = $this->createStoreWebhook();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->getJson(route('api.v1.stores.webhooks.show', [$this->store->uuid, $webhook->uuid]));

        $this->assertEquals($webhook->uuid, $response->json('data.id'));
    }

    /** @group createStoreWebhook */
    public function testItCanCreateStoreWebhook(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->postJson(route('api.v1.stores.webhooks.create', $this->store->uuid), [
            'url' => 'https://example.com',
            'events' => ['paid'],
            'secret' => 'secret',
            'type' => 'store',
            'status' => BitcoinableWebhookStatus::ACTIVE,
        ]);

        $response->assertJsonStructure(['data' => ['id']]);
    }

    /** @group updateStoreWebhook */
    public function testItCanUpdateStoreWebhook(): void
    {
        $webhook = $this->createStoreWebhook();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->putJson(route('api.v1.stores.webhooks.update', [$this->store->uuid, $webhook->uuid]), [
            'url' => 'https://example.com/updated',
            'events' => ['paid', 'new'],
            'type' => 'store',
            'status' => BitcoinableWebhookStatus::ACTIVE,
        ]);

        $response->assertJsonStructure(['data' => ['id']]);

        $this->assertDatabaseHas('bitcoinable_webhooks', [
            'uuid' => $webhook->uuid,
            'url' => 'https://example.com/updated',
        ]);
    }

    /** @group deleteStoreWebhook */
    public function testItCanDeleteStoreWebhook(): void
    {
        $webhook = $this->createStoreWebhook();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->deleteJson(route('api.v1.stores.webhooks.delete', [$this->store->uuid, $webhook->uuid]));

        $this->assertDatabaseMissing('bitcoinable_webhooks', [
            'uuid' => $webhook->uuid,
        ]);
    }

    private function createStoreWebhook(): BitcoinableWebhook
    {
        return $this->store->bitcoinable_webhooks()->create([
            'url' => 'https://example.com',
            'events' => ['paid'],
            'secret' => 'secret',
            'status' => BitcoinableWebhookStatus::ACTIVE,
        ]);
    }
}
