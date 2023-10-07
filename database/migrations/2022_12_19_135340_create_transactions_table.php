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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained()->index();
            $table->integer('transactable_id')->index();
            $table->string('transactable_type')->index();
            $table->integer('amount')->default(0);
            $table->enum('status', ['pending', 'settled'])->default('pending')->index();
            $table->enum('type', ['debit', 'credit'])->default('debit')->index();
            $table->boolean('is_fee')->default(false)->index();
            $table->text('onchain_tx')->nullable();
            $table->text('lightning_error')->nullable();
            $table->text('lightning_payment_preimage')->nullable();
            $table->json('lightning_payment_route')->nullable();
            $table->text('lightning_payment_hash')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};
