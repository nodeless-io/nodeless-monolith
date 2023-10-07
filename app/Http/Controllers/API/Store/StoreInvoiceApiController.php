<?php

namespace App\Http\Controllers\API\Store;

use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\Store\CreateInvoiceRequest;
use App\Http\Resources\API\Store\StoreInvoiceApiResource;
use App\Http\Resources\API\Store\StoreInvoiceResource;
use App\Repositories\StoreRepository;
use App\Services\StoreService;
use Illuminate\Http\JsonResponse;

class StoreInvoiceApiController extends ApiController
{
    public function __construct(private StoreRepository $storeRepository, private StoreService $storeService)
    {
    }

    /**
     * Create Store Invoice
     *
     * @param CreateInvoiceRequest $request
     * @param string $storeId
     * @return StoreInvoiceApiResource|JsonResponse
     *
     * @group Store Invoices
     *
     * @apiResource App\Http\Resources\API\Store\StoreInvoiceApiResource
     * @apiResourceModel App\Models\StoreInvoice
     */
    public function create(CreateInvoiceRequest $request, string $storeId): StoreInvoiceApiResource|JsonResponse
    {
        try {
            $store = $this->storeRepository->getStoreByUuid($storeId);

            $this->validateOwnership($store);
            $satsAmount = $this->storeService->getSatAmount($request->amount, $request->currency);

            if ($satsAmount < config('pricing.store_invoices.min_amount')) {
                return response()->json([
                    'message' => 'Amount must be at least ' . config('pricing.store_invoices.min_amount') . ' sats',
                ], 400);
            }

            if ($satsAmount > config('pricing.store_invoices.max_amount')) {
                return response()->json([
                    'message' => 'Amount must be less than ' . config('pricing.store_invoices.max_amount') . ' sats',
                ], 400);
            }

            $invoice = $this->storeRepository->createStoreInvoice(
                storeUuid: $storeId,
                amount: $satsAmount,
                metadata: $request->metadata,
                buyerEmail: $request->buyerEmail,
                redirectUrl: $request->redirectUrl,
            );

            return new StoreInvoiceApiResource($invoice);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get Store Invoice
     *
     * @param string $storeUuid
     * @param string $invoiceUuid
     * @return StoreInvoiceApiResource|JsonResponse
     *
     * @group Store Invoices
     *
     * @apiResource App\Http\Resources\API\Store\StoreInvoiceApiResource
     * @apiResourceModel App\Models\StoreInvoice
     */
    public function show(string $storeId, string $invoiceId): StoreInvoiceApiResource|JsonResponse
    {
        try {
            $invoice = $this->storeRepository->getStoreInvoice($invoiceId);

            $this->validateOwnership($invoice->store);

            return new StoreInvoiceApiResource($invoice);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get Store Invoice Status
     *
     * @param string $storeId
     * @param string $invoiceId
     * @return void
     *
     * @group Store Invoices
     *
     * @response {
     * "status": "paid",
     * "expires_at": "2023-05-01 15:40:31",
     * "ttl_seconds": 713
     * }
     */
    public function status(string $storeId, string $invoiceId): array|JsonResponse
    {
        try {
            $invoice = $this->storeRepository->getStoreInvoice($invoiceId);

            $this->validateOwnership($invoice->store);

            return (new StoreInvoiceApiResource($invoice))->status();
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
