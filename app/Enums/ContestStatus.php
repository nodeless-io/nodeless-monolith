<?php

namespace App\Enums;

enum ContestStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case UPCOMING = 'upcoming';
    case PAST = 'past';
    case CANCELLED = 'cancelled';
}
