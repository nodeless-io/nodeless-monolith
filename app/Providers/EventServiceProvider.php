<?php

namespace App\Providers;

use App\Events\Bitcoinable\BitcoinableExpired;
use App\Events\BitcoinableChangeEvent;
use App\Events\Bitcoinable\BitcoinableNew;
use App\Events\Bitcoinable\BitcoinableOverpaid;
use App\Events\Bitcoinable\BitcoinablePaid;
use App\Events\Bitcoinable\BitcoinablePendingConfirmation;
use App\Events\Bitcoinable\BitcoinableUnderpaid;
use App\Events\Bitcoinable\BitcoinableWebhookFailed;
use App\Events\BitcoinTransactionConfirmed;
use App\Events\LightningInvoicePaid;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],

        BitcoinableNew::class => [
            \App\Listeners\DeliverBitcoinableWebhook::class,
        ],

        BitcoinablePaid::class => [
            \App\Listeners\DeliverBitcoinableWebhook::class,
            \App\Listeners\DeliverGatedMessage::class,
            \App\Listeners\SendBitcoinableNotifications::class,
        ],

        BitcoinableOverpaid::class => [
            \App\Listeners\DeliverBitcoinableWebhook::class,
            \App\Listeners\DeliverGatedMessage::class,
            \App\Listeners\SendBitcoinableNotifications::class,
        ],

        BitcoinableUnderpaid::class => [
            \App\Listeners\DeliverBitcoinableWebhook::class,
            \App\Listeners\SendBitcoinableNotifications::class,
        ],

        BitcoinablePendingConfirmation::class => [
            \App\Listeners\DeliverBitcoinableWebhook::class,
        ],

        BitcoinableExpired::class => [
            \App\Listeners\DeliverBitcoinableWebhook::class,
        ],

        LightningInvoicePaid::class => [
            \App\Listeners\RecordBitcoinableTransaction::class,
            //\App\Listeners\WithdrawToLightningAddress::class,
        ],

        BitcoinTransactionConfirmed::class => [
            \App\Listeners\RecordBitcoinableTransaction::class,
            //\App\Listeners\WithdrawToLightningAddress::class,
        ],

        BitcoinableWebhookFailed::class => [
            \App\Listeners\SendWebhookFailureNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
