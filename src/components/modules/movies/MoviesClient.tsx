"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useQuery,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { MovieCard } from "@/components/ui/movie-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/category.types";
import { movieService } from "@/services/movie.service";

interface Pagination {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  limit: number;
}

interface MoviesClientProps {
  dehydratedState: DehydratedState;
}

export function MoviesClient({ dehydratedState }: MoviesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms debounce

  // Get values from URL params
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;
  const sort = searchParams.get("sort") || "title";
  const sortOrder = (searchParams.get("order") as "asc" | "desc") || "asc";
  const category = searchParams.get("category") || "";

  // Query key includes debounced search term
  const queryKey = [
    "movies",
    page,
    limit,
    debouncedSearchTerm,
    sort,
    sortOrder,
    category,
  ];

  const {
    data: moviesData,
    isFetching,
    error,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = {
        page,
        limit,
        searchTerm: debouncedSearchTerm || undefined,
        sort,
        sortOrder,
        ...(category && { category }),
      };
      const result = await movieService.getMovies(params);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch movies");
      }
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: false,
  });

  const movies = moviesData?.data || [];
  const pagination = (moviesData?.pagination || {}) as Pagination;

  const fetchCategories = useCallback(async () => {
    const { data } = await categoryService.getCategories();
    setCategories(data || []);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, [fetchCategories]);

  // Update URL when debounced search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      params.set("search", debouncedSearchTerm);
    } else {
      params.delete("search");
    }
    // Reset page to 1 when search changes
    if (debouncedSearchTerm !== (searchParams.get("search") || "")) {
      params.set("page", "1");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearchTerm, router]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset page to 1 for filter changes (except for search, which is handled above)
    if (
      updates.category !== undefined ||
      updates.sort !== undefined ||
      updates.order !== undefined
    ) {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: string | null) => {
    updateSearchParams({ category: value || "" });
  };

  const handleSortChange = (value: string | null) => {
    updateSearchParams({ sort: value || "title" });
  };

  const handleSortOrderChange = (value: string | null) => {
    updateSearchParams({ order: value === "desc" ? "desc" : "asc" });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage.toString() });
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex-1"
            />
            <Select value={category || ""} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 items-center">
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="releaseYear">Year</SelectItem>
                <SelectItem value="createdAt">Date Added</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={handleSortOrderChange}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Asc</SelectItem>
                <SelectItem value="desc">Desc</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() =>
                updateSearchParams({
                  search: "",
                  category: "",
                  sort: "title",
                  order: "asc",
                  page: "1",
                })
              }
              className="border-slate-600 hover:bg-slate-400 text-black cursor-pointer"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Movies Grid with loading overlay */}
        <div className="relative">
          {isFetching && (
            <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center z-10 rounded-lg">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
          )}

          {error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{(error as Error).message}</p>
            </div>
          ) : movies.length === 0 &&
            (debouncedSearchTerm ||
              category ||
              sort !== "title" ||
              sortOrder !== "asc") ? (
            <div className="text-center py-12">
              <p className="text-slate-400">
                No movies found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || isFetching}
                    className="border-slate-600 hover:bg-slate-800 text-slate-300 disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <span className="text-slate-400 self-center">
                    Page {page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pagination.totalPages || isFetching}
                    className="border-slate-600 hover:bg-slate-800 text-slate-300 disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </HydrationBoundary>
  );
}
