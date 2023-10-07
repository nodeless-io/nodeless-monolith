<?php

namespace App\Enums;

enum BitcoinableNetworkType: string
{
    use EnumHelper;

    case LIGHTNING = 'lightning';
    case ONCHAIN = 'onchain';
    case LIQUID = 'liquid';
    case CASHU = 'cashu';
    case FEDIMINT = 'fedimint';
    case ARK = 'ark';
}
