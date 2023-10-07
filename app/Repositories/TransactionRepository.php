<?php

namespace App\Repositories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Collection;

class TransactionRepository
{
    public function getTransactionsByUserId(int $userId, ?bool $isFee = false): Collection
    {
        $query = Transaction::where('user_id', $userId)->orderBy('created_at', 'desc');

        if (!$isFee) {
            $query->where('is_fee', false);
        }

        return $query->with('transactable')->get();
    }

    public function getTransactionByUuid(string $uuid): ?Transaction
    {
        return Transaction::where('uuid', $uuid)->firstOrFail();
    }

    public function getTransactionById(int $id): ?Transaction
    {
        return Transaction::where('id', $id)->firstOrFail();
    }

    public function getTransactionsByUserIdAndDateRange(
        int $userId,
        string $startDate,
        string $endDate,
        ?bool $isFee = false
    ): Collection {
        $query = Transaction::where('user_id', $userId)
            ->whereBetween('created_at', [$startDate, $endDate]);

        if (!$isFee) {
            $query->where('is_fee', false);
        }

        return $query->get();
    }

    public function getWithdrawalTransactionsByUserId(int $userId): Collection
    {
        return Transaction::where('user_id', $userId)
            ->where('transactable_type', 'App\Models\Withdrawal')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getStoreInvoiceTransactionsByUserId(int $userId): Collection
    {
        return Transaction::where('user_id', $userId)
            ->where('transactable_type', 'App\Models\StoreInvoice')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getDonationTransactionsByUserId(int $userId): Collection
    {
        return Transaction::where('user_id', $userId)
            ->where('transactable_type', 'App\Models\Donation')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getPaywallTransactionsByUserId(int $userId): Collection
    {
        return Transaction::where('user_id', $userId)
            ->where('transactable_type', 'App\Models\PaywallRequest')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getGatedMessageTransactionsByUserId(int $userId): Collection
    {
        return Transaction::where('user_id', $userId)
            ->where('transactable_type', 'App\Models\GatedMessage')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getReferralFeeTransactionsByUserId(int $userId): Collection
    {
        return Transaction::where('user_id', $userId)
            ->where('transactable_type', 'App\Models\ReferralFee')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getLightningAddressPaymentTransactionsByUserId(int $userId): Collection
    {
        return Transaction::where('user_id', $userId)
            ->where('transactable_type', 'App\Models\LightningAddressPayment')
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
