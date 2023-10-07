<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Nodeless.io API Documentation</title>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.style.css") }}" media="screen">
    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.print.css") }}" media="print">

    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>

    <link rel="stylesheet"
          href="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/obsidian.min.css">
    <script src="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jets/0.14.1/jets.min.js"></script>

    <style id="language-style">
        /* starts out as display none and is replaced with js later  */
                    body .content .bash-example code { display: none; }
                    body .content .javascript-example code { display: none; }
                    body .content .php-example code { display: none; }
                    body .content .python-example code { display: none; }
            </style>

    <script>
        var baseUrl = "https://testnet.nodeless.io";
        var useCsrf = Boolean();
        var csrfUrl = "/sanctum/csrf-cookie";
    </script>
    <script src="{{ asset("/vendor/scribe/js/tryitout-4.16.0.js") }}"></script>

    <script src="{{ asset("/vendor/scribe/js/theme-default-4.16.0.js") }}"></script>

</head>

<body data-languages="[&quot;bash&quot;,&quot;javascript&quot;,&quot;php&quot;,&quot;python&quot;]">

<a href="#" id="nav-button">
    <span>
        MENU
        <img src="{{ asset("/vendor/scribe/images/navbar.png") }}" alt="navbar-image"/>
    </span>
</a>
<div class="tocify-wrapper">
    
            <div class="lang-selector">
                                            <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                            <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                                            <button type="button" class="lang-button" data-language-name="php">php</button>
                                            <button type="button" class="lang-button" data-language-name="python">python</button>
                    </div>
    
    <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
    </div>

    <div id="toc">
                    <ul id="tocify-header-introduction" class="tocify-header">
                <li class="tocify-item level-1" data-unique="introduction">
                    <a href="#introduction">Introduction</a>
                </li>
                            </ul>
                    <ul id="tocify-header-authenticating-requests" class="tocify-header">
                <li class="tocify-item level-1" data-unique="authenticating-requests">
                    <a href="#authenticating-requests">Authenticating requests</a>
                </li>
                            </ul>
                    <ul id="tocify-header-paywall-requests" class="tocify-header">
                <li class="tocify-item level-1" data-unique="paywall-requests">
                    <a href="#paywall-requests">Paywall Requests</a>
                </li>
                                    <ul id="tocify-subheader-paywall-requests" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="paywall-requests-POSTapi-v1-paywall--id--request">
                                <a href="#paywall-requests-POSTapi-v1-paywall--id--request">Create a Paywall Request</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywall-requests-GETapi-v1-paywall--id--request--requestId-">
                                <a href="#paywall-requests-GETapi-v1-paywall--id--request--requestId-">Get a Paywall Request</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywall-requests-GETapi-v1-paywall--id--request--requestId--status">
                                <a href="#paywall-requests-GETapi-v1-paywall--id--request--requestId--status">Get Paywall Request Status</a>
                            </li>
                                                                        </ul>
                            </ul>
                    <ul id="tocify-header-paywall-webhooks" class="tocify-header">
                <li class="tocify-item level-1" data-unique="paywall-webhooks">
                    <a href="#paywall-webhooks">Paywall Webhooks</a>
                </li>
                                    <ul id="tocify-subheader-paywall-webhooks" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="paywall-webhooks-GETapi-v1-paywall--id--webhook">
                                <a href="#paywall-webhooks-GETapi-v1-paywall--id--webhook">Get Paywall Webhooks</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywall-webhooks-POSTapi-v1-paywall--id--webhook">
                                <a href="#paywall-webhooks-POSTapi-v1-paywall--id--webhook">Create Paywall Webhook</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywall-webhooks-GETapi-v1-paywall--id--webhook--webhookId-">
                                <a href="#paywall-webhooks-GETapi-v1-paywall--id--webhook--webhookId-">Get Paywall Webhook</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywall-webhooks-DELETEapi-v1-paywall--id--webhook--webhookId-">
                                <a href="#paywall-webhooks-DELETEapi-v1-paywall--id--webhook--webhookId-">Delete Paywall Webhook</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywall-webhooks-PUTapi-v1-paywall--id--webhook--webhookId-">
                                <a href="#paywall-webhooks-PUTapi-v1-paywall--id--webhook--webhookId-">Update Paywall Webhook</a>
                            </li>
                                                                        </ul>
                            </ul>
                    <ul id="tocify-header-paywalls" class="tocify-header">
                <li class="tocify-item level-1" data-unique="paywalls">
                    <a href="#paywalls">Paywalls</a>
                </li>
                                    <ul id="tocify-subheader-paywalls" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="paywalls-GETapi-v1-paywall">
                                <a href="#paywalls-GETapi-v1-paywall">Get Paywalls</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywalls-POSTapi-v1-paywall">
                                <a href="#paywalls-POSTapi-v1-paywall">Create Paywall</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywalls-GETapi-v1-paywall--id-">
                                <a href="#paywalls-GETapi-v1-paywall--id-">Get Paywall</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywalls-PUTapi-v1-paywall--id-">
                                <a href="#paywalls-PUTapi-v1-paywall--id-">Update Paywall</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="paywalls-DELETEapi-v1-paywall--id-">
                                <a href="#paywalls-DELETEapi-v1-paywall--id-">Delete Paywall</a>
                            </li>
                                                                        </ul>
                            </ul>
                    <ul id="tocify-header-server-info" class="tocify-header">
                <li class="tocify-item level-1" data-unique="server-info">
                    <a href="#server-info">Server Info</a>
                </li>
                                    <ul id="tocify-subheader-server-info" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="server-info-GETapi-v1-status">
                                <a href="#server-info-GETapi-v1-status">Get API Status</a>
                            </li>
                                                                        </ul>
                            </ul>
                    <ul id="tocify-header-store-invoices" class="tocify-header">
                <li class="tocify-item level-1" data-unique="store-invoices">
                    <a href="#store-invoices">Store Invoices</a>
                </li>
                                    <ul id="tocify-subheader-store-invoices" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="store-invoices-POSTapi-v1-store--id--invoice">
                                <a href="#store-invoices-POSTapi-v1-store--id--invoice">Create Store Invoice</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="store-invoices-GETapi-v1-store--id--invoice--invoiceId-">
                                <a href="#store-invoices-GETapi-v1-store--id--invoice--invoiceId-">Get Store Invoice</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="store-invoices-GETapi-v1-store--id--invoice--invoiceId--status">
                                <a href="#store-invoices-GETapi-v1-store--id--invoice--invoiceId--status">Get Store Invoice Status</a>
                            </li>
                                                                        </ul>
                            </ul>
                    <ul id="tocify-header-store-webhooks" class="tocify-header">
                <li class="tocify-item level-1" data-unique="store-webhooks">
                    <a href="#store-webhooks">Store Webhooks</a>
                </li>
                                    <ul id="tocify-subheader-store-webhooks" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="store-webhooks-GETapi-v1-store--id--webhook">
                                <a href="#store-webhooks-GETapi-v1-store--id--webhook">Get Store Webhooks</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="store-webhooks-POSTapi-v1-store--id--webhook">
                                <a href="#store-webhooks-POSTapi-v1-store--id--webhook">Create Store Webhook</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="store-webhooks-GETapi-v1-store--id--webhook--webhookId-">
                                <a href="#store-webhooks-GETapi-v1-store--id--webhook--webhookId-">Get Store Webhook</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="store-webhooks-DELETEapi-v1-store--id--webhook--webhookId-">
                                <a href="#store-webhooks-DELETEapi-v1-store--id--webhook--webhookId-">Delete Store Webhook</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="store-webhooks-PUTapi-v1-store--id--webhook--webhookId-">
                                <a href="#store-webhooks-PUTapi-v1-store--id--webhook--webhookId-">Update Store Webhook</a>
                            </li>
                                                                        </ul>
                            </ul>
                    <ul id="tocify-header-stores" class="tocify-header">
                <li class="tocify-item level-1" data-unique="stores">
                    <a href="#stores">Stores</a>
                </li>
                                    <ul id="tocify-subheader-stores" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="stores-GETapi-v1-store">
                                <a href="#stores-GETapi-v1-store">Get Stores</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="stores-GETapi-v1-store--id-">
                                <a href="#stores-GETapi-v1-store--id-">Get Store</a>
                            </li>
                                                                        </ul>
                            </ul>
                    <ul id="tocify-header-transactions" class="tocify-header">
                <li class="tocify-item level-1" data-unique="transactions">
                    <a href="#transactions">Transactions</a>
                </li>
                                    <ul id="tocify-subheader-transactions" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="transactions-GETapi-v1-transaction">
                                <a href="#transactions-GETapi-v1-transaction">Get All Transactions</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="transactions-GETapi-v1-transaction--id-">
                                <a href="#transactions-GETapi-v1-transaction--id-">Get Transaction</a>
                            </li>
                                                                        </ul>
                            </ul>
            </div>

    <ul class="toc-footer" id="last-updated">
        <li>Last updated: May 1, 2023</li>
    </ul>
</div>

<div class="page-wrapper">
    <div class="dark-box"></div>
    <div class="content">
        <h1 id="introduction">Introduction</h1>
<p>Power your next app with Bitcoin.</p>
<aside>
    <strong>Production URL</strong>: <code>https://nodeless.io</code>
</aside>
<aside>
    <strong>Testnet URL</strong>: <code>https://testnet.nodeless.io</code>
</aside>
<p>This documentation aims to provide all the information you need to work with our API.</p>
<aside>As you scroll, you'll see code examples for working with the API in different programming languages in the dark area to the right (or as part of the content on mobile).
You can switch the language used with the tabs at the top right (or from the nav menu at the top left on mobile).</aside>

        <h1 id="authenticating-requests">Authenticating requests</h1>
<p>This API is authenticated by sending an <strong><code>Authorization</code></strong> header with the value <strong><code>"Bearer {YOUR_AUTH_KEY}"</code></strong>.</p>
<p>All authenticated endpoints are marked with a <code>requires authentication</code> badge in the documentation below.</p>
<p>You can retrieve your token by visiting your dashboard and clicking <b>Generate API token</b>.</p>

        <h1 id="paywall-requests">Paywall Requests</h1>

    

                                <h2 id="paywall-requests-POSTapi-v1-paywall--id--request">Create a Paywall Request</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-POSTapi-v1-paywall--id--request">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;post(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('POST', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-POSTapi-v1-paywall--id--request">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: &quot;ec1fda0c-b8bc-4ef5-b683-e9b2523e977e&quot;,
        &quot;satsAmount&quot;: 1629,
        &quot;status&quot;: &quot;paid&quot;,
        &quot;metadata&quot;: [],
        &quot;createdAt&quot;: &quot;2023-04-23T20:58:05.000000Z&quot;,
        &quot;paidAt&quot;: &quot;2023-04-23 21:00:40&quot;,
        &quot;onchainAddress&quot;: &quot;tb1pmsc7eeyn7z7qap62lssggulkv5sue58nqamrpknzm7tqtk9w46asgxazas&quot;,
        &quot;lightningInvoice&quot;: &quot;lntb16290n1pjytx7app5fu6j8vec4pjh0ljpd46pqgc30g33dq7xzvq0e83v0eu2593lhw5qdzc2pshjampd3k9yet3w4jhxapqf9zr5gr9vvckverpxp3j6c3cvf3j6dr9vc6j6c3k8qej6efevger2v3nv5unwdm9cqzpgxqzfvsp55tm0va86gy3dwkw7mmgqf2ulhetu3ad227dn03xk5wdma0437s4s9qyyssqh9dz349qydqreyw255mfekt08k836xd5xr2sj84cx578qprj8pgry5dxumy7ht77r72t7mxdtl38f3f9s9fcvru77mpue2n0t43086gp5ssx6x&quot;,
        &quot;paywall&quot;: {
            &quot;id&quot;: &quot;e557543c-092f-473c-935f-8eeb772ffc61&quot;,
            &quot;name&quot;: &quot;test paywal1l&quot;,
            &quot;type&quot;: &quot;redirect&quot;,
            &quot;price&quot;: 100,
            &quot;settings&quot;: {
                &quot;test&quot;: &quot;test&quot;
            },
            &quot;created_at&quot;: &quot;2023-04-12T19:15:53.000000Z&quot;,
            &quot;updated_at&quot;: &quot;2023-05-01T15:15:31.000000Z&quot;
        },
        &quot;qrCodes&quot;: {
            &quot;unified&quot;: &quot;data:image/png;base64,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&quot;,
            &quot;onchain&quot;: &quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAIAAACx0UUtAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFYklEQVR4nO3dy27zNhRG0abo+79yOulI+MFC4G07WWsaW5LtD0QOSB5+fX9//wVhf99+APgfMkqdjFIno9TJKHUySp2MUiej1MkodTJKnYxSJ6PUySh1MkqdjFIno9TJKHUySp2MUvfPzJu/vr5WPcfYq01Xj6d6vHf8zOMXjx/j1bfx6lIze85mvo2FZj6CcZQ6GaVORqmTUeqmaqaHhe0kxv/Lz5QU46Jh4X0X1nnjFy907Bd8xThKnYxSJ6PUySh1K2umh4XzLq9ePFNwzEzDvJqjOjYZNlO77PsFXzGOUiej1MkodTJK3caaaZ+F/8vPVBgzk0ML7zvzVB/BOEqdjFIno9TJKHUfWTPN7DpauKDumIXVWPMDjhlHqZNR6mSUOhmlbmPNtO/f84WzMvt2Ds0stxs/xrHdTpECyzhKnYxSJ6PUySh1K2umY03YHhbu79m3CWls4WzQvlV/txhHqZNR6mSUOhml7isylzBjX5PvmUuN7dsL9QN+0AfjKHUySp2MUiej1E3VTPuWge1bFHesnfZH9Brf1+tv4fdsHKVORqmTUepklLprPSAWnh67bwXdwpOfxi/e19Vi33K7Y/NbxlHqZJQ6GaVORqlbuTbv2Bq5fe0VZsxMLI0vdawKnCmDFs66PRhHqZNR6mSUOhmlbuU800x1cqssGL93Xx0wtm8y7FiXB2vz+EVklDoZpU5GqZuqmRaWFLf6GswUSTN1XmQb2cPCXWULGUepk1HqZJQ6GaVuY9+8hX0cXl35VpeHW6XMvrOd9i3ke8U4Sp2MUiej1MkodRvPZ4r0z761vu5W07l9N3q1uvLBfiZ+MhmlTkapk1Hqzs0zHes+sHBW5uHYzqF9NzrWkNB+Jn4RGaVORqmTUeo29s27Vbvc2kgU2aJ0rNw8VkIZR6mTUepklDoZpe7ambaRpWtjt44+mnmMT+xqMWYcpU5GqZNR6mSUumvnMz3s23azsO75xFot0grPPBM/mYxSJ6PUySh153qNLzyfKbJjaWzfMy98yMh83phxlDoZpU5GqZNR6s6dabtvrmjGwmmYx6WOlX0zH+HYQcMzjKPUySh1MkqdjFJ3rgfEPpH77vMRhyrpm8fvJaPUySh1MkrdxrV5My8eG8/ovLrvwgrjI9YEHtvdpW8ev4iMUiej1MkoddfW5t3qJn7rpN3xpRbed+F7I4yj1MkodTJKnYxS9xl98xZe6tZxsa9utK/H+cLm4uMrL2QcpU5GqZNR6mSUuo3nMx3bhfMDmovPPMaxb/LWvjHjKHUySp2MUiej1K2smY51e9tXQ8zc95WFbdr3TR0tZD8TP5mMUiej1MkodSv3Mz1Eluo93JobGzs2cza+75h5JvgzGaVORqmTUeo2zjMtnEp55dYyv2PTbLfcWshnHKVORqmTUepklLqVPSCOifQm2PcYtzZ7ja/8YJ4J/iOj1MkodTJK3bnzmWbcOhjpVnF2rPnCRxxAZRylTkapk1HqZJS6c+czvXLr9KZ9u50ic2P7bqTXOL+XjFIno9TJKHWVHhCRZgSvTp4dv/fVjR5myq+Zv75yrAo0jlIno9TJKHUySt3GmumYfc0mIsfULqwRZ2qmW20sjKPUySh1MkqdjFL3E2qmff36ZiaWZp7qlX0PGWnuZxylTkapk1HqZJS6jTXTrY58C3csvaoS9k3hzDi2y2pfgWUcpU5GqZNR6mSUupU100ccMvQwM9EyU34tLM4Wtg+fefE+xlHqZJQ6GaVORqn7yPOZ+FWMo9TJKHUySp2MUiej1MkodTJKnYxSJ6PUySh1MkqdjFIno9TJKHUySp2MUiej1MkodTJK3b846LXJHyVkmgAAAABJRU5ErkJggg==&quot;,
            &quot;lightning&quot;: &quot;data:image/png;base64,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&quot;
        }
    }
}</code>
 </pre>
    </span>
