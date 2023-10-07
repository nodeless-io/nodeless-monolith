<?php

namespace App\Enums;

enum StoreInvoiceType: string
{
    case LIGHTNING = 'lightning';
    case ONCHAIN = 'onchain';
}
