<?php

namespace App\Http\Controllers\Donation;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Responses\BitcoinableResponse;
use App\Http\Requests\Donation\CreateDonationRequest;
use App\Http\Resources\DonationPage\DonationCollection;
use App\Http\Resources\DonationPage\DonationResource;
use App\Repositories\DonationRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;

class DonationController extends Controller
{
    use RefreshDatabase;

    public function __construct(
        private DonationRepository $donationRepository
    ) {
    }

    public function create(string $donationPageSlug, CreateDonationRequest $request): JsonResponse
    {
        try {
            $donationPage = $this->donationRepository->getDonationPageBySlug($donationPageSlug);

            $donation = $this->donationRepository->createDonation(
                donationPage: $donationPage,
                name: $request->name,
                amount: $request->amount,
                message: $request->message,
            );

            return response()->json(new BitcoinableResponse($donationPage, $donation));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function status(string $donationUuid): JsonResponse
    {
        try {
            $donation = $this->donationRepository->getDonationByUuid($donationUuid);

            return response()->json(['status' => $donation->pollStatus()]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function show(string $donationPageUuid, string $donationUuid): DonationResource|JsonResponse
    {
        try {
            $donation = $this->donationRepository->getDonationByUuid($donationUuid);

            return new DonationResource($donation);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function index(string $donationPageUuid): DonationCollection|JsonResponse
    {
        try {
            $donationPage = $this->donationRepository->getDonationPageByUuid($donationPageUuid);

            return new DonationCollection($donationPage->donations);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function paidIndex(string $donationPageUuid): DonationCollection|JsonResponse
    {
        try {
            return new DonationCollection($this->donationRepository->getPaidDonationsByDonationPageUuid($donationPageUuid));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
