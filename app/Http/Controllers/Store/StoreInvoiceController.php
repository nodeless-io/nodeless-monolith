<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Responses\StoreInvoiceResponse;
use App\Http\Requests\API\CreateInvoiceRequest;
use App\Http\Requests\Store\CreateStoreInvoiceRequest;
use App\Models\StoreInvoice;
use App\Repositories\StoreRepository;
use App\Services\StoreService;
use Illuminate\Http\JsonResponse;

class StoreInvoiceController extends Controller
{
    public function __construct(private StoreService $storeService, private StoreRepository $storeRepository)
    {
    }

    public function index(string $storeUuid): JsonResponse
    {
        return response()->json(
            $this->storeRepository->getStoreInvoices($storeUuid)
        );
    }

    public function create(CreateStoreInvoiceRequest $request, string $storeUuid): JsonResponse
    {
        try {
            $store = auth()->user()->stores()->where('uuid', $storeUuid)->firstOrFail();

            $satsAmount = $this->storeService->getSatAmount($request->amount, $request->currency);

            if ($satsAmount < 1000) {
                throw new \Exception('Minimum amount is 1000 sats');
            }

            if ($satsAmount > 10000000) {
                throw new \Exception('Maximum amount is 10000000 sats');
            }

            $invoice = $this->storeRepository->createStoreInvoice(
                storeUuid: $store->uuid,
                amount: $satsAmount,
                metadata: $request->metadata,
                buyerEmail: $request->buyer_email,
                redirectUrl: $request->redirect_url,
            );

            return response()->json(new StoreInvoiceResponse($invoice));
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function show(string $storeUuid, string $invoiceUuid): JsonResponse
    {
        try {
            $store = auth()->user()->stores()->where('uuid', $storeUuid)->firstOrFail();
            $invoice = $store->storeInvoices()->where('uuid', $invoiceUuid)->firstOrFail();

            // If this invoice doesn't belong to the user, throw an exception
            if ($invoice->store->user_id !== auth()->user()->id) {
                throw new \Exception('Invoice not found');
            }

            return response()->json(new StoreInvoiceResponse($invoice));
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function status(string $invoiceUuid): JsonResponse
    {
        try {
            $invoice = StoreInvoice::where('uuid', $invoiceUuid)->firstOrFail();

            return response()->json([
                'status' => $invoice->pollStatus(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function getInvoiceByUuid(string $invoiceUuid): JsonResponse
    {
        try {
            $invoice = auth()->user()->store_invoices()->where('store_invoices.uuid', $invoiceUuid)->firstOrFail();

            return response()->json(new StoreInvoiceResponse($invoice));
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
