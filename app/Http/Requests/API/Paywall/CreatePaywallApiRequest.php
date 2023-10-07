<?php

namespace App\Http\Requests\API\Paywall;

use Illuminate\Foundation\Http\FormRequest;

class CreatePaywallApiRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:content,download,redirect,wp_article'],
            'price' => ['required', 'integer', 'min:1000'],
            'settings' => ['nullable', 'array'],
        ];
    }
}
