<?php

namespace App\Http\Controllers\Contest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contest\CreateContestRequest;
use App\Http\Requests\Contest\DeleteContestRequest;
use App\Http\Requests\Contest\UpdateContestRequest;
use App\Repositories\ContestRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ContestController extends Controller
{
    public function __construct(private ContestRepository $contestRepository)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json($this->contestRepository->getContestsByUserUuid(auth()->user()->uuid));
    }

    public function create(CreateContestRequest $request): JsonResponse
    {
        try {
            return response()->json($this->contestRepository->createContest(
                $request->name,
                $request->slug,
                $request->type,
                $request->status,
                $request->description,
                $request->settings,
                $request->starts_at,
                $request->ends_at,
            ));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function update(UpdateContestRequest $request, string $contestUuid): JsonResponse
    {
        try {
            return response()->json($this->contestRepository->updateContest(
                $contestUuid,
                $request->name,
                $request->slug,
                $request->type,
                $request->status,
                $request->description,
                $request->settings,
                $request->starts_at,
                $request->ends_at,
            ));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function show(string $contestUuid): JsonResponse
    {
        try {
            return response()->json($this->contestRepository->getContestByUuid($contestUuid));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function delete(DeleteContestRequest $request, string $contestUuid): JsonResponse
    {
        try {
            $this->contestRepository->deleteContest($contestUuid);

            return response()->json(['message' => 'Contest deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
