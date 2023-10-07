<?php

namespace App\Notifications;

use App\Models\BitcoinableWebhookDelivery;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BitcoinableWebhookDeliveryFailureNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public BitcoinableWebhookDelivery $delivery;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(BitcoinableWebhookDelivery $delivery)
    {
        $this->delivery = $delivery;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage())
                    ->from('notifications@nodeless.io', 'Nodeless.io')
                    ->subject('Webhook Delivery Failed')
                    ->line('We were unable to deliver a webhook to your endpoint.')
                    ->line('Payload: ' . $this->delivery->payload)
                    ->line('Status Code: ' . $this->delivery->status_code)
                    ->line('Response: ' . $this->delivery->response);
    }


    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
