<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_unread_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('user_logins', 'login_id')->cascadeOnDelete();
            $table->foreignId('login_id')->constrained('user_logins', 'login_id')->cascadeOnDelete();
            $table->integer('total')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_unread_messages');
    }
};
