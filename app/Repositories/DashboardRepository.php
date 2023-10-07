<?php

namespace App\Repositories;

use App\Enums\TransactionType;
use App\Http\Resources\Transaction\TransactionResource;
use App\Models\Transaction;
use App\Models\User;

class DashboardRepository
{
    public function getRevenue(User $user, int $days)
    {
        // get all credit transactions in the last $days for this user
        return Transaction::where('user_id', $user->id)
            ->where('type', TransactionType::CREDIT)
            ->where('created_at', '>=', now()->subDays($days))
            ->sum('amount');
    }

    public function getRevenueByDay(User $user, int $days)
    {
        // get all credit transactions in the last $days for this user
        $transactions = Transaction::where('user_id', $user->id)
            ->where('type', TransactionType::CREDIT)
            ->where('created_at', '>=', now()->subDays($days))
            ->orderBy('created_at', 'desc')
            ->get();

        $revenueByDay = [];

        foreach ($transactions as $transaction) {
            $date = $transaction->created_at->format('Y-m-d');

            if (!isset($revenueByDay[$date])) {
                $revenueByDay[$date] = 0;
            }

            $revenueByDay[$date] += $transaction->amount;
        }

        return $revenueByDay;
    }

    public function getActivity(User $user, ?int $days = 7)
    {
        $transactions = Transaction::query()
            ->where('user_id', $user->id)
            ->where('is_fee', false)
            ->where('created_at', '>=', now()->subDays($days))
            ->orderBy('created_at', 'desc')
            ->limit(21)
            ->get();

        $activities = [];

        foreach ($transactions as $transaction) {
            $activities[] = [
                'text' => $this->formatActivityText($transaction),
                'transaction_data' => new TransactionResource($transaction),
                'created_at' => $transaction->created_at,
            ];
        }

        return $activities;
    }

    public function formatActivityText(Transaction $transaction)
    {
        $addressDomain = config('app.url');
        $addressDomain = preg_replace('#^https?://#', '', $addressDomain);

        $formatedAmount = number_format($transaction->amount, 0, '.', ',');


        match ($transaction->transactable_type) {
            'App\Models\Donation' => $text = $transaction->transactable->name . " Donated " . $formatedAmount . " sats to " . $transaction->transactable->donationPage?->name,
            'App\Models\StoreInvoice' => $text = $transaction->transactable->store?->name . " received " . $formatedAmount . " sats",
            'App\Models\PaywallRequest' => $text = $formatedAmount . " sats were paid to view " . $transaction->transactable->paywall?->name,
            'App\Models\Withdrawal' => $text = $formatedAmount . " sats were withdrawn to " . $transaction->transactable->type,
            'App\Models\LightningAddressPayment' => $text = $formatedAmount . " sats were paid to " . $transaction->transactable->inbox?->username . "@" . $addressDomain,
            'App\Models\GatedMessage' => $text = $transaction->transactable->from . " paid " . $formatedAmount . " sats to send a message to " . $transaction->transactable->to,
            'App\Models\ReferralFee' => $text = $formatedAmount . " sats were paid to " . $transaction->transactable->user->name . " as a referral fee",
            'App\Models\Prism' => ($transaction->type === TransactionType::CREDIT->value) ? $text = $formatedAmount . " sats were paid for a prism." : $text = $formatedAmount . " sats were paid out for a prism",
            default => $text = "Unknown transaction type " . $transaction->transactable_type . " with id " . $transaction->transactable_id,
        };

        return $text;
    }
}
