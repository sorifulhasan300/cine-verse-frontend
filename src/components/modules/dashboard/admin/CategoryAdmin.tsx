"use client";

import { DataTable } from "@/components/ui/data-table";
import { getCategoryColumns } from "./category-columns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryManagementService } from "@/services/category-management.service";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { SortingState, OnChangeFn } from "@tanstack/react-table";
import { toast } from "sonner";
import { Category } from "@/types/category.types";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export function CategoryAdmin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [debouncedSearchInput] = useDebounce(searchInput, 300);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | undefined>(undefined);
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
    data: categoriesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-categories", page, limit, searchTerm, sort, sortOrder],
    queryFn: async () => {
      console.log("Fetching categories...");
      const response = await categoryManagementService.getCategories({
        page,
        limit,
        searchTerm: searchTerm || undefined,
        sort,
        sortOrder,
      });
      return response;
    },
  });

  const categories = categoriesData?.data || [];
  const pagination = categoriesData?.pagination;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (categoryId: string) => categoryManagementService.deleteCategory(categoryId),
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
    onError: (error: unknown) => {
      const err = error as { error?: string };
      toast.error(err.error || "Failed to delete category");
    },
  });

  const handleCategoryCreated = () => {
    refetch();
    setShowCreateDialog(false);
    setShowEditDialog(false);
    setEditingCategory(undefined);
  };

  const handleCreateCategory = () => {
    setEditingCategory(undefined);
    setShowCreateDialog(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowEditDialog(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setDeletingCategory(category);
    setShowDeleteDialog(true);
  };

  const confirmDeleteCategory = () => {
    if (deletingCategory) {
      deleteMutation.mutate(deletingCategory.id);
      setShowDeleteDialog(false);
      setDeletingCategory(undefined);
    }
  };

  const cancelDeleteCategory = () => {
    setShowDeleteDialog(false);
    setDeletingCategory(undefined);
  };

  const handlePageChange = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
  }, [searchParams, router]);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-400">Manage Categories</h2>
          <Button
            onClick={handleCreateCategory}
            className="bg-red-500 hover:bg-red-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-red-400">Manage Categories</h2>
          <Button
            onClick={handleCreateCategory}
            className="bg-red-500 hover:bg-red-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">Failed to load categories</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-red-400">Manage Categories</h2>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search categories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="max-w-sm"
          />
          <Button
            onClick={handleCreateCategory}
            className="bg-red-500 hover:bg-red-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </Button>
        </div>
      </div>
      <DataTable
        columns={getCategoryColumns({
          onEditCategory: handleEditCategory,
          onDeleteCategory: handleDeleteCategory
        })}
        data={categories}
        pagination={pagination}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
      <CreateCategoryDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCategoryCreated={handleCategoryCreated}
      />
      <CreateCategoryDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        editingCategory={editingCategory}
        onCategoryCreated={handleCategoryCreated}
      />
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &ldquo;{deletingCategory?.name}&rdquo;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteCategory}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteCategory}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}