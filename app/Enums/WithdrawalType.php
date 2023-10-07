<?php

namespace App\Enums;

enum WithdrawalType: string
{
    use EnumHelper;

    case ONCHAIN = 'onchain';
    case LIGHTNING = 'lightning';
    case CASHU = 'cashu';
    case LIQUID = 'liquid';
    case ARK = 'ark';
}
