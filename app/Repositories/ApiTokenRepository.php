<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class ApiTokenRepository
{
    public function createApiToken(User $user, string $name): string
    {
        return $user->createToken($name)->plainTextToken;
    }

    public function getApiTokens(User $user): Collection
    {
        return $user->tokens;
    }

    public function deleteApiToken(User $user, string $tokenId): void
    {
        $user->tokens()->where('id', $tokenId)->delete();
    }
}
