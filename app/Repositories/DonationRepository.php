<?php

namespace App\Repositories;

use App\Enums\BitcoinableStatus;
use App\Models\Donation;
use App\Models\DonationPage;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class DonationRepository
{
    public function createDonationPage(
        User $user,
        string $name,
        string $slug,
        string $description,
        array $settings,
        ?string $headerImage = null,
        ?string $status = 'active',
    ): DonationPage {
        // Make sure the slug doesn't already exist.
        $slug = str()->slug($slug);

        if (DonationPage::where('slug', $slug)->exists()) {
            throw new \Exception('The slug already exists.');
        }

        return auth()->user()->donationPages()->create([
            'name' => $name,
            'slug' => $slug,
            'description' => $description,
            'header_image' => $headerImage,
            'settings' => json_encode($settings),
            'status' => $status,
        ]);
    }

    public function getDonationPages(): LengthAwarePaginator
    {
        return auth()->user()->donationPages()->paginate();
    }

    public function getDonationPageByUuid(string $uuid): DonationPage
    {
        return DonationPage::where('uuid', $uuid)->firstOrFail();
    }

    public function getDonationPageBySlug(string $slug): DonationPage
    {
        return DonationPage::where('slug', $slug)->firstOrFail();
    }

    public function updateDonationPage(string $uuid, string $name, string $slug, string $description, array $settings, ?string $headerImage = null): DonationPage
    {
        $donationPage = DonationPage::where('uuid', $uuid)->firstOrFail();

        if (DonationPage::where('slug', $slug)->where('uuid', '!=', $donationPage->uuid)->exists()) {
            throw new \Exception('The slug already exists.');
        }

        $donationPage->update([
            'name' => $name,
            'slug' => $slug,
            'description' => $description,
            'settings' => $settings,
            // if headerImage is provided, update it, otherwise keep the old one
            'header_image' => ($headerImage !== null) ? $headerImage : $donationPage->header_image,
        ]);

        return $donationPage->fresh();
    }

    public function deleteDonationPage(string $uuid): void
    {
        $donationPage = DonationPage::where('uuid', $uuid)->firstOrFail();

        $donationPage->delete();
    }

    public function createDonation(
        DonationPage $donationPage,
        int $amount,
        ?string $name = 'anonymous',
        ?string $message = null
    ): Donation {
        return $donationPage->donations()->create([
            'name' => ($name === null) ? 'anonymous' : $name,
            'amount' => $amount,
            'message' => $message,
        ]);
    }

    public function getDonationByUuid(string $uuid): Donation
    {
        return Donation::where('uuid', $uuid)->firstOrFail();
    }

    public function getDonationPageMetricsByUuid(string $uuid): array
    {
        $donationPage = $this->getDonationPageByUuid($uuid);

        return [
            'donation_amount_today' => $donationPage
                ->donations()
                ->whereIn('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                ->whereDate('created_at', now()
                ->format('Y-m-d'))
                ->sum('amount'),
            'donation_count' => $donationPage
                ->donations()
                ->whereIn('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                ->count(),
            'total_donation_amount' => $donationPage
                ->donations()
                ->whereIn('status', [BitcoinableStatus::PAID, BitcoinableStatus::OVERPAID])
                ->sum('amount'),
        ];
    }

    public function getDonationsByDonationPageUuid(string $uuid): Collection
    {
        $donationPage = $this->getDonationPageByUuid($uuid);

        return $donationPage->donations()->orderBy('created_at', 'desc')->get();
    }

    public function getPaidDonationsByDonationPageUuid(string $uuid): Collection
    {
        $donationPage = $this->getDonationPageByUuid($uuid);

        return $donationPage->donations()->whereIn('status', ['paid', 'overpaid', 'underpaid'])->orderBy('created_at', 'desc')->get();
    }
}
