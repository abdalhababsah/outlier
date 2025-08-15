<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\Role;
use App\Models\Permission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Get dashboard type IDs
        $administrationTypeId = DB::table('dashboard_types')->where('name', 'administration')->value('id');
        $staffTypeId = DB::table('dashboard_types')->where('name', 'staff')->value('id');
        $projectTypeId = DB::table('dashboard_types')->where('name', 'project')->value('id');

        // Create core roles
        $superAdminRole = Role::create([
            'name' => 'super_admin',
            'display_name' => 'Super Administrator',
            'description' => 'Has unrestricted access to all features - bypasses permission checks',
            'dashboard_type_id' => $administrationTypeId
        ]);

        $adminRole = Role::create([
            'name' => 'admin', 
            'display_name' => 'Administrator',
            'description' => 'Administrator with permission-based access to admin features',
            'dashboard_type_id' => $administrationTypeId
        ]);

        $projectOwnerRole = Role::create([
            'name' => 'project_owner',
            'display_name' => 'Project Owner', 
            'description' => 'Project owner with access to project management features',
            'dashboard_type_id' => $projectTypeId
        ]);

        $staffRole = Role::create([
            'name' => 'staff',
            'display_name' => 'Staff Member',
            'description' => 'Staff member with access to assigned tasks and basic features',
            'dashboard_type_id' => $staffTypeId
        ]);

        // Create role and permission management permissions
        $permissions = [
            // Administration Dashboard Permissions
            // Role Management
            [
                'name' => 'roles-create',
                'display_name' => 'Create Roles',
                'description' => 'Create new roles in the system',
                'dashboard_type_id' => $administrationTypeId
            ],
            [
                'name' => 'roles-read',
                'display_name' => 'View Roles',
                'description' => 'View roles and their details',
                'dashboard_type_id' => $administrationTypeId
            ],
            [
                'name' => 'roles-update',
                'display_name' => 'Update Roles',
                'description' => 'Edit existing roles',
                'dashboard_type_id' => $administrationTypeId
            ],
            [
                'name' => 'roles-delete',
                'display_name' => 'Delete Roles',
                'description' => 'Delete roles from the system',
                'dashboard_type_id' => $administrationTypeId
            ],

            // Permission Management
            [
                'name' => 'permissions-read',
                'display_name' => 'View Permissions',
                'description' => 'View permissions and their details',
                'dashboard_type_id' => $administrationTypeId
            ],

            // Role Assignment
            [
                'name' => 'role-assignment-manage',
                'display_name' => 'Manage Role Assignments',
                'description' => 'Assign and remove roles from users',
                'dashboard_type_id' => $administrationTypeId
            ],

            // Permission Assignment
            [
                'name' => 'permission-assignment-manage',
                'display_name' => 'Manage Permission Assignments',
                'description' => 'Assign and remove permissions from roles and users',
                'dashboard_type_id' => $administrationTypeId
            ],
            
            // Administration Dashboard Access
            [
                'name' => 'administration-dashboard-access',
                'display_name' => 'Access Administration Dashboard',
                'description' => 'Access to administration dashboard',
                'dashboard_type_id' => $administrationTypeId
            ],
            [
                'name' => 'administration-users-manage',
                'display_name' => 'Manage Users (Admin)',
                'description' => 'Create, read, update, delete users in administration',
                'dashboard_type_id' => $administrationTypeId
            ],
            [
                'name' => 'administration-roles-manage',
                'display_name' => 'Manage Roles (Admin)',
                'description' => 'Create, read, update, delete roles in administration',
                'dashboard_type_id' => $administrationTypeId
            ],
            [
                'name' => 'administration-permissions-manage',
                'display_name' => 'Manage Permissions (Admin)',
                'description' => 'Create, read, update, delete permissions in administration',
                'dashboard_type_id' => $administrationTypeId
            ],
            [
                'name' => 'administration-settings-manage',
                'display_name' => 'Manage Settings (Admin)',
                'description' => 'Manage system settings in administration',
                'dashboard_type_id' => $administrationTypeId
            ],
            [
                'name' => 'administration-reports-view',
                'display_name' => 'View Reports (Admin)',
                'description' => 'View system reports in administration',
                'dashboard_type_id' => $administrationTypeId
            ],

            // Staff Dashboard Permissions
            [
                'name' => 'staff-dashboard-access',
                'display_name' => 'Access Staff Dashboard',
                'description' => 'Access to staff dashboard',
                'dashboard_type_id' => $staffTypeId
            ],
            [
                'name' => 'staff-tasks-manage',
                'display_name' => 'Manage Tasks (Staff)',
                'description' => 'Create, read, update assigned tasks',
                'dashboard_type_id' => $staffTypeId
            ],
            [
                'name' => 'staff-profile-manage',
                'display_name' => 'Manage Profile (Staff)',
                'description' => 'Manage own profile and settings',
                'dashboard_type_id' => $staffTypeId
            ],
            [
                'name' => 'staff-timesheet-manage',
                'display_name' => 'Manage Timesheet (Staff)',
                'description' => 'Track time and manage timesheets',
                'dashboard_type_id' => $staffTypeId
            ],
            [
                'name' => 'staff-documents-view',
                'display_name' => 'View Documents (Staff)',
                'description' => 'View assigned documents and resources',
                'dashboard_type_id' => $staffTypeId
            ],

            // Project Dashboard Permissions
            [
                'name' => 'project-dashboard-access',
                'display_name' => 'Access Project Dashboard',
                'description' => 'Access to project management dashboard',
                'dashboard_type_id' => $projectTypeId
            ],
            [
                'name' => 'project-projects-manage',
                'display_name' => 'Manage Projects',
                'description' => 'Create, read, update, delete projects',
                'dashboard_type_id' => $projectTypeId
            ],
            [
                'name' => 'project-team-manage',
                'display_name' => 'Manage Team (Project)',
                'description' => 'Assign and manage project team members',
                'dashboard_type_id' => $projectTypeId
            ],
            [
                'name' => 'project-budget-manage',
                'display_name' => 'Manage Budget (Project)',
                'description' => 'Manage project budgets and finances',
                'dashboard_type_id' => $projectTypeId
            ],
            [
                'name' => 'project-timeline-manage',
                'display_name' => 'Manage Timeline (Project)',
                'description' => 'Create and manage project timelines',
                'dashboard_type_id' => $projectTypeId
            ],
            [
                'name' => 'project-reports-view',
                'display_name' => 'View Reports (Project)',
                'description' => 'View project reports and analytics',
                'dashboard_type_id' => $projectTypeId
            ],
        ];

        // Create permissions and organize by dashboard type
        $createdPermissions = [
            $administrationTypeId => [],
            $staffTypeId => [],
            $projectTypeId => []
        ];
        
        foreach ($permissions as $permissionData) {
            $dashboardTypeId = $permissionData['dashboard_type_id'];
            $permission = Permission::create($permissionData);
            $createdPermissions[$dashboardTypeId][] = $permission->id;
        }

        // Assign permissions to roles based on dashboard type
        // Super admin doesn't need explicit permissions as it bypasses checks
        
        // Admin gets all administration permissions
        $adminRole->permissions()->attach($createdPermissions[$administrationTypeId]);
        
        // Staff role gets staff permissions
        $staffRole->permissions()->attach($createdPermissions[$staffTypeId]);
        
        // Project owner gets project permissions
        $projectOwnerRole->permissions()->attach($createdPermissions[$projectTypeId]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove role assignments first
        \DB::table('role_user')->truncate();
        \DB::table('permission_role')->truncate();
        \DB::table('permission_user')->truncate();

        // Delete permissions
        Permission::whereIn('name', [
            // Administration permissions
            'roles-create', 'roles-read', 'roles-update', 'roles-delete',
            'permissions-read', 'role-assignment-manage', 'permission-assignment-manage',
            'administration-dashboard-access', 'administration-users-manage', 'administration-roles-manage',
            'administration-permissions-manage', 'administration-settings-manage', 'administration-reports-view',
            
            // Staff permissions
            'staff-dashboard-access', 'staff-tasks-manage', 'staff-profile-manage',
            'staff-timesheet-manage', 'staff-documents-view',
            
            // Project permissions
            'project-dashboard-access', 'project-projects-manage', 'project-team-manage',
            'project-budget-manage', 'project-timeline-manage', 'project-reports-view'
        ])->delete();

        // Delete roles
        Role::whereIn('name', ['super_admin', 'admin', 'project_owner', 'staff'])->delete();
    }
};