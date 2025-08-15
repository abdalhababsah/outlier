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
import { Plus, MoreHorizontal, Edit, Trash2, Users } from 'lucide-react';

interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
    dashboard_type_id: number;
    dashboard_type: {
        id: number;
        name: string;
        display_name: string;
    };
    users_count: number;
    permissions: Array<{
        id: number;
        name: string;
        display_name: string;
    }>;
}

interface Props {
    roles: Role[];
    can: {
        create: boolean;
        update: boolean;
        delete: boolean;
        manage_assignments: boolean;
    };
}

export default function RolesIndex({ roles, can }: Props) {
    const handleDelete = (role: Role) => {
        if (confirm(`Are you sure you want to delete the role "${role.display_name}"?`)) {
            router.delete(route('admin.roles.destroy', role.id));
        }
    };

    return (
        <AppLayout>
            <Head title="Manage Roles" />
            
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Manage Roles</h1>
                        <p className="text-muted-foreground">
                            Create and manage roles for different dashboards
                        </p>
                    </div>
                    {can.create && (
                        <Button asChild className="self-start sm:self-auto">
                            <Link href={route('admin.roles.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Role
                            </Link>
                        </Button>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Administrative Roles</CardTitle>
                        <CardDescription>
                            Only administrative roles are shown here. System roles (staff, project_owner) are managed separately.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {roles.length === 0 ? (
                            <div className="text-center py-8">
                                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No admin roles found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Create your first administrative role to get started.
                                </p>
                                {can.create && (
                                    <Button asChild>
                                        <Link href={route('admin.roles.create')}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Role
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Dashboard Type</TableHead>
                                        <TableHead>Permissions</TableHead>
                                        <TableHead className="w-[100px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{role.display_name}</div>
                                                    <div className="text-sm text-muted-foreground">{role.name}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <p className="truncate">{role.description}</p>
                                            </TableCell>
                                            <TableCell>
                                                {role.dashboard_type ? (
                                                    <Badge variant="secondary" className="capitalize">
                                                        {role.dashboard_type.display_name}
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline">Unknown</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {role.permissions.length} permissions
                                                </Badge>
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
                                                            <Link href={route('admin.roles.show', role.id)}>
                                                                View Details
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {can.update && (
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('admin.roles.edit', role.id)}>
                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {can.delete && role.name !== 'admin' && (
                                                            <DropdownMenuItem 
                                                                onClick={() => handleDelete(role)}
                                                                className="text-destructive"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        )}
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
