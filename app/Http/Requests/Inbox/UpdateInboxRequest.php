<?php

namespace App\Http\Requests\Inbox;

use App\Models\Inbox;
use App\Rules\RestrictedInboxes;
use App\Rules\UniqueInboxUsername;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateInboxRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $inbox = Inbox::where('uuid', $this->route('inboxUuid'))->firstOrFail();
        return $inbox->user_id === auth()->user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'username' => ['required', new RestrictedInboxes(), new UniqueInboxUsername()],
            'email' => 'required|string',
            'price' => 'required|integer|min:1000|max:10000000',
            'settings' => 'required|array',
        ];
    }
}
