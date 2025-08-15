<?php

namespace App\Repositories;

use App\Models\Role;
use App\Models\DashboardType;
use App\Repositories\Contracts\RoleRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class RoleRepository implements RoleRepositoryInterface
{
    /**
     * Get all manageable roles
     */
    public function getAllManageable(): Collection
    {
        return Role::whereNotNull('dashboard_type_id')
            ->with(['permissions', 'users', 'dashboardType'])
            ->withCount(['users'])
            ->get();
    }

    /**
     * Get paginated manageable roles
     */
    public function getPaginatedManageable(int $perPage = 15): LengthAwarePaginator
    {
        return Role::whereNotNull('dashboard_type_id')
            ->with(['permissions', 'users', 'dashboardType'])
            ->withCount(['users'])
            ->paginate($perPage);
    }

    /**
     * Find role by ID
     */
    public function findById(int $id): ?Role
    {
        return Role::find($id);
    }

    /**
     * Find role by name
     */
    public function findByName(string $name): ?Role
    {
        return Role::where('name', $name)->first();
    }

    /**
     * Create new role
     */
    public function create(array $data): Role
    {
        return Role::create($data);
    }

    /**
     * Update role
     */
    public function update(Role $role, array $data): bool
    {
        return $role->update($data);
    }

    /**
     * Delete role
     */
    public function delete(Role $role): bool
    {
        // Detach all permissions and users first
        $role->permissions()->detach();
        $role->users()->detach();
        
        return $role->delete();
    }

    /**
     * Check if role can be deleted
     */
    public function canBeDeleted(Role $role): bool
    {
        // Cannot delete base admin role
        if ($role->name === 'admin') {
            return false;
        }

        // Cannot delete if has users assigned
        if ($role->users()->count() > 0) {
            return false;
        }

        return true;
    }

    /**
     * Get roles by dashboard type
     */
    public function getByType(string $type): Collection
    {
        // Get dashboard type ID
        $dashboardTypeId = DashboardType::where('name', $type)->value('id');
        
        return Role::where('dashboard_type_id', $dashboardTypeId)
            ->with('dashboardType')
            ->get();
    }

    /**
     * Check if role is manageable
     */
    public function isManageable(Role $role): bool
    {
        // All roles with a valid dashboard type are manageable
        return $role->dashboard_type_id !== null;
    }

    /**
     * Sync role permissions
     */
    public function syncPermissions(Role $role, array $permissionIds): void
    {
        $role->permissions()->sync($permissionIds);
    }
}
