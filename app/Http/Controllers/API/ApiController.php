<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\ServerInfo\StatusResource;
use App\Services\LndService;
use Exception;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    /**
     * Get API Status
     *
     * Displays if the API is online or offline.
     *
     * @group Server Info
     *
     * @return StatusResource
     *
     * @response 200 {
     * "data": {
     *  "code": 200,
     *  "status": "online",
     *  "node": "LND"
     *  }
     * }
     */
    public function apiStatus()
    {
        return new StatusResource(auth()->user());
    }

    public function validateOwnership($model)
    {
        if ($model->user_id === auth()->user()->id) {
            return true;
        }

        throw new Exception('You do not own this resource.', 403);
    }

    public function validateOwnershipThrough($model)
    {
        if ($model->user->id === auth()->user()->id) {
            return true;
        }

        throw new Exception('You do not own this resource.', 403);
    }

    public function validateWebhookOwnership($model, $webhook)
    {
        $model->bitcoinable_webhooks()->where('uuid', $webhook->uuid)->firstOrFail();

        if ($model->user->id === auth()->user()->id) {
            return true;
        }

        throw new Exception('You do not own this webhook.', 403);
    }
}
