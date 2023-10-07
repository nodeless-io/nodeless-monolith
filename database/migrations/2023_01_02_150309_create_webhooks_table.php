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
        Schema::create('bitcoinable_webhooks', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('url');
            $table->text('secret');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->json('events');
            $table->integer('bitcoinable_webhook_id');
            $table->string('bitcoinable_webhook_type');
            $table->timestamps();
            $table->timestamp('last_delivery_at')->nullable();
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
        Schema::dropIfExists('bitcoinable_webhooks');
    }
};