<span id="execution-results-POSTapi-v1-paywall--id--request" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-v1-paywall--id--request"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-paywall--id--request" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-v1-paywall--id--request" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-paywall--id--request"></code></pre>
</span>
<form id="form-POSTapi-v1-paywall--id--request" data-method="POST"
      data-path="api/v1/paywall/{id}/request"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-paywall--id--request', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-v1-paywall--id--request"
                    onclick="tryItOut('POSTapi-v1-paywall--id--request');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-v1-paywall--id--request"
                    onclick="cancelTryOut('POSTapi-v1-paywall--id--request');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-v1-paywall--id--request" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/v1/paywall/{id}/request</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="POSTapi-v1-paywall--id--request"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="POSTapi-v1-paywall--id--request"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="POSTapi-v1-paywall--id--request"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="POSTapi-v1-paywall--id--request"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                    </form>

                    <h2 id="paywall-requests-GETapi-v1-paywall--id--request--requestId-">Get a Paywall Request</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-GETapi-v1-paywall--id--request--requestId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request/ullam" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request/ullam"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request/ullam',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request/ullam'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-paywall--id--request--requestId-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: &quot;ec1fda0c-b8bc-4ef5-b683-e9b2523e977e&quot;,
        &quot;satsAmount&quot;: 1629,
        &quot;status&quot;: &quot;paid&quot;,
        &quot;metadata&quot;: [],
        &quot;createdAt&quot;: &quot;2023-04-23T20:58:05.000000Z&quot;,
        &quot;paidAt&quot;: &quot;2023-04-23 21:00:40&quot;,
        &quot;onchainAddress&quot;: &quot;tb1pmsc7eeyn7z7qap62lssggulkv5sue58nqamrpknzm7tqtk9w46asgxazas&quot;,
        &quot;lightningInvoice&quot;: &quot;lntb16290n1pjytx7app5fu6j8vec4pjh0ljpd46pqgc30g33dq7xzvq0e83v0eu2593lhw5qdzc2pshjampd3k9yet3w4jhxapqf9zr5gr9vvckverpxp3j6c3cvf3j6dr9vc6j6c3k8qej6efevger2v3nv5unwdm9cqzpgxqzfvsp55tm0va86gy3dwkw7mmgqf2ulhetu3ad227dn03xk5wdma0437s4s9qyyssqh9dz349qydqreyw255mfekt08k836xd5xr2sj84cx578qprj8pgry5dxumy7ht77r72t7mxdtl38f3f9s9fcvru77mpue2n0t43086gp5ssx6x&quot;,
        &quot;paywall&quot;: {
            &quot;id&quot;: &quot;e557543c-092f-473c-935f-8eeb772ffc61&quot;,
            &quot;name&quot;: &quot;test paywal1l&quot;,
            &quot;type&quot;: &quot;redirect&quot;,
            &quot;price&quot;: 100,
            &quot;settings&quot;: {
                &quot;test&quot;: &quot;test&quot;
            },
            &quot;created_at&quot;: &quot;2023-04-12T19:15:53.000000Z&quot;,
            &quot;updated_at&quot;: &quot;2023-05-01T15:15:31.000000Z&quot;
        },
        &quot;qrCodes&quot;: {
            &quot;unified&quot;: &quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZUAAAGVCAIAAAC5OftsAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAQHElEQVR4nO3dSZIlqQ4F0B/fav9bzpr7gDRKEnAzz5nG8+Y1cQ0TuPj59evX/wAC/f/2DQD8R/ILSCW/gFTyC0glv4BU8gtIJb+AVPILSCW/gFTyC0glv4BU8gtIJb+AVPILSCW/gFTyC0glv4BU8gtIJb+AVP9UDv75+em6j7V1k/6t2/ic6nPs1m4A6+tu3XPjLgRbdzX3FipfyvpCW6d65HPeOtWt76jyDVZUvhTjLyCV/AJSyS8glfwCUpXq9x/HiqNzJerGiub6VMeq+1vHbn0a6zNvfXTHSsVbH+zcFMQjm0ZXfhsVjV+38ReQSn4BqeQXkEp+Aak66/cfjeXPuWMrF5qbRmisKze+uLIQfK76W5mBafwGG29yfRtb5v41jv13rxl/AankF5BKfgGp5BeQarB+P6dSDZ1bgb1WKWHOlZmPldUrL97SOMcyN0+yPjbiN/kI4y8glfwCUskvIJX8AlJF1u+P9e2+tba7sQ3/1rHHmsdvmeu982Zn/Y/G7vjrn2hiOd/4C0glv4BU8gtIJb+AVIP1+2PlwLlyfuXYuQXoc9X9uYXglYmCyixK4z6yW8dumeuQc+w5h1uMv4BU8gtIJb+AVPILSNVZvz+2C+nH3B60c1MBt6rOc7XwxjPPVZ3nPudb7/fYsbf+u9eMv4BU8gtIJb+AVPILSFWq3z+yBvfjWMH+WDF47da3MPc5H2uItDa3HH+uI9CWY1sOzzH+AlLJLyCV/AJSyS8g1c+tfVUri30f2eCzsWXKrZLtsZXuW7exfvHWhSoa/zUqXW5u7V48N/HV+DMz/gJSyS8glfwCUskvIFWpfv+bU/dV94+VEo8Vkm91X3lzy9LGt/9xq0SdeKr1mdeO7db8YfwFpJJfQCr5BaSSX0CqR/vfHyvoPlLPvtVPZu1YMfhWy6OtM1eue2xG4liTn7kvdIvxF5BKfgGp5BeQSn4Bqc6tv09cF/5xq5NJ5Ta2TvVIM6WIfVVvPbgyJ/GpD+MvIJX8AlLJLyCV/AJSdfa/v9U9vXKqtWPTCHNNYOa+31sb1t568dzESOO3f6udztwTBWvGX0Aq+QWkkl9AKvkFpCr1z7nVaf5jXTs8tm648R01XujNBxve7Bf00bjuv/ITXTvWx+bYjrxbjL+AVPILSCW/gFTyC0jVuf5+y5t7wW6ZW9wcsQvp1rEViY8QbN1V43UjNo1eH7vF+AtIJb+AVPILSCW/gFSd+9c21tFv1UrXx1bW0DfOdcx1I1lr/DS2LlQpBjc+fdG4p/KxSvmt2ZtjUz3GX0Aq+QWkkl9AKvkFpOqs33/MrRv+uNV95VY/+PVf5yYKjjVjmWt5NPcwxtaHM9fEaa7K3tgvqJHxF5BKfgGp5BeQSn4Bqc71v6+c+WNurXNjkbKxvF257tyH88gzEh+NBewtx97+3A/4483v98P4C0glv4BU8gtIJb+AVOfW33/MLVDeuqtbfT8+5lacN3Yibyz3Hpvr+Li1/r6yy+ytRj23tg3eYvwFpJJfQCr5BaSSX0CqUv3+kVYtjf1kjnUiv1VJPVahX595Xc5fm5tymXtyo3EWpXEKYu75mWNbNBh/AankF5BKfgGp5BeQ6udWC5HGimajxjb8a7eeKLi1R+kjO7Y+srT92GMejVNMlf/BuXK+8ReQSn4BqeQXkEp+AalK9fu5BvCNC7If6dt9bGvYxGY7jY59sLeK/Y/8chqp3wN/I/kFpJJfQCr5BaS6tn/tm0uQG1W6oGydaq5zS+MeBbcexmh8ZmDrQnPmflfHHmxoZPwFpJJfQCr5BaSSX0Cqwf45W+Y6t1Q80n6k0bHuOmu3isHHvqNjn+Tasadr5iZV1oy/gFTyC0glv4BU8gtIda5/ztyS3Fst3tfHrt36rCoiHreYc2sG5lgf+kZz/2Ufxl9AKvkFpJJfQCr5BaTq7J9z7FSf+t8ja523rrvW2Dy+8ZmByqnWZ761iXLl2Ecmr+Z25G287hzjLyCV/AJSyS8glfwCUpXq93MqlcWtImWl6rx13fWLK+XPxtXMjU8y3Gq2s9bYiKny9ue+7mMzA1vmbtL4C0glv4BU8gtIJb+AVKX6fePumOtjt1R2XT3War3RrR0M5hbrb12occ6hYm7Gaf3irb8e+x+0fy3Ab8gvIJX8AlLJLyBV5/r7yprjY+XtSu+duaXPlcL5lsp31PhJrj2yp/KWW0v5j7Va2nLsIQHjLyCV/AJSyS8glfwCUnX2v2/sGHOrUfcjZ/5obMS+VukXtD7V1l+37uqRPvRrxzZDqDSA2rqNym+jkfEXkEp+AankF5BKfgGp/sD+93Ml28YWMXOt9Od60TzSm2V9qsrbn1vLPvfRHesXdGsf6DXjLyCV/AJSyS8glfwCUnX2v68sBW5s9NG4AH195kTHFs1Xjq38NrbO3Lg8fW2u5VHlxZVf+yMPNhh/AankF5BKfgGp5BeQanD9/bGeIetjH2kBvja3HL/iWLuVSteXW13bG7dnrrzfxh5Wa8d6K20x/gJSyS8glfwCUskvIFVn/f5YgXPrumuNG4sem3M4tlXqIxMFja2HGnfk3dI4FXBrWuzYNrpbjL+AVPILSCW/gFTyC0jVuX9t47GVAmelnF+5q8pNzpl7/KBx1XhFY/H72KrxuW4zla97buZn7tdu/AWkkl9AKvkFpJJfQKrB/jmNi4zntrOdO3atcZn4seX4a3Pd8Y89yLE+tvGzqhzb2Er/2H/Z3P+R8ReQSn4BqeQXkEp+Aal+GmtpjT00jpWot061deZb3YRunerj1mr1uV40j/wmb82Dre9qfd31sZXbMP4CUskvIJX8AlLJLyBVaf39XNPrY6XxuTLksabmt9ZJz1WOG7+ULZUvtNJe5tikysexr3uO8ReQSn4BqeQXkEp+Aak6199/T10oFc+145hbFr91ocpdHfusKuYeMJj7cLbcWtq+dRvrF2/dxq3dmteMv4BU8gtIJb+AVPILSNXZ/76yrWxlNfPWbaxFTCPMbd+7dapjbXyOPZxwaxF546xRo2MXqjD+AlLJLyCV/AJSyS8gVWn9/a0+J7f2r63cxiMXqtzGx7G29G8+QvDIbMYjP9G1ua/M+AtIJb+AVPILSCW/gFSd6+/XHunssXVXH3Ml28a30FjfnWsutHWhW62Htm5y68W3TnVrjmVuksH4C0glv4BU8gtIJb+AVIP1+8Q6+lxrms+xW1ulbt3GrYL92lyvoWOTDFvHNs4MNH4Lx9rSH2P8BaSSX0Aq+QWkkl9Aqmv9cyoXerMM+WajnspHtza3LH7rVOsXf7zZfKbxw1mbu9CtlkfGX0Aq+QWkkl9AKvkFpDrXP+ejsqr4WGPyRnPV/Yq5ZfHrF2+duXKquWMb1+7Pvd9jF6pcV/8c4G8kv4BU8gtIJb+AVKX6/bHF3JUzb11obkferQ4q6zM/srL/2LG3titunHOYm1Oa6yW1dqvh1YfxF5BKfgGp5BeQSn4BqUr1+zfXhX+82WxnfRuVY491ffmoTFCsXzy3XfGxe64c+0jPn0eeGPkw/gJSyS8glfwCUskvIFXn+vs3W49vqdQsKxMFcyv7t26j8cyV685Vf481CKqU5I9NUKzNNQhq/O82/gJSyS8glfwCUskvINXg/rXHNE4jNNYd31y+fGypd2NNunLdilt9io7t1vzIPEmF8ReQSn4BqeQXkEp+AalK9fvvuU71/Zhb6H+s7cmbRegtx8rMjbexPvZjbpX8m7+6j2MzA/avBf5G8gtIJb+AVPILSDW4/n5ud9u5XiVbN3mryU/FsX7/x9bfN9bgPx55SGDukYm521hr/BEafwGp5BeQSn4BqeQXkGqw//2xGu362K2/HqtKNpYwby1tn2sP/9G4C8HWXW1daK79f2XLgsqpIhh/AankF5BKfgGp5BeQqnP9/SOre+fMdQWZW62+1vj4wVyz/MqL1459oZUzP9K3Z32qD/1zAH5DfgGp5BeQSn4BqUrr7z8q5cC5Nt7rC1VU1jpXFlXPmVsHv/WxH9s3t/EmP6e6tfftnGONerYYfwGp5BeQSn4BqeQXkOpc//tji7k/HmkC8/HIkutj6+/Xx64d26J17VhJ/pHW8sfW0FcYfwGp5BeQSn4BqeQXkOpc/5xjO4kemwqo3MatRwiOLYxeX/cRcwvfj7U8urV979x/2RbjLyCV/AJSyS8glfwCUnXuX1vRWIasLF5vrFnO1UrXKpsKzxV0b00U3NpIYW5e6Nh2xR+PPE7zYfwFpJJfQCr5BaSSX0Cq0vr777lO1Upv7bv5yJ6diduOzvWEufU0wiM9cP6Ar0z9HvgbyS8glfwCUskvINW1/jmVM69fvPbIqRKbuM/1R6rcRuVUa7cuFLGd7cfcnNKa8ReQSn4BqeQXkEp+AalK/XPW5nZdXb/441gjl0fKzHNF98pH17hPcOVCjT+VYx/s3JYFjzxPUmH8BaSSX0Aq+QWkkl9Aqs76/bGdYm9VNCu2atKNZea5ontlYqSxnP/mt1+Zgjj2HEvjb3LrNhrPbPwFpJJfQCr5BaSSX0Cqwf1r1/XdrWLh3Nr9RxxbkF0pJDea6xhzrB9Uo7ktlhtL8m9OuRh/AankF5BKfgGp5BeQqlS/bywzz/XPPtZLvnFJ/frYY43n1yrvaG5zgDf77lfOfKwVz9yU2tzUh/EXkEp+AankF5BKfgGpSvvX7l3pVHedrTM/0i0+8e2vNe5AfGtn3Df733/cOnZ9qmM78hp/AankF5BKfgGp5BeQqnP9feP63bmGOceK7m9uHNv44rkL3VrqPVdm3rrQ+sWNv7qt627RPwfgN+QXkEp+AankF5BqsP995djGDVzXbhU4K2c+thPwscbzcxdq/KwqX0rjdM1caTxih+kP4y8glfwCUskvIJX8AlIN9r9vVCmOzq3erhRlGz+6yvrsRnMfXaUJzPrFx6YCtt5R5bprxz6rD+vvAb7kF5BKfgGp5BeQqlS//zhWaDy2Z+fcSui5tc5bp2osja/NVXCPtVpfO9bh/tZmt1uOfQvGX0Aq+QWkkl9AKvkFpOqs33/MbeBa0bj0ea5J/9rc2v2Pxr1vH3k4YUvlIYFbDf7niu5b9M8B+A35BaSSX0Aq+QWkGqzfz2lccH9so8259jKNF9oy16jn1oMcW8c+0rboo/HX/siDDWvGX0Aq+QWkkl9AKvkFpIqs31dWbzcWZR/p27O+buOZ1yqL9Y/NV2yZ28z4kc5LWyrPVzRuk/xh/AWkkl9AKvkFpJJfQKqfxoYbc8umG5fF39oNdK7h/bGV/R+VxdzrU63d6tm/1vhprM/88QecqsL4C0glv4BU8gtIJb+AVJ31+znHmt4cW9w817rk2F19zO0G8OYUU6Nj1f1jT4wc+36Nv4BU8gtIJb+AVPILSFWq3wNcZPwFpJJfQCr5BaSSX0Aq+QWkkl9AKvkFpJJfQCr5BaSSX0Aq+QWkkl9AKvkFpJJfQCr5BaSSX0Aq+QWkkl9AKvkFpPoX+F37AHUkKp8AAAAASUVORK5CYII=&quot;,
            &quot;onchain&quot;: &quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAIAAACx0UUtAAAABnRSTlMA/wD/AP83WBt9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFYklEQVR4nO3dy27zNhRG0abo+79yOulI+MFC4G07WWsaW5LtD0QOSB5+fX9//wVhf99+APgfMkqdjFIno9TJKHUySp2MUiej1MkodTJKnYxSJ6PUySh1MkqdjFIno9TJKHUySp2MUvfPzJu/vr5WPcfYq01Xj6d6vHf8zOMXjx/j1bfx6lIze85mvo2FZj6CcZQ6GaVORqmTUeqmaqaHhe0kxv/Lz5QU46Jh4X0X1nnjFy907Bd8xThKnYxSJ6PUySh1K2umh4XzLq9ePFNwzEzDvJqjOjYZNlO77PsFXzGOUiej1MkodTJK3caaaZ+F/8vPVBgzk0ML7zvzVB/BOEqdjFIno9TJKHUfWTPN7DpauKDumIXVWPMDjhlHqZNR6mSUOhmlbmPNtO/f84WzMvt2Ds0stxs/xrHdTpECyzhKnYxSJ6PUySh1K2umY03YHhbu79m3CWls4WzQvlV/txhHqZNR6mSUOhml7isylzBjX5PvmUuN7dsL9QN+0AfjKHUySp2MUiej1E3VTPuWge1bFHesnfZH9Brf1+tv4fdsHKVORqmTUepklLprPSAWnh67bwXdwpOfxi/e19Vi33K7Y/NbxlHqZJQ6GaVORqlbuTbv2Bq5fe0VZsxMLI0vdawKnCmDFs66PRhHqZNR6mSUOhmlbuU800x1cqssGL93Xx0wtm8y7FiXB2vz+EVklDoZpU5GqZuqmRaWFLf6GswUSTN1XmQb2cPCXWULGUepk1HqZJQ6GaVuY9+8hX0cXl35VpeHW6XMvrOd9i3ke8U4Sp2MUiej1MkodRvPZ4r0z761vu5W07l9N3q1uvLBfiZ+MhmlTkapk1Hqzs0zHes+sHBW5uHYzqF9NzrWkNB+Jn4RGaVORqmTUeo29s27Vbvc2kgU2aJ0rNw8VkIZR6mTUepklDoZpe7ambaRpWtjt44+mnmMT+xqMWYcpU5GqZNR6mSUumvnMz3s23azsO75xFot0grPPBM/mYxSJ6PUySh153qNLzyfKbJjaWzfMy98yMh83phxlDoZpU5GqZNR6s6dabtvrmjGwmmYx6WOlX0zH+HYQcMzjKPUySh1MkqdjFJ3rgfEPpH77vMRhyrpm8fvJaPUySh1MkrdxrV5My8eG8/ovLrvwgrjI9YEHtvdpW8ev4iMUiej1MkoddfW5t3qJn7rpN3xpRbed+F7I4yj1MkodTJKnYxS9xl98xZe6tZxsa9utK/H+cLm4uMrL2QcpU5GqZNR6mSUuo3nMx3bhfMDmovPPMaxb/LWvjHjKHUySp2MUiej1K2smY51e9tXQ8zc95WFbdr3TR0tZD8TP5mMUiej1MkodSv3Mz1Eluo93JobGzs2cza+75h5JvgzGaVORqmTUeo2zjMtnEp55dYyv2PTbLfcWshnHKVORqmTUepklLqVPSCOifQm2PcYtzZ7ja/8YJ4J/iOj1MkodTJK3bnzmWbcOhjpVnF2rPnCRxxAZRylTkapk1HqZJS6c+czvXLr9KZ9u50ic2P7bqTXOL+XjFIno9TJKHWVHhCRZgSvTp4dv/fVjR5myq+Zv75yrAo0jlIno9TJKHUySt3GmumYfc0mIsfULqwRZ2qmW20sjKPUySh1MkqdjFL3E2qmff36ZiaWZp7qlX0PGWnuZxylTkapk1HqZJS6jTXTrY58C3csvaoS9k3hzDi2y2pfgWUcpU5GqZNR6mSUupU100ccMvQwM9EyU34tLM4Wtg+fefE+xlHqZJQ6GaVORqn7yPOZ+FWMo9TJKHUySp2MUiej1MkodTJKnYxSJ6PUySh1MkqdjFIno9TJKHUySp2MUiej1MkodTJK3b846LXJHyVkmgAAAABJRU5ErkJggg==&quot;,
            &quot;lightning&quot;: &quot;data:image/png;base64,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&quot;
        }
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-paywall--id--request--requestId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-paywall--id--request--requestId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-paywall--id--request--requestId-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-paywall--id--request--requestId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-paywall--id--request--requestId-"></code></pre>
</span>
<form id="form-GETapi-v1-paywall--id--request--requestId-" data-method="GET"
      data-path="api/v1/paywall/{id}/request/{requestId}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-paywall--id--request--requestId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-paywall--id--request--requestId-"
                    onclick="tryItOut('GETapi-v1-paywall--id--request--requestId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-paywall--id--request--requestId-"
                    onclick="cancelTryOut('GETapi-v1-paywall--id--request--requestId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-paywall--id--request--requestId-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/paywall/{id}/request/{requestId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-paywall--id--request--requestId-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-paywall--id--request--requestId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-paywall--id--request--requestId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-paywall--id--request--requestId-"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>requestId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="requestId"                data-endpoint="GETapi-v1-paywall--id--request--requestId-"
               value="ullam"
               data-component="url">
    <br>
