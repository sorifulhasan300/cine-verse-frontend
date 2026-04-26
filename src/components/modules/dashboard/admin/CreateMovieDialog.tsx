"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useQuery } from "@tanstack/react-query";
import { movieValidationSchema } from "@/zod/movie.validation";
import {
  adminMovieService,
  MovieFormData,
} from "@/services/admin.movie.service";
import { categoryService } from "@/services/category.service";

interface CreateMovieDialogProps {
  onMovieCreated?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  editingMovie?: MovieFormData & { id: string };
}

// Helper function to format date for display
const formatDateForDisplay = (isoString: string): string => {
  const date = new Date(isoString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? hour : 12; // 12 for midnight/noon

  return `${month}/${day}/${year} ${hour}:${minute} ${ampm}`;
};

// Simplified version without dialog for now - using a form that appears on click
export function CreateMovieDialog({
  onMovieCreated,
  open,
  onOpenChange,
  editingMovie,
}: CreateMovieDialogProps) {
  const isEditing = !!editingMovie;
  const [internalShowForm, setInternalShowForm] = useState(false);
  const showForm = open !== undefined ? open : internalShowForm;
  const setShowForm = onOpenChange || setInternalShowForm;

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryService.getCategories();
      // Handle different API response structures
      const categories = response.data || response.data || [];
      return Array.isArray(categories) ? categories : [];
    },
  });
  const categories = categoriesData || [];

  const form = useForm<MovieFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(movieValidationSchema as any),
    mode: "onSubmit",
    defaultValues: {
      title: editingMovie?.title || "",
      description: editingMovie?.description || "",
      releaseYear: editingMovie?.releaseYear
        ? formatDateForDisplay(editingMovie.releaseYear)
        : "",
      director: editingMovie?.director || "",
      cast: editingMovie?.cast || "",
      videoUrl: editingMovie?.videoUrl || "",
      thumbnailUrl: editingMovie?.thumbnailUrl || "",
      duration: editingMovie?.duration || 0,
      pricing: editingMovie?.pricing || "FREE",
      categoryIds: editingMovie?.categoryIds || [],
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editingMovie) {
      form.reset({
        title: editingMovie.title || "",
        description: editingMovie.description || "",
        releaseYear: editingMovie.releaseYear
          ? formatDateForDisplay(editingMovie.releaseYear)
          : "",
        director: editingMovie.director || "",
        cast: editingMovie.cast || "",
        videoUrl: editingMovie.videoUrl || "",
        thumbnailUrl: editingMovie.thumbnailUrl || "",
        duration: editingMovie.duration || 0,
        pricing: editingMovie.pricing || "FREE",
        categoryIds: editingMovie.categoryIds || [],
      });
    } else {
      form.reset();
    }
  }, [editingMovie]);

  const createMutation = useMutation({
    mutationFn: (data: MovieFormData) => {
      if (isEditing && editingMovie?.id) {
        return adminMovieService.updateMovie(editingMovie.id, data);
      }
      return adminMovieService.createMovie(data);
    },
    onSuccess: () => {
      toast.success(
        isEditing ? "Movie updated successfully" : "Movie created successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["admin-movies"] });
      form.reset();
      onOpenChange?.(false);
      onMovieCreated?.();
    },
    onError: (error: unknown) => {
      const err = error as { error?: string };
      toast.error(
        err.error || `Failed to ${isEditing ? "update" : "create"} movie`,
      );
    },
  });

  const onSubmit = (data: MovieFormData) => {
    createMutation.mutate(data);
  };

  if (!showForm) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black/90 border border-red-500/20 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-red-400 text-xl font-bold mb-4">
          {isEditing ? "Edit Movie" : "Create New Movie"}
        </h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input placeholder="Movie title" {...form.register("title")} />
            {form.formState.errors.title && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              placeholder="Movie description"
              {...form.register("description")}
              className="w-full px-3 py-2 bg-black/20 border border-red-500/20 rounded-md text-white"
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Release Year
            </label>
            <Input
              type="text"
              placeholder="MM/DD/YYYY HH:MM AM/PM (e.g., 07/16/2010 12:00 AM)"
              {...form.register("releaseYear")}
            />
            {form.formState.errors.releaseYear && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.releaseYear.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Director</label>
            <Input placeholder="Director name" {...form.register("director")} />
            {form.formState.errors.director && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.director.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Cast (Optional)
            </label>
            <Input placeholder="Cast members" {...form.register("cast")} />
            {form.formState.errors.cast && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.cast.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Video URL</label>
            <Input placeholder="Video URL" {...form.register("videoUrl")} />
            {form.formState.errors.videoUrl && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.videoUrl.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Thumbnail URL
            </label>
            <Input
              placeholder="Thumbnail URL"
              {...form.register("thumbnailUrl")}
            />
            {form.formState.errors.thumbnailUrl && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.thumbnailUrl.message}
              </p>
            )}
           </div>
           <div>
             <label className="block text-sm font-medium mb-1">
               Duration (minutes)
             </label>
             <Input
               type="number"
               placeholder="Duration in minutes"
               {...form.register("duration", { valueAsNumber: true })}
             />
             {form.formState.errors.duration && (
               <p className="text-red-400 text-sm">
                 {form.formState.errors.duration.message}
               </p>
             )}
           </div>
           <div>
             <label className="block text-sm font-medium mb-1">Pricing</label>
            <select
              {...form.register("pricing")}
              className="w-full px-3 py-2 bg-black/20 border border-red-500/20 rounded-md text-white"
            >
              <option value="FREE">FREE</option>
              <option value="PREMIUM">PREMIUM</option>
            </select>
            {form.formState.errors.pricing && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.pricing.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Categories</label>
            <select
              multiple
              {...form.register("categoryIds")}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );
                form.setValue("categoryIds", selected);
              }}
              className="w-full px-3 py-2 bg-black/20 border border-red-500/20 rounded-md text-white min-h-24"
            >
              {categories.map((category: unknown) => {
                const cat = category as { id: string; name: string };
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            {form.formState.errors.categoryIds && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.categoryIds.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Movie"
                  : "Create Movie"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
