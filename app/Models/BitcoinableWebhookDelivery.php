<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BitcoinableWebhookDelivery extends Model
{
    use HasFactory;
    use HasUuid;

    protected $guarded = [];

    public function webhook(): BelongsTo
    {
        return $this->belongsTo(BitcoinableWebhook::class);
    }
}
