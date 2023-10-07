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
        Schema::create('lightning_invoices', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique()->index();
            $table->text('memo')->nullable();
            $table->text('description_hash')->nullable();
            $table->string('r_preimage')->nullable();
            $table->string('r_hash')->nullable();
            $table->text('payment_request');
            $table->integer('amount')->default(0);
            $table->boolean('settled')->default(false);
            $table->integer('expiry');
            $table->integer('cltv_expiry');
            $table->string('fallback_addr')->nullable();
            $table->string('amt_paid')->nullable();
            $table->string('payment_addr')->nullable();
            $table->json('features')->nullable();
            $table->string('state')->nullable();
            $table->json('htlcs')->nullable();
            $table->integer('lightning_invoiceable_id')->nullable();
            $table->string('lightning_invoiceable_type')->nullable();
            $table->timestamps();
            $table->integer('settled_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lightning_invoices');
    }
};
