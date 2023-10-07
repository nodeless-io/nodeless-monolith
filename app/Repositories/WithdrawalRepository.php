<?php

namespace App\Repositories;

use App\Enums\WithdrawalStatus;
use App\Enums\WithdrawalType;
use App\Models\User;
use App\Models\Withdrawal;
use App\Services\BitcoinAddressValidationService;
use App\Services\LndService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class WithdrawalRepository
{
    public function createWithdrawal(
        int $userId,
        WithdrawalType $type,
        int $amount,
        ?string $onchainAddress = null,
        ?string $lightningAddress = null,
        ?string $lightningInvoice = null,
    ): Withdrawal {
        return Withdrawal::create([
            'user_id' => $userId,
            'type' => $type,
            'amount' => $amount,
            'onchain_address' => $onchainAddress,
            'lightning_address' => $lightningAddress,
            'lightning_invoice' => $lightningInvoice,
            'status' => WithdrawalStatus::PENDING,
        ]);
    }

    public function updateWithdrawal(
        Withdrawal $withdrawal,
        ?string $onchainTx = null,
        ?string $lightningError = null,
        ?string $lightningPreimage = null,
        ?array $lightningRoute = null,
        ?string $lightningHash = null,
        ?WithdrawalStatus $status = WithdrawalStatus::PENDING,
        ?string $completedAt = null,
    ): Withdrawal {
        $withdrawal->update([
            'onchain_tx' => $onchainTx,
            'lightning_error' => $lightningError,
            'lightning_preimage' => $lightningPreimage,
            'lightning_route' => $lightningRoute,
            'lightning_hash' => $lightningHash,
            'status' => $status,
            'completed_at' => $completedAt,
        ]);

        return $withdrawal->fresh();
    }

    public function getWithdrawalByUuid(string $uuid): ?Withdrawal
    {
        return Withdrawal::where('uuid', $uuid)->first();
    }

    public function getWithdrawalsByUserId(int $userId): Collection
    {
        return Withdrawal::where('user_id', $userId)->orderBy('created_at', 'DESC')->with('transaction')->get();
    }

    public function getWithdrawalSatAmountTodayByUserId(int $userId): int
    {
        return Withdrawal::where('user_id', $userId)
            ->where('created_at', '>=', now()->startOfDay())
            ->sum('amount');
    }

    public function getWithdrawalSatAmountLastThirtyDaysByUserId(int $userId): int
    {
        return Withdrawal::where('user_id', $userId)
            ->where('created_at', '>=', now()->subDays(30))
            ->sum('amount');
    }

    public function getWithdrawalSatAmountAllTimeByUserId(int $userId): int
    {
        return Withdrawal::where('user_id', $userId)->sum('amount');
    }

    public function getWithdrawalSatAmountsByMonthByUserId(int $userId): array
    {
        $withdrawals = Withdrawal::selectRaw('SUM(amount) as total_amount, DATE_FORMAT(created_at, "%m-%Y") as month_year')
            ->where('user_id', $userId)
            ->whereRaw('created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)')
            ->groupBy('month_year')
            ->get();

        $withdrawalAmounts = [];

        foreach ($withdrawals as $withdrawal) {
            $withdrawalAmounts[$withdrawal->month_year] = (int)$withdrawal->total_amount;
        }

        return $withdrawalAmounts;
    }

    public function updateWithdrawalSettings(
        User $user,
        string $onchainAddress,
        string $lightningAddress,
        bool $autoWithdraw,
        string $defaultWithdrawalType,
    ): User {
        $bitcoinAddressValidator = new \Kielabokkie\Bitcoin\AddressValidator();

        // if the first three characters are BC1 (uppercase) then transform the address to lowercase
        if (substr($onchainAddress, 0, 3) === 'BC1') {
            $onchainAddress = strtolower($onchainAddress);
        }

        $isValidAddress = $bitcoinAddressValidator->includeTestnet()->isValid($onchainAddress);
        $lnAddressIsOnChain = $bitcoinAddressValidator->includeTestnet()->isValid($lightningAddress);

        if ($lnAddressIsOnChain) {
            throw new \Exception('You cannot enter an on-chain address as your lightning address.');
        }

        if (!$isValidAddress) {
            throw new \Exception('The onchain address is not valid.');
        }

        // if the first four characters of the lightning address is lnbc1, throw exception
        if (substr($lightningAddress, 0, 4) === 'lnbc') {
            throw new \Exception('You entered a lightning invoice. Please enter a lightning address (looks like you@getalby.com).');
        }

        if (config('app.bitcoin_network') === 'MAINNET' && $user->lightning_address !== $lightningAddress) {
            // if email contains "nodeless.io", throw error
            if (strpos($lightningAddress, 'nodeless.io') !== false) {
                return response()->json([
                    'message' => 'You cannot withdraw to a nodeless.io address.',
                ], 422);
            }

            try {
                $lndService = new LndService();
                $lndService->payLightningAddress(1, $lightningAddress);
            } catch (\Exception $e) {
                throw new \Exception($e->getMessage());
            }
        }

        $user->update([
        'onchain_address' => $onchainAddress,
        'lightning_address' => $lightningAddress,
        'auto_withdraw' => $autoWithdraw,
        'default_withdrawal_type' => $defaultWithdrawalType,
        ]);

        return $user->fresh();
    }
}
