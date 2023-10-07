<?php

namespace App\Http\Controllers\Inbox;

use App\Http\Controllers\Controller;
use App\Mail\GatedMessagePaymentRequest;
use App\Mail\InternalMail;
use App\Models\Inbox;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mime\Email;

class IncomingWebhookController extends Controller
{
    public function create(Request $request)
    {
        //Log::info("New Gated Message Request: " . $request->all());

        // split the email from the handle and the tld ie username@domain.com, get the username
        $email = explode('@', $request->recipient);

        // Check if the username is an internal address, and forward to the appropriate inbox
        $internalAddresses = config('mail.internal');

        foreach ($internalAddresses as $user => $internalAddress) {
            if (strtolower($email[0]) === $user) {
                Mail::to($internalAddress)->send(new InternalMail($request['stripped-text'], $request->subject, $request->sender));
                return;
            }
        }

        $inbox = Inbox::where('username', $email[0])->firstOrFail();

        $gatedMessageRequest = $inbox->requests()->create([
            'body' => $request['stripped-text'],
            'from' => $request->sender,
            'to' => $request->recipient,
            'subject' => $request->subject,
            'signature' => $request->signature,
            'token' => $request->token,
        ]);

        Mail::to($request->sender)->send(new GatedMessagePaymentRequest($gatedMessageRequest));

        return response()->json($request->all());
    }
}
