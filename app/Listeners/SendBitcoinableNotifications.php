<?php

namespace App\Listeners;

use App\Enums\BitcoinableStatus;
use App\Models\Bitcoinable;
use App\Models\User;
use App\Notifications\BitcoinableOverpaidNotification;
use App\Notifications\BitcoinablePaidNotification;
use App\Notifications\BitcoinableUnderpaidNotification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SendBitcoinableNotifications
{
    public Bitcoinable $bitcoinable;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(Bitcoinable $bitcoinable)
    {
        $this->bitcoinable = $bitcoinable;
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $user = $this->getUserFromBitcoinable($event->bitcoinable);
        $url = $this->getActionUrl($event->bitcoinable);

        Log::debug('User: ' . $user->id . ' Url: ' . $url);

        if ($this->shouldNotify($event->bitcoinable)) {
            Log::debug('Sending notifications for bitcoinable: ' . $event->bitcoinable->id);

            Log::debug('User: ' . $user->id . ' Url: ' . $url);

            if ($event->bitcoinable->status == BitcoinableStatus::PAID) {
                Notification::send($user, new BitcoinablePaidNotification($event->bitcoinable, $url));
            }

            if ($event->bitcoinable->status == BitcoinableStatus::OVERPAID) {
                Notification::send($user, new BitcoinableOverpaidNotification($event->bitcoinable, $url));
            }

            if ($event->bitcoinable->status == BitcoinableStatus::UNDERPAID) {
                Notification::send($user, new BitcoinableUnderpaidNotification($event->bitcoinable, $url));
            }
        } else {
            Log::debug('Not sending notifications for bitcoinable: ' . $event->bitcoinable->id);
        }
    }

    private function getUserFromBitcoinable(Bitcoinable $bitcoinable): User
    {
        $className = class_basename($bitcoinable);

        match ($className) {
            'StoreInvoice' => $user = $bitcoinable->store->user,
            'Donation' => $user = $bitcoinable->donationPage->user,
            'PaywallRequest' => $user = $bitcoinable->paywall->user,
            'LightningAddressPayment' => $user = $bitcoinable->inbox->user,
            'GatedMessageRequest' => $user = $bitcoinable->inbox->user,
            default => $user = $bitcoinable->user,
        };

        return $user;
    }

    private function shouldNotify(Bitcoinable $bitcoinable): bool
    {
        $user = $this->getUserFromBitcoinable($bitcoinable);

        if ($user->notification_setting == null) {
            return false;
        }

        match(class_basename($bitcoinable)) {
            'StoreInvoice' => $keyPrefix = 'store',
            'Donation' => $keyPrefix = 'donation_page',
            'PaywallRequest' => $keyPrefix = 'paywall',
            'LightningAddressPayment' => $keyPrefix = 'lightning_address_payment',
            default => $keyPrefix = null,
        };

        match($bitcoinable->status->value) {
            'paid' => $keySuffix = 'payment',
            'overpaid' => $keySuffix = 'overpaid',
            'underpaid' => $keySuffix = 'underpaid',
        };

        $key = $keyPrefix . '_' . $keySuffix;

        Log::debug('Key: ' . $key);

        if ($keyPrefix === null) {
            return false;
        }

        if ($user->notification_setting->$key == true) {
            return true;
        }

        return false;
    }

    private function getActionUrl(Bitcoinable $bitcoinable): string
    {
        $className = class_basename($bitcoinable);

        match ($className) {
            'StoreInvoice' => $url = url('/app/stores/invoices/' . $bitcoinable->store->uuid),
            'Donation' => $url = url('/app/donation-page/dashboard/' . $bitcoinable->donationPage->uuid . '/' . $bitcoinable->donationPage->slug),
            'Paywall' => $url = url('/app/paywall/' . $bitcoinable->paywall->uuid),
            'LightningAddressPayment' => $url = url('/app/login/'),
            'GatedMessageRequest' => $url = url('/app/login/'),
            default => $url = url('/app/login/'),
        };

        return $url;
    }
}
