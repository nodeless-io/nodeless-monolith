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
        // set all current settled_at values to null
        DB::table('lightning_invoices')->update(['settled_at' => null]);

        Schema::table('lightning_invoices', function (Blueprint $table) {
            $table->datetime('settled_at')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // make all the settled_at null before changing the column type
        DB::table('lightning_invoices')->update(['settled_at' => null]);
        
        Schema::table('lightning_invoices', function (Blueprint $table) {
            $table->integer('settled_at')->nullable()->change();
        });
    }
};
