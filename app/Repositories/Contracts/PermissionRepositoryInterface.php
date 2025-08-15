<?php

namespace App\Repositories\Contracts;

use App\Models\Permission;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface PermissionRepositoryInterface
{
    /**
     * Get all permissions
     */
    public function getAll(): Collection;

    /**
     * Get paginated permissions
     */
    public function getPaginated(int $perPage = 15): LengthAwarePaginator;

    /**
     * Find permission by ID
     */
    public function findById(int $id): ?Permission;

    /**
     * Find permission by name
     */
    public function findByName(string $name): ?Permission;

    /**
     * Get permissions by dashboard type
     */
    public function getByDashboardType(string $dashboardType): Collection;

    /**
     * Sync permission roles
     */
    public function syncRoles(Permission $permission, array $roleIds): void;
}
