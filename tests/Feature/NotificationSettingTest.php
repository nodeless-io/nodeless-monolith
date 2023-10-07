<?php

namespace Tests\Feature;

use App\Models\Store;
use App\Models\User;
use App\Repositories\NotificationSettingRepository;
use App\Repositories\StoreRepository;
use App\Services\StoreService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NotificationSettingTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private NotificationSettingRepository $notificationSettingRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();

        $this->notificationSettingRepository = new NotificationSettingRepository();
    }

    /** @group updateNotificationSetting */
    public function testItUpdatesANotificationSetting(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->putJson(route('user.notification-settings.update'), [
                'withdrawal_success' => true,
            ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('notification_settings', [
            'user_id' => $this->user->id,
            'withdrawal_success' => true,
        ]);
    }

    /** @group updateNotificationSettingInvalidKey */
    public function testItReturnsAnErrorWhenUpdatingANotificationSettingWithAnInvalidKey(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->putJson(route('user.notification-settings.update'), [
                'invalid_key' => true,
            ]);

        $response->assertStatus(500);
    }

}
