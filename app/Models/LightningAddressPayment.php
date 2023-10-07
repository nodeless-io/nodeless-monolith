<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class LightningAddressPayment extends Bitcoinable
{
    use HasFactory;
    use HasUuid;

    protected $guarded = [];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function inbox()
    {
        return $this->belongsTo(Inbox::class);
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Inbox::class, 'id', 'id', 'inbox_id', 'user_id');
    }
}
