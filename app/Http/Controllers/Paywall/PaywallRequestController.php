<?php

namespace App\Http\Controllers\Paywall;

use App\Enums\BitcoinableNetworkType;
use App\Enums\BitcoinableStatus;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Responses\BitcoinableResponse;
use App\Http\Requests\Paywall\CreatePaywallRequestRequest;
use App\Http\Resources\Paywall\PaywallRequestResource;
use App\Repositories\PaywallRepository;
use Illuminate\Http\Request;

class PaywallRequestController extends Controller
{
    public function __construct(private PaywallRepository $paywallRepository)
    {
    }

    public function create(CreatePaywallRequestRequest $request, string $paywallUuid)
    {
        $paywall = $this->paywallRepository->getPaywallByUuid($paywallUuid);
        try {
            $paywallRequest = $this->paywallRepository->createPaywallRequest(
                paywallUuid: $paywallUuid,
                amount: $paywall->price,
                type: BitcoinableNetworkType::LIGHTNING,
                status: BitcoinableStatus::NEW,
            );

            return response()->json(new BitcoinableResponse($paywallRequest->paywall, $paywallRequest));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function index(string $paywallUuid): PaywallRequestResource
    {
        $paywall = $this->paywallRepository->getPaywallByUuid($paywallUuid);
        $paywallRequests = $this->paywallRepository->getPaywallRequestsByPaywallUuid($paywallUuid);

        return new PaywallRequestResource($paywallRequests);
    }

    public function show(string $paywallUuid, string $requestUuid): PaywallRequestResource
    {
        $paywall = $this->paywallRepository->getPaywallByUuid($paywallUuid);
        $paywallRequest = $this->paywallRepository->getPaywallRequestByUuid($requestUuid);

        return new PaywallRequestResource($paywallRequest);
    }

    public function globalIndex(): PaywallRequestResource
    {
        $paywallRequests = $this->paywallRepository->getAllPaywallRequestsByUserUuid(auth()->user()->uuid);

        return new PaywallRequestResource($paywallRequests);
    }

    public function byUuid(string $uuid): PaywallRequestResource
    {
        $paywallRequest = $this->paywallRepository->getPaywallRequestByUuid($uuid);

        return new PaywallRequestResource($paywallRequest);
    }
}
