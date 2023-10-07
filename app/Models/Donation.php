<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Donation extends Bitcoinable
{
    use HasUuid;
    use HasFactory;

    protected $guarded = [];


    public function donationPage(): BelongsTo
    {
        return $this->belongsTo(DonationPage::class);
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, DonationPage::class, 'id', 'id', 'donation_page_id', 'user_id');
    }
}
