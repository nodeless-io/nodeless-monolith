<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Google2FA;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;

class TwoFactorAuthController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        if (auth()->user()->google2fa_secret) {
            return response()->json([
                'enabled' => true,
            ], 200);
        }

        $secret = Google2FA::generateSecretKey();

        $imageDataUri = Google2FA::getQRCodeInline(
            $request->getHttpHost(),
            auth()->user()->email,
            $secret,
            200
        );

        return response()->json([
            'enabled' => false,
            'qrCode' => $imageDataUri,
            'secret' => $secret,
        ], 201);
    }

    public function enable(Request $request): JsonResponse
    {
        $request->validate([
            'code' => 'required',
            'secret' => 'required',
        ]);
        $valid = Google2FA::verifyKey($request->secret, $request->code, 8);

        if (!$valid) {
            return response()->json([
                'message' => 'Invalid verification code'
            ], 422);
        }

        auth()->user()->update([
            'google2fa_secret' => Crypt::encrypt($request->secret),
        ]);

        return response()->json([
            'message' => 'Two factor authentication has been enabled'
        ]);
    }

    public function disable(Request $request): JsonResponse
    {
        $request->validate([
            'code' => 'required',
        ]);

        $valid = Google2FA::verifyKey(Crypt::decrypt(auth()->user()->google2fa_secret), $request->code, 8);

        if (!$valid) {
            return response()->json([
                'message' => 'Invalid verification code'
            ], 422);
        }

        auth()->user()->update([
            'google2fa_secret' => null,
        ]);

        return response()->json([
            'message' => 'Two factor authentication has been disabled'
        ]);
    }

    public function verify(Request $request): JsonResponse
    {
        $google2fa = app(Google2FA::class);
        $secret = $request->input('secret');

        $userUuid = $request->session()->get('2fa:user:id');

        $user = User::where('uuid', $userUuid)->firstOrFail();

        $valid = Google2FA::verifyKey(Crypt::decrypt($user->google2fa_secret), $secret, 8);

        if (!$valid) {
            return response()->json([
                'message' => 'Invalid verification code'
            ], 422);
        }

        //login and redirect user
        Auth::loginUsingId($user->id);

        return response()->json([
            'message' => 'Two factor authentication successful'
        ]);
    }
}
