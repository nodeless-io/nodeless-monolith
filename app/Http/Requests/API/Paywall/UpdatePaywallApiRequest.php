<?php

namespace App\Http\Requests\API\Paywall;

use App\Models\Paywall;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePaywallApiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $paywall = Paywall::where('uuid', $this->route('id'))->firstOrFail();
        return $paywall->user_id === auth()->id();
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
