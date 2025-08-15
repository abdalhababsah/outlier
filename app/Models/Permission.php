<?php

namespace App\Models;

use Laratrust\Models\Permission as PermissionModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permission extends PermissionModel
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
     * Get the dashboard type associated with this permission.
     */
    public function dashboardType(): BelongsTo
    {
        return $this->belongsTo(DashboardType::class);
    }

    /**
     * Get permissions by dashboard type
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
     * Get permissions for administration dashboard
     */
    public function scopeForAdministration($query)
    {
        $administrationId = DashboardType::where('name', 'administration')->value('id');
        return $query->where('dashboard_type_id', $administrationId);
    }

    /**
     * Get permissions for staff dashboard
     */
    public function scopeForStaff($query)
    {
        $staffId = DashboardType::where('name', 'staff')->value('id');
        return $query->where('dashboard_type_id', $staffId);
    }

    /**
     * Get permissions for project dashboard
     */
    public function scopeForProject($query)
    {
        $projectId = DashboardType::where('name', 'project')->value('id');
        return $query->where('dashboard_type_id', $projectId);
    }
    
    /**
     * Get the dashboard type name
     */
    public function getDashboardTypeName(): ?string
    {
        return $this->dashboardType ? $this->dashboardType->name : null;
    }
}
