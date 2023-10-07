<?php

namespace Tests\Feature;

use App\Enums\ContestStatus;
use App\Enums\ContestType;
use App\Models\User;
use App\Services\StoreService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\TestCase;

class InboxTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /** @group createInbox */
    public function testItCanCreateAnInbox(): void
    {
        $response = $this
            ->actingAs($this->user)
            ->postJson(route('inbox.create'), [
                'username' => 'test',
                'email' => 'test@test.com',
                'price' => 1000,
                'settings' => [
                    'body' => 'test',
                    'subject' => 'test',
                ],
                'nostr_npub' => 'test',
                'nostr_hexpub' => 'test',
            ]);

        $response->assertStatus(200);

        $inbox = $this->user->inboxes()->first();

        $this->assertDatabaseHas('inboxes', [
            'uuid' => $inbox->uuid,
            'username' => 'test',
        ]);
    }

    /** @group getInbox */
    public function testItCanGetAnInboxByUuid(): void
    {
        $inbox = $this->user->inboxes()->create([
            'username' => 'test',
            'email' => 'test@test.com',
            'price' => 1000,
            'settings' => [
                'body' => 'test',
                'subject' => 'test',
            ],
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('inbox.show', ['inboxUuid' => $inbox->uuid]));

        $response->assertStatus(200);

        $inbox = $this->user->inboxes()->first();

        $response->assertJson($inbox->toArray());
    }

    /** @group getInboxes */
    public function testItCanGetAllInboxes(): void
    {
        $inbox1 = $this->user->inboxes()->create([
            'username' => 'test',
            'email' => 'test@test.com',
            'price' => 1000,
            'settings' => [
                'body' => 'test',
                'subject' => 'test',
            ],
        ]);

        $inbox2 = $this->user->inboxes()->create([
            'username' => 'test1',
            'email' => 'test@test.com',
            'price' => 1000,
            'settings' => [
                'body' => 'test',
                'subject' => 'test',
            ],
        ]);

        $response = $this
            ->actingAs($this->user)
            ->getJson(route('inbox.index'));

        $response->assertStatus(200);

        $response->assertJson([
            $inbox1->toArray(),
            $inbox2->toArray(),
        ]);

        $response->assertJsonCount(2);
    }

    /** @group updateInbox */
    public function testItCanUpdateAnInbox(): void
    {
        $inbox = $this->user->inboxes()->create([
            'username' => 'test1',
            'email' => 'test@test.com',
            'price' => 1000,
            'settings' => [
                'body' => 'test',
                'subject' => 'test',
            ],
        ]);

        $response = $this
            ->actingAs($this->user)
            ->putJson(route('inbox.update', ['inboxUuid' => $inbox->uuid]), [
                'username' => 'test',
                'email' => 'test2@test2.com',
                'price' => 1000,
                'settings' => [
                    'body' => 'test2',
                    'subject' => 'test2',
                ],
            ]);

        $response->assertStatus(200);

        $inbox = $this->user->inboxes()->first();

        $response->assertJson($inbox->toArray());
    }

    /** @group deleteInbox */
    public function testItCanDeleteAnInbox(): void
    {
        $inbox = $this->user->inboxes()->create([
            'username' => 'test1',
            'email' => 'test@test.com',
            'price' => 1000,
            'settings' => [
                'body' => 'test',
                'subject' => 'test',
            ],
        ]);

        $response = $this
            ->actingAs($this->user)
            ->deleteJson(route('inbox.delete', ['inboxUuid' => $inbox->uuid]));

        $response->assertStatus(200);

        $this->assertSoftDeleted('inboxes', [
            'uuid' => $inbox->uuid,
        ]);
    }
}
