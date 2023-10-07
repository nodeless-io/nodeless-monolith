<?php

namespace App\Http\Controllers\API\Paywall;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Paywall\CreatePaywallRequestApiRequest;
use App\Http\Resources\API\Paywall\PaywallRequestApiResource;
use App\Repositories\PaywallRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaywallRequestApiController extends Controller
{
    public function __construct(private PaywallRepository $paywallRepository)
    {
    }

    /**
     * Create a Paywall Request
     *
     * @param CreatePaywallRequestApiRequest $request
     * @param string $paywallId
     * @return PaywallRequestApiResource|JsonResponse
     *
     * @group Paywall Requests
     *
     * @apiResource App\Http\Resources\API\Paywall\PaywallRequestApiResource
     * @apiResourceModel App\Models\PaywallRequest
     */
    public function create(CreatePaywallRequestApiRequest $request, string $paywallId): PaywallRequestApiResource|JsonResponse
    {
        try {
            $paywall = $this->paywallRepository->getPaywallByUuid($paywallId);

            $paywallRequest = $this->paywallRepository->createPaywallRequest(
                paywallUuid: $paywallId,
                amount: $paywall->price,
                metadata: $request->metadata,
            );

            return (new PaywallRequestApiResource($paywallRequest))->response()->setStatusCode(201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get a Paywall Request
     *
     * @param Request $request
     * @param string $paywallId
     * @param string $paywallRequestId
     * @return PaywallRequestApiResource|JsonResponse
     *
     * @group Paywall Requests
     *
     * @apiResource App\Http\Resources\API\Paywall\PaywallRequestApiResource
     * @apiResourceModel App\Models\PaywallRequest
     */
    public function show(string $paywallId, string $paywallRequestId): PaywallRequestApiResource|JsonResponse
    {
        try {
            $paywallRequest = $this->paywallRepository->getPaywallRequestByUuid($paywallRequestId);

            $this->validateOwnership($paywallRequest);

            return new PaywallRequestApiResource($paywallRequest);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get Paywall Request Status
     *
     * @param string $paywallId
     * @param string $paywallRequestId
     *
     * @return JsonResponse
     *
     * @group Paywall Requests
     */
    public function status(string $paywallId, string $paywallRequestId): JsonResponse
    {
        try {
            $paywallRequest = $this->paywallRepository->getPaywallRequestByUuid($paywallRequestId);

            $this->validateOwnership($paywallRequest);

            return response()->json([
                'status' => $paywallRequest->pollStatus(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
