<?php

namespace App\Enums;

enum PrismPayoutStatus: string
{
    use EnumHelper;

    case NEW = 'new';
    case PENDING = 'pending';
    case PAID = 'paid';
    case PARTIAL = 'partial';
    case FAILED = 'failed';
}
