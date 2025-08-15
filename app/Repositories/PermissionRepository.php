<?php

namespace App\Repositories;

use App\Models\Permission;
use App\Models\DashboardType;
use App\Repositories\Contracts\PermissionRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class PermissionRepository implements PermissionRepositoryInterface
{
    // All permissions are predefined in the system

    /**
     * Get all permissions
     */
    public function getAll(): Collection
    {
        return Permission::with(['roles' => function ($query) {
            $query->whereNotNull('dashboard_type_id');
        }, 'dashboardType'])
        ->withCount(['roles'])
        ->get();
    }

    /**
     * Get paginated permissions
     */
    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return Permission::with(['roles' => function ($query) {
            $query->whereNotNull('dashboard_type_id');
        }, 'dashboardType'])
        ->withCount(['roles'])
        ->paginate($perPage);
    }

    /**
     * Find permission by ID
     */
    public function findById(int $id): ?Permission
    {
        return Permission::find($id);
    }

    /**
     * Find permission by name
     */
    public function findByName(string $name): ?Permission
    {
        return Permission::where('name', $name)->first();
    }

    // Create and update methods removed as permissions are predefined in the system

    /**
     * Get permissions by dashboard type
     */
    public function getByDashboardType(string $dashboardType): Collection
    {
        // Get dashboard type ID
        $dashboardTypeId = DashboardType::where('name', $dashboardType)->value('id');
        
        return Permission::where('dashboard_type_id', $dashboardTypeId)
            ->with('dashboardType')
            ->get();
    }

    /**
     * Sync permission roles
     */
    public function syncRoles(Permission $permission, array $roleIds): void
    {
        $permission->roles()->sync($roleIds);
    }
}
