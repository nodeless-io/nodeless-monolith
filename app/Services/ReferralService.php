<?php

namespace App\Services;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\ReferralFee;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class ReferralService
{
    public const REFERRAL_FEE_PERCENTAGE = 0.10;
    public const SALES_FEE_PERCENTAGE = 0.21;

    public function recordReferralFee(Transaction $feeTransaction): void
    {
        if ($feeTransaction->user->referred_by === null) {
            return;
        }

        $salesUsers = config('salesusers');

        if (in_array($feeTransaction->user->referred_by, $salesUsers)) {
            $referralFeeAmount = round($feeTransaction->amount * self::SALES_FEE_PERCENTAGE);
        } else {
            $referralFeeAmount = round($feeTransaction->amount * self::REFERRAL_FEE_PERCENTAGE);
        }

        Log::debug('Referral fee for ' . $feeTransaction->user->referred_by . ' is ' . $referralFeeAmount . ' sats based on ' . $feeTransaction->amount . ' sats');

        $referralFee = ReferralFee::create([
            'user_id' => User::where('uuid', $feeTransaction->user->referred_by)->firstOrFail()->id,
            'referral_id' => $feeTransaction->user->id,
            'amount' => $referralFeeAmount,
            'transaction_id' => $feeTransaction->id,
        ]);

        Log::debug('Recording referral fee for ' . $feeTransaction->user->referred_by);

        $credit = $referralFee->transaction()->create([
            'user_id' => User::where('uuid', $feeTransaction->user->referred_by)->firstOrFail()->id,
            'amount' => $referralFeeAmount,
            'status' => TransactionStatus::SETTLED,
            'type' => TransactionType::CREDIT,
            'is_fee' => false,
        ]);

        Log::debug('Referral fee recorded for ' . $feeTransaction->user->referred_by);
    }
}
