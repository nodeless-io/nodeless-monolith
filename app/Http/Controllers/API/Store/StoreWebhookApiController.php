<?php

namespace App\Http\Controllers\API\Store;

use App\Enums\BitcoinableWebhookType;
use App\Http\Controllers\API\ApiController;
use App\Http\Requests\API\BitcoinableWebhook\CreateBitcoinableWebhookApiRequest;
use App\Http\Requests\API\BitcoinableWebhook\UpdateBitcoinableWebhookApiRequest;
use App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiCollection;
use App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiResource;
use App\Repositories\BitcoinableWebhookRepository;
use App\Repositories\StoreRepository;
use Illuminate\Http\Request;

class StoreWebhookApiController extends ApiController
{
    public function __construct(
        private BitcoinableWebhookRepository $bitcoinableWebhookRepository,
        private StoreRepository $storeRepository,
    ) {
    }

    /**
     * Get Store Webhooks
     *
     * Displays a list of webhooks belonging to the store.
     *
     * @param string $id
     *
     * @return BitcoinableWebhookApiCollection
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Store Webhooks
     *
     * @apiResourceCollection App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiCollection
     * @apiResourceModel App\Models\BitcoinableWebhook paginate=15
     */
    public function index(string $id)
    {
        $webhooks = $this->bitcoinableWebhookRepository->getBitcoinableWebhooksByModel(
            modelUuid: $id,
            type: BitcoinableWebhookType::STORE->value,
        );

        return new BitcoinableWebhookApiCollection($this->paginate($webhooks));
    }

    /**
     * Create Store Webhook
     *
     * Creates a store webhook.
     *
     *
     * @return BitcoinableWebhookApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Store Webhooks
     *
     * @apiResourceModel App\Models\BitcoinableWebhook
     */
    public function create(string $storeId, CreateBitcoinableWebhookApiRequest $request)
    {
        $webhook = $this->bitcoinableWebhookRepository->createBitcoinableWebhook(
            url: $request->validated('url'),
            secret: $request->validated('secret'),
            events: $request->validated('events'),
            status: $request->validated('status'),
            type: BitcoinableWebhookType::STORE->value,
            modelUuid: $storeId,
        );

        return new BitcoinableWebhookApiResource($webhook);
    }

    /**
     * Get Store Webhook
     *
     * Displays a store webhook's details.
     *
     * @param string $storeId
     * @param string $webhookId
     *
     * @return BitcoinableWebhookApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Store Webhooks
     *
     * @apiResource App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiResource
     * @apiResourceModel App\Models\BitcoinableWebhook
     */
    public function show(string $storeId, string $webhookId)
    {
        $webhook = $this->bitcoinableWebhookRepository->getBitcoinableWebhookByUuid($webhookId);
        $store = $this->storeRepository->getStoreByUuid($storeId);

        $this->validateWebhookOwnership($store, $webhook);

        return new BitcoinableWebhookApiResource($webhook);
    }

    /**
     * Update Store Webhook
     *
     * Updates a store webhook.
     *
     * @param string $storeId
     * @param string $webhookId
     *
     * @return BitcoinableWebhookApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Store Webhooks
     *
     * @apiResource App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiResource
     * @apiResourceModel App\Models\BitcoinableWebhook
     */
    public function update(string $storeId, string $webhookId, UpdateBitcoinableWebhookApiRequest $request)
    {
        $webhook = $this->bitcoinableWebhookRepository->getBitcoinableWebhookByUuid($webhookId);
        $store = $this->storeRepository->getStoreByUuid($storeId);

        $this->validateWebhookOwnership($store, $webhook);

        $webhook = $this->bitcoinableWebhookRepository->updateBitcoinableWebhook(
            uuid: $webhookId,
            url: $request->validated('url'),
            events: $request->validated('events'),
            status: $request->validated('status'),
        );

        return new BitcoinableWebhookApiResource($webhook);
    }

    /**
     * Delete Store Webhook
     *
     * Deletes a store webhook.
     *
     * @param string $storeId
     * @param string $webhookId
     *
     * @return BitcoinableWebhookApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Store Webhooks
     *
     * @apiResource App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiResource
     * @apiResourceModel App\Models\BitcoinableWebhook
     */
    public function delete(string $storeId, string $webhookId)
    {
        $webhook = $this->bitcoinableWebhookRepository->getBitcoinableWebhookByUuid($webhookId);
        $store = $this->storeRepository->getStoreByUuid($storeId);

        $this->validateWebhookOwnership($store, $webhook);

        $webhook = $this->bitcoinableWebhookRepository->deleteBitcoinableWebhook($webhookId);
    }
}
