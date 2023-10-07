<?php

namespace App\Enums;

enum DonationType: string
{
    case LIGHTNING = 'lightning';
    case ONCHAIN = 'onchain';
}
