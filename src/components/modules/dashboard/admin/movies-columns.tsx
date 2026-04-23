import { ColumnDef } from "@tanstack/react-table"
import { Movie } from "@/types/movie.types"
import { Badge } from "@/components/ui/badge" // assuming shadcn badge
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" // add dropdown if needed

// First, add badge and dropdown if not present
// pnpm dlx shadcn@latest add badge dropdown-menu

export const moviesColumns: ColumnDef<Movie>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ getValue }) => {
      const genres = getValue<string[]>()
      return (
        <div className="flex flex-wrap gap-1">
          {genres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="secondary" className="bg-red-500/20 text-red-300">
              {genre}
            </Badge>
          ))}
          {genres.length > 2 && <span className="text-gray-400">+{genres.length - 2}</span>}
        </div>
      )
    },
  },
  {
    accessorKey: "releaseDate",
    header: "Release Date",
    cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ getValue }) => `${getValue<number>()}/10`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<string>()
      return (
        <Badge className={`${
          status === "AVAILABLE" ? "bg-green-500/20 text-green-300" :
          status === "COMING_SOON" ? "bg-yellow-500/20 text-yellow-300" :
          "bg-gray-500/20 text-gray-300"
        }`}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const movie = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-sm border-red-500/20">
            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]