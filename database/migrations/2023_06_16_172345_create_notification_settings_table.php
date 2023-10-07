<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification_settings', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->boolean('withdrawal_success')->default(true);
            $table->boolean('withdrawal_failure')->default(true);
            $table->boolean('store_payment')->default(true);
            $table->boolean('store_underpaid')->default(true);
            $table->boolean('store_overpaid')->default(true);
            $table->boolean('store_webhook_failure')->default(true);
            $table->boolean('donation_page_payment')->default(true);
            $table->boolean('donation_page_underpaid')->default(true);
            $table->boolean('donation_page_overpaid')->default(true);
            $table->boolean('donation_page_webhook_failure')->default(true);
            $table->boolean('paywall_payment')->default(true);
            $table->boolean('paywall_underpaid')->default(true);
            $table->boolean('paywall_overpaid')->default(true);
            $table->boolean('paywall_webhook_failure')->default(true);
            $table->boolean('lightning_address_payment')->default(true);
            $table->boolean('referral_payment')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notification_settings');
    }
};
