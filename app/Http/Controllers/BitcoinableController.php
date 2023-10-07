<?php

namespace App\Http\Controllers;

use App\Enums\BitcoinableModelType;
use App\Repositories\DonationRepository;
use App\Repositories\InboxRepository;
use App\Repositories\PaywallRepository;
use App\Repositories\PrismRepository;
use App\Repositories\StoreRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BitcoinableController extends Controller
{
    public function __construct(
        private DonationRepository $donationRepository,
        private StoreRepository $storeRepository,
        private PaywallRepository $paywallRepository,
        private InboxRepository $inboxRepository,
        private PrismRepository $prismRepository,
    ) {
    }

    public function poll(string $bitcoinableType, string $bitcoinableUuid): JsonResponse
    {
        match ($bitcoinableType) {
            'donation' => $bitcoinable = $this->donationRepository->getDonationByUuid($bitcoinableUuid),
            'store_invoice' => $bitcoinable = $this->storeRepository->getStoreInvoice($bitcoinableUuid),
            'paywall_request' => $bitcoinable = $this->paywallRepository->getPaywallRequestByUuid($bitcoinableUuid),
            'inbox_message' => $bitcoinable = $this->inboxRepository->getInboxMessageByUuid($bitcoinableUuid),
            'prism' => $bitcoinable = $this->prismRepository->getPrismByUuid($bitcoinableUuid),
            default => throw new \Exception('Invalid bitcoinable type'),
        };

        try {
            return response()->json([
                'status' => $bitcoinable->pollStatus(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
