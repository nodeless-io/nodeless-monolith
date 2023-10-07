<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class StoreInvoice extends Bitcoinable
{
    use HasFactory;
    use HasUuid;

    protected $guarded = [];

    protected $casts = [
        'metadata' => 'array',
        'paid_at' => 'datetime',
    ];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class, 'store_id');
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Store::class, 'id', 'id', 'store_id', 'user_id');
    }
}
