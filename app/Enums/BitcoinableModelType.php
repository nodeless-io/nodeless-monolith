<?php

namespace App\Enums;

enum BitcoinableModelType: string
{
    use EnumHelper;

    case DONATION = 'App\\Models\\Donation';
    case STORE_INVOICE = 'App\\Models\\StoreInvoice';
    case PAYWALL_REQUEST = 'App\\Models\\PaywallRequest';
    case INBOX_MESSAGE = 'App\\Models\\GatedMessage';
}
