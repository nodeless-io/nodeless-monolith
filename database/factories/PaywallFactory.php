<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paywall>
 */
class PaywallFactory extends Factory
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
            'type' => $this->faker->randomElement(['download', 'redirect', 'content', 'wp_article']),
            'price' => $this->faker->randomNumber(2),
            'settings' => $this->faker->randomElement([['foo' => 'bar'], ['bar' => 'foo']]),
        ];
    }
}