<p>Example: <code>ullam</code></p>
            </div>
                    </form>

                    <h2 id="paywall-requests-GETapi-v1-paywall--id--request--requestId--status">Get Paywall Request Status</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-GETapi-v1-paywall--id--request--requestId--status">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request/veniam/status" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request/veniam/status"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request/veniam/status',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/request/veniam/status'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-paywall--id--request--requestId--status">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-paywall--id--request--requestId--status" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-paywall--id--request--requestId--status"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-paywall--id--request--requestId--status" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-paywall--id--request--requestId--status" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-paywall--id--request--requestId--status"></code></pre>
</span>
<form id="form-GETapi-v1-paywall--id--request--requestId--status" data-method="GET"
      data-path="api/v1/paywall/{id}/request/{requestId}/status"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-paywall--id--request--requestId--status', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-paywall--id--request--requestId--status"
                    onclick="tryItOut('GETapi-v1-paywall--id--request--requestId--status');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-paywall--id--request--requestId--status"
                    onclick="cancelTryOut('GETapi-v1-paywall--id--request--requestId--status');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-paywall--id--request--requestId--status" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/paywall/{id}/request/{requestId}/status</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-paywall--id--request--requestId--status"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-paywall--id--request--requestId--status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-paywall--id--request--requestId--status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-paywall--id--request--requestId--status"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>requestId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="requestId"                data-endpoint="GETapi-v1-paywall--id--request--requestId--status"
               value="veniam"
               data-component="url">
    <br>
<p>Example: <code>veniam</code></p>
            </div>
                    </form>

                <h1 id="paywall-webhooks">Paywall Webhooks</h1>

    

                                <h2 id="paywall-webhooks-GETapi-v1-paywall--id--webhook">Get Paywall Webhooks</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Displays a list of webhooks belonging to the paywall.</p>

