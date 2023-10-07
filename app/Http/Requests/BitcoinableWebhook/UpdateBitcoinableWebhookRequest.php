<?php

namespace App\Http\Requests\BitcoinableWebhook;

use App\Enums\BitcoinableWebhookType;
use App\Models\BitcoinableWebhook;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBitcoinableWebhookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $webhook = BitcoinableWebhook::where('uuid', $this->route('webhookUuid'))->with('bitcoinable_webhook')->firstOrFail();
        return $webhook->bitcoinable_webhook->user_id === auth()->id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'url' => 'required|url',
            'events' => 'required|array',
            'events.*' => 'required|in:new,pending_confirmation,paid,overpaid,underpaid,in_flight,expired,cancelled',
            'status' => 'required|in:active,inactive',
        ];
    }
}
