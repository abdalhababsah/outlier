import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import { getAdminNavigation } from '@/navigation/admin-navigation';
import { getProjectNavigation } from '@/navigation/project-navigation';
import { getStaffNavigation } from '@/navigation/staff-navigation';
import { getCommonNavigation } from '@/navigation/common-navigation';
import AppLogo from './app-logo';


export function AppSidebar() {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    
    if (!user) {
        return null;
    }
    
    // Extract role types and permissions
    const roleTypes = user.dashboard_types || [];
    const permissions = user.permissions || [];
    const isSuperAdmin = user.is_super_admin || false;
    
    // Determine which navigation groups to show based on role types
    const navGroups: NavGroup[] = [];
    
    // Add common items
    navGroups.push(getCommonNavigation());
    
    // Add administration items if user has administration access
    if (roleTypes.includes('administration') || isSuperAdmin) {
        const adminNavGroups = getAdminNavigation(permissions, isSuperAdmin);
        navGroups.push(...adminNavGroups);
    }
    
    // Add project items if user has project access
    if (roleTypes.includes('project')) {
        const projectNavGroups = getProjectNavigation(permissions);
        navGroups.push(...projectNavGroups);
    }
    
    // Add staff items if user has staff access
    if (roleTypes.includes('staff')) {
        const staffNavGroups = getStaffNavigation(permissions);
        navGroups.push(...staffNavGroups);
    }
    
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {navGroups.map((group, index) => (
                    <NavMain key={`${group.title}-${index}`} title={group.title} items={group.items} />
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={[]} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
