<?php

namespace App\Rules;

use App\Models\Inbox;
use Illuminate\Contracts\Validation\Rule;

class UniqueInboxUsername implements Rule
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
        $inbox = Inbox::where('username', $value)->whereNot('user_id', auth()->user()->id)->first();
        return $inbox === null;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'That username is already taken.';
    }
}
