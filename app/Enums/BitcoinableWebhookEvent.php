<?php

namespace App\Enums;

enum BitcoinableWebhookEvent: string
{
    use EnumHelper;

    case NEW = 'new';
    case PENDING_CONFIRMATION = 'pending_confirmation';
    case PAID = 'paid';
    case EXPIRED = 'expired';
    case CANCELLED = 'cancelled';
    case UNDERPAID = 'underpaid';
    case OVERPAID = 'overpaid';
    case IN_FLIGHT = 'in_flight';
}
