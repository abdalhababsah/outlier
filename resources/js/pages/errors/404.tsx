import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft } from 'lucide-react';

interface Props {
  status: number;
  message?: string;
}

export default function NotFound({ status, message = 'Sorry, the page you are looking for could not be found.' }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Head title="404: Not Found" />
      
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="bg-muted/50 p-4 rounded-full">
            <Search className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
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
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
