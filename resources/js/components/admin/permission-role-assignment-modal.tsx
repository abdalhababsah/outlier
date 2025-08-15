import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useForm } from '@inertiajs/react';
import { Loader2, Check, ChevronsUpDown } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface Role {
  id: number;
  name: string;
  display_name: string;
  dashboard_type_id: number;
  dashboard_type: {
    id: number;
    name: string;
    display_name: string;
  };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  permissionId: number;
}

export default function PermissionRoleAssignmentModal({ isOpen, onClose, permissionId }: Props) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    role_id: '',
  });

  useEffect(() => {
    if (isOpen) {
      loadRoles();
    } else {
      reset();
      setOpen(false);
    }
  }, [isOpen]);

  const loadRoles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(route('admin.permissions.assignable-roles', permissionId));
      setRoles(response.data || []);
    } catch (error) {
      console.error('Failed to load roles', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.permissions.assign-role', permissionId), {
      onSuccess: () => {
        onClose();
      },
    });
  };

  // Group roles by dashboard type for better organization
  const rolesByType = roles.reduce((acc, role) => {
    if (!role.dashboard_type) {
      // Handle roles without a dashboard type
      if (!acc['unknown']) {
        acc['unknown'] = {
          displayName: 'Unknown',
          roles: []
        };
      }
      acc['unknown'].roles.push(role);
      return acc;
    }
    
    const type = role.dashboard_type.name;
    const displayName = role.dashboard_type.display_name;
    
    if (!acc[type]) {
      acc[type] = {
        displayName,
        roles: []
      };
    }
    acc[type].roles.push(role);
    return acc;
  }, {} as Record<string, { displayName: string, roles: Role[] }>);

  // Find the selected role for display
  const selectedRole = roles.find(role => role.id.toString() === data.role_id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95%]">
        <DialogHeader>
          <DialogTitle>Assign Permission to Role</DialogTitle>
          <DialogDescription>
            Select a role to assign this permission to.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="role_id">Select Role</Label>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-full min-w-[240px] justify-between",
                        errors.role_id ? 'border-destructive' : '',
                        !data.role_id && "text-muted-foreground"
                      )}
                    >
                      {selectedRole ? (
                        <div className="flex flex-col items-start">
                          <span>{selectedRole.display_name}</span>
                          <span className="text-xs text-muted-foreground">{selectedRole.name}</span>
                        </div>
                      ) : (
                        "Select a role"
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[240px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search roles..." className="h-9" />
                      <CommandEmpty>No roles found.</CommandEmpty>
                      <div className="max-h-64 overflow-auto">
                        {Object.entries(rolesByType).map(([type, { displayName, roles }], index) => (
                          <div key={type}>
                            {index > 0 && <CommandSeparator />}
                            <CommandGroup heading={displayName}>
                              {roles.map((role) => (
                                <CommandItem
                                  key={role.id}
                                  value={`${role.display_name} ${role.name}`}
                                  onSelect={() => {
                                    setData('role_id', role.id.toString());
                                    setOpen(false);
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <span>{role.display_name}</span>
                                    <span className="text-xs text-muted-foreground">{role.name}</span>
                                  </div>
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      data.role_id === role.id.toString() ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </div>
                        ))}
                      </div>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
              {errors.role_id && (
                <p className="text-sm text-destructive">{errors.role_id}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={processing || !data.role_id}>
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                'Assign Role'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}