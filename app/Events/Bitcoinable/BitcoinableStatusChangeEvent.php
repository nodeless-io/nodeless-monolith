<?php

namespace App\Events\Bitcoinable;

use App\Models\Bitcoinable;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class BitcoinableStatusChangeEvent
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public Bitcoinable $bitcoinable;

    public function __construct(Bitcoinable $bitcoinable)
    {
        $this->bitcoinable = $bitcoinable;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('webhooks');
    }
}
