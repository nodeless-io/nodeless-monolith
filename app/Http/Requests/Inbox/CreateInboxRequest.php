<?php

namespace App\Http\Requests\Inbox;

use App\Rules\MaxInboxes;
use App\Rules\RestrictedInboxes;
use Illuminate\Foundation\Http\FormRequest;

class CreateInboxRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'username' => ['required', 'string', new MaxInboxes(), new RestrictedInboxes()],
            'email' => 'required|string',
            'price' => 'required|integer|min:1000|max:10000000',
            'settings' => 'required|array',
        ];
    }
}
