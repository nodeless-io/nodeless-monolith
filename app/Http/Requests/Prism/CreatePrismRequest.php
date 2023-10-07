<?php

namespace App\Http\Requests\Prism;

use Illuminate\Foundation\Http\FormRequest;

class CreatePrismRequest extends FormRequest
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
            'amount' => 'required|integer|min:1000|max:10000000',
            'settings' => 'required|array',
        ];
    }
}
