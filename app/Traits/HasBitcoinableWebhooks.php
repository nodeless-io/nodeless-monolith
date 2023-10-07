<?php

namespace App\Traits;

use App\Enums\BitcoinableWebhookType;
use App\Models\BitcoinableWebhook;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasBitcoinableWebhooks
{
    public function bitcoinable_webhooks(): MorphMany
    {
        return $this->morphMany(BitcoinableWebhook::class, 'bitcoinable_webhook');
    }

    public function getBitcoinableWebhookTypeAttribute($value)
    {
        return BitcoinableWebhookType::fromValue($value);
    }
}
