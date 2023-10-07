<?php

namespace Tests\Feature;

use App\Enums\ContestStatus;
use App\Enums\ContestType;
use App\Models\User;
use App\Services\StoreService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

class ContestTest extends TestCase
{
    use RefreshDatabase;
    private User $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /** @group createContest */
    public function testItCanCreateAContest(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->postJson(route('contest.create'), [
                'name' => 'Test Contest',
                'slug' => 'test-contest',
                'type' => ContestType::TWITTER,
                'status' => ContestStatus::ACTIVE,
                'description' => 'Test Description',
                'settings' => [
                    'test' => 'test',
                ],
                'starts_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'ends_at' => Carbon::now()->addDays(7)->format('Y-m-d H:i:s'),
            ]);

        $response->assertStatus(200);

        $contest = $this->user->contests()->first();

        $response->assertJson($contest->toArray());
    }

    /** @group getContest */
    public function testItCanGetAContestBySlug(): void
    {
        $contest = $this->user->contests()->create([
            'name' => 'Test Contest',
            'slug' => 'test-contest',
            'type' => ContestType::TWITTER->value,
            'status' => ContestStatus::ACTIVE->value,
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'starts_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'ends_at' => Carbon::now()->addDays(7)->format('Y-m-d H:i:s'),
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('contest.show', ['contestUuid' => $contest->uuid]));

        $response->assertStatus(200);

        $response->assertJson($contest->toArray());
    }

    /** @group getContests */
    public function testItCanGetAllContests(): void
    {
        $this->user->contests()->create([
            'name' => 'Test Contest',
            'slug' => 'test-contest',
            'type' => ContestType::TWITTER->value,
            'status' => ContestStatus::ACTIVE->value,
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'starts_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'ends_at' => Carbon::now()->addDays(7)->format('Y-m-d H:i:s'),
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('contest.index'));

        $response->assertStatus(200);

        $responseArray = json_decode($response->getContent(), true);
        $this->assertIsArray($responseArray['data']);

        $contests = $this->user->contests()->get();

        $this->assertEquals($contests->toArray(), $responseArray['data']);
    }

    /** @group updateContest */
    public function testItCanUpdateAContest(): void
    {
        $contest = $this->user->contests()->create([
            'name' => 'Test Contest',
            'slug' => 'test-contest',
            'type' => ContestType::TWITTER->value,
            'status' => ContestStatus::ACTIVE->value,
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'starts_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'ends_at' => Carbon::now()->addDays(7)->format('Y-m-d H:i:s'),
        ]);

        $response = $this
            ->actingAs($this->user)
            ->putJson(route('contest.update', ['contestUuid' => $contest->uuid]), [
                'name' => 'Test Contest Updated',
                'slug' => 'test-contest-updated',
                'type' => ContestType::TWITTER,
                'status' => ContestStatus::ACTIVE,
                'description' => 'Test Description Updated',
                'settings' => [
                    'test' => 'test',
                ],
                'starts_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'ends_at' => Carbon::now()->addDays(7)->format('Y-m-d H:i:s'),
            ]);

        $response->assertStatus(200);

        $contest = $this->user->contests()->first();

        $response->assertJson($contest->toArray());
    }

    /** @group deleteContest */
    public function testItCanDeleteAContest(): void
    {
        $contest = $this->user->contests()->create([
            'name' => 'Test Contest',
            'slug' => 'test-contest',
            'type' => ContestType::TWITTER->value,
            'status' => ContestStatus::ACTIVE->value,
            'description' => 'Test Description',
            'settings' => json_encode([
                'test' => 'test',
            ]),
            'starts_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'ends_at' => Carbon::now()->addDays(7)->format('Y-m-d H:i:s'),
        ]);

        $response = $this
            ->actingAs($this->user)
            ->deleteJson(route('contest.delete', ['contestUuid' => $contest->uuid]));

        $response->assertStatus(200);

        $this->assertDatabaseMissing('contests', [
            'uuid' => $contest->uuid,
        ]);
    }
}
