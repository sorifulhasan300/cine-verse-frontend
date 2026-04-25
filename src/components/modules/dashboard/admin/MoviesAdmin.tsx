"use client";

import { DataTable } from "@/components/ui/data-table";
import { getMoviesColumns } from "./movies-columns";
import { useQuery } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateMovieDialog } from "./CreateMovieDialog";
import { SortingState, OnChangeFn } from "@tanstack/react-table";
import {
  adminMovieService,
  MovieFormData,
} from "@/services/admin.movie.service";

export function MoviesAdmin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [debouncedSearchInput] = useDebounce(searchInput, 300);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingMovie, setEditingMovie] = useState<
    (MovieFormData & { id: string }) | undefined
  >(undefined);
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((old) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(old)
          : updaterOrValue;
      return newSorting;
    });
  };

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchTerm = searchParams.get("searchTerm") || "";

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchInput) {
      params.set("searchTerm", debouncedSearchInput);
    } else {
      params.delete("searchTerm");
    }
    params.set("page", "1"); // Reset to first page on search
    router.replace(`?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInput, router]);

  const sort = sorting.length > 0 ? sorting[0].id : undefined;
  const sortOrder =
    sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "asc";

  const {
    data: moviesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-movies", page, limit, searchTerm, sort, sortOrder],
    queryFn: async () => {
      console.log("Fetching movies...");
      const response = await adminMovieService.getMoviesAdmin({
        page,
        limit,
        searchTerm: searchTerm || undefined,
        sort,
        sortOrder,
      });
      return response;
    },
  });

  const movies = moviesData?.data || [];
  console.log(movies, "movies data in MoviesAdmin");
  const pagination = moviesData?.pagination;

  const handleMovieCreated = () => {
    refetch();
    setShowCreateDialog(false);
    setShowEditDialog(false);
  };

  const handleCreateMovie = () => {
    setShowCreateDialog(true);
  };

  const handleEditMovie = (movie: unknown) => {
    setEditingMovie(movie as MovieFormData & { id: string });
    setShowEditDialog(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-400">Manage Movies</h2>
          <Button
            onClick={handleCreateMovie}
            className="bg-red-500 hover:bg-red-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Movie
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-400">Manage Movies</h2>
          <Button
            onClick={handleCreateMovie}
            className="bg-red-500 hover:bg-red-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Movie
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">Failed to load movies</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-400">Manage Movies</h2>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search movies..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="max-w-sm"
          />
          <Button
            onClick={handleCreateMovie}
            className="bg-red-500 hover:bg-red-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Movie
          </Button>
        </div>
      </div>
      <DataTable
        columns={getMoviesColumns({ onEditMovie: handleEditMovie })}
        data={movies}
        pagination={pagination}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        onPageChange={(newPage) => {
          const params = new URLSearchParams(searchParams);
          params.set("page", newPage.toString());
          router.replace(`?${params.toString()}`);
        }}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          const params = new URLSearchParams(searchParams);
          params.set("page", "1");
          router.replace(`?${params.toString()}`);
        }}
      />
      <CreateMovieDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onMovieCreated={handleMovieCreated}
      />
      <CreateMovieDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        editingMovie={editingMovie}
        onMovieCreated={handleMovieCreated}
      />
    </div>
  );
}
