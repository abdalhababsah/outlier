<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignPermissionRequest;
use App\Http\Requests\Admin\AssignRoleToPermissionRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Models\DashboardType;
use App\Services\PermissionService;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    public function __construct(
        protected PermissionService $permissionService,
        protected RoleService $roleService
    ) {}

    /**
     * Display a listing of permissions.
     */
    public function index(Request $request): Response
    {
        $permissions = $this->permissionService->getAll();
        $dashboardTypes = DashboardType::all();

        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => $permissions,
            'dashboardTypes' => $dashboardTypes,
            'can' => [
                'manage_assignments' => $request->user()->canDo('permission-assignment-manage'),
            ]
        ]);
    }

    // Create and store methods removed as per requirements

    /**
     * Display the specified permission.
     */
    public function show(Request $request, Permission $permission): Response
    {
        $permission->load(['roles' => function ($query) {
            $query->whereNotNull('dashboard_type_id');
        }, 'dashboardType']);

        return Inertia::render('Admin/Permissions/Show', [
            'permission' => $permission,
            'can' => [
                'manage_assignments' => $request->user()->canDo('permission-assignment-manage'),
            ]
        ]);
    }

    /**
     * Assign permission to role
     */
    public function assignToRole(AssignRoleToPermissionRequest $request, Permission $permission): RedirectResponse
    {
        try {
            $role = Role::findOrFail($request->validated('role_id'));
            $this->permissionService->assignToRole($permission, $role);

            return redirect()->back()
                ->with('success', 'Permission assigned to role successfully.');
        } catch (\InvalidArgumentException $e) {
            return redirect()->back()
                ->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to assign permission: ' . $e->getMessage());
        }
    }

    /**
     * Remove permission from role
     */
    public function removeFromRole(Permission $permission, Role $role): RedirectResponse
    {
        try {
            $this->permissionService->removeFromRole($permission, $role);

            return redirect()->back()
                ->with('success', 'Permission removed from role successfully.');
        } catch (\InvalidArgumentException $e) {
            return redirect()->back()
                ->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to remove permission: ' . $e->getMessage());
        }
    }

    /**
     * Get roles that can be assigned to a permission
     */
    public function getAssignableRoles(Permission $permission): JsonResponse
    {
        $roles = $this->roleService->getAllManageable();
        
        // Filter out roles that already have this permission
        $assignedRoleIds = $permission->roles()->pluck('id')->toArray();
        
        // If the permission has a dashboard type, only show roles with the same dashboard type
        if ($permission->dashboard_type_id) {
            $roles = $roles->filter(function ($role) use ($permission) {
                return $role->dashboard_type_id === $permission->dashboard_type_id;
            });
        }
        
        $assignableRoles = $roles->filter(function ($role) use ($assignedRoleIds) {
            return !in_array($role->id, $assignedRoleIds);
        })->values();
        
        return response()->json($assignableRoles);
    }
}