"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types/category.types";

interface CategoryColumnsProps {
  onEditCategory?: (category: Category) => void;
  onDeleteCategory?: (category: Category) => void;
}

export const getCategoryColumns = ({
  onEditCategory,
  onDeleteCategory,
}: CategoryColumnsProps = {}): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    enableSorting: true,
    cell: ({ getValue }) => {
      const description = getValue<string>();
      return description || <span className="text-gray-500">No description</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    enableSorting: true,
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    enableSorting: true,
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10 rounded-md flex items-center justify-center">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-sm border-red-500/20">
            <DropdownMenuItem
              className="text-red-400 hover:bg-red-500/10"
              onClick={() => onEditCategory?.(category)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-400 hover:bg-red-500/10"
              onClick={() => onDeleteCategory?.(category)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];