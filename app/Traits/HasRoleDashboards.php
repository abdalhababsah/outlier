<?php

namespace App\Traits;

use App\Models\DashboardType;
use App\Models\Permission;

trait HasRoleDashboards
{
    /**
     * Check if user is super admin (no permission checks needed)
     */
    public function isSuperAdmin(): bool
    {
        return $this->hasRole('super_admin');
    }

    /**
     * Check if user has administration dashboard access
     */
    public function hasAdministrationAccess(): bool
    {
        $administrationId = DashboardType::where('name', 'administration')->value('id');
        return $this->roles()->where('dashboard_type_id', $administrationId)->exists();
    }

    /**
     * Check if user has staff dashboard access
     */
    public function hasStaffAccess(): bool
    {
        $staffId = DashboardType::where('name', 'staff')->value('id');
        return $this->roles()->where('dashboard_type_id', $staffId)->exists();
    }

    /**
     * Check if user has project dashboard access
     */
    public function hasProjectAccess(): bool
    {
        $projectId = DashboardType::where('name', 'project')->value('id');
        return $this->roles()->where('dashboard_type_id', $projectId)->exists();
    }

    /**
     * Check if user is admin (includes both admin and super_admin roles)
     */
    public function isAdmin(): bool
    {
        return $this->hasRole('admin') || $this->hasRole('super_admin');
    }

    /**
     * Check if user is project owner (separate dashboard)
     */
    public function isProjectOwner(): bool
    {
        return $this->hasRole('project_owner');
    }

    /**
     * Check if user is staff (separate dashboard)
     */
    public function isStaff(): bool
    {
        return $this->hasRole('staff');
    }

    /**
     * Get the user's dashboard route based on their role type
     */
    public function getDashboardRoute(): string
    {
        // Check by role type first (new system)
        if ($this->hasAdministrationAccess()) {
            return 'admin.dashboard';
        }

        if ($this->hasProjectAccess()) {
            return 'project-owner.dashboard';
        }

        if ($this->hasStaffAccess()) {
            return 'staff.dashboard';
        }

        // Fallback to old role checks for compatibility
        if ($this->isAdmin()) {
            return 'admin.dashboard';
        }

        if ($this->isProjectOwner()) {
            return 'project-owner.dashboard';
        }

        if ($this->isStaff()) {
            return 'staff.dashboard';
        }

        // Default fallback
        return 'dashboard';
    }

    /**
     * Check if user has permission (skip for super_admin)
     */
    public function canDo(string $permission, $team = null): bool
    {
        // Super admin bypasses all permission checks
        if ($this->isSuperAdmin()) {
            return true;
        }

        // For other roles, check permissions normally
        return $this->hasPermission($permission, $team);
    }

    /**
     * Check if user can access specific dashboard type
     */
    public function canAccessDashboard(string $dashboardType): bool
    {
        // Super admin can access administration dashboard
        if ($this->isSuperAdmin() && $dashboardType === 'administration') {
            return true;
        }

        // Get the dashboard type ID
        $dashboardTypeId = DashboardType::where('name', $dashboardType)->value('id');
        
        // Check if user has roles of the specified type
        return $this->roles()->where('dashboard_type_id', $dashboardTypeId)->exists();
    }

    /**
     * Get user's dashboard types
     */
    public function getDashboardTypes(): array
    {
        if ($this->isSuperAdmin()) {
            return ['administration'];
        }

        // Get dashboard type IDs from user's roles
        $dashboardTypeIds = $this->roles()->pluck('dashboard_type_id')->unique()->toArray();
        
        // Map IDs to names
        return DashboardType::whereIn('id', $dashboardTypeIds)
            ->pluck('name')
            ->toArray();
    }

    /**
     * Get user's primary role name
     */
    public function getPrimaryRole(): ?string
    {
        $roles = $this->getRoles();
        return !empty($roles) ? $roles[0] : null;
    }
    
    /**
     * Get all permissions for the user
     */
    public function getAllPermissions(): \Illuminate\Database\Eloquent\Collection
    {
        // If user is super admin, return all permissions
        if ($this->isSuperAdmin()) {
            return Permission::all();
        }
        
        // Get permissions from roles
        $permissionIds = collect();
        
        // Get permissions through roles
        foreach ($this->roles as $role) {
            $permissionIds = $permissionIds->merge($role->permissions->pluck('id'));
        }
        
        // Add directly assigned permission IDs
        $permissionIds = $permissionIds->merge($this->permissions()->pluck('id'));
        
        // Get unique permission IDs
        $uniquePermissionIds = $permissionIds->unique()->values()->toArray();
        
        // Return as Eloquent Collection by querying the database
        return Permission::whereIn('id', $uniquePermissionIds)->get();
    }
}
