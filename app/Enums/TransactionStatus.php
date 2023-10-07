<?php

namespace App\Enums;

enum TransactionStatus: string
{
    use EnumHelper;

    case PENDING = 'pending';
    case SETTLED = 'settled';
}
