<?php

namespace App\Http\Controllers\Responses;

use App\Models\Bitcoinable;
use Illuminate\Database\Eloquent\Model;
use chillerlan\QRCode\QRCode;
use ReflectionClass;

class BitcoinableResponse
{
    public string $onchain_addr;
    public string $lightning_invoice;
    public string $unified_qr_code;
    public string $onchain_qr_code;
    public string $lightning_qr_code;
    public string $lightning_link;
    public string $onchain_link;
    public string $unified_link;
    public Model $model;
    public Bitcoinable $bitcoinable;

    public function __construct(Model $model, Bitcoinable $bitcoinable)
    {
        $bitcoinableName = str()->snake((new ReflectionClass($bitcoinable))->getShortName());
        $modelName = str()->snake((new ReflectionClass($model))->getShortName());

        $bitcoinAmount = bcdiv($bitcoinable->amount, 100000000, 8);
        $unifiedQrString = 'bitcoin:' . $bitcoinable->bitcoin_address->address . '?amount=' . $bitcoinAmount . '&lightning=' . $bitcoinable->lightning_invoice->payment_request;
        $onChainQrString = 'bitcoin:' . $bitcoinable->bitcoin_address->address . '?amount=' . $bitcoinAmount;
        $lightningString = 'lightning:' . $bitcoinable->lightning_invoice->payment_request;

        $this->$bitcoinableName = $bitcoinable;
        $this->$modelName = $model;
        $this->unified_qr_code = (new QrCode())->render($unifiedQrString);
        $this->onchain_qr_code = (new QrCode())->render($onChainQrString);
        $this->lightning_qr_code = (new QrCode())->render($bitcoinable->lightning_invoice->payment_request);
        $this->lightning_link = $lightningString;
        $this->onchain_link = $onChainQrString;
        $this->unified_link = $unifiedQrString;
    }
}
