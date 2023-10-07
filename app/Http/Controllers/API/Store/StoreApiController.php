<?php

namespace App\Http\Controllers\API\Store;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookApiCollection;
use App\Http\Resources\API\Store\StoreApiCollection;
use App\Http\Resources\API\Store\StoreApiResource;
use App\Repositories\BitcoinableWebhookRepository;
use App\Repositories\StoreRepository;

class StoreApiController extends Controller
{
    public function __construct(
        private StoreRepository $storeRepository,
        private BitcoinableWebhookRepository $bitcoinableWebhookRepository
    ) {
    }

    /**
     * Get Store
     *
     * Displays a store's details.
     *
     * @param string $id
     * @return StoreApiResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Stores
     *
     * @apiResource App\Http\Resources\API\Store\StoreApiResource
     * @apiResourceModel App\Models\Store
     */
    public function show(string $id)
    {
        $store = $this->storeRepository->getStoreByUuid($id);

        return new StoreApiResource($store);
    }

    /**
     * Get Stores
     *
     * Displays a list of stores belonging to the authenticated user.
     *
     * @return StoreApiCollection
     *
     * @group Stores
     *
     * @apiResourceCollection App\Http\Resources\API\Store\StoreApiCollection
     * @apiResourceModel App\Models\Store paginate=15
     */
    public function index(): StoreApiCollection
    {
        $stores = $this->storeRepository->getStoresByUser(auth()->user());

        return new StoreApiCollection($this->paginate($stores));
    }
}
