<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'email' => 'admin@nodeless.io',
            'password' => bcrypt('password'),
        ])->each(function ($user) {
            /** Create a custom inbox */
            $user->inboxes()->save(\App\Models\Inbox::factory()->make([
                'username' => 'admin',
                'email' => 'admin@utxo.one',
                'price' => 1000,
                'nostr_hexpub' => '18d93754a226da7e32a2d8bca499a4300c9cbbc54a8d1393360d815270d35c3b',
            ]));

            /** Seed Donations */
            $user->donationPages()->saveMany(\App\Models\DonationPage::factory(5)->make());
            $user->donationPages->each(function ($donationPage) {
                $donationPage->bitcoinable_webhooks()->saveMany(\App\Models\BitcoinableWebhook::factory(1)->make());
            });

            /** Seed Stores */
            $user->stores()->saveMany(\App\Models\Store::factory(5)->make());
            $user->stores->each(function ($store) {
                $store->bitcoinable_webhooks()->saveMany(\App\Models\BitcoinableWebhook::factory(1)->make());
            });

            /** Seed Contests */
            $user->contests()->saveMany(\App\Models\Contest::factory(5)->make());

            /** Seed Inboxes */
            $user->inboxes()->saveMany(\App\Models\Inbox::factory(5)->make());
            $user->inboxes->each(function ($inbox) {
                $inbox->bitcoinable_webhooks()->saveMany(\App\Models\BitcoinableWebhook::factory(1)->make());
            });

            /** Seed Paywalls */
            $user->paywalls()->saveMany(\App\Models\Paywall::factory(5)->make());
            $user->paywalls->each(function ($paywall) {
                $paywall->bitcoinable_webhooks()->saveMany(\App\Models\BitcoinableWebhook::factory(1)->make());
            });
        });

        // make an artisan command call
        Artisan::call('generate:addresses');
    }
}
