## Nodeless.io Monolith

Nodeless.io is an open-source payment gateway that makes it easy to accept bitcoin payments in your business or personal life.

For experienced node runners, running your own instance of nodeless helps you earn income and contribute to the decentralization of Bitcoin.

## Prerequisites

 - BtcpayServer w/ LND Full Node
 - Redis
 - MySQL
 - NodeJS
 - NPM
 - MySQL
 - PHP 8.2
 - Composer
 - Nova License (optional, for admin panel - https://nova.laravel.com)

## Hardware Specs

We highly recommend deploying nodeless to a serverless instance such as AWS Lambda or Google Cloud Functions. A service that makes this very easy is Laravel Vapor. This will allow you to scale your nodeless instance to meet the demands of your business.

If you aren't able to use serverless, ensure your server has the following minimum specs:

 - 4 vCPU on your btcpayserver node
 - 4 vCPU on your nodeless instance

 ## Installation (To Webserver)

 Clone the repo into your local webserver (apache or nginx for example)

 ```bash
git clone https://github.com/nodeless-io/nodeless-monolith
cd nodeless-monolith

composer install
npm install

cp .env.example .env
php artisan key:generate
php artisan migrate

npm run build
```

## Local Development (Docker)

```bash
git clone
cd nodeless-monolith

composer install
npm install

cp .env.example .env
sudo ./vendor/bin/sail up -d
npm run dev
```

## Configuration

### .env

Set your node up in the .env file. You can find your macaroon and tls.cert files in your btcpayserver instance.

```bash
LND_HOST=https://testnet/lnd-rest/btc/
LND_PORT=9735
LND_MACAROON_HEX=
LND_TLS_CERT=
```

### queues

Nodeless runs a variety of queues to ensure requests aren't blocked, which is why you need multiple vCPUs. You can run these queues with the following command:

```bash
php artisan queue:work --queue=webhooks
php artisan queue:work --queue=mail
php artisan queue:work --queue=withdrawals
php artisan queue:work --queue=default
```

For information on how to run these queues in production, see the Laravel documentation: https://laravel.com/docs/10.x/queues#supervisor-configuration

## Contributing

We welcome the contributions from the community, and as this is a high stakes application, we require thorough testing and code review before merging any pull requests.

Please ensure the following before submitting a pull request:

 - Any new code is covered by tests
 - All tests pass
 - All code is covered by tests
 - All code is reviewed by at least one other developer
 - All code is documented

