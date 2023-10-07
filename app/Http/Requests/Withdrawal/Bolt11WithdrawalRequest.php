<?php

namespace App\Http\Requests\Withdrawal;

use App\Rules\MaxBitcoinableAmount;
use App\Rules\MinBitcoinableAmount;
use Illuminate\Foundation\Http\FormRequest;

class Bolt11WithdrawalRequest extends FormRequest
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
            'amount' => ['required', 'numeric', new MinBitcoinableAmount(), new MaxBitcoinableAmount()],
            'bolt11' => ['required', 'string'],
        ];
    }
}
