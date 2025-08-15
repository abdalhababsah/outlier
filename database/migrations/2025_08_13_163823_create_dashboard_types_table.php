<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dashboard_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // administration, staff, project
            $table->string('display_name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Insert the default dashboard types
        DB::table('dashboard_types')->insert([
            [
                'name' => 'administration',
                'display_name' => 'Administration',
                'description' => 'System administration and management',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'staff',
                'display_name' => 'Staff',
                'description' => 'Staff operations and task management',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'project',
                'display_name' => 'Project',
                'description' => 'Project management and oversight',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dashboard_types');
    }
};
