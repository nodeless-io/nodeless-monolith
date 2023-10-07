<?php

namespace App\Notifications;

use App\Models\Bitcoinable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BitcoinablePaidNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public Bitcoinable $bitcoinable;
    public string $actionUrl;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Bitcoinable $bitcoinable, string $actionUrl)
    {
        $this->bitcoinable = $bitcoinable;
        $this->actionUrl = $actionUrl;
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
                    ->subject('You Received a Payment')
                    ->line('You received a payment.')
                    ->line('Amount Received: ' . $this->bitcoinable->amount_paid . ' sats')
                    ->action('View Details', $this->actionUrl)
                    ->line('Thank you for choosing Bitcoin.');
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
