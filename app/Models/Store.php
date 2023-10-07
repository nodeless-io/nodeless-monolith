<?php

namespace App\Models;

use App\Repositories\StoreRepository;
use App\Traits\HasBitcoinableWebhooks;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Store extends Model
{
    use HasFactory;
    use HasUuid;
    use SoftDeletes;
    use HasBitcoinableWebhooks;

    protected $appends = [
        'store_revenue_metrics',
    ];

    protected $guarded = [];

    protected $casts = [
        'settings' => 'array',
    ];

    protected $hidden = [
        'deleted_at',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function storeInvoices(): HasMany
    {
        return $this->hasMany(StoreInvoice::class, 'store_id');
    }

    public function getStoreRepository(): StoreRepository
    {
        return app(StoreRepository::class);
    }

    public function getStoreRevenueMetricsAttribute(): array
    {
        return $this->getStoreRepository()->getStoreRevenueMetrics($this->uuid);
    }

    public function transactions(): HasManyThrough
    {
        return $this->hasManyThrough(Transaction::class, StoreInvoice::class, 'store_id', 'transactable_id');
    }
}
