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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id('ticket_id');
            $table->string('ticket_code', 10);
            $table->foreignId('login_id')->nullable()->constrained('user_logins', 'login_id')->onDelete('cascade');
            $table->foreignId('ticket_details_id')->nullable()->constrained('ticket_details', 'ticket_details_id')->onDelete('cascade');
            $table->foreignId('branch_id')->nullable()->constrained('branch_lists', 'blist_id')->onDelete('cascade');
            $table->string('branch_name', 500)->nullable();
            $table->string('status', 255)->nullable();
            $table->boolean('isCounted')->nullable();
            $table->tinyInteger('isApproved')->nullable();
            $table->foreignId('assigned_person')->nullable()->constrained('user_logins', 'login_id')->onDelete('cascade');
            $table->foreignId('edited_by')->nullable()->constrained('user_logins', 'login_id')->onDelete('cascade');
            $table->integer('notifStaff')->nullable();
            $table->integer('notifHead')->nullable();
            $table->integer('notifAccounting')->nullable();
            $table->integer('notifAutomation')->nullable();
            $table->integer('notifAUTM')->nullable();
            $table->integer('notifAdmin')->nullable();
            $table->integer('displayTicket')->nullable();
            $table->integer('last_approver')->nullable();
            $table->foreignId('approveHead')->nullable()->constrained('user_logins', 'login_id')->onDelete('cascade');
            $table->foreignId('approveAcctgStaff')->nullable()->constrained('user_logins', 'login_id')->onDelete('cascade');
            $table->foreignId('approveAcctgSup')->nullable()->constrained('user_logins', 'login_id')->onDelete('cascade');
            $table->foreignId('approveAutm')->nullable()->constrained('user_logins', 'login_id')->onDelete('cascade');
            $table->integer('answer')->nullable();
            $table->string('appTBranchHead', 225)->nullable();
            $table->string('appTAccStaff', 225)->nullable();
            $table->string('appTAccHead', 225)->nullable();
            $table->string('appTAutomationHead', 225)->nullable();
            $table->string('appTEdited', 225)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
