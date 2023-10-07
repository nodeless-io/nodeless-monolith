<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreInvoice>
 */
class StoreInvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user = \App\Models\User::factory()->create();
        $store = \App\Models\Store::factory()->create(['user_id' => $user->id]);

        return [
            'store_id' => $store->id,
            'amount' => $this->faker->numberBetween(100, 100000),
            'status' => $this->faker->randomElement(['new', 'pending_confirmation', 'paid', 'expired', 'cancelled', 'overpaid', 'underpaid', 'in_flight']),
            'type' => $this->faker->randomElement(['lightning', 'onchain']),
            'buyer_email' => $this->faker->email,
            'redirect_url' => $this->faker->url,
            'metadata' => [
                'user_id' => $this->faker->numberBetween(1, 1000),
                'order_id' => $this->faker->numberBetween(1, 1000),
            ],
        ];
    }
}
