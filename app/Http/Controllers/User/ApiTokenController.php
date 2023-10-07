<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Repositories\ApiTokenRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiTokenController extends Controller
{
    public function __construct(private ApiTokenRepository $apiTokenRepository)
    {
    }

    public function create(Request $request): JsonResponse
    {
        if (!$request->name) {
            $name = str()->rand(10);
        }

        $name = $request->name;

        return response()->json([
            'token' => $this->apiTokenRepository->createApiToken(auth()->user(), $name),
        ]);
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'tokens' => $this->apiTokenRepository->getApiTokens(auth()->user()),
        ]);
    }

    public function delete(Request $request, string $tokenId): JsonResponse
    {
        $this->apiTokenRepository->deleteApiToken(auth()->user(), $tokenId);

        return response()->json([
            'status' => 'Token deleted',
        ]);
    }
}