<span id="example-requests-GETapi-v1-paywall--id--webhook">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-paywall--id--webhook">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        {
            &quot;id&quot;: null,
            &quot;url&quot;: &quot;https://utxo.one&quot;,
            &quot;secret&quot;: &quot;&#039;B}bquoyg?XnAl.l&quot;,
            &quot;status&quot;: &quot;active&quot;,
            &quot;events&quot;: [
                &quot;new&quot;,
                &quot;pending_confirmation&quot;,
                &quot;paid&quot;,
                &quot;expired&quot;,
                &quot;cancelled&quot;,
                &quot;underpaid&quot;,
                &quot;overpaid&quot;,
                &quot;in_flight&quot;
            ],
            &quot;createdAt&quot;: null,
            &quot;lastDeliveryAt&quot;: null
        },
        {
            &quot;id&quot;: null,
            &quot;url&quot;: &quot;https://utxo.one&quot;,
            &quot;secret&quot;: &quot;zEZK5E&quot;,
            &quot;status&quot;: &quot;active&quot;,
            &quot;events&quot;: [
                &quot;new&quot;,
                &quot;pending_confirmation&quot;,
                &quot;paid&quot;,
                &quot;expired&quot;,
                &quot;cancelled&quot;,
                &quot;underpaid&quot;,
                &quot;overpaid&quot;,
                &quot;in_flight&quot;
            ],
            &quot;createdAt&quot;: null,
            &quot;lastDeliveryAt&quot;: null
        }
    ],
    &quot;links&quot;: {
        &quot;first&quot;: &quot;/?page=1&quot;,
        &quot;last&quot;: &quot;/?page=1&quot;,
        &quot;prev&quot;: null,
        &quot;next&quot;: null
    },
    &quot;meta&quot;: {
        &quot;current_page&quot;: 1,
        &quot;from&quot;: 1,
        &quot;last_page&quot;: 1,
        &quot;links&quot;: [
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;&amp;laquo; Previous&quot;,
                &quot;active&quot;: false
            },
            {
                &quot;url&quot;: &quot;/?page=1&quot;,
                &quot;label&quot;: &quot;1&quot;,
                &quot;active&quot;: true
            },
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;Next &amp;raquo;&quot;,
                &quot;active&quot;: false
            }
        ],
        &quot;path&quot;: &quot;/&quot;,
        &quot;per_page&quot;: 15,
        &quot;to&quot;: 2,
        &quot;total&quot;: 2
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-paywall--id--webhook" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-paywall--id--webhook"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-paywall--id--webhook" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-paywall--id--webhook" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-paywall--id--webhook"></code></pre>
</span>
<form id="form-GETapi-v1-paywall--id--webhook" data-method="GET"
      data-path="api/v1/paywall/{id}/webhook"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-paywall--id--webhook', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-paywall--id--webhook"
                    onclick="tryItOut('GETapi-v1-paywall--id--webhook');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-paywall--id--webhook"
                    onclick="cancelTryOut('GETapi-v1-paywall--id--webhook');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-paywall--id--webhook" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/paywall/{id}/webhook</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-paywall--id--webhook"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-paywall--id--webhook"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-paywall--id--webhook"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-paywall--id--webhook"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                    </form>

                    <h2 id="paywall-webhooks-POSTapi-v1-paywall--id--webhook">Create Paywall Webhook</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Creates a paywall webhook.</p>

<span id="example-requests-POSTapi-v1-paywall--id--webhook">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"type\": \"paywall\",
    \"url\": \"http:\\/\\/sanford.com\\/ut-iste-perspiciatis-repellat-saepe.html\",
    \"events\": [
        \"expired\"
    ],
    \"secret\": \"quo\",
    \"status\": \"active\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "type": "paywall",
    "url": "http:\/\/sanford.com\/ut-iste-perspiciatis-repellat-saepe.html",
    "events": [
        "expired"
    ],
    "secret": "quo",
    "status": "active"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;post(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
        'json' =&gt; [
            'type' =&gt; 'paywall',
            'url' =&gt; 'http://sanford.com/ut-iste-perspiciatis-repellat-saepe.html',
            'events' =&gt; [
                'expired',
            ],
            'secret' =&gt; 'quo',
            'status' =&gt; 'active',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook'
payload = {
    "type": "paywall",
    "url": "http:\/\/sanford.com\/ut-iste-perspiciatis-repellat-saepe.html",
    "events": [
        "expired"
    ],
    "secret": "quo",
    "status": "active"
}
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('POST', url, headers=headers, json=payload)
response.json()</code></pre></div>

</span>

<span id="example-responses-POSTapi-v1-paywall--id--webhook">
</span>
<span id="execution-results-POSTapi-v1-paywall--id--webhook" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-v1-paywall--id--webhook"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-paywall--id--webhook" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-v1-paywall--id--webhook" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-paywall--id--webhook"></code></pre>
</span>
<form id="form-POSTapi-v1-paywall--id--webhook" data-method="POST"
      data-path="api/v1/paywall/{id}/webhook"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-paywall--id--webhook', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-v1-paywall--id--webhook"
                    onclick="tryItOut('POSTapi-v1-paywall--id--webhook');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-v1-paywall--id--webhook"
                    onclick="cancelTryOut('POSTapi-v1-paywall--id--webhook');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-v1-paywall--id--webhook" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/v1/paywall/{id}/webhook</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="POSTapi-v1-paywall--id--webhook"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="POSTapi-v1-paywall--id--webhook"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="POSTapi-v1-paywall--id--webhook"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="POSTapi-v1-paywall--id--webhook"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>type</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="type"                data-endpoint="POSTapi-v1-paywall--id--webhook"
               value="paywall"
               data-component="body">
    <br>
<p>Must be one of <code>store</code>, <code>donation_page</code>, <code>paywall</code>, or <code>inbox</code>. Example: <code>paywall</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>url</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="url"                data-endpoint="POSTapi-v1-paywall--id--webhook"
               value="http://sanford.com/ut-iste-perspiciatis-repellat-saepe.html"
               data-component="body">
    <br>
<p>Must be a valid URL. Example: <code>http://sanford.com/ut-iste-perspiciatis-repellat-saepe.html</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>events</code></b>&nbsp;&nbsp;
<small>string[]</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="events[0]"                data-endpoint="POSTapi-v1-paywall--id--webhook"
               data-component="body">
        <input type="text" style="display: none"
               name="events[1]"                data-endpoint="POSTapi-v1-paywall--id--webhook"
               data-component="body">
    <br>
<p>Must be one of <code>new</code>, <code>pending_confirmation</code>, <code>paid</code>, <code>overpaid</code>, <code>underpaid</code>, <code>in_flight</code>, <code>expired</code>, or <code>cancelled</code>.</p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>secret</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="secret"                data-endpoint="POSTapi-v1-paywall--id--webhook"
               value="quo"
               data-component="body">
    <br>
<p>Example: <code>quo</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>status</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="status"                data-endpoint="POSTapi-v1-paywall--id--webhook"
               value="active"
               data-component="body">
    <br>
<p>Must be one of <code>active</code> or <code>inactive</code>. Example: <code>active</code></p>
        </div>
        </form>

                    <h2 id="paywall-webhooks-GETapi-v1-paywall--id--webhook--webhookId-">Get Paywall Webhook</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Displays a paywall webhook's details.</p>

<span id="example-requests-GETapi-v1-paywall--id--webhook--webhookId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/quaerat" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/quaerat"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/quaerat',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/quaerat'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-paywall--id--webhook--webhookId-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: null,
        &quot;url&quot;: &quot;https://utxo.one&quot;,
        &quot;secret&quot;: &quot;bV@)CRBhVUK[wd%&quot;,
        &quot;status&quot;: &quot;active&quot;,
        &quot;events&quot;: [
            &quot;new&quot;,
            &quot;pending_confirmation&quot;,
            &quot;paid&quot;,
            &quot;expired&quot;,
            &quot;cancelled&quot;,
            &quot;underpaid&quot;,
            &quot;overpaid&quot;,
            &quot;in_flight&quot;
        ],
        &quot;createdAt&quot;: null,
        &quot;lastDeliveryAt&quot;: null
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-paywall--id--webhook--webhookId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-paywall--id--webhook--webhookId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-paywall--id--webhook--webhookId-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-paywall--id--webhook--webhookId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-paywall--id--webhook--webhookId-"></code></pre>
</span>
<form id="form-GETapi-v1-paywall--id--webhook--webhookId-" data-method="GET"
      data-path="api/v1/paywall/{id}/webhook/{webhookId}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-paywall--id--webhook--webhookId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-paywall--id--webhook--webhookId-"
                    onclick="tryItOut('GETapi-v1-paywall--id--webhook--webhookId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-paywall--id--webhook--webhookId-"
                    onclick="cancelTryOut('GETapi-v1-paywall--id--webhook--webhookId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-paywall--id--webhook--webhookId-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/paywall/{id}/webhook/{webhookId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-paywall--id--webhook--webhookId-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-paywall--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-paywall--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-paywall--id--webhook--webhookId-"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>webhookId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="webhookId"                data-endpoint="GETapi-v1-paywall--id--webhook--webhookId-"
               value="quaerat"
               data-component="url">
    <br>
<p>Example: <code>quaerat</code></p>
            </div>
                    </form>

                    <h2 id="paywall-webhooks-DELETEapi-v1-paywall--id--webhook--webhookId-">Delete Paywall Webhook</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Deletes a paywall webhook.</p>

<span id="example-requests-DELETEapi-v1-paywall--id--webhook--webhookId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/rerum" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/rerum"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;delete(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/rerum',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/rerum'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('DELETE', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-DELETEapi-v1-paywall--id--webhook--webhookId-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: null,
        &quot;url&quot;: &quot;https://utxo.one&quot;,
        &quot;secret&quot;: &quot;[\\i:&gt;COoGX.7a2\&quot;&quot;,
        &quot;status&quot;: &quot;active&quot;,
        &quot;events&quot;: [
            &quot;new&quot;,
            &quot;pending_confirmation&quot;,
            &quot;paid&quot;,
            &quot;expired&quot;,
            &quot;cancelled&quot;,
            &quot;underpaid&quot;,
            &quot;overpaid&quot;,
            &quot;in_flight&quot;
        ],
        &quot;createdAt&quot;: null,
        &quot;lastDeliveryAt&quot;: null
    }
}</code>
 </pre>
    </span>
<span id="execution-results-DELETEapi-v1-paywall--id--webhook--webhookId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEapi-v1-paywall--id--webhook--webhookId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-v1-paywall--id--webhook--webhookId-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEapi-v1-paywall--id--webhook--webhookId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-v1-paywall--id--webhook--webhookId-"></code></pre>
</span>
<form id="form-DELETEapi-v1-paywall--id--webhook--webhookId-" data-method="DELETE"
      data-path="api/v1/paywall/{id}/webhook/{webhookId}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEapi-v1-paywall--id--webhook--webhookId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEapi-v1-paywall--id--webhook--webhookId-"
                    onclick="tryItOut('DELETEapi-v1-paywall--id--webhook--webhookId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEapi-v1-paywall--id--webhook--webhookId-"
                    onclick="cancelTryOut('DELETEapi-v1-paywall--id--webhook--webhookId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEapi-v1-paywall--id--webhook--webhookId-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>api/v1/paywall/{id}/webhook/{webhookId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="DELETEapi-v1-paywall--id--webhook--webhookId-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="DELETEapi-v1-paywall--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="DELETEapi-v1-paywall--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="DELETEapi-v1-paywall--id--webhook--webhookId-"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>webhookId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="webhookId"                data-endpoint="DELETEapi-v1-paywall--id--webhook--webhookId-"
               value="rerum"
               data-component="url">
    <br>
<p>Example: <code>rerum</code></p>
            </div>
                    </form>

                    <h2 id="paywall-webhooks-PUTapi-v1-paywall--id--webhook--webhookId-">Update Paywall Webhook</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Updates a paywall webhook.</p>

<span id="example-requests-PUTapi-v1-paywall--id--webhook--webhookId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/est" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"url\": \"http:\\/\\/walsh.info\\/beatae-rem-tempore-perferendis-cumque.html\",
    \"events\": [
        \"overpaid\"
    ],
    \"status\": \"active\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/est"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "url": "http:\/\/walsh.info\/beatae-rem-tempore-perferendis-cumque.html",
    "events": [
        "overpaid"
    ],
    "status": "active"
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;put(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/est',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
        'json' =&gt; [
            'url' =&gt; 'http://walsh.info/beatae-rem-tempore-perferendis-cumque.html',
            'events' =&gt; [
                'overpaid',
            ],
            'status' =&gt; 'active',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61/webhook/est'
payload = {
    "url": "http:\/\/walsh.info\/beatae-rem-tempore-perferendis-cumque.html",
    "events": [
        "overpaid"
    ],
    "status": "active"
}
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('PUT', url, headers=headers, json=payload)
response.json()</code></pre></div>

</span>

<span id="example-responses-PUTapi-v1-paywall--id--webhook--webhookId-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: null,
        &quot;url&quot;: &quot;https://utxo.one&quot;,
        &quot;secret&quot;: &quot;^3$o#t=|kh)ZC&quot;,
        &quot;status&quot;: &quot;active&quot;,
        &quot;events&quot;: [
            &quot;new&quot;,
            &quot;pending_confirmation&quot;,
            &quot;paid&quot;,
            &quot;expired&quot;,
            &quot;cancelled&quot;,
            &quot;underpaid&quot;,
            &quot;overpaid&quot;,
            &quot;in_flight&quot;
        ],
        &quot;createdAt&quot;: null,
        &quot;lastDeliveryAt&quot;: null
    }
}</code>
 </pre>
    </span>
<span id="execution-results-PUTapi-v1-paywall--id--webhook--webhookId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTapi-v1-paywall--id--webhook--webhookId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-v1-paywall--id--webhook--webhookId-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-v1-paywall--id--webhook--webhookId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-v1-paywall--id--webhook--webhookId-"></code></pre>
</span>
<form id="form-PUTapi-v1-paywall--id--webhook--webhookId-" data-method="PUT"
      data-path="api/v1/paywall/{id}/webhook/{webhookId}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-v1-paywall--id--webhook--webhookId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-v1-paywall--id--webhook--webhookId-"
                    onclick="tryItOut('PUTapi-v1-paywall--id--webhook--webhookId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-v1-paywall--id--webhook--webhookId-"
                    onclick="cancelTryOut('PUTapi-v1-paywall--id--webhook--webhookId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-v1-paywall--id--webhook--webhookId-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/v1/paywall/{id}/webhook/{webhookId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="PUTapi-v1-paywall--id--webhook--webhookId-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="PUTapi-v1-paywall--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="PUTapi-v1-paywall--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="PUTapi-v1-paywall--id--webhook--webhookId-"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>webhookId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="webhookId"                data-endpoint="PUTapi-v1-paywall--id--webhook--webhookId-"
               value="est"
               data-component="url">
    <br>
<p>Example: <code>est</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>url</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="url"                data-endpoint="PUTapi-v1-paywall--id--webhook--webhookId-"
               value="http://walsh.info/beatae-rem-tempore-perferendis-cumque.html"
               data-component="body">
    <br>
