<?php

namespace App\Http\Requests\Paywall;

use App\Models\Paywall;
use Illuminate\Foundation\Http\FormRequest;

class DeletePaywallRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $paywall = Paywall::where('uuid', $this->route('paywallUuid'))->firstOrFail();
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
            //
        ];
    }
}
