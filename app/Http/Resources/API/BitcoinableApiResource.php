<?php

namespace App\Http\Resources\API;

use Illuminate\Http\Resources\Json\JsonResource;
use chillerlan\QRCode\QRCode;

class BitcoinableApiResource extends JsonResource
{
    public function status()
    {
        return [
            'status' => $this->pollStatus()->value,
            'expires_at' => $this->created_at->addMinutes(15)->toDateTimeString(),
            'ttl_seconds' => $this->created_at->addMinutes(15)->isPast() ? 0 : $this->created_at->addMinutes(15)->diffInSeconds(now()),
        ];
    }

    public function generateUnifiedQRCode(string $bitcoinAddress, string $paymentRequest, int $amount): string
    {
        $unifiedQrString =
            'bitcoin:' . $bitcoinAddress .
            '?amount=' . $this->satsToBtc($amount) .
            '&lightning=' . $paymentRequest;

        return $this->generateQRCode($unifiedQrString);
    }

    public function generateQRCode(string $data): string
    {
        return (new QrCode())->render($data);
    }

    public function satsToBtc(int $sats): float
    {
        return number_format($sats / 100000000, 8, '.', '');
    }
}
