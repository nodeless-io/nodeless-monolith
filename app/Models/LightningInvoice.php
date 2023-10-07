<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class LightningInvoice extends Model
{
    use HasFactory;
    use HasUuid;

    protected $guarded = [];

    protected $hidden = [
        'id', 'uuid', 'created_at', 'updated_at', 'lightning_invoiceable_id', 'lightning_invoiceable_type',
    ];

    protected $casts = [
        'settled' => 'boolean',
        'settled_at' => 'datetime',
    ];

    public function lightning_invoiceable(): MorphTo
    {
        return $this->morphTo();
    }
}
