<?php

namespace App\Http\Controllers\API\Paywall;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Paywall\CreatePaywallApiRequest;
use App\Http\Requests\API\Paywall\DeletePaywallApiRequest;
use App\Http\Requests\API\Paywall\UpdatePaywallApiRequest;
use App\Http\Resources\API\Paywall\PaywallApiCollection;
use App\Http\Resources\API\Paywall\PaywallApiResource;
use App\Repositories\PaywallRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaywallApiController extends Controller
{
    public function __construct(private PaywallRepository $paywallRepository)
    {
    }

    /**
     * Get Paywalls
     *
     * Displays a list of paywalls belonging to the authenticated user.
     *
     * @return PaywallApiCollection
     *
     * @group Paywalls
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @apiResourceCollection App\Http\Resources\API\Paywall\PaywallApiCollection
     * @apiResourceModel App\Models\Paywall paginate=15
     */
    public function index(): PaywallApiCollection|JsonResponse
    {
        try {
            return new PaywallApiCollection($this->paywallRepository->getPaywallsUserId(auth()->user()->id));
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Get Paywall
     *
     * Displays a paywall's details.
     *
     * @param string $paywallId
     * @return PaywallApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Paywalls
     *
     * @apiResourceModel App\Models\Paywall
     */
    public function show(string $paywallId): PaywallApiResource|JsonResponse
    {
        try {
            return new PaywallApiResource($this->paywallRepository->getPaywallByUuid($paywallId));
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Create Paywall
     *
     * Creates a new paywall.
     *
     * @param Request $request
     * @return PaywallApiResource
     *
     * @group Paywalls
     *
     * @apiResourceModel App\Models\Paywall
     */
    public function create(CreatePaywallApiRequest $request): PaywallApiResource|JsonResponse
    {
        try {
            $paywall = $this->paywallRepository->createPaywall(
                name: $request->name,
                type: $request->type,
                price: $request->price,
                settings: $request->settings,
            );

            return (new PaywallApiResource($paywall))->response()->setStatusCode(201);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * Update Paywall
     *
     * Updates a paywall.
     *
     * @param Request $request
     * @param string $paywallId
     * @return PaywallApiResource
     *
     * @group Paywalls
     *
     * @apiResourceModel App\Models\Paywall
     */
    public function update(UpdatePaywallApiRequest $request, string $paywallId): PaywallApiResource|JsonResponse
    {
        try {
            $paywall = $this->paywallRepository->updatePaywall(
                paywallUuid: $paywallId,
                name: $request->name,
                type: $request->type,
                price: $request->price,
                settings: $request->settings,
            );

            return new PaywallApiResource($paywall);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete Paywall
     *
     * Deletes a paywall.
     *
     * @param string $paywallId
     * @return JsonResponse
     *
     * @group Paywalls
     *
     * @apiResourceModel App\Models\Paywall
     */
    public function delete(DeletePaywallApiRequest $request, string $paywallId): JsonResponse
    {
        try {
            $this->paywallRepository->deletePaywall($paywallId);

            return response()->json(['message' => 'Paywall deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
