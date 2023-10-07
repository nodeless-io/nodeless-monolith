<?php

namespace App\Services;

use App\Models\Donation;
use App\Models\StoreInvoice;
use Illuminate\Support\Facades\Log;
use UtxoOne\LndPhp\Enums\WalletKit\AddressType;
use UtxoOne\LndPhp\Models\Lightning\AddrToAmountEntryList;
use UtxoOne\LndPhp\Models\Lightning\Invoice as LightningInvoice;
use UtxoOne\LndPhp\Models\Lightning\NodeInfo;
use UtxoOne\LndPhp\Responses\Lightning\AddInvoiceResponse;
use UtxoOne\LndPhp\Services\LightningService;
use UtxoOne\LndPhp\Services\WalletKitService;
use UtxoOne\LndPhp\Models\Lightning\UtxoList;
use UtxoOne\LndPhp\Responses\Lightning\SendResponse;

class LndService
{
    private LightningService $lnd;
    private WalletKitService $walletKit;
    private string $lndHost;
    private int $lndPort;
    private string $lndMacaroonHex;
    private string $lndTlsCert;

    public function __construct()
    {
        $this->lndHost = env('LND_HOST');
        $this->lndPort = env('LND_PORT');
        $this->lndMacaroonHex = env('LND_MACAROON_HEX');
        $this->lndTlsCert = env('LND_TLS_CERT');

        $this->lnd = new LightningService(
            host: $this->lndHost,
            port: $this->lndPort,
            macaroonHex: $this->lndMacaroonHex,
            tlsCertificate: $this->lndTlsCert,
            useSsl: true,
        );

        $this->walletKit = new WalletKitService(
            host: $this->lndHost,
            port: $this->lndPort,
            macaroonHex: $this->lndMacaroonHex,
            tlsCertificate: $this->lndTlsCert,
            useSsl: true,
        );
    }

    public function getNodeInfo(): NodeInfo
    {
        return $this->lnd->getInfo();
    }

    public function createLightningInvoice(int $amount, string $memo): AddInvoiceResponse
    {
        return $this->lnd->addInvoice(
            value: $amount,
            expiry: 60 * 5, // 5 minutes
            memo: $memo,
        );
    }

    public function createLightningInvoiceForLnUrl(int $amount, string $descriptionHash): AddInvoiceResponse
    {
        return $this->lnd->addInvoice(
            value: $amount,
            expiry: 60 * 5, // 5 minutes
            descriptionHash: $descriptionHash,
        );
    }

    public function getLightningInvoice(string $rHash): LightningInvoice
    {
        return $this->lnd->lookupInvoice(
            rHash: $rHash,
        );
    }

    public function getNextAddr(): string
    {
        return $this->walletKit->nextAddr(
            type: AddressType::TAPROOT_PUBKEY
        )->getAddr();
    }

    public function getUtxos(): UtxoList
    {
        return $this->walletKit->listUnspent(minConfs: 0)->getUtxos();
    }

    public function isAddressUsed(string $address): bool
    {
        // Check all the StoreInvoices to see if the address is already used.
        if (StoreInvoice::where('onchain_addr', $address)->exists()) {
            return true;
        }

        // Check all the Donations to see if the address is already used.
        if (Donation::where('onchain_addr', $address)->exists()) {
            return true;
        }

        return false;
    }

    public function sendMany(AddrToAmountEntryList $addrToAmountList): string
    {
        $guzzleClient = new \GuzzleHttp\Client();
        $response = $guzzleClient->get('https://mempool.space/api/v1/fees/recommended');

        $hourFee = json_decode($response->getBody())->hourFee;

        return $this->lnd->sendMany(
            addrToAmountEntryList: $addrToAmountList,
            satPerVbyte: $hourFee,
        )->getTxid();
    }

    public function sendLightningPayment(string $paymentRequest): SendResponse
    {
        return $this->lnd->sendPaymentSync(
            paymentRequest: $paymentRequest,
            allowSelfPayment: true,
        );
    }

    public function payLightningAddress(int $amount, string $address): SendResponse
    {
        $domain = explode('@', $address)[1];
        $identifier = explode('@', $address)[0];
        $milisatsAmount = $amount * 1000;

        $http = new \GuzzleHttp\Client();
        $callbackResponse = $http->get('https://' . $domain . '/.well-known/lnurlp/' . $identifier);

        $callbackJson = json_decode($callbackResponse->getBody());

        if ($callbackResponse->getStatusCode() !== 200) {
            Log::error('Did not get a 200 response from lnurl endpoint for address: ' . $address);
            throw new \Exception('Did not get a 200 response from lnurl endpoint for address: ' . $address);
        }

        if ($callbackJson->tag !== 'payRequest') {
            Log::error('Did not get a payRequest tag from lnurl endpoint for address: ' . $address);
            throw new \Exception('Did not get a payRequest tag from lnurl endpoint for address: ' . $address);
        }

        if ($milisatsAmount < $callbackJson->minSendable || $milisatsAmount > $callbackJson->maxSendable) {
            throw new \Exception('Amount is out of range. Min: ' . $callbackJson->minSendable . ' Max: ' . $callbackJson->maxSendable . ' Amount: ' . $milisatsAmount);
        }

        $paymentRequestResponse = $http->get($callbackJson->callback . '?amount=' . $milisatsAmount);

        $paymentRequestJson = json_decode($paymentRequestResponse->getBody());

        //validate that the invoice amount matches expected amount - tbd
        $client = new \GuzzleHttp\Client();
        $response = $client->get('http://lightning-decoder.nodeless.io/api/decode/bolt11/' . $paymentRequestJson->pr);

        $satoshiAmount = json_decode($response->getBody())->satsoshis;

        if ($satoshiAmount !== $amount) {
            Log::error('Amount does not match expected amount. Expected: ' . $amount . ' Actual: ' . $satoshiAmount);
            throw new \Exception('Amount does not match expected amount. Expected: ' . $amount . ' Actual: ' . $satoshiAmount);
        }

        try {
            $sendResponse = $this->sendLightningPayment($paymentRequestJson->pr);

            if ($sendResponse->getPaymentError() !== '') {
                Log::error($sendResponse->getPaymentError());
                throw new \Exception($sendResponse->getPaymentError());
            }

            return $sendResponse;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \Exception($e->getMessage());
        }
    }
}
