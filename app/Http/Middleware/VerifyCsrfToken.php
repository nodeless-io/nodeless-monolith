<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'gated-inbox/webhook',
        '/2fa/verify',
    ];

    // if envionment is local, disable CSRF
    public function handle($request, \Closure $next)
    {
        if (env('APP_ENV') === 'local') {
            return $next($request);
        }

        return parent::handle($request, $next);
    }
}
