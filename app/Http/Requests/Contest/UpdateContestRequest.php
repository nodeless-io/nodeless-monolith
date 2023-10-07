<?php

namespace App\Http\Requests\Contest;

use App\Models\Contest;
use Illuminate\Foundation\Http\FormRequest;

class UpdateContestRequest extends FormRequest
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
            'name' => 'required|string',
            'slug' => 'required|string',
            'type' => 'required|string',
            'status' => 'required|string',
            'description' => 'required|string',
            'settings' => 'required|array',
            'starts_at' => 'required|date',
            'ends_at' => 'required|date',
        ];
    }
}
