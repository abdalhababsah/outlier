<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\DashboardType;

class CheckRoleAccess
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $dashboardType): Response
    {
        $user = $request->user();
        
        if (!$user) {
            abort(401, 'Unauthenticated');
        }
        
        // Check if user can access the specified dashboard type
        if (!$user->canAccessDashboard($dashboardType)) {
            // Get dashboard type display name for a more user-friendly message
            $dashboardDisplayName = DashboardType::where('name', $dashboardType)
                ->value('display_name') ?? ucfirst($dashboardType);
                
            abort(403, "Access denied. {$dashboardDisplayName} dashboard access required.");
        }
        
        return $next($request);
    }
}
