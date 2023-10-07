<?php

namespace App\Http\Requests\Contest;

use App\Models\Contest;
use Illuminate\Foundation\Http\FormRequest;

class DeleteContestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $contest = Contest::where('uuid', $this->route('contestUuid'))->firstOrFail();
        return $contest->user_id === auth()->user()->id;
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
