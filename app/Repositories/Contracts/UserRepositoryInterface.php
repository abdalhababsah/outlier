<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use App\Models\Role;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface UserRepositoryInterface
{
    /**
     * Get all users
     */
    public function getAll(): Collection;

    /**
     * Get paginated users
     */
    public function getPaginated(int $perPage = 15): LengthAwarePaginator;

    /**
     * Find user by ID
     */
    public function findById(int $id): ?User;

    /**
     * Find user by email
     */
    public function findByEmail(string $email): ?User;

    /**
     * Create new user
     */
    public function create(array $data): User;

    /**
     * Update user
     */
    public function update(User $user, array $data): bool;

    /**
     * Delete user
     */
    public function delete(User $user): bool;

    /**
     * Get users assignable to roles
     */
    public function getAssignableUsers(): Collection;

    /**
     * Assign role to user
     */
    public function assignRole(User $user, Role $role): void;

    /**
     * Remove role from user
     */
    public function removeRole(User $user, Role $role): void;

    /**
     * Check if user can be assigned a role
     */
    public function canBeAssignedRole(User $user, Role $role): bool;
}
