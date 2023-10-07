<?php

return [
    'fees' => [
        'base_fee' => 100, // sats
        'fee_rate' => 0.01, // 1
    ],

    'store_invoices' => [
        'min_amount' => 1000, // sats
        'max_amount' => 1000 * 1000 * 5, // 5 million sats
    ],

    'withdrawals' => [
        'onchain_fee' => 0,
        'lightning_fee' => 0,
        'min_onchain_amount' => 500000, // sats
        'min_lightning_amount' => 1000, // sats
    ],

    'lnurl' => [
        'min_sendable' => 1 * 1000, // millisats,
        'max_sendable' => 1000 * 1000 * 1000 * 3, // millisats,
    ],

    'limits' => [
        'min_bitcoinable' => 1000, // sats
        'max_bitcoinable' => 1000 * 1000 * 10, // 10 million sats
        'no_fee_under' => 5000, // sats
    ]
];
