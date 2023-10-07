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
        Schema::create('contests', function (Blueprint $table) {
            $table->id();
            $table->uuid()->index();
            $table->foreignId('user_id')->index();
            $table->string('name');
            $table->string('slug')->unique()->index();
            $table->enum(
                'type',
                [
                        'nostr',
                        'twitter',
                        'tiktok',
                        'instagram',
                        'youtube',
                        'twitch',
                        'discord',
                        'facebook',
                        'reddit',
                        'email',
                        'github',
                        'linkedin'
                    ]
            )->index();
            $table->enum(
                'status',
                ['active', 'inactive', 'upcoming', 'past', 'cancelled']
            )->default('active')->index();
            $table->text('description')->nullable();
            $table->json('settings')->nullable();
            $table->timestamps();
            $table->timestamp('starts_at');
            $table->timestamp('ends_at');
            $table->timestamp('ended_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contests');
    }
};
