"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MoviesColumnsProps {
  onEditMovie?: (movie: unknown) => void;
}

export const getMoviesColumns = ({
  onEditMovie,
}: MoviesColumnsProps = {}): ColumnDef<unknown>[] => [
  {
    accessorKey: "title",
    header: "Title",
    enableSorting: true,
  },
  {
    accessorKey: "director",
    header: "Director",
    enableSorting: true,
  },
  {
    accessorKey: "pricing",
    header: "Pricing",
    enableSorting: true,
    cell: ({ getValue }) => {
      const pricing = getValue<string>();
      return <Badge className={pricing === "PREMIUM" ? "bg-yellow-500/20 text-yellow-300" : "bg-green-500/20 text-green-300"}>{pricing}</Badge>;
    },
  },
  {
    accessorKey: "releaseYear",
    header: "Release Year",
    enableSorting: true,
    cell: ({ getValue }) => new Date(getValue<string>()).getFullYear(),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    enableSorting: true,
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const movie = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10 rounded-md flex items-center justify-center">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-sm border-red-500/20">
            <DropdownMenuItem
              className="text-red-400 hover:bg-red-500/10"
              onClick={() => onEditMovie?.(movie)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];