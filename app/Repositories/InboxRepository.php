<?php

namespace App\Repositories;

use App\Enums\BitcoinableStatus;
use App\Models\GatedMessage;
use App\Models\Inbox;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class InboxRepository
{
    public function createInbox(
        string $username,
        string $email,
        int $price,
        array $settings,
        ?string $nostrNpub = null,
        ?string $nostrHexpub = null,
    ): Inbox {
        if (Inbox::where('username', $username)->exists()) {
            throw new \Exception('Gated email already exists, please try a different username.');
        }

        if (substr($nostrHexpub, -2) === '00') {
            $nostrHexpub = substr($nostrHexpub, 0, -2);
        }

        return auth()->user()->inboxes()->create([
            'username' => strtolower($username),
            'email' => $email,
            'price' => $price,
            'settings' => $settings,
            'nostr_npub' => $nostrNpub,
            'nostr_hexpub' => $nostrHexpub,
        ]);
    }

    public function updateInbox(
        string $inboxUuid,
        string $username,
        string $email,
        int $price,
        array $settings,
        ?string $nostrNpub = null,
        ?string $nostrHexpub = null,
    ): Inbox {
        $inbox = Inbox::where('uuid', $inboxUuid)->firstOrFail();

        if (Inbox::where('username', $username)->whereNot('uuid', $inboxUuid)->exists()) {
            throw new \Exception('Gated email already exists, please try a different username.');
        }

        $inbox->update([
            'username' => $username,
            'email' => $email,
            'price' => $price,
            'settings' => $settings,
            'nostr_npub' => $nostrNpub,
            'nostr_hexpub' => $nostrHexpub,
        ]);

        return $inbox->fresh();
    }

    public function deleteInbox(string $inboxUuid): bool
    {
        return Inbox::where('uuid', $inboxUuid)->delete();
    }

    public function getInboxByUsername(string $username): Inbox
    {
        return Inbox::where('username', $username)->firstOrFail();
    }

    public function getInboxByUuid(string $inboxUuid): Inbox
    {
        return Inbox::where('uuid', $inboxUuid)->firstOrFail();
    }

    public function getInboxesByUserUuid(string $userUuid): Collection
    {
        return User::where('uuid', $userUuid)->firstOrFail()->inboxes()->get();
    }

    public function getInboxMessageByUuid(string $messageUuid): GatedMessage
    {
        return GatedMessage::where('uuid', $messageUuid)->firstOrFail();
    }

    public function getMessagesByInboxUuid(string $inboxUuid): Collection
    {
        return GatedMessage::where('inbox_uuid', $inboxUuid)->get();
    }

    public function getMessage(string $inboxUuid, string $messageUuid): GatedMessage
    {
        $inbox = $this->getInboxByUuid($inboxUuid);

        return $inbox->messages()
            ->where('uuid', $messageUuid)
            ->firstOrFail();
    }

    public function getTotalMessageCount(string $inboxUuid): int
    {
        $inbox = $this->getInboxByUuid($inboxUuid);

        return $inbox->messages()
            ->count();
    }

    public function getTotalMessageRequestCount(string $inboxUuid): int
    {
        $inbox = $this->getInboxByUuid($inboxUuid);

        return $inbox->requests()
            ->count();
    }

    public function getTotalPaidMessageCount(string $inboxUuid): int
    {
        $inbox = $this->getInboxByUuid($inboxUuid);

        return $inbox->messages()
            ->whereIn('status', [
                BitcoinableStatus::PAID,
                BitcoinableStatus::OVERPAID,
                BitcoinableStatus::UNDERPAID,
            ])
            ->count();
    }

    public function getTotalPaidMessageAmount(string $inboxUuid): int
    {
        $inbox = $this->getInboxByUuid($inboxUuid);

        return $inbox->messages()
            ->whereIn('status', [
                BitcoinableStatus::PAID,
                BitcoinableStatus::OVERPAID,
                BitcoinableStatus::UNDERPAID,
            ])
            ->sum('amount');
    }

    public function getTotalUnpaidMessageCount(string $inboxUuid): int
    {
        $inbox = $this->getInboxByUuid($inboxUuid);

        return $inbox->messages()
            ->where('status', BitcoinableStatus::EXPIRED)
            ->count();
    }

    public function getEarningsByInboxByMonth(string $inboxUuid): array
    {
        $inbox = $this->getInboxByUuid($inboxUuid);

        $earnings = GatedMessage::query()
            ->selectRaw('SUM(amount) as amount, MONTH(created_at) as month, YEAR(created_at) as year')
            ->where('inbox_id', $inbox->id)
            ->whereIn('status', [
                BitcoinableStatus::PAID,
                BitcoinableStatus::OVERPAID,
                BitcoinableStatus::UNDERPAID,
            ])
            ->groupBy('month')
            ->groupBy('year')
            ->get()
            ->toArray();

        $earningsByMonth = [];
        foreach ($earnings as $earning) {
            $earningsByMonth[$earning['month'] . '-' . $earning['year']] = $earning['amount'];
        }

        return $earningsByMonth;
    }
}
