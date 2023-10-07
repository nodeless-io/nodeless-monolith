<?php

namespace App\Http\Requests\Paywall;

use Illuminate\Foundation\Http\FormRequest;

class CreatePaywallRequest extends FormRequest
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
            'name' => 'required|string',
            'type' => 'required|in:download,redirect,content,wp_article',
            'price' => 'required|integer|min:1000|max:1000000',
            'content' => 'nullable|string',
            'settings' => 'nullable|array',
        ];
    }
}
