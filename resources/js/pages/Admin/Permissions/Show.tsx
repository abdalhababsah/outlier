import { useState } from 'react';
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
import { ArrowLeft, ShieldPlus, ShieldX, MoreHorizontal } from 'lucide-react';
import PermissionRoleAssignmentModal from '@/components/admin/permission-role-assignment-modal';

interface DashboardType {
    id: number;
    name: string;
    display_name: string;
    description?: string;
}

interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
    dashboard_type_id: number;
    dashboard_type: DashboardType;
}

interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string;
    dashboard_type_id: number | null;
    dashboard_type: DashboardType | null;
    roles: Role[];
}

interface Props {
    permission: Permission;
    can: {
        update: boolean;
        delete: boolean;
        manage_assignments: boolean;
    };
}

export default function ShowPermission({ permission, can }: Props) {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    
    // Delete functionality removed as per requirements

    const handleRemoveFromRole = (role: Role) => {
        if (confirm(`Are you sure you want to remove this permission from the "${role.display_name}" role?`)) {
            router.delete(route('admin.permissions.remove-role', { permission: permission.id, role: role.id }));
        }
    };

    const openAssignModal = () => {
        setIsAssignModalOpen(true);
    };

    const closeAssignModal = () => {
        setIsAssignModalOpen(false);
    };

    // All permissions are predefined in the system
    
    return (
        <AppLayout>
            <Head title={`Permission: ${permission.display_name}`} />
            
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{permission.display_name}</h1>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">{permission.name}</Badge>
                            {permission.dashboard_type && (
                                <Badge className="capitalize">{permission.dashboard_type.display_name}</Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 self-start">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.permissions.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Permissions
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Permission Details</CardTitle>
                            <CardDescription>
                                Basic information about this permission
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                                    <dd className="text-base">{permission.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Display Name</dt>
                                    <dd className="text-base">{permission.display_name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Dashboard Type</dt>
                                    <dd className="text-base capitalize">
                                        {permission.dashboard_type ? permission.dashboard_type.display_name : 'Global (Not dashboard-specific)'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                                    <dd className="text-base">{permission.description || 'No description provided'}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Assigned Roles</CardTitle>
                                <CardDescription>
                                    Roles that have this permission
                                </CardDescription>
                            </div>
                            {can.manage_assignments && (
                                <Button variant="outline" onClick={openAssignModal}>
                                    <ShieldPlus className="mr-2 h-4 w-4" />
                                    Assign to Role
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent>
                            {permission.roles.length === 0 ? (
                                <p className="text-muted-foreground">This permission is not assigned to any roles.</p>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead className="w-[100px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {permission.roles.map((role) => (
                                            <TableRow key={role.id}>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{role.display_name}</div>
                                                        <div className="text-sm text-muted-foreground">{role.name}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {role.dashboard_type ? (
                                                        <Badge className="capitalize">{role.dashboard_type.display_name}</Badge>
                                                    ) : (
                                                        <Badge variant="outline">Unknown</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {can.manage_assignments && (
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem 
                                                                    onClick={() => handleRemoveFromRole(role)}
                                                                    className="text-destructive"
                                                                >
                                                                    <ShieldX className="mr-2 h-4 w-4" />
                                                                    Remove from Role
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Role Assignment Modal */}
            <PermissionRoleAssignmentModal 
                isOpen={isAssignModalOpen}
                onClose={closeAssignModal}
                permissionId={permission.id}
            />
        </AppLayout>
    );
}
