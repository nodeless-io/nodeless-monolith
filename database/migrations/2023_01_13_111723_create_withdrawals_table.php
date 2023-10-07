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
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignId('user_id')->constrained();
            $table->enum('type', ['onchain', 'lightning']);
            $table->string('onchain_address')->nullable();
            $table->string('lightning_address')->nullable();
            $table->text('lightning_payment_invoice')->nullable();
            $table->text('lightning_payment_hash')->nullable();
            $table->json('lightning_payment_route')->nullable();
            $table->text('lightning_payment_preimage')->nullable();
            $table->integer('amount');
            $table->enum('status', ['pending', 'completed', 'failed']);
            $table->timestamps();
            $table->timestamp('completed_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('withdrawals');
    }
};
