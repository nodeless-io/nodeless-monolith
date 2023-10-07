<?php

namespace App\Http\Controllers\Referral;

use App\Http\Controllers\Controller;
use App\Http\Resources\Referral\ReferralResource;
use App\Repositories\ReferralRepository;
use Illuminate\Http\Request;

class ReferralController extends Controller
{
    public function __construct(private ReferralRepository $referralRepository)
    {
    }

    public function index()
    {
        return new ReferralResource(auth()->user());
    }
}
