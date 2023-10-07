<?php

namespace App\Enums;

enum BitcoinableWebhookStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}
