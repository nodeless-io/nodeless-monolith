<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inbox>
 */
class InboxFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'username' => $this->faker->userName,
            'email' => $this->faker->unique()->safeEmail,
            'price' => $this->faker->numberBetween(1, 100),
            'nostr_npub' => $this->faker->uuid,
            'nostr_hexpub' => '18d93754a226da7e32a2d8bca499a4300c9cbbc54a8d1393360d815270d35c3b',
            'settings' => [
                'body' => $this->faker->text,
                'subject' => $this->faker->sentence,
            ],
        ];
    }
}
