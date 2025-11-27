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
        Schema::create('ticket_categories', function (Blueprint $table) {
            $table->id('ticket_category_id');
            $table->string('category_shortcut')->nullable();
            $table->string('category_name')->nullable();
            $table->foreignId('group_code')->nullable()->constrained('group_categories')->onDelete('cascade');
            $table->string('show_hide')->nullable()->default('show');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_categories');
    }
};
