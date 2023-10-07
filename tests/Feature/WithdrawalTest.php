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

class WithdrawalTest extends TestCase
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

    /** @group withdrawLightningAddress */
    public function testItCanWithdrawToLightningAddress(): void
    {
        $this->markTestSkipped('We disabled ad hoc withdrawals for now.');
        $response = $this
            ->actingAs($this->user)
            ->post(route('withdrawal.lightning-address'), [
                'amount' => 1100,
            ]);

        $response->assertSuccessful();

        $response->assertJsonStructure([
            'data' => [
                'uuid',
                'amount',
                'type',
                'lightning_address',
                'lightning_payment_preimage',
                'lightning_payment_hash',
                'status',
                'completed_at',
                'transaction' => [
                    'uuid',
                    'transactable_type',
                    'amount',
                    'type',
                    'status',
                    'created_at',
                    'updated_at',
                    'is_fee'
                ]
            ]
        ]);
    }

    /** @group withdrawOnchain */
    public function testItCanWithdrawOnChain(): void
    {
        $this->markTestIncomplete('This test has not been implemented yet.');
    }

    /** @group getWithdrawals */
    public function testItCanGetWithdrawals(): void
    {
        $this->markTestSkipped('We disabled ad hoc withdrawals for now.');

        $response = $this
        ->actingAs($this->user)
        ->post(route('withdrawal.lightning-address'), [
            'amount' => 1100,
        ]);

        $response->assertSuccessful();

        $response = $this
            ->actingAs($this->user)
            ->get(route('withdrawal.index'));

        $response->assertSuccessful();

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'uuid',
                    'amount',
                    'type',
                    'lightning_address',
                    'lightning_payment_preimage',
                    'lightning_payment_hash',
                    'status',
                    'completed_at',
                    'transaction' => [
                        'uuid',
                        'transactable_type',
                        'amount',
                        'type',
                        'status',
                        'created_at',
                        'updated_at',
                        'is_fee'
                    ]
                ]
            ]
        ]);
    }

    /** @group getWithdrawal */
    public function testItCanGetWithdrawal(): void
    {
        $this->markTestSkipped('We disabled ad hoc withdrawals for now.');

        $response = $this
        ->actingAs($this->user)
        ->post(route('withdrawal.lightning-address'), [
            'amount' => 1100,
        ]);

        $response->assertSuccessful();

        $withdrawal = $response->json('data');

        $response = $this
            ->actingAs($this->user)
            ->get(route('withdrawal.show', $withdrawal['uuid']));

        $response->assertSuccessful();

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'uuid',
                    'amount',
                    'type',
                    'lightning_address',
                    'lightning_payment_preimage',
                    'lightning_payment_hash',
                    'status',
                    'completed_at',
                    'transaction' => [
                        'uuid',
                        'transactable_type',
                        'amount',
                        'type',
                        'status',
                        'created_at',
                        'updated_at',
                        'is_fee'
                    ]
                ],
            ]
        ]);
    }

    /** @group getWithdrawalSettings */
    public function testItCanGetWithdrawalSettings(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->get(route('withdrawal.settings.show'));

        $response->assertSuccessful();
    }

    /** @group updateWithdrawalSettings */
    public function testItCanUpdateWithdrawalSettings(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->put(route('withdrawal.settings.update'), [
                'lightning_address' => 'updated@test.com',
                'onchain_address' => 'tb1qekhzrnuggdyw9ehm4chk0l4dw23tlmvw9d0unt',
                'auto_withdraw' => true,
                'default_withdrawal_type' => 'lightning',
            ]);

        $response->assertSuccessful();
    }
}
