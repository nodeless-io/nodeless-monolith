<?php

namespace App\Http\Requests\Withdrawal;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWithdrawalSettingsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'lightning_address' => 'required|string',
            'onchain_address' => 'required|string',
            'auto_withdraw' => 'required|boolean',
            'default_withdrawal_type' => 'required|string|in:lightning,onchain',
        ];
    }
}
