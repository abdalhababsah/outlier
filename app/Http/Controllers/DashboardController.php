<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use App\Models\DashboardType;

class DashboardController extends Controller
{
    /**
     * Main dashboard entry point - redirects to role-specific dashboard
     */
    public function index(Request $request): RedirectResponse
    {
        $user = $request->user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        // Redirect to role-specific dashboard
        $dashboardRoute = $user->getDashboardRoute();
        
        // If the current route is already the correct dashboard, don't redirect
        if ($request->route()->getName() === $dashboardRoute) {
            return redirect()->back();
        }

        return redirect()->route($dashboardRoute);
    }

    /**
     * Admin Dashboard (for both admin and super_admin roles)
     */
    public function adminDashboard(Request $request): Response
    {
        $user = $request->user();
        
        // Check if user has admin or super_admin role
        if (!$user || !$user->isAdmin()) {
            abort(403, 'Access denied. Admin role required.');
        }

        $dashboardTypes = DashboardType::all();
        
        return Inertia::render('Admin/Dashboard', [
            'user' => $user,
            'is_super_admin' => $user->isSuperAdmin(),
            'permissions' => $user->permissions()->pluck('name')->toArray(),
            'stats' => [
                'total_users' => User::count(),
                'total_roles' => Role::count(),
                'total_permissions' => Permission::count(),
                'total_dashboard_types' => $dashboardTypes->count(),
            ],
            'dashboard_types' => $dashboardTypes
        ]);
    }

    /**
     * Project Owner Dashboard
     */
    public function projectOwnerDashboard(Request $request): Response
    {
        $user = $request->user();
        
        // Check if user has project owner role
        if (!$user || !$user->isProjectOwner()) {
            abort(403, 'Access denied. Project owner role required.');
        }

        return Inertia::render('ProjectOwner/Dashboard', [
            'user' => $user,
            'projects' => [], // Add your project logic here
        ]);
    }

    /**
     * Staff Dashboard
     */
    public function staffDashboard(Request $request): Response
    {
        $user = $request->user();
        
        // Check if user has staff role
        if (!$user || !$user->isStaff()) {
            abort(403, 'Access denied. Staff role required.');
        }

        return Inertia::render('Staff/Dashboard', [
            'user' => $user,
            'tasks' => [], // Add your task logic here
        ]);
    }

    /**
     * Check user permissions for a specific action
     */
    public function checkPermission(Request $request): \Illuminate\Http\JsonResponse
    {
        $permission = $request->input('permission');
        $user = $request->user();
        
        if (!$user || !$permission) {
            return response()->json(['can' => false]);
        }

        return response()->json([
            'can' => $user->canDo($permission)
        ]);
    }
}
