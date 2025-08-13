<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Seed the application's database with default users and roles.
     */
    public function run(): void
    {
        // Ensure roles exist
        $superAdminRole = Role::firstOrCreate([
            'name' => 'super_admin',
        ], [
            'display_name' => 'Super Administrator',
            'description' => 'Full system access - no permission checks',
        ]);

        $adminRole = Role::firstOrCreate([
            'name' => 'admin',
        ], [
            'display_name' => 'Administrator',
            'description' => 'Admin dashboard with role/permission management',
        ]);

        $projectOwnerRole = Role::firstOrCreate([
            'name' => 'project_owner',
        ], [
            'display_name' => 'Project Owner',
            'description' => 'Project owner dashboard - no permissions needed',
        ]);

        $staffRole = Role::firstOrCreate([
            'name' => 'staff',
        ], [
            'display_name' => 'Staff',
            'description' => 'Staff dashboard - no permissions needed',
        ]);

        // Create users for each role
        $superAdmin = User::firstOrCreate([
            'email' => 'superadmin@example.com',
        ], [
            'name' => 'Super Admin',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $superAdmin->addRole($superAdminRole);

        $admin = User::firstOrCreate([
            'email' => 'admin@example.com',
        ], [
            'name' => 'Admin User',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $admin->addRole($adminRole);

        $projectOwner = User::firstOrCreate([
            'email' => 'owner@example.com',
        ], [
            'name' => 'Project Owner',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $projectOwner->addRole($projectOwnerRole);

        $staff = User::firstOrCreate([
            'email' => 'staff@example.com',
        ], [
            'name' => 'Staff Member',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $staff->addRole($staffRole);
    }
}


