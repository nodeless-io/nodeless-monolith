<?php

namespace Tests\Feature;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Store;
use App\Models\StoreInvoice;
use App\Models\Transaction;
use App\Models\User;
use App\Repositories\StoreRepository;
use App\Repositories\TransactionRepository;
use App\Services\TransactionService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TransactionTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Store $store;
    private StoreRepository $storeRepository;
    private StoreInvoice $storeInvoice;
    private Transaction $transaction;
    private Transaction $fee;
    private TransactionService $transactionService;
    private TransactionRepository $transactionRepository;

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
            'type' => TransactionType::CREDIT,
            'is_fee' => false,
        ]);

        $this->fee = $this->storeInvoice->transaction()->create([
            'user_id' => $this->user->id,
            'amount' => 110,
            'status' => TransactionStatus::SETTLED,
            'type' => TransactionType::DEBIT,
            'is_fee' => true,
        ]);

        $this->transactionRepository = new TransactionRepository();

        $this->transactionService = new TransactionService($this->transactionRepository);
    }

    public function testItCanGetAllTransaction(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->getJson(route('transaction.index'));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'uuid',
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
            'uuid' => $this->transaction->uuid,
            'amount' => $this->transaction->amount,
            'status' => $this->transaction->status,
            'type' => $this->transaction->type,
            'is_fee' => $this->transaction->is_fee,
        ]);
    }

    public function testItCanGetASingleTransaction(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->getJson(route('transaction.show', $this->transaction->uuid));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                'uuid',
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
            'uuid' => $this->transaction->uuid,
            'amount' => $this->transaction->amount,
            'status' => $this->transaction->status,
            'type' => $this->transaction->type,
            'is_fee' => $this->transaction->is_fee,
        ]);
    }

    /** @group purgeDuplicateTransactions */
    public function testItWillPurgeDuplicateTransaction(): void
    {
        // make duplicate entries for this->storeInvoice and make a new transaction for it
        $duplicateCredit = $this->storeInvoice->transaction()->create([
            'user_id' => $this->user->id,
            'amount' => 1000,
            'status' => TransactionStatus::SETTLED,
            'type' => TransactionType::CREDIT,
            'is_fee' => false,
        ]);

        $duplicateDebit = $this->storeInvoice->transaction()->create([
            'user_id' => $this->user->id,
            'amount' => 110,
            'status' => TransactionStatus::SETTLED,
            'type' => TransactionType::DEBIT,
            'is_fee' => true,
        ]);

        $duplicateCreditId = $duplicateCredit->id;
        $duplicateDebitId = $duplicateDebit->id;

        $hasDuplicates = $this->transactionService->purgeDuplicates($this->user);

        dd($hasDuplicates);

        $this->assertTrue($hasDuplicates);

        $this->assertDatabaseMissing('transactions', [
            'id' => $duplicateCreditId,
        ]);

        $this->assertDatabaseMissing('transactions', [
            'id' => $duplicateDebitId,
        ]);
    }
}
