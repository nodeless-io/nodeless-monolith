<?php

use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\API\Paywall\PaywallApiController;
use App\Http\Controllers\API\Paywall\PaywallRequestApiController;
use App\Http\Controllers\API\Paywall\PaywallWebhookApiController;
use App\Http\Controllers\API\Prism\PrismApiController;
use App\Http\Controllers\API\Store\StoreApiController;
use App\Http\Controllers\API\Store\StoreInvoiceApiController;
use App\Http\Controllers\API\Store\StoreWebhookApiController;
use App\Http\Controllers\API\Transaction\TransactionApiController;
use App\Http\Controllers\Paywall\PaywallRequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Create a route group protected by Sanctum's auth middleware
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    // Create a route group for the API version
    Route::prefix('v1')->group(function () {
        Route::get('/status', [ApiController::class, 'apiStatus'])->name('api.v1.status');

        Route::prefix('/transaction')->group(function () {
            Route::get('/', [TransactionApiController::class, 'index'])->name('api.v1.transactions.index');
            Route::get('/{id}', [TransactionApiController::class, 'show'])->name('api.v1.transactions.show');
        });

        Route::prefix('/store')->group(function () {
            Route::get('/', [StoreApiController::class, 'index'])->name('api.v1.stores.index');
            Route::prefix('/{id}')->group(function () {
                Route::get('/', [StoreApiController::class, 'show'])->name('api.v1.stores.show');
                Route::prefix('/webhook')->group(function () {
                    Route::get('/', [StoreWebhookApiController::class, 'index'])->name('api.v1.stores.webhooks.index');
                    Route::post('/', [StoreWebhookApiController::class, 'create'])->name('api.v1.stores.webhooks.create');
                    Route::get('/{webhookId}', [StoreWebhookApiController::class, 'show'])->name('api.v1.stores.webhooks.show');
                    Route::delete('/{webhookId}', [StoreWebhookApiController::class, 'delete'])->name('api.v1.stores.webhooks.delete');
                    Route::put('/{webhookId}', [StoreWebhookApiController::class, 'update'])->name('api.v1.stores.webhooks.update');
                });
                Route::prefix('invoice')->group(function () {
                    Route::post('/', [StoreInvoiceApiController::class, 'create'])->name('api.v1.stores.invoices.create');
                    Route::get('/{invoiceId}', [StoreInvoiceApiController::class, 'show'])->name('api.v1.stores.invoices.show');
                    Route::get('/{invoiceId}/status', [StoreInvoiceApiController::class, 'status'])->name('api.v1.stores.invoices.status');
                });
            });
        });

        Route::prefix('/paywall')->group(function () {
            Route::get('/', [PaywallApiController::class, 'index'])->name('api.v1.paywalls.index');
            Route::post('/', [PaywallApiController::class, 'create'])->name('api.v1.paywalls.create');

            Route::prefix('/{id}')->group(
                function () {
                    Route::get('/', [PaywallApiController::class, 'show'])->name('api.v1.paywalls.show');
                    Route::put('/', [PaywallApiController::class, 'update'])->name('api.v1.paywalls.update');
                    Route::delete('/', [PaywallApiController::class, 'delete'])->name('api.v1.paywalls.delete');

                    Route::prefix('/request')->group(function () {
                        Route::post('/', [PaywallRequestApiController::class, 'create'])->name('api.v1.paywalls.requests.create');
                        Route::get('/{requestId}', [PaywallRequestApiController::class, 'show'])->name('api.v1.paywalls.requests.show');
                        Route::get('/{requestId}/status', [PaywallRequestApiController::class, 'status'])->name('api.v1.paywalls.requests.status');
                    });

                    Route::prefix('/webhook')->group(function () {
                        Route::get('/', [PaywallWebhookApiController::class, 'index'])->name('api.v1.paywalls.webhooks.index');
                        Route::post('/', [PaywallWebhookApiController::class, 'create'])->name('api.v1.paywalls.webhooks.create');
                        Route::get('/{webhookId}', [PaywallWebhookApiController::class, 'show'])->name('api.v1.paywalls.webhooks.show');
                        Route::delete('/{webhookId}', [PaywallWebhookApiController::class, 'delete'])->name('api.v1.paywalls.webhooks.delete');
                        Route::put('/{webhookId}', [PaywallWebhookApiController::class, 'update'])->name('api.v1.paywalls.webhooks.update');
                    });
                }
            );
        });

        Route::prefix('/prism')->group(function () {
            Route::post('/', [PrismApiController::class, 'create'])->name('api.v1.prisms.create');
            Route::get('/', [PrismApiController::class, 'index'])->name('api.v1.prisms.index');
            Route::get('/{id}', [PrismApiController::class, 'show'])->name('api.v1.prisms.show');

        });
    });
});
