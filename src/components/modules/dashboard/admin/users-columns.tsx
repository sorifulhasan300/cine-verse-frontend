"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserStatus, UserType } from "@/types/user.types";
import { Badge } from "@/components/ui/badge";
import { UserActionsCell } from "../table-cell/UserActionSell";

interface UsersColumnsProps {
  onUserAction: () => void;
}

export const getUsersColumns = ({
  onUserAction,
}: UsersColumnsProps): ColumnDef<UserType>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => {
      const role = getValue<string>();
      return <Badge className="bg-red-500/20 text-red-300">{role}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<UserStatus>();
      return (
        <Badge
          className={`${
            status === UserStatus.ACTIVE
              ? "bg-green-500/20 text-green-300"
              : status === UserStatus.INACTIVE
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-300"
          }`}
        >
          {status || UserStatus.ACTIVE}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <UserActionsCell user={row.original} onUserAction={onUserAction} />
    ),
  },
];
