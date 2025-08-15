import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string;
    dashboard_type_id?: number;
}

interface DashboardType {
    id: number;
    name: string;
    display_name: string;
    description?: string;
}

interface PermissionsByType {
    [key: string]: Permission[];
}

interface Props {
    permissionsByType: PermissionsByType;
    dashboardTypes: DashboardType[];
}

export default function CreateRole({ permissionsByType, dashboardTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        display_name: '',
        description: '',
        dashboard_type_id: '',
        permissions: [] as number[]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.roles.store'));
    };

    const handlePermissionChange = (permissionId: number, checked: boolean) => {
        if (checked) {
            setData('permissions', [...data.permissions, permissionId]);
        } else {
            setData('permissions', data.permissions.filter(id => id !== permissionId));
        }
    };

    const handleDashboardTypeChange = (dashboardTypeId: string) => {
        setData({
            ...data,
            dashboard_type_id: dashboardTypeId,
            permissions: [] // Clear permissions when dashboard type changes
        });
    };
    
    // Find the current dashboard type name based on selected ID
    const selectedDashboardTypeName = dashboardTypes?.find(
        type => type.id.toString() === data.dashboard_type_id
    )?.name;

    return (
        <AppLayout>
            <Head title="Create Role" />
            
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Role</h1>
                        <p className="text-muted-foreground">
                            Create a new role and assign permissions
                        </p>
                    </div>
                    <Button variant="outline" asChild className="self-start sm:self-auto">
                        <Link href={route('admin.roles.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Roles
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Role Information</CardTitle>
                        <CardDescription>
                            Enter the basic information for the new administrative role.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Role Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., content_manager"
                                        className={errors.name ? 'border-destructive' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Use lowercase letters and underscores only
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="display_name">Display Name *</Label>
                                    <Input
                                        id="display_name"
                                        value={data.display_name}
                                        onChange={(e) => setData('display_name', e.target.value)}
                                        placeholder="e.g., Content Manager"
                                        className={errors.display_name ? 'border-destructive' : ''}
                                    />
                                    {errors.display_name && (
                                        <p className="text-sm text-destructive">{errors.display_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dashboard_type_id">Dashboard Type *</Label>
                                    <Select value={data.dashboard_type_id} onValueChange={handleDashboardTypeChange}>
                                        <SelectTrigger className={errors.dashboard_type_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select dashboard type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dashboardTypes.map(type => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.display_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.dashboard_type_id && (
                                        <p className="text-sm text-destructive">{errors.dashboard_type_id}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Determines which dashboard users will access
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe what this role is responsible for..."
                                    className={errors.description ? 'border-destructive' : ''}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <Label>Permissions</Label>
                                <p className="text-sm text-muted-foreground">
                                    Only permissions matching the selected dashboard type will be available for assignment.
                                </p>
                                
                                {selectedDashboardTypeName && permissionsByType[selectedDashboardTypeName] && (
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium capitalize">
                                            {dashboardTypes.find(type => type.id.toString() === data.dashboard_type_id)?.display_name} Dashboard Permissions
                                        </h4>
                                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                            {permissionsByType[selectedDashboardTypeName].map((permission) => (
                                                <div key={permission.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`permission-${permission.id}`}
                                                        checked={data.permissions.includes(permission.id)}
                                                        onCheckedChange={(checked) => 
                                                            handlePermissionChange(permission.id, checked as boolean)
                                                        }
                                                    />
                                                    <div className="grid gap-1.5 leading-none">
                                                        <Label 
                                                            htmlFor={`permission-${permission.id}`}
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {permission.display_name}
                                                        </Label>
                                                        <p className="text-xs text-muted-foreground">
                                                            {permission.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {!data.dashboard_type_id && (
                                    <p className="text-sm text-muted-foreground">
                                        Please select a dashboard type to see available permissions.
                                    </p>
                                )}
                                
                                {errors.permissions && (
                                    <p className="text-sm text-destructive">{errors.permissions}</p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Role'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route('admin.roles.index')}>
                                        Cancel
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
