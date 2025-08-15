<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminAccess
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(401, 'Unauthenticated');
        }

        // Super admin has full access to administration
        if ($user->isSuperAdmin()) {
            return $next($request);
        }

        // Check if user has administration access
        if (!$user->hasAdministrationAccess()) {
            abort(403, 'Access denied. Administration access required.');
        }

        return $next($request);
    }
}
