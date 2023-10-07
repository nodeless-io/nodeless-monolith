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
        Schema::create('gated_messages', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique()->index();
            $table->foreignId('inbox_id');
            $table->foreignId('request_id');
            $table->text('body');
            $table->string('from');
            $table->string('to');
            $table->string('subject');
            $table->integer('amount')->default(0);
            $table->integer('amount_paid')->default(0);
            $table->enum('status', [
                'new', 'pending_confirmation', 'paid', 'expired', 'cancelled', 'overpaid', 'underpaid', 'in_flight'
            ])->default('new')->index();
            $table->enum('type', ['lightning', 'onchain'])->default('lightning')->index();
            $table->string('buyer_email')->nullable()->index();
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
        Schema::dropIfExists('gated_messages');
    }
};
