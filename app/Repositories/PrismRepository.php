<?php

namespace App\Repositories;

use App\Enums\BitcoinableNetworkType;
use App\Enums\BitcoinableStatus;
use App\Enums\PrismPayoutStatus;
use App\Models\Prism;
use Illuminate\Database\Eloquent\Collection;
use LightningPrism\LightningPrismSettings;

class PrismRepository
{
    public function createPrism(
        int $amount,
        array $settings,
        ?BitcoinableNetworkType $type = BitcoinableNetworkType::LIGHTNING,
        ?BitcoinableStatus $status = BitcoinableStatus::NEW,
        ?array $metadata = [],
    ): Prism {

        new LightningPrismSettings($settings);

        return auth()->user()->prisms()->create([
            'amount' => $amount,
            'settings' => json_encode($settings),
            'type' => $type,
            'status' => $status,
            'metadata' => $metadata,
            'payout_status' => PrismPayoutStatus::NEW,
        ]);
    }

    public function getPrismByUuid(string $uuid): Prism
    {
        return auth()->user()->prisms()->where('uuid', $uuid)->firstOrFail();
    }

    public function getPrisms(): Collection
    {
        return auth()->user()->prisms()->get();
    }


}
