<?php

namespace App\Listeners;

use App\Events\Bitcoinable\BitcoinableWebhookFailed;
use App\Models\Bitcoinable;
use App\Models\BitcoinableWebhookDelivery;
use App\Models\DonationPage;
use App\Models\Paywall;
use App\Models\Store;
use App\Notifications\BitcoinableWebhookDeliveryFailureNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SendWebhookFailureNotification
{
    public BitcoinableWebhookDelivery $bitcoinableWebhookDelivery;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(BitcoinableWebhookDelivery $bitcoinableWebhookDelivery)
    {
        $this->bitcoinableWebhookDelivery = $bitcoinableWebhookDelivery;
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $moduleType = $event->bitcoinableWebhookDelivery->webhook->bitcoinable_webhook_type;
        $bitcoinableId = $event->bitcoinableWebhookDelivery->webhook->bitcoinable_webhook_id;

        Log::debug('Webhook Failure Listener for Delivery: ' . $event->bitcoinableWebhookDelivery->id);

        $sendNotification = false;

        if ($moduleType === 'App\Models\Store') {
            Log::debug('Webhook Failure Listener for Store');
            $user = Store::find($bitcoinableId)->user;

            if ($user->notification_setting !== null &&
                $user->notification_setting->store_webhook_failure == true) {
                $sendNotification = true;
            }
        }

        if ($moduleType === 'App\Models\DonationPage') {
            Log::debug('Webhook Failure Listener for Donation Page');
            $user = DonationPage::find($bitcoinableId)->user;

            if ($user->notification_setting !== null &&
                $user->notification_setting->donation_page_webhook_failure == true) {
                $sendNotification = true;
            }
        }

        if ($moduleType === 'App\Models\Paywall') {
            Log::debug('Webhook Failure Listener for Paywall');
            $user = Paywall::find($bitcoinableId)->user;

            if ($user->notification_setting !== null &&
                $user->notification_setting->paywall_webhook_failure == true) {
                $sendNotification = true;
            }
        }

        if ($sendNotification) {
            Notification::send($user, new BitcoinableWebhookDeliveryFailureNotification($event->bitcoinableWebhookDelivery));
        }
    }
}
