<?php

namespace App\Models;

use App\Traits\HasBitcoinableWebhooks;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prism extends Bitcoinable
{
    use HasFactory;
    use HasUuid;
    use SoftDeletes;
    use HasBitcoinableWebhooks;

    protected $guarded = [];

    protected $casts = [
        'metadata' => 'array',
        'settings' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