<p>Must be a valid URL. Example: <code>http://walsh.info/beatae-rem-tempore-perferendis-cumque.html</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>events</code></b>&nbsp;&nbsp;
<small>string[]</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="events[0]"                data-endpoint="PUTapi-v1-paywall--id--webhook--webhookId-"
               data-component="body">
        <input type="text" style="display: none"
               name="events[1]"                data-endpoint="PUTapi-v1-paywall--id--webhook--webhookId-"
               data-component="body">
    <br>
<p>Must be one of <code>new</code>, <code>pending_confirmation</code>, <code>paid</code>, <code>overpaid</code>, <code>underpaid</code>, <code>in_flight</code>, <code>expired</code>, or <code>cancelled</code>.</p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>status</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="status"                data-endpoint="PUTapi-v1-paywall--id--webhook--webhookId-"
               value="active"
               data-component="body">
    <br>
<p>Must be one of <code>active</code> or <code>inactive</code>. Example: <code>active</code></p>
        </div>
        </form>

                <h1 id="paywalls">Paywalls</h1>

    

                                <h2 id="paywalls-GETapi-v1-paywall">Get Paywalls</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Displays a list of paywalls belonging to the authenticated user.</p>

<span id="example-requests-GETapi-v1-paywall">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/paywall" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/paywall',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-paywall">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        {
            &quot;id&quot;: null,
            &quot;name&quot;: &quot;Miss Cordie Parker&quot;,
            &quot;type&quot;: &quot;content&quot;,
            &quot;price&quot;: 32,
            &quot;settings&quot;: {
                &quot;bar&quot;: &quot;foo&quot;
            },
            &quot;created_at&quot;: null,
            &quot;updated_at&quot;: null
        },
        {
            &quot;id&quot;: null,
            &quot;name&quot;: &quot;Mandy Wolf&quot;,
            &quot;type&quot;: &quot;redirect&quot;,
            &quot;price&quot;: 9,
            &quot;settings&quot;: {
                &quot;bar&quot;: &quot;foo&quot;
            },
            &quot;created_at&quot;: null,
            &quot;updated_at&quot;: null
        }
    ],
    &quot;links&quot;: {
        &quot;first&quot;: &quot;/?page=1&quot;,
        &quot;last&quot;: &quot;/?page=1&quot;,
        &quot;prev&quot;: null,
        &quot;next&quot;: null
    },
    &quot;meta&quot;: {
        &quot;current_page&quot;: 1,
        &quot;from&quot;: 1,
        &quot;last_page&quot;: 1,
        &quot;links&quot;: [
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;&amp;laquo; Previous&quot;,
                &quot;active&quot;: false
            },
            {
                &quot;url&quot;: &quot;/?page=1&quot;,
                &quot;label&quot;: &quot;1&quot;,
                &quot;active&quot;: true
            },
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;Next &amp;raquo;&quot;,
                &quot;active&quot;: false
            }
        ],
        &quot;path&quot;: &quot;/&quot;,
        &quot;per_page&quot;: 15,
        &quot;to&quot;: 2,
        &quot;total&quot;: 2
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-paywall" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-paywall"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-paywall" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-paywall" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-paywall"></code></pre>
</span>
<form id="form-GETapi-v1-paywall" data-method="GET"
      data-path="api/v1/paywall"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-paywall', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-paywall"
                    onclick="tryItOut('GETapi-v1-paywall');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-paywall"
                    onclick="cancelTryOut('GETapi-v1-paywall');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-paywall" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/paywall</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-paywall"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-paywall"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-paywall"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="paywalls-POSTapi-v1-paywall">Create Paywall</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Creates a new paywall.</p>

