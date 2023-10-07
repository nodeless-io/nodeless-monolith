<?php

namespace Tests\Feature;

use App\Enums\BitcoinableStatus;
use App\Enums\ContestStatus;
use App\Enums\ContestType;
use App\Enums\PaywallType;
use App\Models\Paywall;
use App\Models\PaywallRequest;
use App\Models\User;
use App\Services\StoreService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

class PaywallTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /** @group createPaywall */
    public function testItCanCreateAPaywall(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->postJson(route('paywall.create'), [
                'name' => 'Test Paywall',
                'type' => PaywallType::CONTENT->value,
                'price' => 1001,
                'settings' => [
                    'test' => 'test',
                ],
            ]);

        $response->assertStatus(200);

        $paywall = $this->user->paywalls()->first();

        $this->assertDatabaseHas('paywalls', [
            'uuid' => $paywall->uuid,
            'name' => 'Test Paywall',
        ]);
    }

    /** @group getPaywall */
    public function testItCanGetAPaywallByUuid(): void
    {
        $paywall = $this->user->paywalls()->create([
            'name' => 'Test Paywall',
            'type' => PaywallType::CONTENT->value,
            'price' => 1000,
            'settings' => [
                'test' => 'test',
            ],
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('paywall.show', ['paywallUuid' => $paywall->uuid]));

        $response->assertStatus(200);

        $response->assertJson($paywall->toArray());
    }

    /** @group updatePaywall */
    public function testItCanUpdateAPaywallByUuid(): void
    {
        $paywall = $this->user->paywalls()->create([
            'name' => 'Test Paywall',
            'type' => PaywallType::CONTENT->value,
            'price' => 1000,
            'settings' =>[
                'test' => 'test',
            ],
        ]);

        $response = $this
            ->actingAs($this->user)
            ->putJson(route('paywall.update', ['paywallUuid' => $paywall->uuid]), [
                'name' => 'Test Paywall Updated',
                'type' => PaywallType::CONTENT,
                'price' => 2000,
                'settings' => [
                    'test' => 'test',
                ],
            ]);

        $response->assertStatus(200);

        $paywall->refresh();

        $response->assertJson($paywall->toArray());
    }

    /** @group deletePaywall */
    public function testItCanDeleteAPaywallByUuid(): void
    {
        $paywall = $this->user->paywalls()->create([
            'name' => 'Test Paywall',
            'type' => PaywallType::CONTENT->value,
            'price' => 100,
            'settings' => [
                'test' => 'test',
            ],
        ]);

        $response = $this
            ->actingAs($this->user)
            ->deleteJson(route('paywall.delete', ['paywallUuid' => $paywall->uuid]));

        $response->assertStatus(200);

        $this->assertSoftDeleted($paywall);
    }

    /** @group getPaywalls */
    public function testItCanGetAllPaywalls(): void
    {
        $response = $this
        ->actingAs($this->user)
        ->postJson(route('paywall.create'), [
            'name' => 'Test Paywall',
            'type' => PaywallType::CONTENT,
            'price' => 100,
            'settings' => [
                'test' => 'test',
            ],
        ]);

        $response = $this
        ->actingAs($this->user)
        ->postJson(route('paywall.create'), [
            'name' => 'Test Paywall2',
            'type' => PaywallType::CONTENT,
            'price' => 100,
            'settings' => [
                'test' => 'test',
            ],
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('paywall.index'));

        $response->assertStatus(200);

        $json = $response->json();

        $this->assertEquals($json['data'], $this->user->paywalls()->get()->toArray());
    }

    /** @group getPaywallMetrics */
    public function testItCanGetPaywallMetricsSummary(): void
    {
        $paywall = $this->user->paywalls()->create([
            'name' => 'Test Paywall',
            'type' => PaywallType::CONTENT->value,
            'price' => 1000,
            'settings' => [
                'test' => 'test',
            ],
        ]);

        $paywallRequest = $this
            ->actingAs($this->user)
            ->postJson(route('paywall.request.create', ['paywallUuid' => $paywall->uuid]));

        $paywallRequest = $paywallRequest->json();

        $paywallRequest = PaywallRequest::where('uuid', $paywallRequest['paywall_request']['uuid'])->first();

        $paywallRequest->update([
            'status' => BitcoinableStatus::PAID,
            'paid_at' => Carbon::now(),
            'amount_paid' => 1000,
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('paywall.metrics.summary', ['paywallUuid' => $paywall->uuid]));

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'all_time' => 1000,
                'last_thirty_days' => 1000,
                'last_seven_days' => 1000,
                'last_day' => 1000,
                'today' => 1000,
            ],
        ]);
    }

    /** @group getPaywallsMetricsAllTime */
    public function testItCanGetAllPaywallsRevenueAllTimeByMonth(): void
    {
        $paywall = $this->user->paywalls()->create([
            'name' => 'Test Paywall',
            'type' => PaywallType::CONTENT->value,
            'price' => 1000,
            'settings' => [
                'test' => 'test',
            ],
        ]);

        $paywallRequest = $this
            ->actingAs($this->user)
            ->postJson(route('paywall.request.create', ['paywallUuid' => $paywall->uuid]));

        $paywallRequest = $paywallRequest->json();

        $paywallRequest = PaywallRequest::where('uuid', $paywallRequest['paywall_request']['uuid'])->first();

        $paywallRequest->update([
            'status' => BitcoinableStatus::PAID,
            'paid_at' => Carbon::now(),
            'amount_paid' => 1000,
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('paywall.metrics.revenue.all.all-time', ['paywallUuid' => $paywall->uuid]));

        $response->assertStatus(200);
    }

    /** @group getPaywallsMetricsLastThirtyDays */
    public function testItCanGetAllPaywallsRevenueLastThirtyDaysByDay(): void
    {
        $paywall = $this->user->paywalls()->create([
            'name' => 'Test Paywall',
            'type' => PaywallType::CONTENT->value,
            'price' => 1000,
            'settings' => [
                'test' => 'test',
            ],
        ]);

        $paywallRequest = $this
            ->actingAs($this->user)
            ->postJson(route('paywall.request.create', ['paywallUuid' => $paywall->uuid]));

        $paywallRequest = $paywallRequest->json();

        $paywallRequest = PaywallRequest::where('uuid', $paywallRequest['paywall_request']['uuid'])->first();

        $paywallRequest->update([
            'status' => BitcoinableStatus::PAID,
            'paid_at' => Carbon::now(),
            'amount_paid' => 1000,
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('paywall.metrics.revenue.all.last-thirty-days', ['paywallUuid' => $paywall->uuid]));

        $response->assertStatus(200);
    }

    /** @group getPaywallsMetricsToday */
    public function testItCanGetAllPaywallsRevenueTodayByHour(): void
    {
        $paywall = $this->user->paywalls()->create([
            'name' => 'Test Paywall',
            'type' => PaywallType::CONTENT->value,
            'price' => 1000,
            'settings' => [
                'test' => 'test',
            ],
        ]);

        $paywallRequest = $this
            ->actingAs($this->user)
            ->postJson(route('paywall.request.create', ['paywallUuid' => $paywall->uuid]));

        $paywallRequest = $paywallRequest->json();

        $paywallRequest = PaywallRequest::where('uuid', $paywallRequest['paywall_request']['uuid'])->first();

        $paywallRequest->update([
            'status' => BitcoinableStatus::PAID,
            'paid_at' => Carbon::now(),
            'amount_paid' => 1000,
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('paywall.metrics.revenue.all.today', ['paywallUuid' => $paywall->uuid]));

        $response->assertStatus(200);
    }
}
