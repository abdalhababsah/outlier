<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => false,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'admin' => [
            // Admin has specific permissions - super_admin bypasses these checks
            'users' => 'c,r,u,d',
            'roles' => 'c,r,u,d',
            'permissions' => 'c,r,u,d',
            'reports' => 'c,r,u,d',
            'settings' => 'c,r,u,d',
            'projects' => 'c,r,u,d',
            'system' => 'c,r,u,d',
        ],
        'super_admin' => [
            // Super admin role exists but no permissions needed - trait handles bypass
        ],
        'project_owner' => [
            // Project owner has no permissions - separate dashboard logic
        ],
        'staff' => [
            // Staff has no permissions - separate dashboard logic
        ],
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
    ],
];
