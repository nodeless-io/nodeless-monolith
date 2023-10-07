<?php

namespace App\Http\Controllers\Responses;

use App\Models\StoreInvoice;

class StoreInvoiceResponse extends BitcoinableResponse
{
    public string $checkout_link;

    public function __construct(StoreInvoice $store_invoice)
    {
        parent::__construct($store_invoice->store, $store_invoice);

        $this->checkout_link = env('APP_URL') . '/checkout/' . $store_invoice->uuid;
    }
}
