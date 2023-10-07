<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('withdrawals', function (Blueprint $table) {
            DB::statement("ALTER TABLE withdrawals MODIFY COLUMN type ENUM('onchain', 'lightning', 'liquid', 'cashu', 'ark')");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('withdrawals', function (Blueprint $table) {
            DB::statement("ALTER TABLE withdrawals MODIFY COLUMN type ENUM('onchain', 'lightning')");
        });
    }
};
