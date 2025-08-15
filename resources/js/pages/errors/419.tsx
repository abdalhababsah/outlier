import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ShieldX, ArrowLeft } from 'lucide-react';

interface Props {
  status: number;
  message?: string;
}

export default function PageExpired({ status, message = 'Sorry, your session has expired. Please refresh and try again.' }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Head title="419: Page Expired" />
      
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="bg-muted/50 p-4 rounded-full">
            <ShieldX className="h-12 w-12 text-amber-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Page Expired</h1>
          <p className="text-xl text-muted-foreground">Error {status}</p>
          <p className="text-muted-foreground">{message}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    </div>
  );
}
