<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\TwoFactorAuthController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware(['guest', 'throttle:register'])
                ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->middleware('guest')
                ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->middleware('guest')
                ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->middleware('guest')
                ->name('password.store');

Route::post('/change-password', [NewPasswordController::class, 'change'])
                ->middleware(['auth', 'signed', 'throttle:6,1'])
                ->name('password.change');

Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
                ->middleware(['auth', 'signed', 'throttle:6,1'])
                ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware(['auth', 'throttle:6,1'])
                ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');

Route::get('/2fa/show', [TwoFactorAuthController::class, 'show'])
                ->middleware('auth')
                ->name('2fa.show');

Route::post('/2fa/enable', [TwoFactorAuthController::class, 'enable'])
                ->middleware('auth')
                ->name('2fa.enable');

Route::post('/2fa/disable', [TwoFactorAuthController::class, 'disable'])
                ->middleware('auth')
                ->name('2fa.disable');

Route::post('/2fa/verify', [TwoFactorAuthController::class, 'verify'])
                ->name('2fa.verify');

Route::post('/change-password', [NewPasswordController::class, 'change'])
                ->middleware('auth')
                ->name('password.change');
