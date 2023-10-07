<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Codenixsv\CoinGeckoApi\CoinGeckoClient;

class SaveExchangeRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'save:exchange-rates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $client = new CoinGeckoClient();
        $data = $client->simple()->getPrice('bitcoin', 'usd,eur,cad,jpy,gbp,chf');

        foreach ($data['bitcoin'] as $currency => $rate) {
            $key = 'exchange_rate_' . $currency;
            Cache::put($key, $rate, 600);
            $this->info("Saved {$key} to redis with value {$currency}");
        }

        return Command::SUCCESS;
    }
}
