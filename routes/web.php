<?php

use App\Http\Controllers\BitcoinableController;
use App\Http\Controllers\BitcoinableWebhook\BitcoinableWebhookController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Contest\ContestController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Donation\DonationPageController;
use App\Http\Controllers\Donation\DonationController;
use App\Http\Controllers\Donation\DonationPagePublicController;
use App\Http\Controllers\Inbox\IncomingWebhookController;
use App\Http\Controllers\Inbox\MessageController;
use App\Http\Controllers\Inbox\InboxController;
use App\Http\Controllers\Paywall\PaywallController;
use App\Http\Controllers\Paywall\PaywallMetricsController;
use App\Http\Controllers\Paywall\PaywallRequestController;
use App\Http\Controllers\Prism\PrismController;
use App\Http\Controllers\Referral\ReferralController;
use App\Http\Controllers\Store\StoreController;
use App\Http\Controllers\Store\StoreInvoiceController;
use App\Http\Controllers\Store\StoreMetricsController;
use App\Http\Controllers\Store\StoreWebhookController;
use App\Http\Controllers\Transaction\TransactionController;
use App\Http\Controllers\User\ApiTokenController;
use App\Http\Controllers\User\NotificationSettingsController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Withdrawal\WithdrawalController;
use App\Http\Controllers\Withdrawal\WithdrawalSettingsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $referralCode = request()->query('ref');
    return response(view('home'))->cookie('referral_code', request()->cookie('referral_code', $referralCode), 60 * 24 * 365);
});

Route::get('/guy', function () {
    $referralCode = 'e4af69fd-acc8-4c41-b7e8-74dbb4d19aae';
    return response(view('home'))->cookie('referral_code', request()->cookie('referral_code', $referralCode), 60 * 24 * 365);
});

Route::post('/gated-inbox/webhook', [IncomingWebhookController::class, 'create'])->name('gated-inbox.webhook.create');
Route::get('/gated-inbox/{requestUuid}', [MessageController::class, 'show'])->name('gated-inbox.request.show');

Route::view('/app/{path?}', 'app')->where('path', '.*')->name('app');
Route::view('/checkout/{path?}', 'app')->where('path', '.*')->name('app');
Route::view('/donate/{path?}', 'app')->where('path', '.*')->name('app');
Route::view('/gated-inbox-request/{path?}', 'app')->where('path', '.*')->name('app');
Route::get('/invoice/{invoiceUuid}', [CheckoutController::class, 'show'])->name('checkout.show');
Route::view('/pw/{path?}', 'app')->where('path', '.*')->name('app');

Route::get('/is-signed-in', function () {
    return response()->json([
        'signedIn' => auth()->check(),
    ]);
});

Route::view('/api-docs', 'scribe.index')->name('api-docs');
Route::view('api-docs/postman', 'scribe.postman')->name('api-docs.postman');
Route::view('api-docs/openapi', 'scribe.openapi')->name('api-docs.openapi');

Route::get('/poll/{bitcoinableType}/{bitcoinableUuid}', [BitcoinableController::class, 'poll'])->name('bitcoinable.poll')->middleware(['throttle:polling']);
Route::get('/invoice-status/{invoiceUuid}', [StoreInvoiceController::class, 'status'])->name('store.invoice.status');

/** Donation Pages & Donations */
Route::post('donation/{donationPageSlug}', [DonationController::class, 'create'])->name('donation.create')->middleware(['throttle:checkouts']);
Route::get('donation-status/{donationUuid}', [DonationController::class, 'status'])->name('donation.status');
Route::get('donation-page/{donationPageSlug}', [DonationPagePublicController::class, 'show'])->name('donation-page.public.show');
Route::get('donation-page/{donationPageSlug}/donations', [DonationPagePublicController::class, 'index'])->name('donation-page.public.donation.index');

