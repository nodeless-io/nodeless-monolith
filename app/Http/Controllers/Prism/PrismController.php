<?php

namespace App\Http\Controllers\Prism;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Responses\BitcoinableResponse;
use App\Http\Requests\Prism\CreatePrismRequest;
use App\Http\Resources\Prism\PrismCollection;
use App\Http\Resources\Prism\PrismResource;
use App\Models\User;
use App\Repositories\PrismRepository;
use Illuminate\Http\Request;

class PrismController extends Controller
{
    public function __construct(private PrismRepository $prismRepository)
    {
    }

    public function create(CreatePrismRequest $request)
    {
        try {
            $prism = $this->prismRepository->createPrism(
                amount: $request->validated('amount'),
                settings: $request->validated('settings')
            );

            return response()->json(new BitcoinableResponse($prism->user()->first(), $prism));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(string $prismUuid): PrismResource
    {
        $prism = $this->prismRepository->getPrismByUuid($prismUuid);

        return new PrismResource($prism);
    }

    public function index(): PrismCollection
    {
        $prisms = $this->prismRepository->getPrisms();

        return new PrismCollection($this->paginate($prisms));
    }
}
