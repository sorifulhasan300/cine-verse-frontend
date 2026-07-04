/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { categoryService } from "@/services/category.service";
import { adminMovieService } from "@/services/admin.movie.service";
import { MovieFormData, PricingType } from "@/types/createMovie.types";
import { Category } from "@/types/category.types";

interface CreateMovieDialogProps {
  onMovieCreated?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  editingMovie?: MovieFormData & { id: string };
}

// ---------------------------------------------------------------------------
// Zod schema — ekhane shob field er validation rule
// ---------------------------------------------------------------------------
const movieSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(150),
  description: z.string().min(10, "Description must be at least 10 characters"),
  releaseYear: z.string().min(1, "Please select a release date"),
  director: z.string().min(2, "Please enter director name"),
  cast: z.string().min(2, "Please enter cast member(s)"),
  videoUrl: z.string().url("Please enter a valid video URL"),
  thumbnailUrl: z.string().url("Please enter a valid thumbnail URL"),
  pricing: z.enum(["FREE", "PREMIUM"] as const, {
    message: "Please select pricing",
  }),
  categoryIds: z.array(z.string()),
});

const defaultFormValues: MovieFormData = {
  title: "",
  description: "",
  releaseYear: "",
  director: "",
  cast: "",
  videoUrl: "",
  thumbnailUrl: "",
  pricing: "FREE",
  categoryIds: [],
};

function toFormValues(movie?: MovieFormData & { id: string }): MovieFormData {
  if (!movie) return defaultFormValues;
  return {
    title: movie.title,
    description: movie.description,
    releaseYear: movie.releaseYear,
    director: movie.director,
    cast: movie.cast,
    videoUrl: movie.videoUrl,
    thumbnailUrl: movie.thumbnailUrl,
    pricing: movie.pricing,
    categoryIds: movie.categoryIds || [],
  };
}

