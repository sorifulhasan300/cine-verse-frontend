"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  categoryManagementService,
} from "@/services/category-management.service";
import { categoryValidationSchema } from "@/zod/category.validation";
import { CategoryFormData } from "@/types/category.types";

interface CreateCategoryDialogProps {
  onCategoryCreated?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  editingCategory?: CategoryFormData & { id: string };
}

export function CreateCategoryDialog({
  onCategoryCreated,
  open,
  onOpenChange,
  editingCategory,
}: CreateCategoryDialogProps) {
  const isEditing = !!editingCategory;
  const [internalShowForm, setInternalShowForm] = useState(false);
  const showForm = open !== undefined ? open : internalShowForm;
  const setShowForm = onOpenChange || setInternalShowForm;

  const form = useForm<CategoryFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(categoryValidationSchema as any),
    mode: "onSubmit",
    defaultValues: {
      name: editingCategory?.name || "",
      description: editingCategory?.description || "",
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (editingCategory) {
      form.reset({
        name: editingCategory.name || "",
        description: editingCategory.description || "",
      });
    } else {
      form.reset();
    }
  }, [editingCategory, form]);

  const createMutation = useMutation({
    mutationFn: (data: CategoryFormData) => {
      if (isEditing && editingCategory?.id) {
        return categoryManagementService.updateCategory(editingCategory.id, data);
      }
      return categoryManagementService.createCategory(data);
    },
    onSuccess: () => {
      toast.success(
        isEditing ? "Category updated successfully" : "Category created successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      form.reset();
      onOpenChange?.(false);
      onCategoryCreated?.();
    },
    onError: (error: unknown) => {
      const err = error as { error?: string };
      toast.error(
        err.error || `Failed to ${isEditing ? "update" : "create"} category`,
      );
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    createMutation.mutate(data);
  };

  if (!showForm) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black/90 border border-red-500/20 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-red-400 text-xl font-bold mb-4">
          {isEditing ? "Edit Category" : "Create New Category"}
        </h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
            <Input
              placeholder="Category name"
              {...form.register("name")}
              className="bg-black/20 border-red-500/20"
            />
            {form.formState.errors.name && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Description (Optional)</label>
            <Textarea
              placeholder="Category description"
              {...form.register("description")}
              className="bg-black/20 border-red-500/20"
            />
            {form.formState.errors.description && (
              <p className="text-red-400 text-sm">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
              className="border-red-500/20 text-gray-300 hover:bg-red-500/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {createMutation.isPending
                ? (isEditing ? "Updating..." : "Creating...")
                : (isEditing ? "Update" : "Create")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}