<?php

namespace App\Http\Controllers\API\Prism;

use App\Http\Controllers\Controller;
use App\Http\Requests\Prism\CreatePrismRequest;
use App\Http\Resources\API\Prism\PrismApiCollection;
use App\Http\Resources\API\Prism\PrismApiResource;
use App\Repositories\PrismRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PrismApiController extends Controller
{
    public function __construct(private PrismRepository $prismRepository)
    {
    }

    public function create(CreatePrismRequest $request): PrismApiResource|JsonResponse
    {
        try {
            $prism = $this->prismRepository->createPrism(
                amount: $request->validated('amount'),
                settings: $request->validated('settings')
            );

            return new PrismApiResource($prism);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function index(): PrismApiCollection
    {
        $prisms = $this->prismRepository->getPrisms();

        return new PrismApiCollection($this->paginate($prisms));
    }

    public function show(string $prismUuid): PrismApiResource
    {
        $prism = $this->prismRepository->getPrismByUuid($prismUuid);

        return new PrismApiResource($prism);
    }
}
