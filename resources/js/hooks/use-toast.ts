import { useState, useEffect, useCallback } from 'react';
import { ToastProps } from '@/components/ui/toast';

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

let count = 0;
function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

// Create a global state that can be accessed from anywhere
let toasts: Toast[] = [];
const listeners: Array<(toasts: Toast[]) => void> = [];

function addToast(toast: Omit<Toast, 'id'>) {
  const id = generateId();
  const newToast = { ...toast, id };
  
  toasts = [newToast, ...toasts].slice(0, TOAST_LIMIT);
  notifyListeners();
  
  // Auto-dismiss after duration
  setTimeout(() => {
    dismissToast(id);
  }, toast.duration || TOAST_REMOVE_DELAY);
  
  return id;
}

function dismissToast(id?: string) {
  if (id) {
    toasts = toasts.filter(t => t.id !== id);
  } else {
    toasts = [];
  }
  notifyListeners();
}

function notifyListeners() {
  listeners.forEach(listener => listener(toasts));
}

export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts);
  
  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);
  
  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    return addToast(props);
  }, []);
  
  const dismiss = useCallback((id?: string) => {
    dismissToast(id);
  }, []);
  
  return {
    toasts: state,
    toast,
    dismiss
  };
}
