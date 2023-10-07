<?php

namespace App\Http\Controllers\Inbox;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Responses\BitcoinableResponse;
use App\Http\Resources\Inbox\MessageCollection;
use App\Http\Resources\Inbox\MessageResource;
use App\Models\GatedMessageRequest;
use App\Repositories\InboxRepository;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct(private InboxRepository $inboxRepository)
    {
    }

    public function show(string $requestUuid)
    {
        $messageRequest = GatedMessageRequest::where('uuid', $requestUuid)->firstOrFail();

        $message = $messageRequest->message()->first();

        if (!$message) {
            $message = $messageRequest->message()->create([
                'body' => $messageRequest->body,
                'from' => $messageRequest->from,
                'to' => $messageRequest->to,
                'subject' => $messageRequest->subject,
                'inbox_id' => $messageRequest->inbox_id,
                'amount' => $messageRequest->inbox->price,
            ]);

            $message = $message->with('bitcoin_address', 'lightning_invoice')->first();
        }

        return response()->json(new BitcoinableResponse($messageRequest->inbox, $message));
    }

    public function index(string $inboxUuid)
    {
        $inbox = $this->inboxRepository->getInboxByUuid($inboxUuid);

        $this->validateOwnership($inbox);

        return new MessageCollection($inbox->messages()->get());
    }

    public function showMessage(string $inboxUuid, string $messageUuid)
    {
        $inbox = $this->inboxRepository->getInboxByUuid($inboxUuid);

        $this->validateOwnership($inbox);

        $message = $inbox->messages()->where('uuid', $messageUuid)->firstOrFail();

        return new MessageResource($message);
    }
}
