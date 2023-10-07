<?php

namespace App\Repositories;

use App\Models\ReferralFee;
use App\Models\User;

class ReferralRepository
{
    public function getTotalReferralCountByUser(User $user): int
    {
        return User::where('referred_by', $user->uuid)->count();
    }

    public function getTotalReferralFeesByUser(User $user): int
    {
        return ReferralFee::where('user_id', $user->id)->sum('amount');
    }
}
