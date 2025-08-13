<?php

namespace App\Traits;

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
     * Get the user's dashboard route based on their role
     */
    public function getDashboardRoute(): string
    {
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
     * Get user's primary role name
     */
    public function getPrimaryRole(): ?string
    {
        $roles = $this->getRoles();
        return !empty($roles) ? $roles[0] : null;
    }
}
