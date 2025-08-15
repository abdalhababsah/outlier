import { Shield, Users, BarChart3 } from 'lucide-react';
import { type NavGroup } from '@/types';

/**
 * Navigation items for the administration dashboard
 */
export const getAdminNavigation = (permissions: string[], isSuperAdmin: boolean): NavGroup[] => {
    // Base admin navigation group
    const adminNavGroup: NavGroup = {
        title: 'Administration',
        items: []
    };

    // Add items based on permissions (super admin sees all)
    if (isSuperAdmin || permissions.includes('roles-read')) {
        adminNavGroup.items.push({
            title: 'Roles',
            href: '/admin/roles',
            icon: Shield,
        });
    }

    if (isSuperAdmin || permissions.includes('permissions-read')) {
        adminNavGroup.items.push({
            title: 'Permissions',
            href: '/admin/permissions',
            icon: Shield,
        });
    }

    if (isSuperAdmin || permissions.includes('administration-users-manage')) {
        adminNavGroup.items.push({
            title: 'Users',
            href: '/admin/users',
            icon: Users,
        });
    }

    if (isSuperAdmin || permissions.includes('administration-reports-view')) {
        adminNavGroup.items.push({
            title: 'Reports',
            href: '/admin/reports',
            icon: BarChart3,
        });
    }

    // Only return the group if it has items
    return adminNavGroup.items.length > 0 ? [adminNavGroup] : [];
};
