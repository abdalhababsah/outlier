import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';

interface Props {
  status: number;
  message?: string;
}

export default function ServiceUnavailable({ status, message = 'Sorry, we are doing some maintenance. Please check back soon.' }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Head title="503: Service Unavailable" />
      
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="bg-muted/50 p-4 rounded-full">
            <Clock className="h-12 w-12 text-amber-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Maintenance Mode</h1>
          <p className="text-xl text-muted-foreground">Error {status}</p>
          <p className="text-muted-foreground">{message}</p>
        </div>
        
        <div className="flex justify-center">
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  );
}
