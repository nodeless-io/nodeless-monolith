<?php

namespace Tests\Feature\API;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Store;
use App\Models\StoreInvoice;
use App\Models\Transaction;
use App\Models\User;
use App\Repositories\StoreRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TransactionApiTest extends TestCase
{
    use RefreshDatabase;
    private $userToken;
    private User $user;
    private Store $store;
    private StoreRepository $storeRepository;
    private StoreInvoice $storeInvoice;
    private Transaction $transaction;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->store = Store::factory()->create([
            'user_id' => $this->user->id,
        ]);
        $this->storeRepository = new StoreRepository();

        $this->storeInvoice = $this->storeRepository->createStoreInvoice($this->store->uuid, 1000);

        $this->transaction = $this->storeInvoice->transaction()->create([
            'user_id' => $this->user->id,
            'amount' => 1000,
            'status' => TransactionStatus::SETTLED,
            'type' => TransactionType::DEBIT,
            'is_fee' => false,
        ]);

        $this->userToken = $this->user->createToken('test')->plainTextToken;

        $this->artisan('save:exchange-rates');
    }

    public function testItCanGetAllTransaction(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])->getJson('/api/v1/transaction');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'transactable',
                    'amount',
                    'status',
                    'type',
                    'is_fee',
                    'created_at',
                    'updated_at',
                ],
            ],
            'links' => [
                'first',
                'last',
                'prev',
                'next',
            ],
            'meta' => [
                'current_page',
                'from',
                'last_page',
                'links',
                'path',
                'per_page',
                'to',
                'total',
            ],
        ]);

        $response->assertJsonFragment([
            'id' => $this->transaction->uuid,
            'amount' => $this->transaction->amount,
            'status' => $this->transaction->status,
            'type' => $this->transaction->type,
            'is_fee' => $this->transaction->is_fee,
        ]);
    }

    public function testItCanGetASingleTransaction(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->userToken,
        ])->getJson('/api/v1/transaction/' . $this->transaction->uuid);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                'id',
                'transactable',
                'amount',
                'status',
                'type',
                'is_fee',
                'created_at',
                'updated_at',
            ],
        ]);

        $response->assertJsonFragment([
            'id' => $this->transaction->uuid,
            'amount' => $this->transaction->amount,
            'status' => $this->transaction->status,
            'type' => $this->transaction->type,
            'is_fee' => $this->transaction->is_fee,
        ]);
    }
}
