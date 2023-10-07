<?php

namespace App\Listeners;

use App\Events\Bitcoinable\BitcoinableWebhookFailed;
use App\Events\BitcoinableChangeEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class DeliverBitcoinableWebhook implements ShouldQueue
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
        // Find the class of the $event->bitcoinable
        $class = get_class($event->bitcoinable);

        match ($class) {
            'App\Models\StoreInvoice' => $webhooks = $event->bitcoinable->store->bitcoinable_webhooks,
            'App\Models\Donation' => $webhooks = $event->bitcoinable->donationPage->bitcoinable_webhooks,
            'App\Models\PaywallRequest' => $webhooks = $event->bitcoinable->paywall->bitcoinable_webhooks,
            default => $webhooks = [],
        };


        foreach ($webhooks as $webhook) {
            foreach ($webhook->events as $webhookEvent) {
                if ($webhookEvent === $event->bitcoinable->status) {
                    Log::debug('Webhook event matches: ' . $webhookEvent);
                    Log::debug('Bitcoinable type: ' . $class);

                    try {
                        Log::debug('Delivering webhook: ' . $webhook->url);
                        $response = $webhook->deliver($event->bitcoinable);

                        $webhook->webhook_deliveries()->create([
                            'status_code' => $response->getStatusCode(),
                            'payload' => $event->bitcoinable,
                            'response' => json_encode($response->getBody()->getContents()),
                        ]);

                        Log::info('Webhook delivered: ' . $webhook->url . ' Response: ' . $response->getBody()->getContents());
                    } catch (\Exception $e) {
                        $delivery = $webhook->webhook_deliveries()->create([
                            'status_code' => 500,
                            'payload' => $event->bitcoinable,
                            'response' => json_encode($e->getMessage()),
                        ]);

                        event(new BitcoinableWebhookFailed($delivery));
                        Log::error($e->getMessage());
                    }
                }
            }
        }
    }

    public function viaQueue()
    {
        return 'webhooks';
    }
}
