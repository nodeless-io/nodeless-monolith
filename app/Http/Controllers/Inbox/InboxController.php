<?php

namespace App\Http\Controllers\Inbox;

use App\Http\Controllers\Controller;
use App\Http\Requests\Inbox\CreateInboxRequest;
use App\Http\Requests\Inbox\DeleteInboxRequest;
use App\Http\Requests\Inbox\UpdateInboxRequest;
use App\Http\Resources\Inbox\InboxMetrics;
use App\Repositories\InboxRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InboxController extends Controller
{
    public function __construct(private InboxRepository $inboxRepository)
    {
    }

    public function index(Request $request): JsonResponse
    {
        try {
            return response()->json($this->inboxRepository->getInboxesByUserUuid(auth()->user()->uuid));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function show(Request $request, string $inboxUuid): JsonResponse
    {
        $inbox = $this->inboxRepository->getInboxByUuid($inboxUuid);
        $this->validateOwnership($inbox);

        try {
            return response()->json($this->inboxRepository->getInboxByUuid($inboxUuid));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function create(CreateInboxRequest $request): JsonResponse
    {
        try {
            return response()->json($this->inboxRepository->createInbox(
                $request->username,
                $request->email,
                $request->price,
                $request->settings,
                $request->nostr_npub,
                $request->nostr_hexpub,
            ));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function update(UpdateInboxRequest $request, string $inboxUuid): JsonResponse
    {
        try {
            return response()->json($this->inboxRepository->updateInbox(
                $inboxUuid,
                $request->username,
                $request->email,
                $request->price,
                $request->settings,
                $request->nostr_npub,
                $request->nostr_hexpub,
            ));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function delete(DeleteInboxRequest $request, string $inboxUuid): JsonResponse
    {
        try {
            return response()->json($this->inboxRepository->deleteInbox($inboxUuid));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function metrics(string $inboxUuid): InboxMetrics
    {
        $inbox = $this->inboxRepository->getInboxByUuid($inboxUuid);
        $this->validateOwnership($inbox);

        try {
            return new InboxMetrics($inbox);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
}
