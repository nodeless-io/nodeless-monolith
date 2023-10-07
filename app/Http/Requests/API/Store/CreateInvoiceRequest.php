<?php

namespace App\Http\Requests\API\Store;

use App\Rules\MaxBitcoinableAmount;
use App\Rules\MinBitcoinableAmount;
use Illuminate\Foundation\Http\FormRequest;

class CreateInvoiceRequest extends FormRequest
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
            'amount' => ['required', 'numeric'],
            'currency' => 'required|string|in:usd,eur,cad,jpy,gbp,chf,btc,sats,USD,EUR,CAD,JPY,GBP,CHF,BTC,SATS',
            'buyerEmail' => 'nullable|email',
            'redirectUrl' => 'nullable|url',
            'metadata' => 'nullable|array',
        ];
    }

    public function bodyParameters()
    {
        return [
            'amount' => [
                'description' => 'The amount of the invoice.',
                'example' => 100.50,
            ],
            'currency' => [
                'description' => 'The currency of the invoice.',
                'example' => 'USD',
            ],
            'buyerEmail' => [
                'description' => 'The email of the buyer.',
            ],
            'redirectUrl' => [
                'description' => 'The redirect url of the invoice.',
            ],
            'metadata' => [
                'description' => 'The metadata of the invoice.',
                'example' => ['key' => 'value'],
            ],
        ];
    }
}
