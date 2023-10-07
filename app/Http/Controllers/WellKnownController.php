<?php

namespace App\Http\Controllers;

use App\Models\Inbox;
use App\Repositories\InboxRepository;
use Illuminate\Http\Request;

class WellKnownController extends Controller
{
    public function __construct(private InboxRepository $inboxRepository)
    {
    }

    public function lnurlp(string $identifier)
    {
        try {
            $inbox = $this->inboxRepository->getInboxByUsername($identifier);

            $metadata = [
                ['text/identifier', $identifier],
                ['text/plain', $identifier . ' Lightning Address'],
            ];

            $lnUrl = [
                'status' => 'OK',
                'tag' => 'payRequest',
                'callback' => route('well-known.lnurlp.callback', $identifier),
                'minSendable' => config('pricing.lnurl.min_sendable'),
                'maxSendable' => config('pricing.lnurl.max_sendable'),
                'metadata' => json_encode($metadata),
                'commentAllowed' => 255,
            ];

            return response()->json($lnUrl);
        } catch (\Exception $e) {
            return response()->json([
                'tag' => 'message',
                'message' => 'No such gated email address',
            ], 404);
        }
    }

    public function lnurlpCallback(Request $request, $identifier)
    {
        $amount = $request->get('amount'); //millisats
        $comment = $request->get('comment');

        if ($amount < config('pricing.lnurl.min_sendable') || $amount > config('pricing.lnurl.max_sendable')) {
            return response()->json([
                'status' => 'ERROR',
                'reason' => 'Amount is out of range',
            ], 400);
        }

        $inbox = $this->inboxRepository->getInboxByUsername($identifier);

        $payment = $inbox->lightning_address_payments()->create([
            'amount' => $amount / 1000, //sats
            'comment' => $comment,
        ]);

        $callback = [
            'status' => 'OK',
            'pr' => $payment->lightning_invoice->payment_request,
            'successAction' => [
                'tag' => 'message',
                'message' => 'Nodeless.io has received your payment. Thank you!'
            ],
            'routes' => [],
            'disposable' => true,
        ];

        return response()->json($callback);
    }

    public function nostr()
    {
        $nostrAddresses = Inbox::query()
            ->where('nostr_npub', '!=', null)
            ->where('nostr_hexpub', '!=', null)
            ->get();

        $nostrAddresses = $nostrAddresses->mapWithKeys(function ($item) {
            return [$item->username => $item->nostr_hexpub];
        });

        return response()->json([
            'names' => $nostrAddresses,
        ])->header('Access-Control-Allow-Origin', '*');
    }
}
