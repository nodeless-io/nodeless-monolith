<?php

use App\Http\Controllers\WellKnownController;
use Illuminate\Support\Facades\Route;

Route::get('/.well-known/lnurlp/{identifier}', [WellKnownController::class, 'lnurlp'])->name('well-known.lnurlp');

Route::get('/.well-known/nostr.json', [WellKnownController::class, 'nostr'])->name('well-known.nostr');

Route::get('/.well-known/lnurlp/{identifier}/callback', [WellKnownController::class, 'lnurlpCallback'])->name('well-known.lnurlp.callback');
