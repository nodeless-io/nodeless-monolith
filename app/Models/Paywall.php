<?php

namespace App\Models;

use App\Traits\HasBitcoinableWebhooks;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paywall extends Model
{
    use HasFactory;
    use HasUuid;
    use HasBitcoinableWebhooks;
    use SoftDeletes;

    protected $guarded = [];

    protected $hidden = [
        'user_id',
        'id',
    ];

    protected $casts = [
        'settings' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function paywallRequests(): HasMany
    {
        return $this->hasMany(PaywallRequest::class);
    }

    public function transactions(): HasManyThrough
    {
        return $this->hasManyThrough(Transaction::class, PaywallRequest::class, 'paywall_id', 'transactable_id');
    }
}
