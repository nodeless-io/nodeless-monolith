<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class GatedMessageRequest extends Model
{
    use HasFactory;
    use HasUuid;

    protected $guarded = [];

    public function inbox(): BelongsTo
    {
        return $this->belongsTo(Inbox::class);
    }

    public function message(): HasOne
    {
        return $this->hasOne(GatedMessage::class, 'request_id');
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Inbox::class, 'id', 'id', 'inbox_id', 'user_id');
    }
}
