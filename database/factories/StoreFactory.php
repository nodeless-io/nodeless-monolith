<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user = \App\Models\User::factory()->create();
        return [
            'user_id' => $user->id,
            'name' => $this->faker->company,
            'url' => $this->faker->url,
            'email' => $this->faker->email,
            'settings' => [
                'bg_color' => $this->faker->hexColor,
                'text_color' => $this->faker->hexColor,
                'highlight_color' => $this->faker->hexColor,
            ],
        ];
    }
}
