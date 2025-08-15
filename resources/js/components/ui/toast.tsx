import React from 'react';
import { X } from 'lucide-react';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = 'default',
  onClose,
}) => {
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    destructive: 'bg-red-600 text-white',
    success: 'bg-green-600 text-white',
  };

  return (
    <div
      className={`rounded-md shadow-lg p-4 mb-4 relative ${variantClasses[variant]}`}
      role="alert"
    >
      <div className="flex justify-between items-start">
        <div>
          {title && <h4 className="font-medium text-sm">{title}</h4>}
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-1 rounded-full hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
