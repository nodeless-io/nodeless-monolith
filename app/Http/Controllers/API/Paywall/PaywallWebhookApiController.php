<?php

namespace App\Http\Controllers\API\Paywall;

use App\Enums\BitcoinableWebhookType;
use App\Http\Controllers\API\ApiController;
use App\Http\Requests\API\BitcoinableWebhook\CreateBitcoinableWebhookApiRequest;
use App\Http\Requests\API\BitcoinableWebhook\UpdateBitcoinableWebhookApiRequest;
use App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiCollection;
use App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiResource;
use App\Repositories\BitcoinableWebhookRepository;
use App\Repositories\PaywallRepository;
use Illuminate\Http\Request;

class PaywallWebhookApiController extends ApiController
{
    public function __construct(
        private BitcoinableWebhookRepository $bitcoinableWebhookRepository,
        private PaywallRepository $paywallRepository,
    ) {
    }

    /**
     * Get Paywall Webhooks
     *
     * Displays a list of webhooks belonging to the paywall.
     *
     * @param string $id
     *
     * @return BitcoinableWebhookApiCollection
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Paywall Webhooks
     *
     * @apiResourceCollection App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiCollection
     * @apiResourceModel App\Models\BitcoinableWebhook paginate=15
     */
    public function index(string $paywallId)
    {
        $webhooks = $this->bitcoinableWebhookRepository->getBitcoinableWebhooksByModel(
            modelUuid: $paywallId,
            type: BitcoinableWebhookType::PAYWALL->value,
        );

        return new BitcoinableWebhookApiCollection($this->paginate($webhooks));
    }

    /**
     * Create Paywall Webhook
     *
     * Creates a paywall webhook.
     *
     *
     * @return BitcoinableWebhookApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Paywall Webhooks
     *
     * @apiResourceModel App\Models\BitcoinableWebhook
     */
    public function create(string $paywallId, CreateBitcoinableWebhookApiRequest $request)
    {
        $webhook = $this->bitcoinableWebhookRepository->createBitcoinableWebhook(
            url: $request->validated('url'),
            secret: $request->validated('secret'),
            events: $request->validated('events'),
            status: $request->validated('status'),
            type: BitcoinableWebhookType::PAYWALL->value,
            modelUuid: $paywallId,
        );

        return new BitcoinableWebhookApiResource($webhook);
    }

    /**
     * Get Paywall Webhook
     *
     * Displays a paywall webhook's details.
     *
     * @param string $paywallId
     * @param string $webhookId
     *
     * @return BitcoinableWebhookApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Paywall Webhooks
     *
     * @apiResource App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiResource
     * @apiResourceModel App\Models\BitcoinableWebhook
     */
    public function show(string $paywallId, string $webhookId)
    {
        $webhook = $this->bitcoinableWebhookRepository->getBitcoinableWebhookByUuid($webhookId);
        $paywall = $this->paywallRepository->getPaywallByUuid($paywallId);

        $this->validateWebhookOwnership($paywall, $webhook);

        return new BitcoinableWebhookApiResource($webhook);
    }

    /**
     * Update Paywall Webhook
     *
     * Updates a paywall webhook.
     *
     * @param string $paywallId
     * @param string $webhookId
     *
     * @return BitcoinableWebhookApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Paywall Webhooks
     *
     * @apiResource App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiResource
     * @apiResourceModel App\Models\BitcoinableWebhook
     */
    public function update(string $paywallId, string $webhookId, UpdateBitcoinableWebhookApiRequest $request)
    {
        $webhook = $this->bitcoinableWebhookRepository->getBitcoinableWebhookByUuid($webhookId);
        $paywall = $this->paywallRepository->getPaywallByUuid($paywallId);

        $this->validateWebhookOwnership($paywall, $webhook);

        $webhook = $this->bitcoinableWebhookRepository->updateBitcoinableWebhook(
            uuid: $webhookId,
            url: $request->validated('url'),
            events: $request->validated('events'),
            status: $request->validated('status'),
        );

        return new BitcoinableWebhookApiResource($webhook);
    }

    /**
     * Delete Paywall Webhook
     *
     * Deletes a paywall webhook.
     *
     * @param string $paywallId
     * @param string $webhookId
     *
     * @return BitcoinableWebhookApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Paywall Webhooks
     *
     * @apiResource App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiResource
     * @apiResourceModel App\Models\BitcoinableWebhook
     */
    public function delete(string $paywallId, string $webhookId)
    {
        $webhook = $this->bitcoinableWebhookRepository->getBitcoinableWebhookByUuid($webhookId);
        $paywall = $this->paywallRepository->getPaywallByUuid($paywallId);

        $this->validateWebhookOwnership($paywall, $webhook);

        $webhook = $this->bitcoinableWebhookRepository->deleteBitcoinableWebhook($webhookId);
    }
}
