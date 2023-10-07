<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class GatedMessage extends Bitcoinable
{
    use HasFactory;
    use HasUuid;

    protected $guarded = [];

    protected $appends = [

    ];

    public function inbox(): BelongsTo
    {
        return $this->belongsTo(Inbox::class);
    }

    public function request(): BelongsTo
    {
        return $this->belongsTo(GatedMessageRequest::class);
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Inbox::class, 'id', 'id', 'inbox_id', 'user_id');
    }

    // always append the inbox with the message
    protected static function booted()
    {
        static::addGlobalScope('inbox', function ($builder) {
            $builder->with('inbox');
        });
    }
}
