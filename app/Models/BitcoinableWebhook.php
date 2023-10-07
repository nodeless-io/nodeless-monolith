<?php

namespace App\Models;

use App\Enums\BitcoinableWebhookType;
use App\Traits\HasUuid;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Psr\Http\Message\ResponseInterface;

class BitcoinableWebhook extends Model
{
    use HasFactory;
    use HasUuid;

    protected $guarded = [];

    protected $casts = [
        'events' => 'array',
    ];

    protected $hidden = [
        'id',
        'bitcoinable_webhook_id',
        'bitcoinable_webhook_type',
    ];

    public function bitcoinable_webhook(): MorphTo
    {
        return $this->morphTo();
    }

    public function webhook_deliveries(): HasMany
    {
        return $this->hasMany(BitcoinableWebhookDelivery::class, 'webhook_id');
    }

    public function deliver(Bitcoinable $bitcoinable): ResponseInterface
    {
        $client = new \GuzzleHttp\Client();
        $payload = [
            'uuid' => $bitcoinable->uuid,
            'status' => $bitcoinable->status,
            'amount' => $bitcoinable->amount,
            'metadata' => $bitcoinable->metadata,
        ];

        $signature = hash_hmac('sha256', json_encode($payload), $this->secret);

        return $client->post($this->url, [
            'json' => $payload,
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'Nodeless-Signature' => $signature,
            ],
        ]);
    }
}
