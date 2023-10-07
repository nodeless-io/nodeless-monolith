<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class PaywallRequest extends Bitcoinable
{
    use HasFactory;
    use HasUuid;

    protected $guarded = [];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function paywall(): BelongsTo
    {
        return $this->belongsTo(Paywall::class);
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Paywall::class, 'id', 'id', 'paywall_id', 'user_id');
    }
}
