<?php

namespace App\Services;

use App\Models\Role;
use App\Models\User;
use App\Models\Permission;
use App\Models\DashboardType;
use App\Repositories\Contracts\RoleRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Traits\HandlesDashboardTypes;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class RoleService
{
    use HandlesDashboardTypes;
    public function __construct(
        protected RoleRepositoryInterface $roleRepository,
        protected UserRepositoryInterface $userRepository
    ) {}

    /**
     * Get all manageable roles
     */
    public function getAllManageable(): Collection
    {
        return $this->roleRepository->getAllManageable();
    }

    /**
     * Get paginated manageable roles
     */
    public function getPaginatedManageable(int $perPage = 15): LengthAwarePaginator
    {
        return $this->roleRepository->getPaginatedManageable($perPage);
    }

    /**
     * Find role by ID with validation
     */
    public function findManageableById(int $id): ?Role
    {
        $role = $this->roleRepository->findById($id);
        
        if (!$role || !$this->roleRepository->isManageable($role)) {
            return null;
        }

        return $role;
    }

    /**
     * Create new role
     */
    public function create(array $data): Role
    {
        // Convert dashboard type name to ID if needed
        $dashboardTypeId = $this->getDashboardTypeId($data['dashboard_type_id']);
        
        $role = $this->roleRepository->create([
            'name' => $data['name'],
            'display_name' => $data['display_name'],
            'description' => $data['description'] ?? '',
            'dashboard_type_id' => $dashboardTypeId
        ]);

        if (!empty($data['permissions'])) {
            // Filter permissions to only those matching the role's dashboard type
            $validPermissions = $this->filterPermissionsByDashboardTypeId($data['permissions'], $dashboardTypeId);
            $this->roleRepository->syncPermissions($role, $validPermissions);
        }

        return $role;
    }

    /**
     * Update role
     */
    public function update(Role $role, array $data): bool
    {
        if (!$this->roleRepository->isManageable($role)) {
            throw new \InvalidArgumentException('Role is not manageable');
        }

        // Convert dashboard type name to ID if needed
        $dashboardTypeId = $this->getDashboardTypeId($data['dashboard_type_id']);
        
        $updated = $this->roleRepository->update($role, [
            'name' => $data['name'],
            'display_name' => $data['display_name'],
            'description' => $data['description'] ?? '',
            'dashboard_type_id' => $dashboardTypeId
        ]);

        if ($updated) {
            // Filter permissions to only those matching the role's dashboard type
            $validPermissions = $this->filterPermissionsByDashboardTypeId($data['permissions'] ?? [], $dashboardTypeId);
            $this->roleRepository->syncPermissions($role, $validPermissions);
        }

        return $updated;
    }

    /**
     * Delete role
     */
    public function delete(Role $role): bool
    {
        if (!$this->roleRepository->isManageable($role)) {
            throw new \InvalidArgumentException('Role is not manageable');
        }

        if (!$this->roleRepository->canBeDeleted($role)) {
            throw new \InvalidArgumentException('Role cannot be deleted');
        }

        return $this->roleRepository->delete($role);
    }

    /**
     * Assign role to user
     */
    public function assignToUser(Role $role, User $user): void
    {
        if (!$this->roleRepository->isManageable($role)) {
            throw new \InvalidArgumentException('Role is not manageable');
        }

        if (!$this->userRepository->canBeAssignedRole($user, $role)) {
            throw new \InvalidArgumentException('User cannot be assigned this role');
        }

        $this->userRepository->assignRole($user, $role);
    }

    /**
     * Remove role from user
     */
    public function removeFromUser(Role $role, User $user): void
    {
        if (!$this->roleRepository->isManageable($role)) {
            throw new \InvalidArgumentException('Role is not manageable');
        }

        $this->userRepository->removeRole($user, $role);
    }

    /**
     * Get users that can be assigned roles
     */
    public function getAssignableUsers(): Collection
    {
        return $this->userRepository->getAssignableUsers();
    }

    /**
     * Get role deletion errors
     */
    public function getDeletionErrors(Role $role): array
    {
        $errors = [];

        if ($role->name === 'admin') {
            $errors[] = 'Cannot delete the base admin role.';
        }

        if ($role->users()->count() > 0) {
            $errors[] = 'Cannot delete role that has users assigned to it.';
        }

        return $errors;
    }

    /**
     * Filter permissions to only those matching the role's dashboard type ID
     */
    private function filterPermissionsByDashboardTypeId(array $permissionIds, int $dashboardTypeId): array
    {
        if (empty($permissionIds)) {
            return [];
        }

        // Get permissions that match the role's dashboard type or are general (no dashboard_type)
        $validPermissions = Permission::whereIn('id', $permissionIds)
            ->where(function ($query) use ($dashboardTypeId) {
                $query->where('dashboard_type_id', $dashboardTypeId)
                      ->orWhereNull('dashboard_type_id');
            })
            ->pluck('id')
            ->toArray();

        return $validPermissions;
    }
}
