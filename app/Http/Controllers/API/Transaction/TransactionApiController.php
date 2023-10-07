<?php

namespace App\Http\Controllers\API\Transaction;

use App\Http\Controllers\API\ApiController;
use App\Http\Resources\API\Transaction\TransactionApiCollection;
use App\Http\Resources\API\Transaction\TransactionApiResource;
use App\Repositories\TransactionRepository;

class TransactionApiController extends ApiController
{
    public function __construct(private TransactionRepository $transactionRepository)
    {
    }

    /**
     * Get All Transactions
     *
     * Returns a paginated list of transactions for this user.
     *
     * @group Transactions
     *
     * @queryParam isFee boolean If true, only returns transactions that are fees.
     *
     * @apiResourceCollection App\Http\Resources\API\Transaction\TransactionApiCollection
     * @apiResourceModel App\Models\Transaction paginate=15
     *
     * @return TransactionApiCollection
     */
    public function index(): TransactionApiCollection
    {
        // grab the query parameter if it exists ?isFee=true
        $isFee = request()->query('isFee');

        // if the query parameter doesnt exist, set it to false
        if ($isFee === null || $isFee === 'false') {
            $isFee = false;
        }

        $transactions = $this->transactionRepository->getTransactionsByUserId(
            userId: auth()->user()->id,
            isFee: $isFee
        );

        return new TransactionApiCollection($this->paginate($transactions));
    }

    /**
     * Get Transaction
     *
     * Returns a single transaction.
     *
     * @group Transactions
     *
     * @urlParam id string required The id of the transaction. Example: 2cas07-0c8n70n923-72c93-c2389
     *
     * @apiResource App\Http\Resources\API\Transaction\TransactionApiResource
     * @apiResourceModel App\Models\Transaction
     *
     * @param string $id
     * @return TransactionApiResource
     */
    public function show(string $id): TransactionApiResource
    {
        $transaction = $this->transactionRepository->getTransactionByUuid(
            $id
        );

        $this->validateOwnership($transaction);

        return new TransactionApiResource($transaction);
    }
}
