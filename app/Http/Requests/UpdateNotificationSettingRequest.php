<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNotificationSettingRequest extends FormRequest
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
        $validKeys = [
            'withdrawal_success',
            'withdrawal_failure',
            'store_payment',
            'store_underpaid',
            'store_overpaid',
            'store_webhook_failure',
            'donation_page_payment',
            'donation_page_underpaid',
            'donation_page_overpaid',
            'donation_page_webhook_failure',
            'paywall_payment',
            'paywall_underpaid',
            'paywall_overpaid',
            'paywall_webhook_failure',
            'lightning_address_payment',
            'referral_payment',
        ];

        // if a key is not in the validKeys array, it will throw an error

        if ($keys = array_keys($this->all())) {
            foreach ($keys as $key) {
                if (!in_array($key, $validKeys)) {
                    throw new \Exception("Invalid key: {$key}");
                }
            }
        }

        return array_combine(
            $validKeys,
            array_map(
                fn ($key) => ['nullable', 'boolean', Rule::in([true, false])],
                $validKeys
            )
        );
    }
}
