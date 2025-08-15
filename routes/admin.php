<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin.access'])->prefix('admin')->name('admin.')->group(function () {
    
    // Role Management Routes
    Route::middleware(['permission:roles-read'])->group(function () {
        Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
    });
    
    Route::middleware(['permission:roles-create'])->group(function () {
        Route::get('roles/create', [RoleController::class, 'create'])->name('roles.create');
        Route::post('roles', [RoleController::class, 'store'])->name('roles.store');
    });
    
    Route::middleware(['permission:roles-read'])->group(function () {
        Route::get('roles/{role}', [RoleController::class, 'show'])->name('roles.show');
    });
    
    Route::middleware(['permission:roles-update'])->group(function () {
        Route::get('roles/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
        Route::patch('roles/{role}', [RoleController::class, 'update'])->name('roles.update');
        Route::put('roles/{role}', [RoleController::class, 'update']);
    });
    
    Route::middleware(['permission:roles-delete'])->group(function () {
        Route::delete('roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
    });
    
    Route::middleware(['permission:role-assignment-manage'])->group(function () {
        Route::get('assignable-users', [RoleController::class, 'getAssignableUsers'])->name('assignable-users');
        Route::post('roles/{role}/assign-user', [RoleController::class, 'assignRole'])->name('roles.assign');
        Route::delete('roles/{role}/users/{user}', [RoleController::class, 'removeRole'])->name('roles.remove-user');
    });
    
    // Permission Management Routes
    Route::middleware(['permission:permissions-read'])->group(function () {
        Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
        Route::get('permissions/{permission}', [PermissionController::class, 'show'])->name('permissions.show');
    });
    
    // Edit and update routes removed as per requirements
    
    // Delete routes removed as per requirements
    
    Route::middleware(['permission:permission-assignment-manage'])->group(function () {
        Route::get('permissions/{permission}/assignable-roles', [PermissionController::class, 'getAssignableRoles'])->name('permissions.assignable-roles');
        Route::post('permissions/{permission}/assign-role', [PermissionController::class, 'assignToRole'])->name('permissions.assign-role');
        Route::delete('permissions/{permission}/roles/{role}', [PermissionController::class, 'removeFromRole'])->name('permissions.remove-role');
    });
    
});
