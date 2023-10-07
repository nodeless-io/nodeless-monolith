<?php

namespace App\Providers;

use App\Models\Store;
use App\Models\StoreInvoice;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        //Store::class => \App\Policies\API\StoreApiPolicy::class,
        //StoreInvoice::class => \App\Policies\API\StoreInvoiceApiPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        ResetPassword::createUrlUsing(function ($notifiable, $token) {
            return config('app.frontend_url')."/app/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        //
    }
}
