<?php

namespace App\Http\Requests\Donation;

use App\Rules\MaxBitcoinableAmount;
use App\Rules\MinBitcoinableAmount;
use Illuminate\Foundation\Http\FormRequest;

class CreateDonationRequest extends FormRequest
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
            'amount' => ['required','numeric', new MinBitcoinableAmount(), new MaxBitcoinableAmount()],
            'name' => 'nullable|string|max:100',
            'message' => 'nullable|string|max:500',
        ];
    }
}
