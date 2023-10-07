<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use HasUuid;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google2fa_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function withdrawals(): HasMany
    {
        return $this->hasMany(Withdrawal::class);
    }

    public function stores(): HasMany
    {
        return $this->hasMany(Store::class);
    }

    public function donationPages(): HasMany
    {
        return $this->hasMany(DonationPage::class);
    }

    public function contests(): HasMany
    {
        return $this->hasMany(Contest::class);
    }

    public function inboxes(): HasMany
    {
        return $this->hasMany(Inbox::class);
    }

    public function paywalls(): HasMany
    {
        return $this->hasMany(Paywall::class);
    }

    public function store_invoices(): HasManyThrough
    {
        return $this->hasManyThrough(StoreInvoice::class, Store::class);
    }

    public function donations(): HasManyThrough
    {
        return $this->hasManyThrough(Donation::class, DonationPage::class);
    }

    public function paywall_requests(): HasManyThrough
    {
        return $this->hasManyThrough(PaywallRequest::class, Paywall::class);
    }

    public function gated_messages(): HasManyThrough
    {
        return $this->hasManyThrough(GatedMessage::class, Inbox::class);
    }

    public function gated_message_requests(): HasManyThrough
    {
        return $this->hasManyThrough(GatedMessageRequest::class, Inbox::class);
    }

    public function lightning_address_payments(): HasManyThrough
    {
        return $this->hasManyThrough(LightningAddressPayment::class, Inbox::class);
    }

    public function notification_setting(): HasOne
    {
        return $this->hasOne(NotificationSetting::class);
    }

    public function prisms(): HasMany
    {
        return $this->hasMany(Prism::class);
    }

    public function getAvailableBalance(): int
    {
        $credits = $this->transactions()
            ->where('status', TransactionStatus::SETTLED)
            ->where('type', TransactionType::CREDIT)
            ->sum('amount');

        $debits = $this->transactions()
            ->where('status', TransactionStatus::SETTLED)
            ->where('type', TransactionType::DEBIT)
            ->sum('amount');

        return $credits - $debits;
    }

    public function getBalance(): int
    {
        $credits = $this->transactions()
            ->where('type', TransactionType::CREDIT)
            ->sum('amount');

        $debits = $this->transactions()
            ->where('type', TransactionType::DEBIT)
            ->sum('amount');

        return $credits - $debits;
    }
}
