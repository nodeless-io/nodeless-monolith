<?php

namespace App\Repositories;

use App\Http\Requests\Contest\CreateContestRequest;
use App\Models\Contest;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ContestRepository
{
    // create a repository file with createContest, updateContest, deleteContest, getContestBySlug, getContestByUuid

    public function createContest(
        string $name,
        string $slug,
        string $type,
        string $status,
        string $description,
        array $settings,
        string $startsAt,
        string $endsAt,
    ): Contest {
        if (Contest::where('slug', $slug)->exists()) {
            throw new \Exception('Contest slug already exists');
        }

        return auth()->user()->contests()->create([
            'name' => $name,
            'slug' => $slug,
            'type' => $type,
            'status' => $status,
            'description' => $description,
            'settings' => $settings,
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
            'ended_at' => null,
        ]);
    }

    public function updateContest(
        string $contestUuid,
        string $name,
        string $slug,
        string $type,
        string $status,
        string $description,
        array $settings,
        string $startsAt,
        string $endsAt,
    ): Contest {
        $contest = Contest::where('uuid', $contestUuid)->firstOrFail();

        if (Contest::where('slug', $slug)->whereNot('uuid', $contestUuid)->exists()) {
            throw new \Exception('Contest slug already exists');
        }

        $contest->update([
            'name' => $name,
            'slug' => $slug,
            'type' => $type,
            'status' => $status,
            'description' => $description,
            'settings' => $settings,
            'starts_at' => $startsAt,
            'ends_at' => $endsAt,
        ]);

        return $contest->fresh();
    }

    public function deleteContest(string $contestUuid): bool
    {
        return Contest::where('uuid', $contestUuid)->delete();
    }

    public function getContestBySlug(string $slug): Contest
    {
        return Contest::where('slug', $slug)->firstOrFail();
    }

    public function getContestByUuid(string $contestUuid): Contest
    {
        return Contest::where('uuid', $contestUuid)->firstOrFail();
    }

    public function getContestsByUserUuid(string $userUuid): LengthAwarePaginator
    {
        return User::where('uuid', $userUuid)->firstOrFail()->contests()->paginate(15);
    }
}
