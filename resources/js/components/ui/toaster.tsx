import React from 'react';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map(({ id, title, description, variant }) => (
        <Toast
          key={id}
          id={id}
          title={title}
          description={description}
          variant={variant}
          onClose={() => dismiss(id)}
        />
      ))}
    </div>
  );
}
