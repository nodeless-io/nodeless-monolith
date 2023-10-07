<?php

namespace App\Http\Requests\Store;

use App\Rules\MaxBitcoinableAmount;
use App\Rules\MinBitcoinableAmount;
use Illuminate\Foundation\Http\FormRequest;

class CreateStoreInvoiceRequest extends FormRequest
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
            'amount' => ['required','numeric'],
            'currency' => 'required|string|in:usd,eur,cad,jpy,gbp,chf,btc,sats,USD,EUR,CAD,JPY,GBP,CHF,BTC,SATS',
        ];
    }
}
