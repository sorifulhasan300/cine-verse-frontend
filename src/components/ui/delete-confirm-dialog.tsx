"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => Promise<void>;
  isDangerous?: boolean;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  title = "Delete Item",
  description = "This action cannot be undone. Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  isDangerous = true,
}: DeleteConfirmDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-black/90  ">
        <AlertDialogHeader>
          <AlertDialogTitle
            className={isDangerous ? "text-red-400" : "text-gray-200"}
          >
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-3">
          <AlertDialogCancel
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-gray-500 text-gray-300 hover:bg-gray-500/10 hover:text-gray-200"
          >
            {cancelText}
          </AlertDialogCancel>
          <button
            disabled={isDeleting || isLoading}
            onClick={handleConfirm}
            className={`${isDangerous ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isDeleting || isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                {confirmText}ing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
