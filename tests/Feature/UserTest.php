<?php

namespace Tests\Feature;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Store;
use App\Models\StoreInvoice;
use App\Models\Transaction;
use App\Models\User;
use App\Repositories\StoreRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Store $store;
    private StoreRepository $storeRepository;
    private StoreInvoice $storeInvoice;
    private Transaction $transaction;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create([
            'lightning_address' => 'admin@testnet.nodeless.io'
        ]);
        $this->store = Store::factory()->create([
            'user_id' => $this->user->id,
        ]);
        $this->storeRepository = new StoreRepository();

        $this->storeInvoice = $this->storeRepository->createStoreInvoice($this->store->uuid, 1000);

        $this->transaction = $this->storeInvoice->transaction()->create([
            'user_id' => $this->user->id,
            'amount' => 10000,
            'status' => TransactionStatus::SETTLED,
            'type' => TransactionType::CREDIT,
            'is_fee' => false,
        ]);
    }

    /** @group getUser */
    public function testItCanGetUserDetails(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->get(route('user.show'));

        $response->assertSuccessful();
    }

    /** @group updateNotificationSettings */
    public function testItCanUpdateNotificationSettings(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->put(route('user.notification-settings.update'), [
                'withdrawal_success' => true,
            ]);

        $response->assertSuccessful();

    }
}
