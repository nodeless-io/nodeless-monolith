<?php

namespace App\Http\Requests\API\BitcoinableWebhook;

use App\Enums\BitcoinableWebhookType;
use Illuminate\Foundation\Http\FormRequest;

class CreateBitcoinableWebhookApiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $className = BitcoinableWebhookType::getClassFromValue($this->type);
        $model = $className::where('uuid', $this->route('id'))->firstOrFail();

        return $model->user_id === auth()->id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'type' => 'required|in:store,donation_page,paywall,inbox',
            'url' => 'required|url',
            'events' => 'required|array',
            'events.*' => 'required|in:new,pending_confirmation,paid,overpaid,underpaid,in_flight,expired,cancelled',
            'secret' => 'required|string',
            'status' => 'required|in:active,inactive',
        ];
    }
}
