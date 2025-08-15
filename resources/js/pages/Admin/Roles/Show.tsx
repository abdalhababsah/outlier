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
import { ArrowLeft, Edit, Trash2, UserPlus, UserMinus, MoreHorizontal } from 'lucide-react';
import UserRoleAssignmentModal from '@/components/admin/user-role-assignment-modal';

interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string;
    dashboard_type_id?: number;
}

interface User {
    id: number;
    name: string;
    email: string;
}

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
    permissions: Permission[];
    users: User[];
}

interface Props {
    role: Role;
    can: {
        update: boolean;
        delete: boolean;
        manage_assignments: boolean;
    };
}

export default function ShowRole({ role, can }: Props) {
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete the role "${role.display_name}"?`)) {
            router.delete(route('admin.roles.destroy', role.id));
        }
    };

    const handleRemoveUser = (user: User) => {
        if (confirm(`Are you sure you want to remove ${user.name} from this role?`)) {
            router.delete(route('admin.roles.remove-user', { role: role.id, user: user.id }));
        }
    };

    const openAssignModal = () => {
        setIsAssignModalOpen(true);
    };

    const closeAssignModal = () => {
        setIsAssignModalOpen(false);
    };

    const isDeletable = role.name !== 'admin' && role.name !== 'super_admin';
    
    return (
        <AppLayout>
            <Head title={`Role: ${role.display_name}`} />
            
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{role.display_name}</h1>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">{role.name}</Badge>
                            {role.dashboard_type ? (
                                <Badge className="capitalize">{role.dashboard_type.display_name}</Badge>
                            ) : (
                                <Badge variant="outline">Unknown</Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 self-start">
                        <Button variant="outline" asChild>
                            <Link href={route('admin.roles.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Roles
                            </Link>
                        </Button>
                        {can.update && (
                            <Button variant="outline" asChild>
                                <Link href={route('admin.roles.edit', role.id)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Role
                                </Link>
                            </Button>
                        )}
                        {can.delete && isDeletable && (
                            <Button variant="destructive" onClick={handleDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Role
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Role Details</CardTitle>
                            <CardDescription>
                                Basic information about this role
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                                    <dd className="text-base">{role.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Display Name</dt>
                                    <dd className="text-base">{role.display_name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Dashboard Type</dt>
                                    <dd className="text-base">
                                        {role.dashboard_type ? role.dashboard_type.display_name : 'Unknown'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                                    <dd className="text-base">{role.description || 'No description provided'}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Assigned Permissions</CardTitle>
                            <CardDescription>
                                Permissions granted to this role
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {role.permissions.length === 0 ? (
                                <p className="text-muted-foreground">No permissions assigned to this role.</p>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        This role has {role.permissions.length} permissions:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {role.permissions.map((permission) => (
                                            <Badge key={permission.id} variant="secondary">
                                                {permission.display_name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Users with this Role</CardTitle>
                            <CardDescription>
                                {role.users.length} user(s) assigned to this role
                            </CardDescription>
                        </div>
                        {can.manage_assignments && (
                            <Button variant="outline" onClick={openAssignModal}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Assign User
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {role.users.length === 0 ? (
                            <p className="text-muted-foreground">No users have been assigned this role yet.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {role.users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
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
                                                                onClick={() => handleRemoveUser(user)}
                                                                className="text-destructive"
                                                            >
                                                                <UserMinus className="mr-2 h-4 w-4" />
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

            {/* User Assignment Modal */}
            <UserRoleAssignmentModal 
                isOpen={isAssignModalOpen}
                onClose={closeAssignModal}
                roleId={role.id}
            />
        </AppLayout>
    );
}
