<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard - redirects to role-specific dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Role-specific dashboards
    Route::get('admin/dashboard', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard');
    Route::get('project-owner/dashboard', [DashboardController::class, 'projectOwnerDashboard'])->name('project-owner.dashboard');
    Route::get('staff/dashboard', [DashboardController::class, 'staffDashboard'])->name('staff.dashboard');
    
    // API endpoint for permission checking
    Route::post('check-permission', [DashboardController::class, 'checkPermission'])->name('check-permission');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
