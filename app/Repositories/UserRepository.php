<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Role;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class UserRepository implements UserRepositoryInterface
{
    /**
     * Manageable role types
     */
    protected array $manageableRoleTypes = ['administration', 'staff', 'project'];

    /**
     * Get all users
     */
    public function getAll(): Collection
    {
        return User::with('roles')->get();
    }

    /**
     * Get paginated users
     */
    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return User::with('roles')->paginate($perPage);
    }

    /**
     * Find user by ID
     */
    public function findById(int $id): ?User
    {
        return User::find($id);
    }

    /**
     * Find user by email
     */
    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    /**
     * Create new user
     */
    public function create(array $data): User
    {
        return User::create($data);
    }

    /**
     * Update user
     */
    public function update(User $user, array $data): bool
    {
        return $user->update($data);
    }

    /**
     * Delete user
     */
    public function delete(User $user): bool
    {
        // Detach all roles first
        $user->roles()->detach();
        
        return $user->delete();
    }

    /**
     * Get users assignable to roles
     */
    public function getAssignableUsers(): Collection
    {
        return User::whereDoesntHave('roles', function ($query) {
            $query->whereNotIn('role_type', $this->manageableRoleTypes);
        })->select(['id', 'name', 'email'])->get();
    }

    /**
     * Assign role to user
     */
    public function assignRole(User $user, Role $role): void
    {
        $user->addRole($role);
    }

    /**
     * Remove role from user
     */
    public function removeRole(User $user, Role $role): void
    {
        $user->removeRole($role);
    }

    /**
     * Check if user can be assigned a role
     */
    public function canBeAssignedRole(User $user, Role $role): bool
    {
        // Check if user has conflicting role types
        $hasConflictingRoles = $user->roles()
            ->whereNotIn('role_type', $this->manageableRoleTypes)
            ->exists();

        return !$hasConflictingRoles;
    }
}
