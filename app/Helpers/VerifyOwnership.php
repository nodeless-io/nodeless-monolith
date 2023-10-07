<?php

namespace App\Helpers;

use App\Models\Transaction;
use App\Models\User;

class VerifyOwnership
{
    public function __construct(public Transaction $transaction, public User $user)
    {
    }

    public function verify(): bool
    {
        if ($this->transaction->user_id === $this->user->id) {
            return true;
        }

        throw new \Exception('You do not own this transaction');
    }
}
