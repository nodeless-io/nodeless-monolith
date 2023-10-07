<?php

namespace App\Http\Controllers\Donation;

use App\Http\Controllers\Controller;
use App\Http\Requests\Donation\CreateDonationPageRequest;
use App\Http\Resources\DonationPage\DonationPageMetrics;
use App\Repositories\DonationRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class DonationPageController extends Controller
{
    public function __construct(private DonationRepository $donationRepository)
    {
    }

    public function index()
    {
        try {
            return response()->json($this->donationRepository->getDonationPages());
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function show(string $slug)
    {
        try {
            return response()->json($this->donationRepository->getDonationPageBySlug($slug));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(string $uuid, CreateDonationPageRequest $request)
    {
        try {
            $donationPage = $this->donationRepository->getDonationPageByUuid($uuid);

            // Upload image to S3 if exists
            if ($request->hasFile('header_image')) {
                $file = $request->file('header_image');
                $path = $file->store('donation_page/header_images', 's3');
                $url = Storage::disk('s3')->url($path);
            } else {
                $url = null;
            }

            return response()->json($this->donationRepository->updateDonationPage(
                uuid: $donationPage->uuid,
                name: $request->name,
                slug: $request->slug,
                description: $request->description,
                settings: $request->settings,
                headerImage: $url,
            ));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function delete(string $uuid)
    {
        try {
            return response()->json($this->donationRepository->deleteDonationPage($uuid));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function create(CreateDonationPageRequest $request)
    {
        try {
            // Upload image to S3 if exists
            if ($request->hasFile('header_image')) {
                $file = $request->file('header_image');
                $path = $file->store('donation_page/header_images', 's3');
                $url = Storage::disk('s3')->url($path);
            } else {
                $url = null;
            }

            return response()->json($this->donationRepository->createDonationPage(
                user: auth()->user(),
                name: $request->name,
                slug: $request->slug,
                description: $request->description,
                settings: $request->settings,
                headerImage: $url,
            ));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function metrics(string $uuid): DonationPageMetrics|JsonResponse
    {
        try {
            return new DonationPageMetrics($this->donationRepository->getDonationPageMetricsByUuid($uuid));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
