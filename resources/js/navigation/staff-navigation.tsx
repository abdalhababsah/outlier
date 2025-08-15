import { ClipboardList, Calendar, FileText } from 'lucide-react';
import { type NavGroup } from '@/types';

/**
 * Navigation items for the staff dashboard
 */
export const getStaffNavigation = (permissions: string[]): NavGroup[] => {
    // Base staff navigation group
    const staffNavGroup: NavGroup = {
        title: 'Staff Tools',
        items: []
    };

    // Add items based on permissions
    if (permissions.includes('staff-tasks-manage')) {
        staffNavGroup.items.push({
            title: 'Tasks',
            href: '/staff/tasks',
            icon: ClipboardList,
        });
    }

    if (permissions.includes('staff-timesheet-manage')) {
        staffNavGroup.items.push({
            title: 'Timesheet',
            href: '/staff/timesheet',
            icon: Calendar,
        });
    }

    if (permissions.includes('staff-documents-view')) {
        staffNavGroup.items.push({
            title: 'Documents',
            href: '/staff/documents',
            icon: FileText,
        });
    }

    // Only return the group if it has items
    return staffNavGroup.items.length > 0 ? [staffNavGroup] : [];
};
