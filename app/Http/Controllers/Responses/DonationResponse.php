<?php

namespace App\Http\Controllers\Responses;

use App\Models\Donation;
use chillerlan\QRCode\QRCode;

class DonationResponse
{
    public Donation $donation;
    public string $qrCode;

    public function __construct(Donation $donation)
    {
        $bitcoinAmount = number_format($donation->amount / 100000000, 8, '.', '');

        $unifiedQrString =
            'bitcoin:' . $donation->bitcoin_address->address .
            '?amount=' . $bitcoinAmount .
            '&lightning=' . $donation->lightning_invoice->payment_request;

        $qrCode = (new QrCode())->render($unifiedQrString);

        $this->donation = $donation;
        $this->qrCode = $qrCode;
    }
}
