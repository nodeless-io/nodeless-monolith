<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\CreateStoreRequest;
use App\Http\Requests\Store\UpdateStoreRequest;
use App\Repositories\StoreRepository;
use Illuminate\Http\JsonResponse;

class StoreController extends Controller
{
    public function __construct(private StoreRepository $storeRepository)
    {
    }

    public function index(): JsonResponse
    {
        try {
            return response()->json($this->storeRepository->getStoresByUser(auth()->user()));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function create(CreateStoreRequest $request): JsonResponse
    {
        try {
            return response()->json($this->storeRepository->createStore(
                userId: $request->user()->id,
                name: $request->name,
                settings: $request->settings,
                url: $request->url,
                email: $request->email,
            ));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function show(string $uuid): JsonResponse
    {
        try {
            return response()->json($this->storeRepository->getStoreByUuid($uuid));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(string $uuid, UpdateStoreRequest $request): JsonResponse
    {
        try {
            return response()->json($this->storeRepository->updateStore(
                uuid: $uuid,
                data: $request->validated()
            ));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function delete(string $uuid): JsonResponse
    {
        try {
            return response()->json($this->storeRepository->deleteStore($uuid));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
