"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface AlertDialogContentProps {
  children: React.ReactNode
  className?: string
}

interface AlertDialogHeaderProps {
  children: React.ReactNode
  className?: string
}

interface AlertDialogTitleProps {
  children: React.ReactNode
  className?: string
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface AlertDialogFooterProps {
  children: React.ReactNode
  className?: string
}

interface AlertDialogActionProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
}

interface AlertDialogCancelProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-black/90 border border-red-500/20 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

const AlertDialogContent: React.FC<AlertDialogContentProps> = ({ children, className }) => (
  <div className={cn("space-y-4", className)}>
    {children}
  </div>
)

const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({ children, className }) => (
  <div className={cn("space-y-2", className)}>
    {children}
  </div>
)

const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({ children, className }) => (
  <h3 className={cn("text-lg font-semibold text-red-400", className)}>
    {children}
  </h3>
)

const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({ children, className }) => (
  <p className={cn("text-sm text-gray-300", className)}>
    {children}
  </p>
)

const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({ children, className }) => (
  <div className={cn("flex justify-end space-x-2", className)}>
    {children}
  </div>
)

const AlertDialogAction: React.FC<AlertDialogActionProps> = ({ children, onClick, className }) => (
  <Button
    onClick={onClick}
    className={cn("bg-red-500 hover:bg-red-600", className)}
  >
    {children}
  </Button>
)

const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({ children, onClick, className }) => (
  <Button
    onClick={onClick}
    variant="outline"
    className={cn("border-red-500/20 text-gray-300 hover:bg-red-500/10", className)}
  >
    {children}
  </Button>
)

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}