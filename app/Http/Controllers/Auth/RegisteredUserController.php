<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        if (env('DISABLE_REGISTRATION') == true) {
            return response()->json([
                'message' => 'Registration is disabled',
            ], 422);
        }
        
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'max:100', 'confirmed', Rules\Password::defaults()],
        ]);

        // if email contains "nodeless.io", throw error
        if (strpos($request->email, 'nodeless.io') !== false) {
            return response()->json([
                'message' => 'You cannot register with a nodeless.io email address',
            ], 422);
        }

        $referralCode = $request->cookie('referral_code');
        $referrer = $referralCode ? User::where('uuid', $referralCode)->first() : null;
        $referralCode = $referrer ? $referralCode : null;

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'referred_by' => $referralCode,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->noContent();
    }
}
