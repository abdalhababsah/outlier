import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
    };
    tasks: any[]; // Replace with proper task type
}

export default function StaffDashboard({ user, tasks }: Props) {
    return (
        <AppLayout>
            <Head title="Staff Dashboard" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Staff Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {user.name}
                        </p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                        Staff Member
                    </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending Tasks
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">
                                Tasks to complete
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Completed
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">
                                Tasks completed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Overdue
                            </CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">
                                Overdue tasks
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Tasks</CardTitle>
                        <CardDescription>
                            Manage your assigned tasks and track progress.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {tasks.length === 0 ? (
                            <div className="text-center py-8">
                                <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No tasks assigned</h3>
                                <p className="text-muted-foreground mb-4">
                                    You're all caught up! Check back later for new assignments.
                                </p>
                                <Button variant="outline">
                                    <Clock className="mr-2 h-4 w-4" />
                                    View Schedule
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {tasks.map((task, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg">{task.title}</CardTitle>
                                                <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                                                    {task.status}
                                                </Badge>
                                            </div>
                                            <CardDescription>{task.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common actions you can perform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button className="w-full justify-start" variant="outline">
                                <Clock className="mr-2 h-4 w-4" />
                                Clock In/Out
                            </Button>
                            <Button className="w-full justify-start" variant="outline">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Submit Report
                            </Button>
                            <Button className="w-full justify-start" variant="outline">
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Request Help
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Staff Resources</CardTitle>
                            <CardDescription>
                                Resources and tools available to you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    • View assigned tasks and deadlines
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    • Submit time tracking and reports
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    • Access training materials
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    • Communicate with team members
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
