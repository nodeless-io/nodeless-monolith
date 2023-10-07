<?php

namespace App\Http\Controllers\Withdrawal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Withdrawal\Bolt11WithdrawalRequest;
use App\Http\Requests\Withdrawal\LightningAddressWithdrawalRequest;
use App\Http\Resources\Withdrawal\LightningAddressWithdrawalResource;
use App\Http\Resources\Withdrawal\WithdrawalCollection;
use App\Http\Resources\Withdrawal\WithdrawalMetricsResource;
use App\Http\Resources\Withdrawal\WithdrawalResource;
use App\Repositories\WithdrawalRepository;
use App\Services\WithdrawalService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WithdrawalController extends Controller
{
    public function __construct(private WithdrawalService $withdrawalService, private WithdrawalRepository $withdrawalRepository)
    {
    }

    public function index(): WithdrawalCollection
    {
        $withdrawals = $this->withdrawalRepository->getWithdrawalsByUserId(auth()->id());

        return new WithdrawalCollection($this->paginate($withdrawals));
    }

    public function show(string $withdrawalUuid): WithdrawalResource
    {
        $withdrawal = $this->withdrawalRepository->getWithdrawalByUuid($withdrawalUuid);

        return new WithdrawalResource($withdrawal->with('transaction')->get());
    }

    public function metrics(): WithdrawalMetricsResource
    {
        return new WithdrawalMetricsResource(auth()->user());
    }

    public function lightningAddress(LightningAddressWithdrawalRequest $request): LightningAddressWithdrawalResource|JsonResponse
    {
        try {
            $withdrawal = $this->withdrawalService->processLightningAddressWithdrawal(
                user: auth()->user(),
                amount: $request->amount,
            );

            return new LightningAddressWithdrawalResource($withdrawal);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
