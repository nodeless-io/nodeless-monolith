<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class MinBitcoinableAmount implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $value >= config('pricing.limits.min_bitcoinable');
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The amount is below the minimum of: '.config('pricing.limits.min_bitcoinable').' sats.';
    }
}
