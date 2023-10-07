<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DonationPage>
 */
class DonationPageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'slug' => $this->faker->slug,
            'description' => $this->faker->text,
            'settings' => json_encode([
                'currency' => 'USD',
                'amount' => 100,
                'interval' => 'month',
                'interval_count' => 1,
                'trial_period_days' => 0,
            ]),
            'status' => $this->faker->randomElement(['active', 'inactive', 'archived']),
        ];
    }
}
