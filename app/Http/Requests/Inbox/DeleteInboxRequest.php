<?php

namespace App\Http\Requests\Inbox;

use App\Models\Inbox;
use Illuminate\Foundation\Http\FormRequest;

class DeleteInboxRequest extends FormRequest
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
            //
        ];
    }
}
