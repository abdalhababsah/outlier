<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ErrorController extends Controller
{
    /**
     * Get error message from session if available
     */
    private function getErrorMessage(Request $request, string $defaultMessage): string
    {
        try {
            if ($request->hasSession()) {
                return $request->session()->get('error') ?? $defaultMessage;
            }
        } catch (\Exception $e) {
            // Session not available
        }
        
        return $defaultMessage;
    }

    /**
     * Display a 403 error page.
     */
    public function forbidden(Request $request): Response
    {
        return Inertia::render('errors/403', [
            'status' => 403,
            'message' => $this->getErrorMessage($request, 'Sorry, you do not have permission to access this page.')
        ]);
    }

    /**
     * Display a 404 error page.
     */
    public function notFound(Request $request): Response
    {
        return Inertia::render('errors/404', [
            'status' => 404,
            'message' => $this->getErrorMessage($request, 'Sorry, the page you are looking for could not be found.')
        ]);
    }

    /**
     * Display a 419 error page (CSRF token mismatch).
     */
    public function pageExpired(Request $request): Response
    {
        return Inertia::render('errors/419', [
            'status' => 419,
            'message' => $this->getErrorMessage($request, 'Sorry, your session has expired. Please refresh and try again.')
        ]);
    }

    /**
     * Display a 500 error page.
     */
    public function serverError(Request $request): Response
    {
        return Inertia::render('errors/500', [
            'status' => 500,
            'message' => $this->getErrorMessage($request, 'Sorry, something went wrong on our server.')
        ]);
    }

    /**
     * Display a 503 error page.
     */
    public function serviceUnavailable(Request $request): Response
    {
        return Inertia::render('errors/503', [
            'status' => 503,
            'message' => $this->getErrorMessage($request, 'Sorry, we are doing some maintenance. Please check back soon.')
        ]);
    }

    /**
     * Display a generic error page for other error codes.
     */
    public function genericError(Request $request, int $status = null): Response
    {
        $status = $status ?? 500;
        
        return Inertia::render('errors/generic', [
            'status' => $status,
            'message' => $this->getErrorMessage($request, 'An unexpected error occurred.')
        ]);
    }
}
