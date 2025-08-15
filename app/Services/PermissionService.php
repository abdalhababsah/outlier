<?php

namespace App\Services;

use App\Models\Permission;
use App\Models\Role;
use App\Models\DashboardType;
use App\Repositories\Contracts\PermissionRepositoryInterface;
use App\Repositories\Contracts\RoleRepositoryInterface;
use App\Traits\HandlesDashboardTypes;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PermissionService
{
    use HandlesDashboardTypes;
    public function __construct(
        protected PermissionRepositoryInterface $permissionRepository,
        protected RoleRepositoryInterface $roleRepository
    ) {}

    /**
     * Get all permissions
     */
    public function getAll(): Collection
    {
        return $this->permissionRepository->getAll();
    }

    /**
     * Get paginated permissions
     */
    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->permissionRepository->getPaginated($perPage);
    }

    /**
     * Find permission by ID
     */
    public function findById(int $id): ?Permission
    {
        return $this->permissionRepository->findById($id);
    }


    /**
     * Assign permission to role
     */
    public function assignToRole(Permission $permission, Role $role): void
    {
        if (!$this->roleRepository->isManageable($role)) {
            throw new \InvalidArgumentException('Can only assign permissions to manageable roles');
        }

        $role->permissions()->attach($permission->id);
    }

    /**
     * Remove permission from role
     */
    public function removeFromRole(Permission $permission, Role $role): void
    {
        if (!$this->roleRepository->isManageable($role)) {
            throw new \InvalidArgumentException('Can only remove permissions from manageable roles');
        }

        $role->permissions()->detach($permission->id);
    }

    /**
     * Get permissions by dashboard type
     */
    public function getByDashboardType(string $dashboardType): Collection
    {
        return $this->permissionRepository->getByDashboardType($dashboardType);
    }

    /**
     * Get manageable roles
     */
    public function getManageableRoles(): Collection
    {
        return $this->roleRepository->getAllManageable();
    }
}