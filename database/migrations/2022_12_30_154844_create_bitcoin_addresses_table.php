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
        Schema::create('bitcoin_addresses', function (Blueprint $table) {
            $table->id();
            $table->string('address', 100)->unique()->index();
            $table->integer('bitcoin_addressable_id')->nullable();
            $table->string('bitcoin_addressable_type')->nullable();
            $table->timestamps();
            $table->timestamp('last_used_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bitcoin_addresses');
    }
};
