<?php

namespace App\Http\Controllers\API\BitcoinableWebhook;

use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\Controller;
use App\Repositories\BitcoinableWebhookRepository;
use Illuminate\Http\Request;

class BitcoinableWebhookController extends ApiController
{
    public function __construct(private BitcoinableWebhookRepository $bitcoinableWebhookRepository)
    {
    }

    /**
     * Get Bitcoinable Webhook
     *
     * Displays a bitcoinable webhook's details.
     *
     * @param string $id
     * @return BitcoinableWebhookResource
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     *
     * @group Bitcoinable Webhooks
     *
     * @apiResource App\Http\Resources\API\BitcoinableWebhook\BitcoinableWebhookResource
     * @apiResourceModel App\Models\BitcoinableWebhook
     */
}
