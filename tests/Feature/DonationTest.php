<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\StoreService;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

class DonationTest extends TestCase
{
    use RefreshDatabase;
    private User $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function testItCanCreateADonationPage(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->postJson(route('donation-page.create'), [
                'name' => 'Test Donation Page',
                'slug' => 'test-donation-page',
                'description' => 'Test Description',
                'settings' => [
                    'test' => 'test',
                ],
                'status' => 'active',
            ]);

        $response->assertStatus(200);

        $response->assertJson(
            [
                'name' => 'Test Donation Page',
                'slug' => 'test-donation-page',
                'description' => 'Test Description',
                'settings' => json_encode([
                    'test' => 'test',
                ]),
                'status' => 'active',
            ]
        );

        $this->assertDatabaseHas('donation_pages', [
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'status' => 'active',
        ]);
    }

    public function testItCanGetADonationPageBySlug(): void
    {
        $donationPage = $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('donation-page.show', $donationPage->slug));

        $response->assertStatus(200);

        $response->assertJson(
            [
                'name' => 'Test Donation Page',
                'slug' => 'test-donation-page',
                'description' => 'Test Description',
                'settings' => json_encode([
                    'test' => 'test',
                ]),
                'status' => 'active',
            ]
        );
    }

    /** @group updateDonationPage */
    public function testItCanUpdateADonationPage(): void
    {
        $randomSlug = str()->random(10);

        $donationPage = $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => str()->random(10),
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $response = $this
            ->actingAs($this->user)
            ->postJson(route('donation-page.update', $donationPage->uuid), [
                'name' => 'Test Donation Page 2',
                'slug' => $randomSlug,
                'description' => 'Test Description 2',
                'settings' => [
                    'test' => 'test',
                ],
                'status' => 'active',
            ]);

        $response->assertStatus(200);

        $response->assertJson(
            [
                'name' => 'Test Donation Page 2',
                'slug' => $randomSlug,
                'description' => 'Test Description 2',
                'settings' => [
                    'test' => 'test',
                ],
                'status' => 'active',
            ]
        );

        $this->assertDatabaseHas('donation_pages', [
            'name' => 'Test Donation Page 2',
            'slug' => $randomSlug,
            'description' => 'Test Description 2',
        ]);
    }

    /** @group deleteDonationPage */
    public function testItCanDeleteADonationPage(): void
    {
        $donationPage = $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $response = $this
            ->actingAs($this->user)
            ->deleteJson(route('donation-page.delete', $donationPage->uuid));

        $response->assertStatus(200);

        $this->assertSoftDeleted('donation_pages', [
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'status' => 'active',
        ]);
    }

    /** @group errorCreateDuplicateSlug */
    public function testItThrowsErrorOnCreateIfSlugAlreadyExists(): void
    {
        $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $response = $this
            ->actingAs($this->user)
            ->postJson(route('donation-page.create'), [
                'name' => 'Test Donation Page 2',
                'slug' => 'test-donation-page',
                'description' => 'Test Description 2',
                'settings' => [
                    'test' => 'test',
                ],
                'status' => 'active',
            ]);

        $response->assertStatus(400);

        $response->assertJson([
            'error' => 'The slug already exists.',
        ]);
    }

    /** @group errorUpdateDuplicateSlug */
    public function testItThrowsErrorOnUpdateIfSlugAlreadyExists(): void
    {
        $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $donationPage = $this->user->donationPages()->create([
            'name' => 'Test Donation Page 2',
            'slug' => 'test-donation-page-2',
            'description' => 'Test Description 2',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $response = $this
            ->actingAs($this->user)
            ->postJson(route('donation-page.update', $donationPage->uuid), [
                'name' => 'Test Donation Page 3',
                'slug' => 'test-donation-page',
                'description' => 'Test Description 3',
                'settings' => [
                    'test' => 'test',
                ],
                'status' => 'active',
            ]);

        $response->assertStatus(400);

        $response->assertJson([
            'error' => 'The slug already exists.',
        ]);
    }

    /** @group createDonation */
    public function testItCanCreateADonation(): void
    {
        $donationPage = $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $response = $this
            ->actingAs($this->user)
            ->postJson(route('donation.create', $donationPage->slug), [
                'amount' => 1000,
                'name' => 'anonymous',
                'message' => 'Test Message',
            ]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'donation', 'unified_qr_code', 'onchain_qr_code', 'lightning_qr_code', 'donation_page',
        ]);

        $this->assertDatabaseHas('donations', [
            'amount' => 1000,
            'name' => 'anonymous',
            'message' => 'Test Message',
        ]);
    }

    /** @group getDonationStatus */
    public function testItCanGetADonationStatus(): void
    {
        $donationPage = $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $donation = $this
            ->postJson(route('donation.create', $donationPage->slug), [
                'amount' => 1000,
                'name' => 'anonymous',
                'message' => 'Test Message',
            ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('bitcoinable.poll', [
                'bitcoinableType' => 'donation',
                'bitcoinableUuid' => $donation->json('donation.uuid'),
            ]));
        $response->assertStatus(200);

        $response->assertExactJson([
            'status' => 'new',
        ]);
    }

    /** @group donationPageMetrics */
    public function testItCanGetDonationPageMetrics(): void
    {
        $donationPage = $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('donation-page.metrics', $donationPage->uuid));

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'donation_count' => 0,
                'total_donation_amount' => 0,
            ],
        ]);
    }

    /** @group getDonations */
    public function testItCanGetDonations(): void
    {
        $donationPage = $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $this
            ->postJson(route('donation.create', $donationPage->slug), [
                'amount' => 1000,
                'name' => 'anonymous',
                'message' => 'Test Message',
            ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('donation-page.donations.index', $donationPage->uuid));

        $response->assertOk();

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'uuid', 'amount', 'name', 'message', 'status', 'created_at', 'updated_at',
                ],
            ],
        ]);
    }

    /** @group getDonation */
    public function testItCanGetADonation(): void
    {
        $donationPage = $this->user->donationPages()->create([
            'name' => 'Test Donation Page',
            'slug' => 'test-donation-page',
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'status' => 'active',
        ]);

        $donation = $this
            ->postJson(route('donation.create', $donationPage->slug), [
                'amount' => 1000,
                'name' => 'anonymous',
                'message' => 'Test Message',
            ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('donation-page.donations.show', [
                'donationPageUuid' => $donationPage->uuid,
                'donationUuid' => $donation->json('donation.uuid'),
            ]));

        $response->assertOk();

        $response->assertJsonStructure([
            'data' => [
                'uuid', 'amount', 'name', 'message', 'status', 'created_at', 'updated_at',
            ],
        ]);
    }

    /** @group publicDonationPage */
    public function testItCanGetPublicDonationPageDetails(): void
    {
        $this->markTestIncomplete();
    }
}
