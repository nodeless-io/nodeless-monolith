<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Responses\StoreInvoiceResponse;
use App\Models\StoreInvoice;
use App\Repositories\StoreRepository;
use App\Services\StoreService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use UtxoOne\LndPhp\Models\Lightning\Invoice;

class CheckoutController extends Controller
{
    public function __construct(private StoreRepository $storeRepository, private StoreService $storeService)
    {
    }

    public function show(string $invoiceId): JsonResponse
    {
        $invoice = StoreInvoice::where('uuid', $invoiceId)->firstOrFail();

        return response()->json(new StoreInvoiceResponse($invoice));
    }
}