// ---------------------------------------------------------------------------
// Small helper — field er niche error message dekhabe
// ---------------------------------------------------------------------------
function FieldError({ field }: { field: any }) {
  const error = field.state.meta.errors?.[0];
  const isTouched = field.state.meta.isTouched;
  if (!error || !isTouched) return null;
  return <p className="text-sm text-red-400 mt-1">{error}</p>;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function CreateMovieDialog({
  onMovieCreated,
  open,
  onOpenChange,
  editingMovie,
}: CreateMovieDialogProps) {
  const isEditing = Boolean(editingMovie?.id);

  // Category list fetch
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await categoryService.getCategories();
      const categories = response?.data ?? [];
      return Array.isArray(categories) ? categories : [];
    },
    enabled: open, // fetch when dialog opens
  });

  const categories: Category[] = categoriesData || [];

  const form = useForm({
    defaultValues: toFormValues(editingMovie),
    onSubmit: async ({ value }) => {
      // Custom validation: require at least one category when creating
      if (
        !isEditing &&
        (!value.categoryIds || value.categoryIds.length === 0)
      ) {
        toast.error("Please select at least one category");
        return;
      }

      const result = movieSchema.safeParse(value);
      if (!result.success) {
        toast.error("Error: Form validation failed. Please check the fields.");
        return;
      }

      try {
        if (isEditing && editingMovie?.id) {
          console.log(
            "Updating movie with ID:",
            editingMovie.id,
            "Data:",
            result.data,
          );
          const { error } = await adminMovieService.updateMovie(
            editingMovie.id,
            result.data,
          );
          if (error) throw new Error(error);
          toast.success("Movie successfully updated");
        } else {
          const { error } = await adminMovieService.createMovie(result.data);
          if (error) throw new Error(error);
          toast.success("Movie successfully created");
        }
        onMovieCreated?.();
        onOpenChange?.(false);
        form.reset();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    },
  });

  // Dialog notun kore open hole ba editingMovie change hole form reset
  useEffect(() => {
    if (open) {
      form.reset(toFormValues(editingMovie));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editingMovie?.id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border max-w-6xl border-red-500/20 rounded-lg  w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-red-400 text-xl font-bold">
            {isEditing ? "Edit Movie" : "Create New Movie"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5 mt-2"
        >
          {/* Title */}
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) =>
                movieSchema.shape.title.safeParse(value).success
                  ? undefined
                  : movieSchema.shape.title.safeParse(value).error?.issues[0]
                      ?.message,
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name} className="text-gray-200">
                  Title
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Inception"
                  className="bg-black/60 border-red-500/20 text-white placeholder:text-gray-500 focus-visible:ring-red-500"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>

          {/* Description */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                movieSchema.shape.description.safeParse(value).success
                  ? undefined
                  : movieSchema.shape.description.safeParse(value).error
                      ?.issues[0]?.message,
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name} className="text-gray-200">
                  Description
                </Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter a brief description of the movie..."
                  className="bg-black/60 border-red-500/20 text-white placeholder:text-gray-500 focus-visible:ring-red-500"
                />
                <FieldError field={field} />
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Director */}
            <form.Field
              name="director"
              validators={{
                onChange: ({ value }) =>
                  movieSchema.shape.director.safeParse(value).success
                    ? undefined
                    : movieSchema.shape.director.safeParse(value).error
                        ?.issues[0]?.message,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name} className="text-gray-200">
                    Director
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Christopher Nolan"
                    className="bg-black/60 border-red-500/20 text-white placeholder:text-gray-500 focus-visible:ring-red-500"
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>

            {/* Cast */}
            <form.Field
              name="cast"
              validators={{
                onChange: ({ value }) =>
                  movieSchema.shape.cast.safeParse(value).success
                    ? undefined
                    : movieSchema.shape.cast.safeParse(value).error?.issues[0]
                        ?.message,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name} className="text-gray-200">
                    Cast
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Leonardo DiCaprio"
                    className="bg-black/60 border-red-500/20 text-white placeholder:text-gray-500 focus-visible:ring-red-500"
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Release Date */}
            <form.Field
              name="releaseYear"
              validators={{
                onChange: ({ value }) =>
                  movieSchema.shape.releaseYear.safeParse(value).success
                    ? undefined
                    : movieSchema.shape.releaseYear.safeParse(value).error
                        ?.issues[0]?.message,
              }}
            >
              {(field) => (
                <div className="space-y-1.5 flex flex-col">
                  <Label className="text-gray-200">Release Date</Label>
                  <Popover>
                    <PopoverTrigger>
                      <div
                        className={cn(
                          "justify-start text-left font-normal bg-black/60 border-red-500/20 text-white hover:bg-black/70 hover:text-white rounded-none border inline-flex shrink-0 items-center px-2.5 gap-1.5 h-8 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                          !field.state.value && "text-gray-500",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.state.value
                          ? format(new Date(field.state.value), "PPP")
                          : "Select a date"}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-black/95 border-red-500/20">
                      <Calendar
                        mode="single"
                        selected={
                          field.state.value
                            ? new Date(field.state.value)
                            : undefined
                        }
                        onSelect={(date) =>
                          field.handleChange(date ? date.toISOString() : "")
                        }
                        captionLayout="dropdown"
                        className="bg-black/95 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>

            {/* Pricing */}
            <form.Field
              name="pricing"
              validators={{
                onChange: ({ value }) =>
                  movieSchema.shape.pricing.safeParse(value).success
                    ? undefined
                    : movieSchema.shape.pricing.safeParse(value).error
                        ?.issues[0]?.message,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label className="text-gray-200">Pricing</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) =>
                      field.handleChange(val as PricingType)
                    }
                  >
                    <SelectTrigger className="bg-black/60 border-red-500/20 text-white focus:ring-red-500">
                      <SelectValue placeholder="Select pricing" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-red-500/20 text-white">
                      <SelectItem value="FREE">Free</SelectItem>
                      <SelectItem value="PREMIUM">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Video URL */}
            <form.Field
              name="videoUrl"
              validators={{
                onChange: ({ value }) =>
                  movieSchema.shape.videoUrl.safeParse(value).success
                    ? undefined
                    : movieSchema.shape.videoUrl.safeParse(value).error
                        ?.issues[0]?.message,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name} className="text-gray-200">
                    Video URL
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    className="bg-black/60 border-red-500/20 text-white placeholder:text-gray-500 focus-visible:ring-red-500"
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>

            {/* Thumbnail URL */}
            <form.Field
              name="thumbnailUrl"
              validators={{
                onChange: ({ value }) =>
                  movieSchema.shape.thumbnailUrl.safeParse(value).success
                    ? undefined
                    : movieSchema.shape.thumbnailUrl.safeParse(value).error
                        ?.issues[0]?.message,
              }}
            >
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name} className="text-gray-200">
                    Thumbnail URL
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com/thumb.jpg"
                    className="bg-black/60 border-red-500/20 text-white placeholder:text-gray-500 focus-visible:ring-red-500"
                  />
                  <FieldError field={field} />
                </div>
              )}
            </form.Field>
          </div>

          {/* Categories — multi select via badges */}
          <form.Field
            name="categoryIds"
            validators={{
              onChange: ({ value }) => {
                // Allow empty categories on update, require at least one on create
                if (isEditing) return undefined;
                return value && value.length > 0
                  ? undefined
                  : "Please select at least one category";
              },
            }}
          >
            {(field) => {
              const selectedCategoryIds = field.state.value || [];
              const selectedCategories = categories.filter((cat) =>
                selectedCategoryIds.includes(cat.id),
              );
              const unselectedCategories = categories.filter(
                (cat) => !selectedCategoryIds.includes(cat.id),
              );

              return (
                <div className="space-y-1.5">
                  <Label className="text-gray-200">Categories</Label>

                  {categoriesLoading ? (
                    <p className="text-sm text-gray-500">
                      Loading categories...
                    </p>
                  ) : categories.length === 0 ? (
                    <p className="text-sm text-gray-500">No categories found</p>
                  ) : (
                    <div className="space-y-3">
                      {/* Selected Categories */}
                      {selectedCategories.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs text-gray-400">
                            Selected Categories
                          </p>
                          <div className="flex flex-wrap gap-2 border border-red-500/30 rounded-md p-3 bg-red-500/5">
                            {selectedCategories.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  field.handleChange(
                                    selectedCategoryIds.filter(
                                      (id) => id !== cat.id,
                                    ),
                                  );
                                }}
                              >
                                <Badge className="bg-red-500 hover:bg-red-600 text-white border-red-500 cursor-pointer select-none">
                                  <X className="mr-1 h-3 w-3" />
                                  {cat.name}
                                </Badge>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Available Categories */}
                      {unselectedCategories.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs text-gray-400">
                            Available Categories
                          </p>
                          <div className="flex flex-wrap gap-2 border border-red-500/20 rounded-md p-3 bg-black/60">
                            {unselectedCategories.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  field.handleChange([
                                    ...selectedCategoryIds,
                                    cat.id,
                                  ]);
                                }}
                              >
                                <Badge className="border-red-500/30 text-gray-300 hover:bg-red-500/10 cursor-pointer select-none">
                                  {cat.name}
                                </Badge>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <FieldError field={field} />
                </div>
              );
            }}
          </form.Field>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-red-500/10">
            <Button
              type="button"
              variant="outline"
              className="border-red-500/20 text-gray-300 hover:bg-red-500/10 hover:text-white"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditing ? "Update Movie" : "Create Movie"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
