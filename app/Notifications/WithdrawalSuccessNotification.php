<?php

namespace App\Notifications;

use App\Enums\WithdrawalType;
use App\Models\Withdrawal;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WithdrawalSuccessNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public Withdrawal $withdrawal;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Withdrawal $withdrawal)
    {
        $this->withdrawal = $withdrawal;
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
        if ($this->withdrawal->type === WithdrawalType::LIGHTNING->value) {
            $proofLine = 'Pre-image: ' . $this->withdrawal->lightning_payment_preimage;
        } else {
            $proofLine = 'Transaction: ' . $this->withdrawal->onchain_tx;
        }

        return (new MailMessage())
                    ->from('notifications@nodeless.io', 'Nodeless.io')
                    ->subject('Withdrawal successful')
                    ->line('Your withdrawal was successful.')
                    ->line('Amount: ' . $this->withdrawal->amount . ' sats')
                    ->line('Network: ' . $this->withdrawal->type)
                    ->line($proofLine)
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
