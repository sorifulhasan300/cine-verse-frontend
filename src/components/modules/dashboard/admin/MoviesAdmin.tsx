import { DataTable } from "@/components/ui/data-table"
import { moviesColumns } from "./movies-columns"

// Mock data for demonstration - replace with actual server action
const mockMovies = [
  {
    id: "1",
    title: "Inception",
    genre: ["Sci-Fi", "Thriller"],
    releaseDate: "2010-07-16",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard"],
    description: "A thief who steals corporate secrets...",
    posterUrl: "/posters/inception.jpg",
    duration: 148,
    rating: 8.8,
    status: "AVAILABLE",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  // Add more mock data as needed
]

export function MoviesAdmin() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-400">Manage Movies</h2>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
          Add Movie
        </button>
      </div>
      <DataTable columns={moviesColumns} data={mockMovies} />
    </div>
  )
}