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
        Schema::create('lightning_address_payments', function (Blueprint $table) {
            $table->id();
            $table->uuid()->index();
            $table->foreignId('inbox_id')->index();
            $table->text('comment')->nullable();
            $table->integer('amount')->default(0);
            $table->integer('amount_paid')->default(0);
            $table->enum('status', [
                'new', 'pending_confirmation', 'paid', 'expired', 'cancelled', 'overpaid', 'underpaid', 'in_flight'
            ])->default('new');
            $table->enum('type', ['onchain', 'lightning'])->default('lightning');
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->timestamp('paid_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lightning_address_payments');
    }
};
