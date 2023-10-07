<?php

namespace App\Http\Controllers\BitcoinableWebhook;

use App\Http\Controllers\Controller;
use App\Http\Requests\BitcoinableWebhook\CreateBitcoinableWebhookRequest;
use App\Http\Requests\BitcoinableWebhook\UpdateBitcoinableWebhookRequest;
use App\Repositories\BitcoinableWebhookRepository;
use Illuminate\Http\JsonResponse;

class BitcoinableWebhookController extends Controller
{
    public function __construct(
        private BitcoinableWebhookRepository $bitcoinableWebhookRepository,
    ) {
    }

    public function index(): JsonResponse
    {
        try {
            return response()->json(
                $this->bitcoinableWebhookRepository->getBitcoinableWebhooksByUserUuid(auth()->user()->uuid)
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function create(CreateBitcoinableWebhookRequest $request): JsonResponse
    {
        try {
            return response()->json($this->bitcoinableWebhookRepository->createBitcoinableWebhook(
                url: $request->url,
                secret: $request->secret,
                events: $request->events,
                status: $request->status,
                type: $request->type,
                modelUuid: $request->uuid,
            ));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function indexByType(string $type): JsonResponse
    {
        try {
            return response()->json(
                $this->bitcoinableWebhookRepository->getBitcoinableWebhooksByUserUuidAndType(auth()->user()->uuid, $type)
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function indexByModel(string $type, string $webhookUuid): JsonResponse
    {
        try {
            return response()->json(
                $this->bitcoinableWebhookRepository->getBitcoinableWebhooksByModel(
                    $type,
                    $webhookUuid,
                )
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function show(string $webhookUuid): JsonResponse
    {
        try {
            return response()->json(
                $this->bitcoinableWebhookRepository->getBitcoinableWebhookByUuidForApi($webhookUuid)
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(UpdateBitcoinableWebhookRequest $request, string $webhookUuid): JsonResponse
    {
        try {
            return response()->json(
                $this->bitcoinableWebhookRepository->updateBitcoinableWebhook(
                    uuid: $webhookUuid,
                    url: $request->url,
                    events: $request->events,
                    status: $request->status,
                )
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function delete(string $webhookUuid): JsonResponse
    {
        try {
            return response()->json(
                $this->bitcoinableWebhookRepository->deleteBitcoinableWebhook($webhookUuid)
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
