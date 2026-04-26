import {
  MoreHorizontal,
  UserCheck,
  UserX,
  Shield,
  ShieldOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userManagementService } from "@/services/user-management.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserType, UserStatus } from "@/types/user.types";

interface UserActionsCellProps {
  user: UserType;
  onUserAction: () => void;
}
export function UserActionsCell({ user, onUserAction }: UserActionsCellProps) {
  const queryClient = useQueryClient();

  const blockMutation = useMutation({
    mutationFn: (userId: string) => userManagementService.blockUser(userId),
    onSuccess: () => {
      toast.success("User blocked successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onUserAction();
    },
    onError: (error: { error?: string }) => {
      toast.error(error?.error || "Failed to block user");
    },
  });

  const unblockMutation = useMutation({
    mutationFn: (userId: string) => userManagementService.unblockUser(userId),
    onSuccess: () => {
      toast.success("User unblocked successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onUserAction();
    },
    onError: (error: { error?: string }) => {
      toast.error(error?.error || "Failed to unblock user");
    },
  });

  const activateMutation = useMutation({
    mutationFn: (userId: string) => userManagementService.activateUser(userId),
    onSuccess: () => {
      toast.success("User activated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onUserAction();
    },
    onError: (error: { error?: string }) => {
      toast.error(error?.error || "Failed to activate user");
    },
  });

  const deactivateMutation = useMutation({
    mutationFn: (userId: string) =>
      userManagementService.deactivateUser(userId),
    onSuccess: () => {
      toast.success("User deactivated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onUserAction();
    },
    onError: (error: { error?: string }) => {
      toast.error(error?.error || "Failed to deactivate user");
    },
  });

  const handleBlock = () => blockMutation.mutate(user.id);
  const handleUnblock = () => unblockMutation.mutate(user.id);
  const handleActivate = () => activateMutation.mutate(user.id);
  const handleDeactivate = () => deactivateMutation.mutate(user.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10 rounded-md flex items-center justify-center">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-black/80 backdrop-blur-sm border-red-500/20"
      >
        {user.status === UserStatus.ACTIVE && (
          <DropdownMenuItem
            className="text-yellow-400 hover:bg-yellow-500/10"
            onClick={handleDeactivate}
            disabled={deactivateMutation.isPending}
          >
            <UserX className="mr-2 h-4 w-4" />
            Deactivate
          </DropdownMenuItem>
        )}
        {user.status === UserStatus.INACTIVE && (
          <DropdownMenuItem
            className="text-green-400 hover:bg-green-500/10"
            onClick={handleActivate}
            disabled={activateMutation.isPending}
          >
            <UserCheck className="mr-2 h-4 w-4" />
            Activate
          </DropdownMenuItem>
        )}
        {user.status !== UserStatus.BLOCKED && (
          <DropdownMenuItem
            className="text-red-400 hover:bg-red-500/10"
            onClick={handleBlock}
            disabled={blockMutation.isPending}
          >
            <ShieldOff className="mr-2 h-4 w-4" />
            Block
          </DropdownMenuItem>
        )}
        {user.status === UserStatus.BLOCKED && (
          <DropdownMenuItem
            className="text-blue-400 hover:bg-blue-500/10"
            onClick={handleUnblock}
            disabled={unblockMutation.isPending}
          >
            <Shield className="mr-2 h-4 w-4" />
            Unblock
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
