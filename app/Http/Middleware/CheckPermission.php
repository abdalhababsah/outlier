<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $permission): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(401, 'Unauthenticated');
        }

        // Super admin always bypasses permission checks
        if ($user->isSuperAdmin()) {
            return $next($request);
        }

        // For other users, check if they have the required permission
        if (!$user->canDo($permission)) {
            abort(403, "You do not have permission to {$permission}.");
        }

        return $next($request);
    }
}
