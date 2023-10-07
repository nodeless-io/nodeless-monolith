<?php

namespace App\Http\Controllers\Withdrawal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Withdrawal\UpdateWithdrawalSettingsRequest;
use App\Http\Resources\Withdrawal\WithdrawalSettingsResource;
use App\Repositories\WithdrawalRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WithdrawalSettingsController extends Controller
{
    public function __construct(private WithdrawalRepository $withdrawalRepository)
    {
    }

    public function show(): WithdrawalSettingsResource
    {
        return new WithdrawalSettingsResource(auth()->user());
    }

    public function update(UpdateWithdrawalSettingsRequest $request): WithdrawalSettingsResource|JsonResponse
    {
        try {
            $updatedUser = $this->withdrawalRepository->updateWithdrawalSettings(
                user: auth()->user(),
                onchainAddress: $request->onchain_address,
                lightningAddress: $request->lightning_address,
                defaultWithdrawalType: $request->default_withdrawal_type,
                autoWithdraw: $request->auto_withdraw,
            );

            return new WithdrawalSettingsResource($updatedUser);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }

    }
}
