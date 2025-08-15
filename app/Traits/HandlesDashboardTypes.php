<?php

namespace App\Traits;

use App\Models\DashboardType;

trait HandlesDashboardTypes
{
    /**
     * Get dashboard type ID from name or ID
     */
    protected function getDashboardTypeId($dashboardType): int
    {
        if (is_numeric($dashboardType)) {
            return (int) $dashboardType;
        }
        
        // If it's a string name, get the ID
        return DashboardType::where('name', $dashboardType)->value('id');
    }
}
