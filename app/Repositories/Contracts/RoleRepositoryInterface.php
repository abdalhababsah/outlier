<?php

namespace App\Repositories\Contracts;

use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface RoleRepositoryInterface
{
    /**
     * Get all manageable roles
     */
    public function getAllManageable(): Collection;

    /**
     * Get paginated manageable roles
     */
    public function getPaginatedManageable(int $perPage = 15): LengthAwarePaginator;

    /**
     * Find role by ID
     */
    public function findById(int $id): ?Role;

    /**
     * Find role by name
     */
    public function findByName(string $name): ?Role;

    /**
     * Create new role
     */
    public function create(array $data): Role;

    /**
     * Update role
     */
    public function update(Role $role, array $data): bool;

    /**
     * Delete role
     */
    public function delete(Role $role): bool;

    /**
     * Check if role can be deleted
     */
    public function canBeDeleted(Role $role): bool;

    /**
     * Get roles by type
     */
    public function getByType(string $type): Collection;

    /**
     * Check if role is manageable
     */
    public function isManageable(Role $role): bool;

    /**
     * Sync role permissions
     */
    public function syncPermissions(Role $role, array $permissionIds): void;
}
