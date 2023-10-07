<?php

namespace App\Http\Controllers\Donation;

use App\Http\Controllers\Controller;
use App\Http\Resources\DonationPage\DonationPagePublicResource;
use App\Http\Resources\DonationPage\DonationPublicCollection;
use App\Http\Resources\DonationPage\PublicDonationResource;
use App\Repositories\DonationRepository;
use Illuminate\Http\Request;

class DonationPagePublicController extends Controller
{
    public function __construct(private DonationRepository $donationRepository)
    {
    }

    public function show(string $slug)
    {
        $donationPage = $this->donationRepository->getDonationPageBySlug($slug);

        return new DonationPagePublicResource($donationPage);
    }

    public function index(string $slug)
    {
        $donationPageUuid = $this->donationRepository->getDonationPageBySlug($slug)->uuid;

        $donationCollection = $this->donationRepository->getPaidDonationsByDonationPageUuid($donationPageUuid);

        return PublicDonationResource::collection($donationCollection);
    }
}
