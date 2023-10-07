<?php

namespace Tests\Feature\API\Paywall;

use App\Models\Paywall;
use App\Models\Store;
use App\Models\StoreInvoice;
use App\Models\User;
use App\Repositories\StoreRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PaywallApiTest extends TestCase
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

    /** @group createPaywall */
    public function testItCanCreateAPaywallViaApi(): void
    {
        $response = $this
            ->withHeaders([
                'Authorization' => 'Bearer ' . $this->userToken,
            ])
            ->postJson(route('api.v1.paywalls.create'), [
                'name' => 'Test Paywall',
                'type' => 'content',
                'price' => 1000,
                'settings' => [
                    'content' => 'This is the content',
                ],
            ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('paywalls', [
            'name' => 'Test Paywall',
            'type' => 'content',
            'price' => 1000,
        ]);

        $response->assertJson([
            'data' => [
                'name' => 'Test Paywall',
                'type' => 'content',
                'price' => 1000,
                'settings' => [
                    'content' => 'This is the content',
                ],
            ],
        ]);
    }

    /** @group getPaywall */
    public function testItCanGetAPaywallViaApi(): void
    {
        $paywall = $this->createPaywall();

        $response = $this
        ->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->getJson(route('api.v1.paywalls.show', $paywall->uuid));

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'name' => $paywall->name,
                'type' => $paywall->type,
                'price' => $paywall->price,
                'settings' => $paywall->settings,
            ],
        ]);
    }

    /** @group updatePaywall */
    public function testItCanUpdateAPaywallViaApi(): void
    {
        $paywall = $this->createPaywall();

        $response = $this
            ->withHeaders([
                'Authorization' => 'Bearer ' . $this->userToken,
            ])
            ->putJson(route('api.v1.paywalls.update', ['id' => $paywall->uuid]), [
                'name' => 'Updated Paywall',
                'type' => 'content',
                'price' => 10300,
                'settings' => [
                    'content' => 'This is the content',
                ],
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('paywalls', [
            'name' => 'Updated Paywall',
            'type' => 'content',
            'price' => 10300,
        ]);

        $response->assertJson([
            'data' => [
                'name' => 'Updated Paywall',
                'type' => 'content',
                'price' => 10300,
                'settings' => [
                    'content' => 'This is the content',
                ],
            ],
        ]);
    }

    /** @group deletePaywall */
    public function testItCanDeleteAPaywallViaApi(): void
    {
        $paywall = $this->createPaywall();

        $response = $this
            ->withHeaders([
                'Authorization' => 'Bearer ' . $this->userToken,
            ])
            ->deleteJson(route('api.v1.paywalls.delete', $paywall->uuid));

        $response->assertStatus(200);

        $this->assertSoftDeleted('paywalls', [
            'name' => $paywall->name,
        ]);
    }

    /** @group getPaywalls */
    public function testItCanGetPaywallsViaApi(): void
    {
        $paywall1 = $this->createPaywall();
        $paywall2 = $this->createPaywall();

        $response = $this
            ->withHeaders([
                'Authorization' => 'Bearer ' . $this->userToken,
            ])
            ->getJson(route('api.v1.paywalls.index'));

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                [
                    'name' => $paywall1->name,
                    'type' => $paywall1->type,
                    'price' => $paywall1->price,
                    'settings' => $paywall1->settings,
                ],
                [
                    'name' => $paywall2->name,
                    'type' => $paywall2->type,
                    'price' => $paywall2->price,
                    'settings' => $paywall2->settings,
                ],
            ],
        ]);
    }

    /** @group getPaywallMetrics */
    public function testItCanGetPaywallMetricsViaApi(): void
    {
        $this->markTestIncomplete();
    }

    /** @group createPaywallRequest */
    public function testItCanCreateAPaywallRequestViaApi(): void
    {
        $paywall = $this->createPaywall();

        $response = $this
            ->withHeaders([
                'Authorization' => 'Bearer ' . $this->userToken,
            ])
            ->postJson(route('api.v1.paywalls.requests.create', $paywall->uuid), [
                'metadata' => [
                    'name' => 'Test User',
                ],
        ]);

        $response->assertStatus(201);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'metadata',
                'status',
            ],
        ]);
    }

    /** @group getPaywallRequest */
    public function testItCanGetAPaywallRequestViaApi(): void
    {
        $paywall = $this->createPaywall();

        $paywallRequest = $this
            ->withHeaders([
                'Authorization' => 'Bearer ' . $this->userToken,
            ])
            ->postJson(route('api.v1.paywalls.requests.create', $paywall->uuid), [
                'metadata' => [
                    'name' => 'Test User',
                ],
        ]);

        $response = $this
        ->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->getJson(route('api.v1.paywalls.requests.show', [
            'id' => $paywall->uuid,
            'requestId' => $paywallRequest->json('data.id'),
        ]));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'metadata',
                'status',
            ],
        ]);
    }

    /** @group getPaywallRequestStatus */
    public function testItCanGetAPaywallRequestStatusViaApi(): void
    {
        $paywall = $this->createPaywall();

        $paywallRequest = $this
            ->withHeaders([
                'Authorization' => 'Bearer ' . $this->userToken,
            ])
            ->postJson(route('api.v1.paywalls.requests.create', $paywall->uuid), [
                'metadata' => [
                    'name' => 'Test User',
                ],
        ]);

        $response = $this
        ->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])
        ->getJson(route('api.v1.paywalls.requests.status', [
            'id' => $paywall->uuid,
            'requestId' => $paywallRequest->json('data.id'),
        ]));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'status',
        ]);
    }

    private function createPaywall(): Paywall
    {
        return Paywall::factory()->create([
            'user_id' => $this->user->id,
        ]);
    }
}
