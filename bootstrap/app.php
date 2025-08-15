<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\CheckRoleAccess;
use App\Http\Middleware\CheckPermission;
use App\Http\Middleware\CheckAdminAccess;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\ErrorController;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Register custom middleware aliases
        $middleware->alias([
            'role.access' => CheckRoleAccess::class,
            'permission' => CheckPermission::class,
            'admin.access' => CheckAdminAccess::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Register custom error pages for HTTP exceptions
        $exceptions->renderable(function (HttpException $e) {
            $status = $e->getStatusCode();
            
            if (request()->expectsJson()) {
                return response()->json([
                    'message' => $e->getMessage() ?: match($status) {
                        403 => 'Forbidden',
                        404 => 'Not Found',
                        419 => 'Page Expired',
                        500 => 'Server Error',
                        503 => 'Service Unavailable',
                        default => 'Error',
                    }
                ], $status);
            }
            
            try {
                return match($status) {
                    403 => app(ErrorController::class)->forbidden(request()),
                    404 => app(ErrorController::class)->notFound(request()),
                    419 => app(ErrorController::class)->pageExpired(request()),
                    500 => app(ErrorController::class)->serverError(request()),
                    503 => app(ErrorController::class)->serviceUnavailable(request()),
                    default => app(ErrorController::class)->genericError(request(), $status),
                };
            } catch (\Exception $exception) {
                // Fallback to minimal error page if Inertia rendering fails
                return response()->view('errors.minimal', [
                    'errorCode' => $status,
                    'errorMessage' => match($status) {
                        403 => 'Forbidden',
                        404 => 'Page Not Found',
                        419 => 'Page Expired',
                        500 => 'Server Error',
                        503 => 'Service Unavailable',
                        default => 'Error',
                    }
                ], $status);
            }
        });
        
        // Handle generic exceptions (non-HTTP)
        $exceptions->renderable(function (\Throwable $e) {
            // Avoid infinite recursion for session-related errors
            if ($e instanceof \RuntimeException && str_contains($e->getMessage(), 'Session store not set on request')) {
                return response()->view('errors.minimal', [
                    'errorCode' => 500,
                    'errorMessage' => 'Server Error'
                ], 500);
            }
            
            if (request()->expectsJson()) {
                return response()->json([
                    'message' => app()->environment('production') 
                        ? 'Server Error' 
                        : $e->getMessage()
                ], 500);
            }
            
            if (!$e instanceof HttpException) {
                return app(ErrorController::class)->serverError(request());
            }
            
            return null;
        });
    })->create();
