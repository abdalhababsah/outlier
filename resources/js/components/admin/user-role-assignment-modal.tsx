import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useForm } from '@inertiajs/react';
import { Search, Loader2, Check, ChevronsUpDown } from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roleId: number;
}

export default function UserRoleAssignmentModal({ isOpen, onClose, roleId }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    user_id: '',
  });

  useEffect(() => {
    if (isOpen) {
      loadUsers();
    } else {
      reset();
      setOpen(false);
    }
  }, [isOpen]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(route('admin.assignable-users'));
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to load users', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.roles.assign', roleId), {
      onSuccess: () => {
        onClose();
      },
    });
  };

  // Find the selected user for display
  const selectedUser = users.find(user => user.id.toString() === data.user_id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95%]">
        <DialogHeader>
          <DialogTitle>Assign User to Role</DialogTitle>
          <DialogDescription>
            Select a user to assign to this role.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="user_id">Select User</Label>
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
                        errors.user_id ? 'border-destructive' : '',
                        !data.user_id && "text-muted-foreground"
                      )}
                    >
                      {selectedUser ? (
                        <div className="flex flex-col items-start">
                          <span>{selectedUser.name}</span>
                          <span className="text-xs text-muted-foreground">{selectedUser.email}</span>
                        </div>
                      ) : (
                        "Select a user"
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[240px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search users..." className="h-9" />
                      <CommandEmpty>No users found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {users.map((user) => (
                          <CommandItem
                            key={user.id}
                            value={`${user.name} ${user.email}`}
                            onSelect={() => {
                              setData('user_id', user.id.toString());
                              setOpen(false);
                            }}
                          >
                            <div className="flex flex-col">
                              <span>{user.name}</span>
                              <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                data.user_id === user.id.toString() ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
              {errors.user_id && (
                <p className="text-sm text-destructive">{errors.user_id}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={processing || !data.user_id}>
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                'Assign User'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}