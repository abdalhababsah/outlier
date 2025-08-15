<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRoleRequest;
use App\Http\Requests\Admin\UpdateRoleRequest;
use App\Http\Requests\Admin\AssignRoleRequest;
use App\Models\Role;
use App\Models\User;
use App\Models\DashboardType;
use App\Services\RoleService;
use App\Services\PermissionService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function __construct(
        protected RoleService $roleService,
        protected PermissionService $permissionService
    ) {}

    /**
     * Display a listing of manageable roles.
     */
    public function index(Request $request): Response
    {
        $roles = $this->roleService->getAllManageable();

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'can' => [
                'create' => $request->user()->canDo('roles-create'),
                'update' => $request->user()->canDo('roles-update'),
                'delete' => $request->user()->canDo('roles-delete'),
                'manage_assignments' => $request->user()->canDo('role-assignment-manage'),
            ]
        ]);
    }

    /**
     * Show the form for creating a new role.
     */
    public function create(): Response
    {
        // Get dashboard types
        $dashboardTypes = DashboardType::all();
        
        // Get permissions grouped by dashboard type
        $permissionsByType = [];
        foreach ($dashboardTypes as $type) {
            $permissionsByType[$type->name] = $this->permissionService->getByDashboardType($type->name);
        }

        return Inertia::render('Admin/Roles/Create', [
            'permissionsByType' => $permissionsByType,
            'dashboardTypes' => $dashboardTypes
        ]);
    }

    /**
     * Store a newly created role.
     */
    public function store(StoreRoleRequest $request): RedirectResponse
    {
        try {
            $this->roleService->create($request->validated());

            return redirect()->route('admin.roles.index')
                ->with('success', 'Role created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to create role: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Display the specified role.
     */
    public function show(Request $request, Role $role): Response
    {
        $role = $this->roleService->findManageableById($role->id);
        
        if (!$role) {
            abort(404, 'Role not found.');
        }

        $role->load(['permissions', 'users', 'dashboardType']);

        return Inertia::render('Admin/Roles/Show', [
            'role' => $role,
            'can' => [
                'update' => $request->user()->canDo('roles-update'),
                'delete' => $request->user()->canDo('roles-delete'),
                'manage_assignments' => $request->user()->canDo('role-assignment-manage'),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified role.
     */
    public function edit(Role $role): Response
    {
        $role = $this->roleService->findManageableById($role->id);
        
        if (!$role) {
            abort(404, 'Role not found.');
        }

        $role->load(['permissions', 'dashboardType']);
        
        // Get dashboard types
        $dashboardTypes = DashboardType::all();
        
        // Get permissions grouped by dashboard type
        $permissionsByType = [];
        foreach ($dashboardTypes as $type) {
            $permissionsByType[$type->name] = $this->permissionService->getByDashboardType($type->name);
        }

        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
            'permissionsByType' => $permissionsByType,
            'dashboardTypes' => $dashboardTypes
        ]);
    }

    /**
     * Update the specified role.
     */
    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        try {
            $this->roleService->update($role, $request->validated());

            return redirect()->route('admin.roles.index')
                ->with('success', 'Role updated successfully.');
        } catch (\InvalidArgumentException $e) {
            return redirect()->back()
                ->with('error', $e->getMessage())
                ->withInput();
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to update role: ' . $e->getMessage())
                ->withInput();
        }
    }

    /**
     * Remove the specified role.
     */
    public function destroy(Request $request, Role $role): RedirectResponse
    {
        try {
            $this->roleService->delete($role);

            return redirect()->route('admin.roles.index')
                ->with('success', 'Role deleted successfully.');
        } catch (\InvalidArgumentException $e) {
            return redirect()->route('admin.roles.index')
                ->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return redirect()->route('admin.roles.index')
                ->with('error', 'Failed to delete role: ' . $e->getMessage());
        }
    }

    /**
     * Get users who can be assigned roles
     */
    public function getAssignableUsers(): JsonResponse
    {
        $users = $this->roleService->getAssignableUsers();
        return response()->json($users);
    }

    /**
     * Assign role to user
     */
    public function assignRole(AssignRoleRequest $request, Role $role): RedirectResponse
    {
        try {
            $user = User::findOrFail($request->validated('user_id'));
            $this->roleService->assignToUser($role, $user);

            return redirect()->back()
                ->with('success', 'Role assigned successfully.');
        } catch (\InvalidArgumentException $e) {
            return redirect()->back()
                ->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to assign role: ' . $e->getMessage());
        }
    }

    /**
     * Remove role from user
     */
    public function removeRole(Request $request, Role $role, User $targetUser): RedirectResponse
    {
        try {
            $this->roleService->removeFromUser($role, $targetUser);

            return redirect()->back()
                ->with('success', 'Role removed successfully.');
        } catch (\InvalidArgumentException $e) {
            return redirect()->back()
                ->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to remove role: ' . $e->getMessage());
        }
    }
}