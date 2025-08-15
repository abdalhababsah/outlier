<?php

namespace App\Models;

use Laratrust\Models\Role as RoleModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Role extends RoleModel
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'display_name',
        'description',
        'dashboard_type_id'
    ];

    /**
     * Get the dashboard type associated with this role.
     */
    public function dashboardType(): BelongsTo
    {
        return $this->belongsTo(DashboardType::class);
    }

    /**
     * Get roles by dashboard type
     */
    public function scopeByDashboardType($query, $dashboardType)
    {
        if (is_string($dashboardType)) {
            // If a string is provided, look up the dashboard type by name
            $dashboardTypeId = DashboardType::where('name', $dashboardType)->value('id');
            return $query->where('dashboard_type_id', $dashboardTypeId);
        }
        
        // If an ID is provided, use it directly
        return $query->where('dashboard_type_id', $dashboardType);
    }

    /**
     * Get manageable roles (any dashboard type)
     */
    public function scopeManageable($query)
    {
        // All roles with valid dashboard types are manageable
        return $query->whereNotNull('dashboard_type_id');
    }

    /**
     * Get administration roles
     */
    public function scopeAdministration($query)
    {
        $administrationId = DashboardType::where('name', 'administration')->value('id');
        return $query->where('dashboard_type_id', $administrationId);
    }

    /**
     * Get staff roles
     */
    public function scopeStaff($query)
    {
        $staffId = DashboardType::where('name', 'staff')->value('id');
        return $query->where('dashboard_type_id', $staffId);
    }

    /**
     * Get project roles
     */
    public function scopeProject($query)
    {
        $projectId = DashboardType::where('name', 'project')->value('id');
        return $query->where('dashboard_type_id', $projectId);
    }

    /**
     * Check if role is manageable
     */
    public function isManageable(): bool
    {
        return $this->dashboard_type_id !== null;
    }
    
    /**
     * Get the dashboard type name
     */
    public function getDashboardTypeName(): ?string
    {
        return $this->dashboardType ? $this->dashboardType->name : null;
    }
}
