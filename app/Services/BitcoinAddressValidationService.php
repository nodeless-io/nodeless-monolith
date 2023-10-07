<?php

namespace App\Services;

class BitcoinAddressValidationService
{
    public const MAINNET = "MAINNET";
    public const TESTNET = "TESTNET";

    public const MAINNET_PUBKEY = "00";
    public const MAINNET_SCRIPT = "05";

    public const TESTNET_PUBKEY = "6F";
    public const TESTNET_SCRIPT = "C4";

    public static function typeOf($addr)
    {
        if (preg_match('/[^1-9A-HJ-NP-Za-km-z]/', $addr)) {
            return false;
        }

        $decoded = self::decodeAddress($addr);

        if (strlen($decoded) != 50) {
            return false;
        }

        $version = substr($decoded, 0, 2);

        $check = substr($decoded, 0, strlen($decoded) - 8);
        $check = pack("H*", $check);
        $check = hash("sha256", $check, true);
        $check = hash("sha256", $check);
        $check = strtoupper($check);
        $check = substr($check, 0, 8);

        $isValid = ($check == substr($decoded, strlen($decoded) - 8));

        return ($isValid ? $version : false);
    }

    public static function isValid($addr, $version = null)
    {
        $type = self::typeOf($addr);

        if ($type === false) {
            return false;
        }

        if (is_null($version)) {
            $version = self::MAINNET;
        }

        switch ($version) {
            case self::MAINNET:
                $valids = [self::MAINNET_PUBKEY, self::MAINNET_SCRIPT];
                break;
            case self::TESTNET:
                $valids = [self::TESTNET_PUBKEY, self::TESTNET_SCRIPT];
                break;
            case self::MAINNET_PUBKEY:
            case self::MAINNET_SCRIPT:
            case self::TESTNET_PUBKEY:
            case self::TESTNET_SCRIPT:
                $valids = [$version];
                break;
            default:
                throw new \Exception('Unknown version constant');
        }

        return in_array($type, $valids);
    }

    protected static function decodeAddress($data)
    {
        $charsetHex = '0123456789ABCDEF';
        $charsetB58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

        $raw = "0";
        for ($i = 0; $i < strlen($data); $i++) {
            $current = (string) strpos($charsetB58, $data[$i]);
            $raw = (string) bcmul($raw, "58", 0);
            $raw = (string) bcadd($raw, $current, 0);
        }

        $hex = "";
        while (bccomp($raw, 0) == 1) {
            $dv = (string) bcdiv($raw, "16", 0);
            $rem = (int) bcmod($raw, "16");
            $raw = $dv;
            $hex = $hex . $charsetHex[$rem];
        }

        $withPadding = strrev($hex);
        for ($i = 0; $i < strlen($data) && $data[$i] == "1"; $i++) {
            $withPadding = "00" . $withPadding;
        }

        if (strlen($withPadding) % 2 != 0) {
            $withPadding = "0" . $withPadding;
        }

        return $withPadding;
    }
}
