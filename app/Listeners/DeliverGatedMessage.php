<?php

namespace App\Listeners;

use App\Mail\Inbox\DeliverGatedMail;
use App\Models\GatedMessage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class DeliverGatedMessage implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        if ($event->bitcoinable instanceof GatedMessage) {
            Mail::to($event->bitcoinable->inbox->email)->send(new DeliverGatedMail($event->bitcoinable));
        }
    }

    public function viaQueue()
    {
        return 'mail';
    }
}
