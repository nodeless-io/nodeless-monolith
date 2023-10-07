<?php

namespace Tests\Feature\API\Paywall;

use App\Enums\BitcoinableWebhookStatus;
use App\Models\BitcoinableWebhook;
use App\Models\Paywall;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PaywallWebhookApiTest extends TestCase
{
    use RefreshDatabase;
    private $user;
    private $paywall;
    private $userToken;
    private $paywallRequest;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->paywall = Paywall::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $this->userToken = $this->user->createToken('test')->plainTextToken;
    }

    /** @group getPaywallWebhooks */
    public function testItCanGetPaywallWebhooks(): void
    {
        $webhook = $this->createPaywallWebhook();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->get(route('api.v1.paywalls.webhooks.index', [
            'id' => $this->paywall->uuid,
        ]));

        $this->assertEquals($webhook->uuid, $response->json('data.0.id'));
    }

    /** @group getPaywallWebhook */
    public function testItCanGetPaywallWebhook(): void
    {
        $webhook = $this->createPaywallWebhook();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->getJson(route('api.v1.paywalls.webhooks.show', [$this->paywall->uuid, $webhook->uuid]));

        $this->assertEquals($webhook->uuid, $response->json('data.id'));
    }

    /** @group createPaywallWebhook */
    public function testItCanCreatePaywallWebhook(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->postJson(route('api.v1.paywalls.webhooks.create', $this->paywall->uuid), [
            'url' => 'https://example.com',
            'events' => ['paid'],
            'secret' => 'secret',
            'type' => 'paywall',
            'status' => BitcoinableWebhookStatus::ACTIVE,
        ]);

        $response->assertJsonStructure(['data' => ['id']]);
    }

    /** @group updatePaywallWebhook */
    public function testItCanUpdatePaywallWebhook(): void
    {
        $webhook = $this->createPaywallWebhook();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->putJson(route('api.v1.paywalls.webhooks.update', [$this->paywall->uuid, $webhook->uuid]), [
            'url' => 'https://example.com/updated',
            'events' => ['paid', 'new'],
            'type' => 'paywall',
            'status' => BitcoinableWebhookStatus::ACTIVE,
        ]);

        $response->assertJsonStructure(['data' => ['id']]);

        $this->assertDatabaseHas('bitcoinable_webhooks', [
            'uuid' => $webhook->uuid,
            'url' => 'https://example.com/updated',
        ]);
    }

    /** @group deletePaywallWebhook */
    public function testItCanDeletePaywallWebhook(): void
    {
        $webhook = $this->createPaywallWebhook();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->deleteJson(route('api.v1.paywalls.webhooks.delete', [$this->paywall->uuid, $webhook->uuid]));

        $this->assertDatabaseMissing('bitcoinable_webhooks', [
            'uuid' => $webhook->uuid,
        ]);
    }

    private function createPaywallWebhook(): BitcoinableWebhook
    {
        return $this->paywall->bitcoinable_webhooks()->create([
            'url' => 'https://example.com',
            'events' => ['paid'],
            'secret' => 'secret',
            'status' => BitcoinableWebhookStatus::ACTIVE,
        ]);
    }
}
