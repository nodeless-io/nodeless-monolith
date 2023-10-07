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
        Schema::create('prisms', function (Blueprint $table) {
            $table->id();
            $table->string('uuid')->unique();
            $table->foreignId('user_id')->index();
            $table->integer('amount')->default(0);
            $table->integer('amount_paid')->default(0);
            $table->enum('status', [
                'new', 'pending_confirmation', 'paid', 'expired', 'cancelled', 'overpaid', 'underpaid', 'in_flight'
            ])->default('new')->index();
            $table->enum('type', ['lightning', 'onchain', 'liquid', 'cashu', 'fedimint', 'ark'])->default('lightning')->index();
            $table->enum('payout_status', [
                'new', 'pending', 'paid', 'partial', 'failed'
            ])->default('new')->index();
            $table->json('settings');
            $table->json('metadata')->nullable();
            $table->json('results')->nullable();
            $table->timestamp('paid_at')->nullable();
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
        Schema::dropIfExists('prisms');
    }
};
