<?php

namespace App\Enums;

enum BitcoinableWebhookType: string
{
    use EnumHelper;

    case STORE = 'store';
    case DONATION_PAGE = 'donation_page';
    case PAYWALL = 'paywall';
    case INBOX = 'inbox';
}
