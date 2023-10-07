<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contest>
 */
class ContestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $settings = [
            'bg_color' => '#000000',
            'text_color' => '#ffffff',
            'highlight_color' => '#ff0000',
            'logo_url' => 'https://example.com/logo.png',
            'header_url' => 'https://example.com/header.png',

        ];
        return [
            'name' => $this->faker->name,
            'slug' => $this->faker->slug,
            'status' => $this->faker->randomElement(['active', 'inactive', 'upcoming', 'past', 'cancelled']),
            'type' => $this->faker->randomElement([
                'nostr',
                'twitter',
                'tiktok',
                'instagram',
                'youtube',
                'twitch',
                'discord',
                'facebook',
                'reddit',
                'email',
                'github',
                'linkedin'
            ]),
            'description' => $this->faker->text,
            'settings' => $settings,
            'starts_at' => $this->faker->dateTime,
            'ends_at' => $this->faker->dateTime,
        ];
    }
}
