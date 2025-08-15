import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Shield } from 'lucide-react';

interface DashboardType {
    id: number;
    name: string;
    display_name: string;
    description?: string;
}

interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string;
    dashboard_type_id: number | null;
    dashboard_type: DashboardType | null;
    roles_count: number;
    roles: Array<{
        id: number;
        name: string;
        display_name: string;
    }>;
}

interface Props {
    permissions: Permission[];
    can: {
        create: boolean;
        update: boolean;
        delete: boolean;
        manage_assignments: boolean;
    };
}

export default function PermissionsIndex({ permissions, can }: Props) {
    // Delete functionality removed as per requirements

    // All permissions are predefined in the system

    return (
        <AppLayout>
            <Head title="Manage Permissions" />
            
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Permissions</h1>
                        <p className="text-muted-foreground">
                            Manage system permissions and their role assignments
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>System Permissions</CardTitle>
                        <CardDescription>
                            Permissions control access to specific features and actions in the admin panel.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {permissions.length === 0 ? (
                            <div className="text-center py-8">
                                <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No permissions found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Permissions are created through system migrations.
                                </p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Permission</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Assigned Roles</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {permissions.map((permission) => (
                                        <TableRow key={permission.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{permission.display_name}</div>
                                                    <div className="text-sm text-muted-foreground">{permission.name}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <p className="truncate">{permission.description}</p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1 flex-wrap">
                                                    {permission.roles.map((role) => (
                                                        <Badge key={role.id} variant="outline" className="text-xs">
                                                            {role.display_name}
                                                        </Badge>
                                                    ))}
                                                    {permission.roles.length === 0 && (
                                                        <Badge variant="secondary">Not assigned</Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {permission.dashboard_type ? (
                                                    <Badge variant="default" className="capitalize">{permission.dashboard_type.display_name}</Badge>
                                                ) : (
                                                    <Badge variant="outline">Global</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('admin.permissions.show', permission.id)}>
                                                                View Details
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {/* Edit functionality removed as per requirements */}
                                                        {/* Delete functionality removed as per requirements */}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
