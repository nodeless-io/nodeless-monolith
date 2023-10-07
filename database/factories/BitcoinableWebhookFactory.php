<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\BitcoinableWebhookEvent;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BitcoinableWebhook>
 */
class BitcoinableWebhookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'url' => 'https://utxo.one',
            'secret' => $this->faker->password,
            'status' => 'active',
            'events' => BitcoinableWebhookEvent::values(),
        ];
    }
}
