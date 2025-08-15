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
        // Get roles from database (created by migration)
        $superAdminRole = Role::where('name', 'super_admin')->first();
        $adminRole = Role::where('name', 'admin')->first();
        $projectOwnerRole = Role::where('name', 'project_owner')->first();
        $staffRole = Role::where('name', 'staff')->first();

        // Create users for each role
        $superAdmin = User::firstOrCreate([
            'email' => 'superadmin@example.com',
        ], [
            'name' => 'Super Admin',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        if ($superAdminRole) {
            $superAdmin->addRole($superAdminRole);
        }

        $admin = User::firstOrCreate([
            'email' => 'admin@example.com',
        ], [
            'name' => 'Admin User',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        if ($adminRole) {
            $admin->addRole($adminRole);
        }

        $projectOwner = User::firstOrCreate([
            'email' => 'owner@example.com',
        ], [
            'name' => 'Project Owner',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        if ($projectOwnerRole) {
            $projectOwner->addRole($projectOwnerRole);
        }

        $staff = User::firstOrCreate([
            'email' => 'staff@example.com',
        ], [
            'name' => 'Staff Member',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        if ($staffRole) {
            $staff->addRole($staffRole);
        }
    }
}


