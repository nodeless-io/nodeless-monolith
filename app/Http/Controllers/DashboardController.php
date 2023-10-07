<?php

namespace App\Http\Controllers;

use App\Http\Resources\Dashboard\DashboardResource;
use App\Repositories\DashboardRepository;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(): DashboardResource
    {
        return new DashboardResource(auth()->user());
    }
}
