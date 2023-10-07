<?php

namespace App\Repositories;

use App\Enums\BitcoinableWebhookType;
use App\Models\BitcoinableWebhook;
use App\Models\DonationPage;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class BitcoinableWebhookRepository
{
    public function getBitcoinableWebhookByUuid(string $uuid): BitcoinableWebhook
    {
        return BitcoinableWebhook::where('uuid', $uuid)->firstOrFail();
    }

    public function getBitcoinableWebhookByUuidForApi(string $uuid): Collection
    {
        return BitcoinableWebhook::where('uuid', $uuid)->firstOrFail()->with('bitcoinable_webhook')->get()->map(
            function ($webhook) {
                $modelType = BitcoinableWebhookType::getValueFromClass($webhook->bitcoinable_webhook_type);
                return [
                    'uuid' => $webhook->uuid,
                    'url' => $webhook->url,
                    'status' => $webhook->status,
                    'events' => $webhook->events,
                    'created_at' => $webhook->created_at,
                    'updated_at' => $webhook->updated_at,
                    'last_delivery_at' => $webhook->last_delivery_at,
                    $modelType => $webhook->bitcoinable_webhook,
                ];
            }
        );
    }

    public function createBitcoinableWebhook(
        string $url,
        string $secret,
        array $events,
        string $status,
        string $type,
        string $modelUuid,
    ): BitcoinableWebhook {
        $modelClass = BitcoinableWebhookType::getClassFromValue($type);

        $bitcoinableWebhookModel = $modelClass::where('uuid', $modelUuid)->firstOrFail();

        return $bitcoinableWebhookModel->bitcoinable_webhooks()->create([
            'url' => $url,
            'secret' => $secret,
            'events' => $events,
            'status' => $status,
        ]);
    }

    public function updateBitcoinableWebhook(
        string $uuid,
        string $url,
        array $events,
        string $status,
    ): BitcoinableWebhook {
        $bitcoinableWebhook = $this->getBitcoinableWebhookByUuid($uuid);

        $bitcoinableWebhook->update([
            'url' => $url,
            'events' => $events,
            'status' => $status,
        ]);

        return $bitcoinableWebhook->fresh();
    }

    public function deleteBitcoinableWebhook(string $uuid): void
    {
        $bitcoinableWebhook = $this->getBitcoinableWebhookByUuid($uuid);

        $bitcoinableWebhook->delete();
    }

    public function getBitcoinableWebhooksByUserUuid(string $userUuid): array
    {
        $webhooks = [];
        $modelTypes = BitcoinableWebhookType::values();

        foreach ($modelTypes as $modelType) {
            $class = BitcoinableWebhookType::getClassFromValue($modelType);
            $userId = User::where('uuid', $userUuid)->firstOrFail()->id;

            $modelsWithWebhooks = $class::whereHas('bitcoinable_webhooks')
                ->with('bitcoinable_webhooks')
                ->where('user_id', $userId)
                ->get();

            foreach ($modelsWithWebhooks as $model) {
                $webhooks[$modelType] = [
                    'uuid' => $model->uuid,
                    'webhooks' => $model->bitcoinable_webhooks()->with('bitcoinable_webhook')->get()->map(
                        function ($webhook) use ($modelType) {
                            return [
                                'uuid' => $webhook->uuid,
                                'url' => $webhook->url,
                                'status' => $webhook->status,
                                'events' => $webhook->events,
                                'created_at' => $webhook->created_at,
                                'updated_at' => $webhook->updated_at,
                                'last_delivery_at' => $webhook->last_delivery_at,
                                $modelType => $webhook->bitcoinable_webhook,
                            ];
                        }
                    )
                ];
            }
        }

        return $webhooks;
    }

    public function getBitcoinableWebhooksByUserUuidAndType(string $userUuid, string $type): array
    {
        $modelClass = BitcoinableWebhookType::getClassFromValue($type);

        $userId = User::where('uuid', $userUuid)->firstOrFail()->id;

        $modelsWithWebhooks = $modelClass::whereHas('bitcoinable_webhooks')
            ->with('bitcoinable_webhooks')
            ->where('user_id', $userId)
            ->get();

        $webhooks = [];

        foreach ($modelsWithWebhooks as $model) {
            $webhooks[] = [
                'uuid' => $model->uuid,
                'webhooks' => $model->bitcoinable_webhooks()->with('bitcoinable_webhook')->get()->map(
                    function ($webhook) use ($type) {
                        return [
                            'uuid' => $webhook->uuid,
                            'url' => $webhook->url,
                            'status' => $webhook->status,
                            'events' => $webhook->events,
                            'created_at' => $webhook->created_at,
                            'updated_at' => $webhook->updated_at,
                            'last_delivery_at' => $webhook->last_delivery_at,
                            $type => $webhook->bitcoinable_webhook,
                        ];
                    }
                )
            ];
        }

        return $webhooks;
    }

    public function getBitcoinableWebhooksByModel(string $type, string $modelUuid): Collection
    {
        $modelClass = BitcoinableWebhookType::getClassFromValue($type);

        return $modelClass::where('uuid', $modelUuid)->firstOrFail()->bitcoinable_webhooks;
    }
}
