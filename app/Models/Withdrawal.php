<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Withdrawal extends Model
{
    use HasFactory;
    use HasUuid;

    protected $guarded = [];

    protected $casts = [
        'lightning_payment_route' => 'array',
    ];

    public function transaction(): MorphOne
    {
        return $this->morphOne(Transaction::class, 'transactable');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function networkCost(): HasOne
    {
        return $this->hasOne(NetworkCost::class);
    }
}