/** Paywall Requests */
Route::post('p/{paywallUuid}', [PaywallRequestController::class, 'create'])->name('paywall.request.create')->middleware(['throttle:checkouts']);
/** Public Paywall */
Route::get('p/{paywallUuid}', [PaywallController::class, 'unpaid'])->name('paywall.public.unpaid');
Route::post('p/{paywallUuid}/paid/{paywallRequestUuid}', [PaywallController::class, 'paid'])->name('paywall.public.paid');


Route::middleware('auth')->group(function () {
    /** Dashboard */
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    /** User */
    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'show'])->name('user.show');

        /** Api Tokens */
        Route::prefix('api-tokens')->group(function () {
            Route::get('/', [ApiTokenController::class, 'index'])->name('user.api-tokens.index');
            Route::post('/', [ApiTokenController::class, 'create'])->name('user.api-tokens.create');
            Route::delete('/{token}', [ApiTokenController::class, 'delete'])->name('user.api-tokens.delete');
        });

        /** Referrals */
        Route::prefix('referral')->group(function () {
            Route::get('/', [ReferralController::class, 'index'])->name('user.referrals.index');
        });

        /** Notification Settings */
        Route::prefix('notification-settings')->group(function () {
            Route::get('/', [NotificationSettingsController::class, 'show'])->name('user.notification-settings.show');
            Route::put('/', [NotificationSettingsController::class, 'update'])->name('user.notification-settings.update');
        });
    });

    /** Withdraw */
    Route::prefix('withdrawal')->group(function () {
        Route::get('/', [WithdrawalController::class, 'index'])->name('withdrawal.index');
        Route::get('/settings', [WithdrawalSettingsController::class, 'show'])->name('withdrawal.settings.show');
        Route::put('/settings', [WithdrawalSettingsController::class, 'update'])->name('withdrawal.settings.update');
        Route::get('/metrics', [WithdrawalController::class, 'metrics'])->name('withdrawal.metrics');
        Route::get('/uuid/{withdrawalUuid}', [WithdrawalController::class, 'show'])->name('withdrawal.show');
        Route::post('/lightning-address', [WithdrawalController::class, 'lightningAddress'])->name('withdrawal.lightning-address');
    });

    Route::get('/invoices/{invoiceUuid}', [StoreInvoiceController::class, 'getInvoicebyUuid'])->name('store.invoice.show.uuid');

    /** Stores */
    Route::prefix('stores')->group(function () {
        Route::get('/', [StoreController::class, 'index'])->name('store.index');
        Route::post('/', [StoreController::class, 'create'])->name('store.create')->middleware(['throttle:creating']);
        Route::get('/{uuid}', [StoreController::class, 'show'])->name('store.show');
        Route::put('/{uuid}', [StoreController::class, 'update'])->name('store.update');
        Route::delete('/{uuid}', [StoreController::class, 'delete'])->name('store.delete');

        /** Invoices */
        Route::get('/{storeUuid}/invoices/{invoiceUuid}', [StoreInvoiceController::class, 'show'])->name('store.invoice.show');
        Route::get('/{storeUuid}/invoices', [StoreInvoiceController::class, 'index'])->name('store.invoice.index');
        Route::post('/{storeUuid}/invoices', [StoreInvoiceController::class, 'create'])->name('store.invoice.create')->middleware(['throttle:checkouts']);

        /** Metrics */
        Route::get('/{storeUuid}/metrics/revenue/today/hour', [StoreMetricsController::class, 'getRevenueTodayByHour'])->name('store.metrics.revenue.today.hour');
        Route::get('/{storeUuid}/metrics/revenue/yesterday/hour', [StoreMetricsController::class, 'getRevenueYesterdayByHour'])->name('store.metrics.revenue.yesterday.hour');
        Route::get('/{storeUuid}/metrics/revenue/last-thirty-days/day', [StoreMetricsController::class, 'getRevenueLastThirtyDaysByDay'])->name('store.metrics.revenue.last-thirty-days.day');
        Route::get('/{storeUuid}/metrics/revenue/previous-thirty-days/day', [StoreMetricsController::class, 'getRevenuePreviousThirtyDaysByDay'])->name('store.metrics.revenue.previous-thirty-days.day');
        Route::get('/{storeUuid}/metrics/revenue/all-time/month', [StoreMetricsController::class, 'getRevenueAllTimeByMonth'])->name('store.metrics.revenue.all-time.month');
    });

    Route::prefix('donation_page')->group(function () {
        /** Donation Pages */
        Route::get('/', [DonationPageController::class, 'index'])->name('donation-page.index');
        Route::get('/{slug}', [DonationPageController::class, 'show'])->name('donation-page.show');
        Route::post('/{uuid}', [DonationPageController::class, 'update'])->name('donation-page.update');
        Route::delete('/{uuid}', [DonationPageController::class, 'delete'])->name('donation-page.delete');
        Route::post('/', [DonationPageController::class, 'create'])->name('donation-page.create')->middleware(['throttle:creating']);
        Route::get('/{uuid}/metrics', [DonationPageController::class, 'metrics'])->name('donation-page.metrics');
        Route::get('/{uuid}/donations', [DonationController::class, 'index'])->name('donation-page.donations.index');
        Route::get('/{uuid}/paid-donations', [DonationController::class, 'paidIndex'])->name('donation-page.donations.paid.index');
        Route::get('/{donationPageUuid}/donations/{donationUuid}', [DonationController::class, 'show'])->name('donation-page.donations.show');
    });

    // Create a Route prefix group for Contests with all the crud routes
    Route::prefix('contest')->group(function () {
        /** Contests */
        Route::get('/', [ContestController::class, 'index'])->name('contest.index');
        Route::get('/{contestUuid}', [ContestController::class, 'show'])->name('contest.show');
        Route::put('/{contestUuid}', [ContestController::class, 'update'])->name('contest.update');
        Route::delete('/{contestUuid}', [ContestController::class, 'delete'])->name('contest.delete');
        Route::post('/', [ContestController::class, 'create'])->name('contest.create');
    });

    // Create a route prefix group for Inboxes
    Route::prefix('inbox')->group(function () {
        /** Inboxes */
        Route::get('/', [InboxController::class, 'index'])->name('inbox.index');
        Route::get('/{inboxUuid}', [InboxController::class, 'show'])->name('inbox.show');
        Route::put('/{inboxUuid}', [InboxController::class, 'update'])->name('inbox.update');
        Route::delete('/{inboxUuid}', [InboxController::class, 'delete'])->name('inbox.delete');
        Route::post('/', [InboxController::class, 'create'])->name('inbox.create')->middleware(['throttle:creating']);
        Route::get('/{inboxUuid}/metrics', [InboxController::class, 'metrics'])->name('inbox.metrics');

        /** Messages */
        Route::get('/{inboxUuid}/message', [MessageController::class, 'index'])->name('inbox.message.index');
        Route::get('/{inboxUuid}/message/{messageUuid}', [MessageController::class, 'showMessage'])->name('inbox.message.show');
    });

    // Create a route prefix group for Paywalls
    Route::prefix('paywall')->group(function () {
        /** Paywalls */
        Route::get('/', [PaywallController::class, 'index'])->name('paywall.index');
        Route::post('/', [PaywallController::class, 'create'])->name('paywall.create')->middleware(['throttle:creating']);
        Route::get('/requests', [PaywallRequestController::class, 'globalIndex'])->name('paywall.requests.global.index');
        Route::get('/request/{requestUuid}', [PaywallRequestController::class, 'byUuid'])->name('paywall.request.by.uuid');

        Route::prefix('/uuid/{paywallUuid}')->group(function () {
            Route::get('/', [PaywallController::class, 'show'])->name('paywall.show');
            Route::put('/', [PaywallController::class, 'update'])->name('paywall.update');
            Route::delete('/', [PaywallController::class, 'delete'])->name('paywall.delete');
            Route::get('/request', [PaywallRequestController::class, 'index'])->name('paywall.requests.index');
            Route::get('/request/{requestUuid}', [PaywallRequestController::class, 'show'])->name('paywall.requests.show');
            Route::get('/metrics', [PaywallMetricsController::class, 'paywallRevenueMetricsSummary'])->name('paywall.metrics.summary');
        });

        /** All Paywalls Metrics */
        Route::get('/metrics/revenue/all/all-time', [PaywallMetricsController::class, 'paywallsRevenueAllTimeByUser'])->name('paywall.metrics.revenue.all.all-time');
        Route::get('/metrics/revenue/all/today', [PaywallMetricsController::class, 'paywallsRevenueTodayByUserByHour'])->name('paywall.metrics.revenue.all.today');
        Route::get('/metrics/revenue/all/last-thirty-days', [PaywallMetricsController::class, 'paywallsRevenueLastThirtyDaysByUserByDay'])->name('paywall.metrics.revenue.all.last-thirty-days');
    });

    // Create a route prefix group for Bitcoinable Webhooks
    Route::prefix('bitcoinable_webhook')->group(function () {
        /** Bitcoinable Webhooks */
        Route::get('/', [BitcoinableWebhookController::class, 'index'])->name('bitcoinable-webhook.index');
        Route::get('/uuid/{webhookUuid}', [BitcoinableWebhookController::class, 'show'])->name('bitcoinable-webhook.show');
        Route::put('/uuid/{webhookUuid}', [BitcoinableWebhookController::class, 'update'])->name('bitcoinable-webhook.update');
        Route::delete('/uuid/{webhookUuid}', [BitcoinableWebhookController::class, 'delete'])->name('bitcoinable-webhook.delete');
        Route::post('/', [BitcoinableWebhookController::class, 'create'])->name('bitcoinable-webhook.create');
        Route::get('/type/{type}', [BitcoinableWebhookController::class, 'indexByType'])->name('bitcoinable-webhook.index-by-type');
        Route::get('/type/{type}/uuid/{webhookUuid}', [BitcoinableWebhookController::class, 'indexByModel'])->name('bitcoinable-webhook.indexByModel');
    });

    // Create a route prefix group for Transactions
    Route::prefix('transaction')->group(function () {
        /** Transactions */
        Route::get('/', [TransactionController::class, 'index'])->name('transaction.index');
        Route::get('/withdrawals', [TransactionController::class, 'withdrawals'])->name('transaction.withdrawals');
        Route::get('/donations', [TransactionController::class, 'donations'])->name('transaction.donations');
        Route::get('/store-invoices', [TransactionController::class, 'storeInvoices'])->name('transaction.store-invoices');
        Route::get('/gated-messages', [TransactionController::class, 'gatedMessages'])->name('transaction.gated-messages');
        Route::get('/referral-fees', [TransactionController::class, 'referralFees'])->name('transaction.referral-fees');
        Route::get('/paywall-requests', [TransactionController::class, 'paywallRequests'])->name('transaction.paywall-requests');
        Route::get('/lightning-address-payments', [TransactionController::class, 'lightningAddressPayments'])->name('transaction.lightning-address-payments');
        Route::get('/uuid/{transactionUuid}', [TransactionController::class, 'show'])->name('transaction.show');
        Route::post('/export-csv/date-range', [TransactionController::class, 'exportCsvByDateRange'])->name('transaction.export-csv.date-range');
    });

    Route::prefix('prism')->group(function () {
        /** Prisms */
        Route::post('/', [PrismController::class, 'create'])->name('prism.create');
        Route::get('/', [PrismController::class, 'index'])->name('prism.index');
        Route::get('/uuid/{prismUuid}', [PrismController::class, 'show'])->name('prism.show');
    });
});

require __DIR__ . '/auth.php';
require __DIR__ . '/well-known.php';
