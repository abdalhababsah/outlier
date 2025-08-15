import { LayoutGrid } from 'lucide-react';
import { type NavGroup } from '@/types';

/**
 * Common navigation items for all dashboards
 */
export const getCommonNavigation = (): NavGroup => {
    return {
        title: 'Platform',
        items: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            }
        ]
    };
};
