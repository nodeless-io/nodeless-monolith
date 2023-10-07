<?php

namespace App\Enums;

enum TransactionType: string
{
    use EnumHelper;

    case CREDIT = 'credit';
    case DEBIT = 'debit';
}
