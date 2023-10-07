<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class BitcoinAddress extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $visible = ['address'];

    public function bitcoin_addressable(): MorphTo
    {
        return $this->morphTo();
    }
}
