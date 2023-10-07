<?php

namespace App\Events\Bitcoinable;

use App\Models\BitcoinableWebhookDelivery;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BitcoinableWebhookFailed
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public BitcoinableWebhookDelivery $bitcoinableWebhookDelivery;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(BitcoinableWebhookDelivery $bitcoinableWebhookDelivery)
    {
        $this->bitcoinableWebhookDelivery = $bitcoinableWebhookDelivery;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('webhooks');
    }
}