<span id="example-requests-POSTapi-v1-paywall">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "https://nodeless.io/api/v1/paywall" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"piylhqqqhdaumawgpetgfvcde\",
    \"type\": \"wp_article\",
    \"price\": 751
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "piylhqqqhdaumawgpetgfvcde",
    "type": "wp_article",
    "price": 751
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;post(
    'https://nodeless.io/api/v1/paywall',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
        'json' =&gt; [
            'name' =&gt; 'piylhqqqhdaumawgpetgfvcde',
            'type' =&gt; 'wp_article',
            'price' =&gt; 751,
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall'
payload = {
    "name": "piylhqqqhdaumawgpetgfvcde",
    "type": "wp_article",
    "price": 751
}
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('POST', url, headers=headers, json=payload)
response.json()</code></pre></div>

</span>

<span id="example-responses-POSTapi-v1-paywall">
</span>
<span id="execution-results-POSTapi-v1-paywall" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-v1-paywall"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-paywall" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-v1-paywall" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-paywall"></code></pre>
</span>
<form id="form-POSTapi-v1-paywall" data-method="POST"
      data-path="api/v1/paywall"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-paywall', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-v1-paywall"
                    onclick="tryItOut('POSTapi-v1-paywall');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-v1-paywall"
                    onclick="cancelTryOut('POSTapi-v1-paywall');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-v1-paywall" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/v1/paywall</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="POSTapi-v1-paywall"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="POSTapi-v1-paywall"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="POSTapi-v1-paywall"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="name"                data-endpoint="POSTapi-v1-paywall"
               value="piylhqqqhdaumawgpetgfvcde"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>piylhqqqhdaumawgpetgfvcde</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>type</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="type"                data-endpoint="POSTapi-v1-paywall"
               value="wp_article"
               data-component="body">
    <br>
<p>Must be one of <code>content</code>, <code>download</code>, <code>redirect</code>, or <code>wp_article</code>. Example: <code>wp_article</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>price</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               name="price"                data-endpoint="POSTapi-v1-paywall"
               value="751"
               data-component="body">
    <br>
<p>Must be at least 1000. Example: <code>751</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>settings</code></b>&nbsp;&nbsp;
<small>object</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
               name="settings"                data-endpoint="POSTapi-v1-paywall"
               value=""
               data-component="body">
    <br>

        </div>
        </form>

                    <h2 id="paywalls-GETapi-v1-paywall--id-">Get Paywall</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Displays a paywall's details.</p>

<span id="example-requests-GETapi-v1-paywall--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-paywall--id-">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-paywall--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-paywall--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-paywall--id-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-paywall--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-paywall--id-"></code></pre>
</span>
<form id="form-GETapi-v1-paywall--id-" data-method="GET"
      data-path="api/v1/paywall/{id}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-paywall--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-paywall--id-"
                    onclick="tryItOut('GETapi-v1-paywall--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-paywall--id-"
                    onclick="cancelTryOut('GETapi-v1-paywall--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-paywall--id-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/paywall/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-paywall--id-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-paywall--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-paywall--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-paywall--id-"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                    </form>

                    <h2 id="paywalls-PUTapi-v1-paywall--id-">Update Paywall</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Updates a paywall.</p>

<span id="example-requests-PUTapi-v1-paywall--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"vykbcddukvzkjflbzmn\",
    \"type\": \"download\",
    \"price\": 213
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "vykbcddukvzkjflbzmn",
    "type": "download",
    "price": 213
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;put(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
        'json' =&gt; [
            'name' =&gt; 'vykbcddukvzkjflbzmn',
            'type' =&gt; 'download',
            'price' =&gt; 213,
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61'
payload = {
    "name": "vykbcddukvzkjflbzmn",
    "type": "download",
    "price": 213
}
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('PUT', url, headers=headers, json=payload)
response.json()</code></pre></div>

</span>

<span id="example-responses-PUTapi-v1-paywall--id-">
</span>
<span id="execution-results-PUTapi-v1-paywall--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTapi-v1-paywall--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-v1-paywall--id-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-v1-paywall--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-v1-paywall--id-"></code></pre>
</span>
<form id="form-PUTapi-v1-paywall--id-" data-method="PUT"
      data-path="api/v1/paywall/{id}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-v1-paywall--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-v1-paywall--id-"
                    onclick="tryItOut('PUTapi-v1-paywall--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-v1-paywall--id-"
                    onclick="cancelTryOut('PUTapi-v1-paywall--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-v1-paywall--id-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/v1/paywall/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="PUTapi-v1-paywall--id-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="PUTapi-v1-paywall--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="PUTapi-v1-paywall--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="PUTapi-v1-paywall--id-"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="name"                data-endpoint="PUTapi-v1-paywall--id-"
               value="vykbcddukvzkjflbzmn"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>vykbcddukvzkjflbzmn</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>type</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="type"                data-endpoint="PUTapi-v1-paywall--id-"
               value="download"
               data-component="body">
    <br>
<p>Must be one of <code>content</code>, <code>download</code>, <code>redirect</code>, or <code>wp_article</code>. Example: <code>download</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>price</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               name="price"                data-endpoint="PUTapi-v1-paywall--id-"
               value="213"
               data-component="body">
    <br>
<p>Must be at least 1000. Example: <code>213</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>settings</code></b>&nbsp;&nbsp;
<small>object</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
               name="settings"                data-endpoint="PUTapi-v1-paywall--id-"
               value=""
               data-component="body">
    <br>

        </div>
        </form>

                    <h2 id="paywalls-DELETEapi-v1-paywall--id-">Delete Paywall</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Deletes a paywall.</p>

<span id="example-requests-DELETEapi-v1-paywall--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;delete(
    'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/paywall/e557543c-092f-473c-935f-8eeb772ffc61'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('DELETE', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-DELETEapi-v1-paywall--id-">
</span>
<span id="execution-results-DELETEapi-v1-paywall--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEapi-v1-paywall--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-v1-paywall--id-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEapi-v1-paywall--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-v1-paywall--id-"></code></pre>
</span>
<form id="form-DELETEapi-v1-paywall--id-" data-method="DELETE"
      data-path="api/v1/paywall/{id}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEapi-v1-paywall--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEapi-v1-paywall--id-"
                    onclick="tryItOut('DELETEapi-v1-paywall--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEapi-v1-paywall--id-"
                    onclick="cancelTryOut('DELETEapi-v1-paywall--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEapi-v1-paywall--id-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>api/v1/paywall/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="DELETEapi-v1-paywall--id-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="DELETEapi-v1-paywall--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="DELETEapi-v1-paywall--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="DELETEapi-v1-paywall--id-"
               value="e557543c-092f-473c-935f-8eeb772ffc61"
               data-component="url">
    <br>
<p>The ID of the paywall. Example: <code>e557543c-092f-473c-935f-8eeb772ffc61</code></p>
            </div>
                    </form>

                <h1 id="server-info">Server Info</h1>

    

                                <h2 id="server-info-GETapi-v1-status">Get API Status</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Displays if the API is online or offline.</p>

<span id="example-requests-GETapi-v1-status">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/status" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/status"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/status',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/status'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-status">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;code&quot;: 200,
        &quot;status&quot;: &quot;online&quot;,
        &quot;node&quot;: &quot;LND&quot;
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-status" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-status"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-status" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-status" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-status"></code></pre>
</span>
<form id="form-GETapi-v1-status" data-method="GET"
      data-path="api/v1/status"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-status', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-status"
                    onclick="tryItOut('GETapi-v1-status');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-status"
                    onclick="cancelTryOut('GETapi-v1-status');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-status" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/status</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-status"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                <h1 id="store-invoices">Store Invoices</h1>

    

                                <h2 id="store-invoices-POSTapi-v1-store--id--invoice">Create Store Invoice</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-POSTapi-v1-store--id--invoice">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"amount\": 100.5,
    \"currency\": \"USD\",
    \"buyerEmail\": \"jennyfer15@example.org\",
    \"redirectUrl\": \"http:\\/\\/www.wiegand.info\\/dicta-dicta-est-perspiciatis-reprehenderit-nemo\",
    \"metadata\": {
        \"key\": \"value\"
    }
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "amount": 100.5,
    "currency": "USD",
    "buyerEmail": "jennyfer15@example.org",
    "redirectUrl": "http:\/\/www.wiegand.info\/dicta-dicta-est-perspiciatis-reprehenderit-nemo",
    "metadata": {
        "key": "value"
    }
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;post(
    'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
        'json' =&gt; [
            'amount' =&gt; 100.5,
            'currency' =&gt; 'USD',
            'buyerEmail' =&gt; 'jennyfer15@example.org',
            'redirectUrl' =&gt; 'http://www.wiegand.info/dicta-dicta-est-perspiciatis-reprehenderit-nemo',
            'metadata' =&gt; [
                'key' =&gt; 'value',
            ],
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice'
payload = {
    "amount": 100.5,
    "currency": "USD",
    "buyerEmail": "jennyfer15@example.org",
    "redirectUrl": "http:\/\/www.wiegand.info\/dicta-dicta-est-perspiciatis-reprehenderit-nemo",
    "metadata": {
        "key": "value"
    }
}
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('POST', url, headers=headers, json=payload)
response.json()</code></pre></div>

</span>

<span id="example-responses-POSTapi-v1-store--id--invoice">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: &quot;0535e71b-8ab6-40e7-b67a-9f6e7c792276&quot;,
        &quot;checkoutLink&quot;: &quot;https://nodeless.io/checkout/0535e71b-8ab6-40e7-b67a-9f6e7c792276&quot;,
        &quot;satsAmount&quot;: 68174,
        &quot;status&quot;: &quot;in_flight&quot;,
        &quot;buyerEmail&quot;: &quot;sydney73@keebler.com&quot;,
        &quot;redirectUrl&quot;: &quot;http://www.osinski.info/dicta-rerum-deleniti-perferendis-ullam-neque-numquam&quot;,
        &quot;metadata&quot;: {
            &quot;user_id&quot;: 433,
            &quot;order_id&quot;: 298
        },
        &quot;createdAt&quot;: &quot;2023-05-01T15:32:33.000000Z&quot;,
        &quot;paidAt&quot;: null,
        &quot;onchainAddress&quot;: &quot;tb1pxk7g48w8ln9g4fzfh4kcny3hqn8xp3wjnduy5g87vk006mvd4puq6kt8el&quot;,
        &quot;lightningInvoice&quot;: &quot;lntb681740n1pjylkujpp52v7cxznsyjurdlm4xdcns4vvlk9d4l5paj0guuwkhh0cs4pvrluqdz42d6x7un9f9h8vmmfvdjjqj2y8gsrqdfnx4jnwvtz95uxzc3k956rqefh943rvdmp95ukvdn9xa3nwwfjxgmnvcqzpgxqzfvsp54q2pzmdla7tatm4t59k9chwd6dudhmw27c2pqn7a0yu9m2f6rn6s9qyyssqxkuh3hljgnuhe25kneksyzslr2xf4reqvgd7kcnmv748v4dn6zw8p5rljvxkk6zp6ajhsyukc9e54dkrnjv5xxxuxag9auh47kdyqngqqenp4g&quot;,
        &quot;store&quot;: {
            &quot;id&quot;: &quot;909dbae0-9322-4e04-b304-d5c53af291ae&quot;,
            &quot;name&quot;: &quot;Cremin-Hansen&quot;,
            &quot;url&quot;: &quot;http://beer.net/&quot;,
            &quot;email&quot;: &quot;bwuckert@murphy.com&quot;,
            &quot;createdAt&quot;: &quot;2023-05-01T15:32:33.000000Z&quot;
        },
        &quot;qrCodes&quot;: {
            &quot;unified&quot;: &quot;data:image/png;base64,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&quot;,
            &quot;onchain&quot;: &quot;data:image/png;base64,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&quot;,
            &quot;lightning&quot;: &quot;data:image/png;base64,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&quot;
        }
    }
}</code>
 </pre>
    </span>
<span id="execution-results-POSTapi-v1-store--id--invoice" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-v1-store--id--invoice"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-store--id--invoice" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-v1-store--id--invoice" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-store--id--invoice"></code></pre>
</span>
<form id="form-POSTapi-v1-store--id--invoice" data-method="POST"
      data-path="api/v1/store/{id}/invoice"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-store--id--invoice', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-v1-store--id--invoice"
                    onclick="tryItOut('POSTapi-v1-store--id--invoice');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-v1-store--id--invoice"
                    onclick="cancelTryOut('POSTapi-v1-store--id--invoice');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-v1-store--id--invoice" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/v1/store/{id}/invoice</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="POSTapi-v1-store--id--invoice"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="POSTapi-v1-store--id--invoice"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="POSTapi-v1-store--id--invoice"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="POSTapi-v1-store--id--invoice"
               value="54fbc40d-a8a1-481d-b010-dea627eb491e"
               data-component="url">
    <br>
<p>The ID of the store. Example: <code>54fbc40d-a8a1-481d-b010-dea627eb491e</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>amount</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
 &nbsp;
                <input type="number" style="display: none"
               name="amount"                data-endpoint="POSTapi-v1-store--id--invoice"
               value="100.5"
               data-component="body">
    <br>
<p>The amount of the invoice. Example: <code>100.5</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>currency</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="currency"                data-endpoint="POSTapi-v1-store--id--invoice"
               value="USD"
               data-component="body">
    <br>
<p>The currency of the invoice. Must be one of <code>usd</code>, <code>eur</code>, <code>cad</code>, <code>jpy</code>, <code>gbp</code>, <code>chf</code>, <code>btc</code>, <code>sats</code>, <code>USD</code>, <code>EUR</code>, <code>CAD</code>, <code>JPY</code>, <code>GBP</code>, <code>CHF</code>, <code>BTC</code>, or <code>SATS</code>. Example: <code>USD</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>buyerEmail</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
               name="buyerEmail"                data-endpoint="POSTapi-v1-store--id--invoice"
               value="jennyfer15@example.org"
               data-component="body">
    <br>
<p>The email of the buyer. Must be a valid email address. Example: <code>jennyfer15@example.org</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>redirectUrl</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
               name="redirectUrl"                data-endpoint="POSTapi-v1-store--id--invoice"
               value="http://www.wiegand.info/dicta-dicta-est-perspiciatis-reprehenderit-nemo"
               data-component="body">
    <br>
<p>The redirect url of the invoice. Must be a valid URL. Example: <code>http://www.wiegand.info/dicta-dicta-est-perspiciatis-reprehenderit-nemo</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>metadata</code></b>&nbsp;&nbsp;
<small>object</small>&nbsp;
<i>optional</i> &nbsp;
                <input type="text" style="display: none"
               name="metadata"                data-endpoint="POSTapi-v1-store--id--invoice"
               value=""
               data-component="body">
    <br>
<p>The metadata of the invoice.</p>
        </div>
        </form>

                    <h2 id="store-invoices-GETapi-v1-store--id--invoice--invoiceId-">Get Store Invoice</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-GETapi-v1-store--id--invoice--invoiceId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice/error" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice/error"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice/error',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice/error'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-store--id--invoice--invoiceId-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: &quot;115a232f-bb20-4e6a-8677-2aedd69373e5&quot;,
        &quot;checkoutLink&quot;: &quot;https://nodeless.io/checkout/115a232f-bb20-4e6a-8677-2aedd69373e5&quot;,
        &quot;satsAmount&quot;: 15092,
        &quot;status&quot;: &quot;paid&quot;,
        &quot;buyerEmail&quot;: &quot;shanon.herman@gmail.com&quot;,
        &quot;redirectUrl&quot;: &quot;http://www.bailey.biz/quibusdam-ut-quia-rerum-aut-libero-similique-qui.html&quot;,
        &quot;metadata&quot;: {
            &quot;user_id&quot;: 567,
            &quot;order_id&quot;: 656
        },
        &quot;createdAt&quot;: &quot;2023-05-01T15:32:34.000000Z&quot;,
        &quot;paidAt&quot;: null,
        &quot;onchainAddress&quot;: &quot;tb1pxk7g48w8ln9g4fzfh4kcny3hqn8xp3wjnduy5g87vk006mvd4puq6kt8el&quot;,
        &quot;lightningInvoice&quot;: &quot;lntb150920n1pjylkunpp5l0ankvfzh8ww0kvk5sht8t2se5fdwgs2yv0t3fn7e8m969u0e9xsdz42d6x7un9f9h8vmmfvdjjqj2y8gsrzvf4vyerxvnx943xyv3s956x2dnp95urvdeh95exzetyvsmrjvehxdjn2cqzpgxqzfvsp5lvf4fyv0c4ujj3m430dupkpezz2ng3rx7gr9axvfjhzgs0lkqkys9qyyssqp4sy8lpvv8hxg4nswn8w5qqz8g3j0zkpsmw0ydjugn2avrljwa3nstl26rvlrsgkylckau32scs4vehxev42x00v8mdfxjl6y95sdecp3mydk6&quot;,
        &quot;store&quot;: {
            &quot;id&quot;: &quot;093b3ce7-efdc-4081-9558-51a82140cf37&quot;,
            &quot;name&quot;: &quot;Miller PLC&quot;,
            &quot;url&quot;: &quot;https://bailey.com/aut-sit-ipsa-provident.html&quot;,
            &quot;email&quot;: &quot;hudson.rusty@yahoo.com&quot;,
            &quot;createdAt&quot;: &quot;2023-05-01T15:32:34.000000Z&quot;
        },
        &quot;qrCodes&quot;: {
            &quot;unified&quot;: &quot;data:image/png;base64,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&quot;,
            &quot;onchain&quot;: &quot;data:image/png;base64,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&quot;,
            &quot;lightning&quot;: &quot;data:image/png;base64,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&quot;
        }
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-store--id--invoice--invoiceId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-store--id--invoice--invoiceId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-store--id--invoice--invoiceId-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-store--id--invoice--invoiceId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-store--id--invoice--invoiceId-"></code></pre>
</span>
<form id="form-GETapi-v1-store--id--invoice--invoiceId-" data-method="GET"
      data-path="api/v1/store/{id}/invoice/{invoiceId}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-store--id--invoice--invoiceId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-store--id--invoice--invoiceId-"
                    onclick="tryItOut('GETapi-v1-store--id--invoice--invoiceId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-store--id--invoice--invoiceId-"
                    onclick="cancelTryOut('GETapi-v1-store--id--invoice--invoiceId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-store--id--invoice--invoiceId-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/store/{id}/invoice/{invoiceId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-store--id--invoice--invoiceId-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-store--id--invoice--invoiceId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-store--id--invoice--invoiceId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-store--id--invoice--invoiceId-"
               value="54fbc40d-a8a1-481d-b010-dea627eb491e"
               data-component="url">
    <br>
<p>The ID of the store. Example: <code>54fbc40d-a8a1-481d-b010-dea627eb491e</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>invoiceId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="invoiceId"                data-endpoint="GETapi-v1-store--id--invoice--invoiceId-"
               value="error"
               data-component="url">
    <br>
<p>Example: <code>error</code></p>
            </div>
                    </form>

                    <h2 id="store-invoices-GETapi-v1-store--id--invoice--invoiceId--status">Get Store Invoice Status</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>



<span id="example-requests-GETapi-v1-store--id--invoice--invoiceId--status">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice/commodi/status" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice/commodi/status"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice/commodi/status',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/invoice/commodi/status'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-store--id--invoice--invoiceId--status">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;status&quot;: &quot;paid&quot;,
    &quot;expires_at&quot;: &quot;2023-05-01 15:40:31&quot;,
    &quot;ttl_seconds&quot;: 713
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-store--id--invoice--invoiceId--status" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-store--id--invoice--invoiceId--status"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-store--id--invoice--invoiceId--status" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-store--id--invoice--invoiceId--status" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-store--id--invoice--invoiceId--status"></code></pre>
</span>
<form id="form-GETapi-v1-store--id--invoice--invoiceId--status" data-method="GET"
      data-path="api/v1/store/{id}/invoice/{invoiceId}/status"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-store--id--invoice--invoiceId--status', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-store--id--invoice--invoiceId--status"
                    onclick="tryItOut('GETapi-v1-store--id--invoice--invoiceId--status');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-store--id--invoice--invoiceId--status"
                    onclick="cancelTryOut('GETapi-v1-store--id--invoice--invoiceId--status');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-store--id--invoice--invoiceId--status" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/store/{id}/invoice/{invoiceId}/status</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-store--id--invoice--invoiceId--status"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-store--id--invoice--invoiceId--status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-store--id--invoice--invoiceId--status"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-store--id--invoice--invoiceId--status"
               value="54fbc40d-a8a1-481d-b010-dea627eb491e"
               data-component="url">
    <br>
<p>The ID of the store. Example: <code>54fbc40d-a8a1-481d-b010-dea627eb491e</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>invoiceId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="invoiceId"                data-endpoint="GETapi-v1-store--id--invoice--invoiceId--status"
               value="commodi"
               data-component="url">
    <br>
<p>Example: <code>commodi</code></p>
            </div>
                    </form>

                <h1 id="store-webhooks">Store Webhooks</h1>

    

                                <h2 id="store-webhooks-GETapi-v1-store--id--webhook">Get Store Webhooks</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Displays a list of webhooks belonging to the store.</p>

<span id="example-requests-GETapi-v1-store--id--webhook">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-store--id--webhook">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        {
            &quot;id&quot;: null,
            &quot;url&quot;: &quot;https://utxo.one&quot;,
            &quot;secret&quot;: &quot;3J^Rh9SG9XbPB=#Ez|&quot;,
            &quot;status&quot;: &quot;active&quot;,
            &quot;events&quot;: [
                &quot;new&quot;,
                &quot;pending_confirmation&quot;,
                &quot;paid&quot;,
                &quot;expired&quot;,
                &quot;cancelled&quot;,
                &quot;underpaid&quot;,
                &quot;overpaid&quot;,
                &quot;in_flight&quot;
            ],
            &quot;createdAt&quot;: null,
            &quot;lastDeliveryAt&quot;: null
        },
        {
            &quot;id&quot;: null,
            &quot;url&quot;: &quot;https://utxo.one&quot;,
            &quot;secret&quot;: &quot;}wQ(k?OEfU&quot;,
            &quot;status&quot;: &quot;active&quot;,
            &quot;events&quot;: [
                &quot;new&quot;,
                &quot;pending_confirmation&quot;,
                &quot;paid&quot;,
                &quot;expired&quot;,
                &quot;cancelled&quot;,
                &quot;underpaid&quot;,
                &quot;overpaid&quot;,
                &quot;in_flight&quot;
            ],
            &quot;createdAt&quot;: null,
            &quot;lastDeliveryAt&quot;: null
        }
    ],
    &quot;links&quot;: {
        &quot;first&quot;: &quot;/?page=1&quot;,
        &quot;last&quot;: &quot;/?page=1&quot;,
        &quot;prev&quot;: null,
        &quot;next&quot;: null
    },
    &quot;meta&quot;: {
        &quot;current_page&quot;: 1,
        &quot;from&quot;: 1,
        &quot;last_page&quot;: 1,
        &quot;links&quot;: [
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;&amp;laquo; Previous&quot;,
                &quot;active&quot;: false
            },
            {
                &quot;url&quot;: &quot;/?page=1&quot;,
                &quot;label&quot;: &quot;1&quot;,
                &quot;active&quot;: true
            },
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;Next &amp;raquo;&quot;,
                &quot;active&quot;: false
            }
        ],
        &quot;path&quot;: &quot;/&quot;,
        &quot;per_page&quot;: 15,
        &quot;to&quot;: 2,
        &quot;total&quot;: 2
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-store--id--webhook" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-store--id--webhook"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-store--id--webhook" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-store--id--webhook" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-store--id--webhook"></code></pre>
</span>
<form id="form-GETapi-v1-store--id--webhook" data-method="GET"
      data-path="api/v1/store/{id}/webhook"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-store--id--webhook', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-store--id--webhook"
                    onclick="tryItOut('GETapi-v1-store--id--webhook');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-store--id--webhook"
                    onclick="cancelTryOut('GETapi-v1-store--id--webhook');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-store--id--webhook" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/store/{id}/webhook</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-store--id--webhook"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-store--id--webhook"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-store--id--webhook"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-store--id--webhook"
               value="54fbc40d-a8a1-481d-b010-dea627eb491e"
               data-component="url">
    <br>
<p>The ID of the store. Example: <code>54fbc40d-a8a1-481d-b010-dea627eb491e</code></p>
            </div>
                    </form>

                    <h2 id="store-webhooks-POSTapi-v1-store--id--webhook">Create Store Webhook</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Creates a store webhook.</p>

<span id="example-requests-POSTapi-v1-store--id--webhook">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"type\": \"store\",
    \"url\": \"http:\\/\\/www.walsh.com\\/dolorum-voluptates-aspernatur-dolor-voluptatem\",
    \"events\": [
        \"new\"
    ],
    \"secret\": \"reprehenderit\",
    \"status\": \"inactive\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "type": "store",
    "url": "http:\/\/www.walsh.com\/dolorum-voluptates-aspernatur-dolor-voluptatem",
    "events": [
        "new"
    ],
    "secret": "reprehenderit",
    "status": "inactive"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;post(
    'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
        'json' =&gt; [
            'type' =&gt; 'store',
            'url' =&gt; 'http://www.walsh.com/dolorum-voluptates-aspernatur-dolor-voluptatem',
            'events' =&gt; [
                'new',
            ],
            'secret' =&gt; 'reprehenderit',
            'status' =&gt; 'inactive',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook'
payload = {
    "type": "store",
    "url": "http:\/\/www.walsh.com\/dolorum-voluptates-aspernatur-dolor-voluptatem",
    "events": [
        "new"
    ],
    "secret": "reprehenderit",
    "status": "inactive"
}
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('POST', url, headers=headers, json=payload)
response.json()</code></pre></div>

</span>

<span id="example-responses-POSTapi-v1-store--id--webhook">
</span>
<span id="execution-results-POSTapi-v1-store--id--webhook" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-v1-store--id--webhook"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-v1-store--id--webhook" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-v1-store--id--webhook" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-v1-store--id--webhook"></code></pre>
</span>
<form id="form-POSTapi-v1-store--id--webhook" data-method="POST"
      data-path="api/v1/store/{id}/webhook"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-v1-store--id--webhook', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-v1-store--id--webhook"
                    onclick="tryItOut('POSTapi-v1-store--id--webhook');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-v1-store--id--webhook"
                    onclick="cancelTryOut('POSTapi-v1-store--id--webhook');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-v1-store--id--webhook" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/v1/store/{id}/webhook</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="POSTapi-v1-store--id--webhook"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="POSTapi-v1-store--id--webhook"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="POSTapi-v1-store--id--webhook"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="POSTapi-v1-store--id--webhook"
               value="54fbc40d-a8a1-481d-b010-dea627eb491e"
               data-component="url">
    <br>
<p>The ID of the store. Example: <code>54fbc40d-a8a1-481d-b010-dea627eb491e</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>type</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="type"                data-endpoint="POSTapi-v1-store--id--webhook"
               value="store"
               data-component="body">
    <br>
<p>Must be one of <code>store</code>, <code>donation_page</code>, <code>paywall</code>, or <code>inbox</code>. Example: <code>store</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>url</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="url"                data-endpoint="POSTapi-v1-store--id--webhook"
               value="http://www.walsh.com/dolorum-voluptates-aspernatur-dolor-voluptatem"
               data-component="body">
    <br>
<p>Must be a valid URL. Example: <code>http://www.walsh.com/dolorum-voluptates-aspernatur-dolor-voluptatem</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>events</code></b>&nbsp;&nbsp;
<small>string[]</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="events[0]"                data-endpoint="POSTapi-v1-store--id--webhook"
               data-component="body">
        <input type="text" style="display: none"
               name="events[1]"                data-endpoint="POSTapi-v1-store--id--webhook"
               data-component="body">
    <br>
<p>Must be one of <code>new</code>, <code>pending_confirmation</code>, <code>paid</code>, <code>overpaid</code>, <code>underpaid</code>, <code>in_flight</code>, <code>expired</code>, or <code>cancelled</code>.</p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>secret</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="secret"                data-endpoint="POSTapi-v1-store--id--webhook"
               value="reprehenderit"
               data-component="body">
    <br>
<p>Example: <code>reprehenderit</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>status</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="status"                data-endpoint="POSTapi-v1-store--id--webhook"
               value="inactive"
               data-component="body">
    <br>
<p>Must be one of <code>active</code> or <code>inactive</code>. Example: <code>inactive</code></p>
        </div>
        </form>

                    <h2 id="store-webhooks-GETapi-v1-store--id--webhook--webhookId-">Get Store Webhook</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Displays a store webhook's details.</p>

<span id="example-requests-GETapi-v1-store--id--webhook--webhookId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/enim" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/enim"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/enim',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/enim'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-store--id--webhook--webhookId-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: null,
        &quot;url&quot;: &quot;https://utxo.one&quot;,
        &quot;secret&quot;: &quot;A~|V6*vw&quot;,
        &quot;status&quot;: &quot;active&quot;,
        &quot;events&quot;: [
            &quot;new&quot;,
            &quot;pending_confirmation&quot;,
            &quot;paid&quot;,
            &quot;expired&quot;,
            &quot;cancelled&quot;,
            &quot;underpaid&quot;,
            &quot;overpaid&quot;,
            &quot;in_flight&quot;
        ],
        &quot;createdAt&quot;: null,
        &quot;lastDeliveryAt&quot;: null
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-store--id--webhook--webhookId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-store--id--webhook--webhookId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-store--id--webhook--webhookId-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-store--id--webhook--webhookId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-store--id--webhook--webhookId-"></code></pre>
</span>
<form id="form-GETapi-v1-store--id--webhook--webhookId-" data-method="GET"
      data-path="api/v1/store/{id}/webhook/{webhookId}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-store--id--webhook--webhookId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-store--id--webhook--webhookId-"
                    onclick="tryItOut('GETapi-v1-store--id--webhook--webhookId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-store--id--webhook--webhookId-"
                    onclick="cancelTryOut('GETapi-v1-store--id--webhook--webhookId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-store--id--webhook--webhookId-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/store/{id}/webhook/{webhookId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-store--id--webhook--webhookId-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-store--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-store--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-store--id--webhook--webhookId-"
               value="54fbc40d-a8a1-481d-b010-dea627eb491e"
               data-component="url">
    <br>
<p>The ID of the store. Example: <code>54fbc40d-a8a1-481d-b010-dea627eb491e</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>webhookId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="webhookId"                data-endpoint="GETapi-v1-store--id--webhook--webhookId-"
               value="enim"
               data-component="url">
    <br>
<p>Example: <code>enim</code></p>
            </div>
                    </form>

                    <h2 id="store-webhooks-DELETEapi-v1-store--id--webhook--webhookId-">Delete Store Webhook</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Deletes a store webhook.</p>

<span id="example-requests-DELETEapi-v1-store--id--webhook--webhookId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/et" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/et"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;delete(
    'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/et',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/et'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('DELETE', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-DELETEapi-v1-store--id--webhook--webhookId-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: null,
        &quot;url&quot;: &quot;https://utxo.one&quot;,
        &quot;secret&quot;: &quot;rlz0]&lt;m`&quot;,
        &quot;status&quot;: &quot;active&quot;,
        &quot;events&quot;: [
            &quot;new&quot;,
            &quot;pending_confirmation&quot;,
            &quot;paid&quot;,
            &quot;expired&quot;,
            &quot;cancelled&quot;,
            &quot;underpaid&quot;,
            &quot;overpaid&quot;,
            &quot;in_flight&quot;
        ],
        &quot;createdAt&quot;: null,
        &quot;lastDeliveryAt&quot;: null
    }
}</code>
 </pre>
    </span>
<span id="execution-results-DELETEapi-v1-store--id--webhook--webhookId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEapi-v1-store--id--webhook--webhookId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEapi-v1-store--id--webhook--webhookId-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEapi-v1-store--id--webhook--webhookId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEapi-v1-store--id--webhook--webhookId-"></code></pre>
</span>
<form id="form-DELETEapi-v1-store--id--webhook--webhookId-" data-method="DELETE"
      data-path="api/v1/store/{id}/webhook/{webhookId}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEapi-v1-store--id--webhook--webhookId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEapi-v1-store--id--webhook--webhookId-"
                    onclick="tryItOut('DELETEapi-v1-store--id--webhook--webhookId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEapi-v1-store--id--webhook--webhookId-"
                    onclick="cancelTryOut('DELETEapi-v1-store--id--webhook--webhookId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEapi-v1-store--id--webhook--webhookId-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>api/v1/store/{id}/webhook/{webhookId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="DELETEapi-v1-store--id--webhook--webhookId-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="DELETEapi-v1-store--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="DELETEapi-v1-store--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="DELETEapi-v1-store--id--webhook--webhookId-"
               value="54fbc40d-a8a1-481d-b010-dea627eb491e"
               data-component="url">
    <br>
<p>The ID of the store. Example: <code>54fbc40d-a8a1-481d-b010-dea627eb491e</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>webhookId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="webhookId"                data-endpoint="DELETEapi-v1-store--id--webhook--webhookId-"
               value="et"
               data-component="url">
    <br>
<p>Example: <code>et</code></p>
            </div>
                    </form>

                    <h2 id="store-webhooks-PUTapi-v1-store--id--webhook--webhookId-">Update Store Webhook</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Updates a store webhook.</p>

<span id="example-requests-PUTapi-v1-store--id--webhook--webhookId-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/dolore" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"url\": \"http:\\/\\/www.robel.com\\/\",
    \"events\": [
        \"pending_confirmation\"
    ],
    \"status\": \"inactive\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/dolore"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "url": "http:\/\/www.robel.com\/",
    "events": [
        "pending_confirmation"
    ],
    "status": "inactive"
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;put(
    'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/dolore',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
        'json' =&gt; [
            'url' =&gt; 'http://www.robel.com/',
            'events' =&gt; [
                'pending_confirmation',
            ],
            'status' =&gt; 'inactive',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e/webhook/dolore'
payload = {
    "url": "http:\/\/www.robel.com\/",
    "events": [
        "pending_confirmation"
    ],
    "status": "inactive"
}
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('PUT', url, headers=headers, json=payload)
response.json()</code></pre></div>

</span>

<span id="example-responses-PUTapi-v1-store--id--webhook--webhookId-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: null,
        &quot;url&quot;: &quot;https://utxo.one&quot;,
        &quot;secret&quot;: &quot;M9\\2GZ~HC2c:&quot;,
        &quot;status&quot;: &quot;active&quot;,
        &quot;events&quot;: [
            &quot;new&quot;,
            &quot;pending_confirmation&quot;,
            &quot;paid&quot;,
            &quot;expired&quot;,
            &quot;cancelled&quot;,
            &quot;underpaid&quot;,
            &quot;overpaid&quot;,
            &quot;in_flight&quot;
        ],
        &quot;createdAt&quot;: null,
        &quot;lastDeliveryAt&quot;: null
    }
}</code>
 </pre>
    </span>
<span id="execution-results-PUTapi-v1-store--id--webhook--webhookId-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTapi-v1-store--id--webhook--webhookId-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTapi-v1-store--id--webhook--webhookId-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTapi-v1-store--id--webhook--webhookId-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTapi-v1-store--id--webhook--webhookId-"></code></pre>
</span>
<form id="form-PUTapi-v1-store--id--webhook--webhookId-" data-method="PUT"
      data-path="api/v1/store/{id}/webhook/{webhookId}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTapi-v1-store--id--webhook--webhookId-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTapi-v1-store--id--webhook--webhookId-"
                    onclick="tryItOut('PUTapi-v1-store--id--webhook--webhookId-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTapi-v1-store--id--webhook--webhookId-"
                    onclick="cancelTryOut('PUTapi-v1-store--id--webhook--webhookId-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTapi-v1-store--id--webhook--webhookId-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>api/v1/store/{id}/webhook/{webhookId}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="PUTapi-v1-store--id--webhook--webhookId-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="PUTapi-v1-store--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="PUTapi-v1-store--id--webhook--webhookId-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="PUTapi-v1-store--id--webhook--webhookId-"
               value="54fbc40d-a8a1-481d-b010-dea627eb491e"
               data-component="url">
    <br>
<p>The ID of the store. Example: <code>54fbc40d-a8a1-481d-b010-dea627eb491e</code></p>
            </div>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>webhookId</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="webhookId"                data-endpoint="PUTapi-v1-store--id--webhook--webhookId-"
               value="dolore"
               data-component="url">
    <br>
<p>Example: <code>dolore</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>url</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="url"                data-endpoint="PUTapi-v1-store--id--webhook--webhookId-"
               value="http://www.robel.com/"
               data-component="body">
    <br>
<p>Must be a valid URL. Example: <code>http://www.robel.com/</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>events</code></b>&nbsp;&nbsp;
<small>string[]</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="events[0]"                data-endpoint="PUTapi-v1-store--id--webhook--webhookId-"
               data-component="body">
        <input type="text" style="display: none"
               name="events[1]"                data-endpoint="PUTapi-v1-store--id--webhook--webhookId-"
               data-component="body">
    <br>
<p>Must be one of <code>new</code>, <code>pending_confirmation</code>, <code>paid</code>, <code>overpaid</code>, <code>underpaid</code>, <code>in_flight</code>, <code>expired</code>, or <code>cancelled</code>.</p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>status</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="status"                data-endpoint="PUTapi-v1-store--id--webhook--webhookId-"
               value="inactive"
               data-component="body">
    <br>
<p>Must be one of <code>active</code> or <code>inactive</code>. Example: <code>inactive</code></p>
        </div>
        </form>

                <h1 id="stores">Stores</h1>

    

                                <h2 id="stores-GETapi-v1-store">Get Stores</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Displays a list of stores belonging to the authenticated user.</p>

<span id="example-requests-GETapi-v1-store">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/store" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/store',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-store">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        {
            &quot;id&quot;: &quot;6ba80299-96d8-4798-89ef-c1529c203098&quot;,
            &quot;name&quot;: &quot;McLaughlin Ltd&quot;,
            &quot;url&quot;: &quot;http://www.oberbrunner.com/provident-earum-fugiat-sunt&quot;,
            &quot;email&quot;: &quot;lawrence44@lindgren.com&quot;,
            &quot;createdAt&quot;: &quot;2023-05-01T15:32:33.000000Z&quot;
        },
        {
            &quot;id&quot;: &quot;24ae4d6f-d370-41e9-a426-cb3b40ed544e&quot;,
            &quot;name&quot;: &quot;Sanford and Sons&quot;,
            &quot;url&quot;: &quot;https://kerluke.com/numquam-dolorem-voluptate-ut-architecto-vel.html&quot;,
            &quot;email&quot;: &quot;lubowitz.reid@rowe.com&quot;,
            &quot;createdAt&quot;: &quot;2023-05-01T15:32:33.000000Z&quot;
        }
    ],
    &quot;links&quot;: {
        &quot;first&quot;: &quot;/?page=1&quot;,
        &quot;last&quot;: &quot;/?page=1&quot;,
        &quot;prev&quot;: null,
        &quot;next&quot;: null
    },
    &quot;meta&quot;: {
        &quot;current_page&quot;: 1,
        &quot;from&quot;: 1,
        &quot;last_page&quot;: 1,
        &quot;links&quot;: [
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;&amp;laquo; Previous&quot;,
                &quot;active&quot;: false
            },
            {
                &quot;url&quot;: &quot;/?page=1&quot;,
                &quot;label&quot;: &quot;1&quot;,
                &quot;active&quot;: true
            },
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;Next &amp;raquo;&quot;,
                &quot;active&quot;: false
            }
        ],
        &quot;path&quot;: &quot;/&quot;,
        &quot;per_page&quot;: 15,
        &quot;to&quot;: 2,
        &quot;total&quot;: 2
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-store" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-store"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-store" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-store" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-store"></code></pre>
</span>
<form id="form-GETapi-v1-store" data-method="GET"
      data-path="api/v1/store"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-store', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-store"
                    onclick="tryItOut('GETapi-v1-store');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-store"
                    onclick="cancelTryOut('GETapi-v1-store');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-store" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/store</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-store"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-store"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-store"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="stores-GETapi-v1-store--id-">Get Store</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Displays a store's details.</p>

<span id="example-requests-GETapi-v1-store--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/store/54fbc40d-a8a1-481d-b010-dea627eb491e'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-store--id-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: &quot;3d947171-ed33-49c5-8120-be3947609839&quot;,
        &quot;name&quot;: &quot;DuBuque and Sons&quot;,
        &quot;url&quot;: &quot;http://www.shanahan.biz/ratione-nisi-quam-sunt-voluptatibus&quot;,
        &quot;email&quot;: &quot;janiya.nader@bartell.com&quot;,
        &quot;createdAt&quot;: &quot;2023-05-01T15:32:33.000000Z&quot;
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-store--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-store--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-store--id-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-store--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-store--id-"></code></pre>
</span>
<form id="form-GETapi-v1-store--id-" data-method="GET"
      data-path="api/v1/store/{id}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-store--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-store--id-"
                    onclick="tryItOut('GETapi-v1-store--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-store--id-"
                    onclick="cancelTryOut('GETapi-v1-store--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-store--id-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/store/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-store--id-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-store--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-store--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-store--id-"
               value="54fbc40d-a8a1-481d-b010-dea627eb491e"
               data-component="url">
    <br>
<p>The ID of the store. Example: <code>54fbc40d-a8a1-481d-b010-dea627eb491e</code></p>
            </div>
                    </form>

                <h1 id="transactions">Transactions</h1>

    

                                <h2 id="transactions-GETapi-v1-transaction">Get All Transactions</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Returns a paginated list of transactions for this user.</p>

<span id="example-requests-GETapi-v1-transaction">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/transaction?isFee=" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/transaction"
);

const params = {
    "isFee": "0",
};
Object.keys(params)
    .forEach(key =&gt; url.searchParams.append(key, params[key]));

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/transaction',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
        'query' =&gt; [
            'isFee' =&gt; '0',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/transaction'
params = {
  'isFee': '0',
}
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers, params=params)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-transaction">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: [
        {
            &quot;id&quot;: &quot;3bd3aab1-fbf8-49cf-a400-08bd54d0d2c2&quot;,
            &quot;transactable_type&quot;: &quot;Donation&quot;,
            &quot;transactable&quot;: {
                &quot;id&quot;: 1,
                &quot;uuid&quot;: &quot;11becf5a-fb6f-4360-a506-26e375a05b23&quot;,
                &quot;donation_page_id&quot;: 1,
                &quot;amount&quot;: 5000,
                &quot;amount_paid&quot;: 5000,
                &quot;name&quot;: &quot;anonymous&quot;,
                &quot;message&quot;: null,
                &quot;status&quot;: &quot;paid&quot;,
                &quot;type&quot;: &quot;lightning&quot;,
                &quot;metadata&quot;: null,
                &quot;created_at&quot;: &quot;2023-03-15T01:11:13.000000Z&quot;,
                &quot;updated_at&quot;: &quot;2023-03-15T01:11:36.000000Z&quot;,
                &quot;paid_at&quot;: &quot;2023-03-15 01:11:36&quot;
            },
            &quot;amount&quot;: 5000,
            &quot;type&quot;: &quot;credit&quot;,
            &quot;status&quot;: &quot;settled&quot;,
            &quot;created_at&quot;: &quot;2023-03-15T01:11:35.000000Z&quot;,
            &quot;updated_at&quot;: &quot;2023-03-15T01:11:35.000000Z&quot;,
            &quot;is_fee&quot;: false
        },
        {
            &quot;id&quot;: &quot;3bd3aab1-fbf8-49cf-a400-08bd54d0d2c2&quot;,
            &quot;transactable_type&quot;: &quot;Donation&quot;,
            &quot;transactable&quot;: {
                &quot;id&quot;: 1,
                &quot;uuid&quot;: &quot;11becf5a-fb6f-4360-a506-26e375a05b23&quot;,
                &quot;donation_page_id&quot;: 1,
                &quot;amount&quot;: 5000,
                &quot;amount_paid&quot;: 5000,
                &quot;name&quot;: &quot;anonymous&quot;,
                &quot;message&quot;: null,
                &quot;status&quot;: &quot;paid&quot;,
                &quot;type&quot;: &quot;lightning&quot;,
                &quot;metadata&quot;: null,
                &quot;created_at&quot;: &quot;2023-03-15T01:11:13.000000Z&quot;,
                &quot;updated_at&quot;: &quot;2023-03-15T01:11:36.000000Z&quot;,
                &quot;paid_at&quot;: &quot;2023-03-15 01:11:36&quot;
            },
            &quot;amount&quot;: 5000,
            &quot;type&quot;: &quot;credit&quot;,
            &quot;status&quot;: &quot;settled&quot;,
            &quot;created_at&quot;: &quot;2023-03-15T01:11:35.000000Z&quot;,
            &quot;updated_at&quot;: &quot;2023-03-15T01:11:35.000000Z&quot;,
            &quot;is_fee&quot;: false
        }
    ],
    &quot;links&quot;: {
        &quot;first&quot;: &quot;/?page=1&quot;,
        &quot;last&quot;: &quot;/?page=1&quot;,
        &quot;prev&quot;: null,
        &quot;next&quot;: null
    },
    &quot;meta&quot;: {
        &quot;current_page&quot;: 1,
        &quot;from&quot;: 1,
        &quot;last_page&quot;: 1,
        &quot;links&quot;: [
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;&amp;laquo; Previous&quot;,
                &quot;active&quot;: false
            },
            {
                &quot;url&quot;: &quot;/?page=1&quot;,
                &quot;label&quot;: &quot;1&quot;,
                &quot;active&quot;: true
            },
            {
                &quot;url&quot;: null,
                &quot;label&quot;: &quot;Next &amp;raquo;&quot;,
                &quot;active&quot;: false
            }
        ],
        &quot;path&quot;: &quot;/&quot;,
        &quot;per_page&quot;: 15,
        &quot;to&quot;: 2,
        &quot;total&quot;: 2
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-transaction" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-transaction"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-transaction" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-transaction" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-transaction"></code></pre>
</span>
<form id="form-GETapi-v1-transaction" data-method="GET"
      data-path="api/v1/transaction"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-transaction', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-transaction"
                    onclick="tryItOut('GETapi-v1-transaction');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-transaction"
                    onclick="cancelTryOut('GETapi-v1-transaction');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-transaction" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/transaction</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-transaction"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-transaction"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-transaction"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Query Parameters</b></h4>
                                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>isFee</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
<i>optional</i> &nbsp;
                <label data-endpoint="GETapi-v1-transaction" style="display: none">
            <input type="radio" name="isFee"
                   value="1"
                   data-endpoint="GETapi-v1-transaction"
                   data-component="query"             >
            <code>true</code>
        </label>
        <label data-endpoint="GETapi-v1-transaction" style="display: none">
            <input type="radio" name="isFee"
                   value="0"
                   data-endpoint="GETapi-v1-transaction"
                   data-component="query"             >
            <code>false</code>
        </label>
    <br>
<p>If true, only returns transactions that are fees. Example: <code>false</code></p>
            </div>
                </form>

                    <h2 id="transactions-GETapi-v1-transaction--id-">Get Transaction</h2>

<p>
<small class="badge badge-darkred">requires authentication</small>
</p>

<p>Returns a single transaction.</p>

<span id="example-requests-GETapi-v1-transaction--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "https://nodeless.io/api/v1/transaction/2cas07-0c8n70n923-72c93-c2389" \
    --header "Authorization: Bearer {YOUR_AUTH_KEY}" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "https://nodeless.io/api/v1/transaction/2cas07-0c8n70n923-72c93-c2389"
);

const headers = {
    "Authorization": "Bearer {YOUR_AUTH_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>


<div class="php-example">
    <pre><code class="language-php">$client = new \GuzzleHttp\Client();
$response = $client-&gt;get(
    'https://nodeless.io/api/v1/transaction/2cas07-0c8n70n923-72c93-c2389',
    [
        'headers' =&gt; [
            'Authorization' =&gt; 'Bearer {YOUR_AUTH_KEY}',
            'Content-Type' =&gt; 'application/json',
            'Accept' =&gt; 'application/json',
        ],
    ]
);
$body = $response-&gt;getBody();
print_r(json_decode((string) $body));</code></pre></div>


<div class="python-example">
    <pre><code class="language-python">import requests
import json

url = 'https://nodeless.io/api/v1/transaction/2cas07-0c8n70n923-72c93-c2389'
headers = {
  'Authorization': 'Bearer {YOUR_AUTH_KEY}',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

response = requests.request('GET', url, headers=headers)
response.json()</code></pre></div>

</span>

<span id="example-responses-GETapi-v1-transaction--id-">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;data&quot;: {
        &quot;id&quot;: &quot;3bd3aab1-fbf8-49cf-a400-08bd54d0d2c2&quot;,
        &quot;transactable_type&quot;: &quot;Donation&quot;,
        &quot;transactable&quot;: {
            &quot;id&quot;: 1,
            &quot;uuid&quot;: &quot;11becf5a-fb6f-4360-a506-26e375a05b23&quot;,
            &quot;donation_page_id&quot;: 1,
            &quot;amount&quot;: 5000,
            &quot;amount_paid&quot;: 5000,
            &quot;name&quot;: &quot;anonymous&quot;,
            &quot;message&quot;: null,
            &quot;status&quot;: &quot;paid&quot;,
            &quot;type&quot;: &quot;lightning&quot;,
            &quot;metadata&quot;: null,
            &quot;created_at&quot;: &quot;2023-03-15T01:11:13.000000Z&quot;,
            &quot;updated_at&quot;: &quot;2023-03-15T01:11:36.000000Z&quot;,
            &quot;paid_at&quot;: &quot;2023-03-15 01:11:36&quot;
        },
        &quot;amount&quot;: 5000,
        &quot;type&quot;: &quot;credit&quot;,
        &quot;status&quot;: &quot;settled&quot;,
        &quot;created_at&quot;: &quot;2023-03-15T01:11:35.000000Z&quot;,
        &quot;updated_at&quot;: &quot;2023-03-15T01:11:35.000000Z&quot;,
        &quot;is_fee&quot;: false
    }
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-v1-transaction--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-v1-transaction--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-v1-transaction--id-" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-v1-transaction--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-v1-transaction--id-"></code></pre>
</span>
<form id="form-GETapi-v1-transaction--id-" data-method="GET"
      data-path="api/v1/transaction/{id}"
      data-authed="1"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-v1-transaction--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-v1-transaction--id-"
                    onclick="tryItOut('GETapi-v1-transaction--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-v1-transaction--id-"
                    onclick="cancelTryOut('GETapi-v1-transaction--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-v1-transaction--id-" hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/v1/transaction/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Authorization</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Authorization" class="auth-value"               data-endpoint="GETapi-v1-transaction--id-"
               value="Bearer {YOUR_AUTH_KEY}"
               data-component="header">
    <br>
<p>Example: <code>Bearer {YOUR_AUTH_KEY}</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Content-Type"                data-endpoint="GETapi-v1-transaction--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="Accept"                data-endpoint="GETapi-v1-transaction--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
                <input type="text" style="display: none"
               name="id"                data-endpoint="GETapi-v1-transaction--id-"
               value="2cas07-0c8n70n923-72c93-c2389"
               data-component="url">
    <br>
<p>The id of the transaction. Example: <code>2cas07-0c8n70n923-72c93-c2389</code></p>
            </div>
                    </form>

            

        
    </div>
    <div class="dark-box">
                    <div class="lang-selector">
                                                        <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                                        <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                                                        <button type="button" class="lang-button" data-language-name="php">php</button>
                                                        <button type="button" class="lang-button" data-language-name="python">python</button>
                            </div>
            </div>
</div>
</body>
</html>
