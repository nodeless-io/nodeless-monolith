<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class RestrictedInboxes implements Rule
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
        $restrictedInboxes = config('inbox.restricted_names');
        return !in_array(strtolower($value), $restrictedInboxes);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'That username is reserved.';
    }
}
