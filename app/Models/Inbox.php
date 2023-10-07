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

class Inbox extends Model
{
    use HasFactory;
    use HasUuid;
    use HasBitcoinableWebhooks;
    use SoftDeletes;

    protected $guarded = [];

    protected $casts = [
        'settings' => 'array',
    ];

    protected $hidden = [
        'user_id',
        'id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(GatedMessage::class);
    }

    public function requests(): HasMany
    {
        return $this->hasMany(GatedMessageRequest::class);
    }

    public function lightning_address_payments(): HasMany
    {
        return $this->hasMany(LightningAddressPayment::class);
    }

    public function transactions(): HasManyThrough
    {
        return $this->hasManyThrough(Transaction::class, GatedMessageRequest::class, 'inbox_id', 'transactable_id');
    }
}
