<?php

namespace App\Http\Controllers\Paywall;

use App\Enums\BitcoinableStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Paywall\CreatePaywallRequest;
use App\Http\Requests\Paywall\DeletePaywallRequest;
use App\Http\Requests\Paywall\UpdatePaywallRequest;
use App\Http\Resources\Paywall\PaidPaywallResource;
use App\Http\Resources\Paywall\UnpaidPaywallResource;
use App\Repositories\PaywallRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PaywallController extends Controller
{
    public function __construct(private PaywallRepository $paywallRepository)
    {
    }

    public function create(CreatePaywallRequest $request): JsonResponse
    {
        try {
            return response()->json($this->paywallRepository->createPaywall(
                $request->validated('name'),
                $request->validated('type'),
                $request->validated('price'),
                $request->validated('content'),
                $request->validated('settings'),
            ));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function update(UpdatePaywallRequest $request, string $paywallUuid): JsonResponse
    {
        try {
            return response()->json($this->paywallRepository->updatePaywall(
                $paywallUuid,
                $request->validated('name'),
                $request->validated('type'),
                $request->validated('price'),
                $request->validated('content'),
                $request->validated('settings'),
            ));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function delete(DeletePaywallRequest $request, string $paywallUuid): JsonResponse
    {
        try {
            return response()->json($this->paywallRepository->deletePaywall($paywallUuid));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function show(string $paywallUuid): JsonResponse
    {
        try {
            return response()->json($this->paywallRepository->getPaywallByUuid($paywallUuid));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function index(): JsonResponse
    {
        try {
            return response()->json($this->paywallRepository->getPaywallsUserId(auth()->id()));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function unpaid(string $paywallUuid): UnpaidPaywallResource|JsonResponse
    {
        try {
            return new UnpaidPaywallResource($this->paywallRepository->getPaywallByUuid($paywallUuid));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function paid(string $paywallUuid, string $paywallRequestUuid): PaidPaywallResource|JsonResponse
    {
        $paywallRequest = $this->paywallRepository->getPaywallRequestByUuid($paywallRequestUuid);

        if ($paywallRequest->paywall->uuid !== $paywallUuid) {
            return response()->json([
                'error' => 'Paywall request does not belong to paywall',
            ], Response::HTTP_BAD_REQUEST);
        }

        if ($paywallRequest->status != BitcoinableStatus::PAID->value && $paywallRequest->status != BitcoinableStatus::OVERPAID->value) {
            return response()->json([
                'error' => 'Paywall request is not paid. Status: ' . $paywallRequest->status . ', expected: ' . BitcoinableStatus::PAID->value . ' or ' . BitcoinableStatus::OVERPAID->value . '.',
            ], Response::HTTP_PAYMENT_REQUIRED);
        }

        try {
            return new PaidPaywallResource($this->paywallRepository->getPaywallRequestByUuid($paywallRequestUuid));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
