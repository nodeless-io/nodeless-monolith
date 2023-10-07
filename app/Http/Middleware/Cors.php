<?php

namespace App\Http\Middleware;

use Closure;
use Log;

class Cors
{
    /**
     * Avaliable hosts
     * @var array
     */
    protected $host;

    /**
     * Allowed methods for cross origin calls
     * @var string
     */
    protected $allowMethods;

    /**
     * allowed cross origin headers
     * @var string
     */
    protected $allowHeaders;

    public function __construct()
    {
        $this->host = '*';

        $this->allowMethods = in_array('*', config('cors.allowed_methods'))
                        ? 'GET, POST, PUT, DELETE, OPTIONS'
                        : config('cors.allowed_methods');

        $this->allowHeaders = in_array('*', config('cors.allowed_headers'))
                        ? 'Content-Type, Accept, Authorization, X-Requested-With, Application, x-csrf-token'
                        : config('cors.allowed_methods');
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // We're on serverless, so this checks if we're local
        if (! $_SERVER) {
            return $next($request);
        }

        // Then we'll actually check CORS
        $referer = $request->header('referer');

        // We have to check for all things IE 🙄
        $userAgent = $request->header('user-agent');
        $origin = $request->header('origin');

        $isIE = strpos($userAgent, 'Trident') !== false;

        $domain = $isIE ? parse_url($origin) : parse_url($referer);

        // If this is not allowed, we'll just let CORS do its thing
        if (
            ! isset($domain['host'])
            || (
                isset($domain['host'])
                && ! in_array($domain['host'], config('cors.allowed_origins'))
            )
        ) {
            return $next($request);
        }

        // This is a good cross origin request, let's ship it
        return $next($request)
                ->header('Access-Control-Allow-Origin', $domain['scheme'] . '://' . $domain['host'])
                ->header('Access-Control-Allow-Methods', $this->allowMethods)
                ->header('Access-Control-Allow-Headers', $this->allowHeaders);
    }
}
