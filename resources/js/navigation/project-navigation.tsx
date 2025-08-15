import { Folder, Users, FileText, Calendar, BarChart3 } from 'lucide-react';
import { type NavGroup } from '@/types';

/**
 * Navigation items for the project owner dashboard
 */
export const getProjectNavigation = (permissions: string[]): NavGroup[] => {
    // Base project navigation group
    const projectNavGroup: NavGroup = {
        title: 'Project Management',
        items: []
    };

    // Add items based on permissions
    if (permissions.includes('project-dashboard-access') || permissions.includes('project-projects-manage')) {
        projectNavGroup.items.push({
            title: 'Projects',
            href: '/project-owner/projects',
            icon: Folder,
        });
    }

    if (permissions.includes('project-team-manage')) {
        projectNavGroup.items.push({
            title: 'Team',
            href: '/project-owner/team',
            icon: Users,
        });
    }

    if (permissions.includes('project-budget-manage')) {
        projectNavGroup.items.push({
            title: 'Budget',
            href: '/project-owner/budget',
            icon: FileText,
        });
    }

    if (permissions.includes('project-timeline-manage')) {
        projectNavGroup.items.push({
            title: 'Timeline',
            href: '/project-owner/timeline',
            icon: Calendar,
        });
    }

    if (permissions.includes('project-reports-view')) {
        projectNavGroup.items.push({
            title: 'Reports',
            href: '/project-owner/reports',
            icon: BarChart3,
        });
    }

    // Only return the group if it has items
    return projectNavGroup.items.length > 0 ? [projectNavGroup] : [];
};
