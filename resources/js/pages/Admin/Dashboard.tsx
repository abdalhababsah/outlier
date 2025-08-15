import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Shield, BarChart3 } from 'lucide-react';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
    };
    is_super_admin: boolean;
    permissions: string[];
    stats: {
        total_users: number;
        total_roles: number;
        total_permissions: number;
        total_dashboard_types: number;
    };
    dashboard_types?: {
        id: number;
        name: string;
        display_name: string;
        description?: string;
    }[];
}

export default function AdminDashboard({ user, is_super_admin, permissions, stats, dashboard_types }: Props) {
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {user.name}
                        </p>
                    </div>
                    <Badge variant={is_super_admin ? "destructive" : "secondary"} className="text-sm">
                        {is_super_admin ? "Super Administrator" : "Administrator"}
                    </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground">
                                Registered users
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Dashboard Types
                            </CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_dashboard_types}</div>
                            <p className="text-xs text-muted-foreground">
                                Available dashboard types
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                System Roles
                            </CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_roles}</div>
                            <p className="text-xs text-muted-foreground">
                                Available roles
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Permissions
                            </CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_permissions}</div>
                            <p className="text-xs text-muted-foreground">
                                System permissions
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Access Level</CardTitle>
                        <CardDescription>
                            {is_super_admin 
                                ? "You have unrestricted super admin access - no permission checks apply."
                                : "These are the permissions granted to your admin role."
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {is_super_admin ? (
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Badge variant="destructive">SUPER ADMIN</Badge>
                                    <span className="text-sm text-muted-foreground">Full system access</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    • All permission checks are bypassed
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    • Unrestricted access to all features
                                </p>
                            </div>
                        ) : (
                            <div>
                                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mb-4">
                                    {permissions.map((permission) => (
                                        <Badge key={permission} variant="outline" className="justify-start">
                                            {permission.replace('-', ' ')}
                                        </Badge>
                                    ))}
                                </div>
                                {permissions.length === 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        No permissions assigned yet.
                                    </p>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {dashboard_types && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Dashboard Types</CardTitle>
                            <CardDescription>
                                Available dashboard types in the system
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                {dashboard_types.map((type) => (
                                    <div key={type.id} className="rounded-lg border p-4">
                                        <h3 className="font-medium">{type.display_name}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{type.name}</p>
                                        <p className="text-sm">{type.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Admin Functions</CardTitle>
                        <CardDescription>
                            Available administrative functions based on your permissions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="font-medium">Role Management</h4>
                                <div className="space-y-1">
                                    <Button variant="outline" size="sm" asChild className="w-full justify-start">
                                        <Link href={route('admin.roles.index')}>
                                            <Shield className="mr-2 h-4 w-4" />
                                            Manage Roles
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild className="w-full justify-start">
                                        <Link href={route('admin.permissions.index')}>
                                            <BarChart3 className="mr-2 h-4 w-4" />
                                            Manage Permissions
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium">System Management</h4>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        • User management (coming soon)
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        • System reports (coming soon)
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        • Configuration (coming soon)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
