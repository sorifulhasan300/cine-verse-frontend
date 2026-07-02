import React from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GenericErrorCardProps {
  title?: string;
  description?: string;
  errorName?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

function GenericErrorCard({
  title = "Unable to load content",
  description = "Something went wrong while fetching data. Please check your connection or try again later.",
  errorName = "Network error",
  actionLabel = "Retry",
  onAction,
  className,
}: GenericErrorCardProps) {
  return (
    <Card
      role="alert"
      aria-live="polite"
      className={cn(
        "rounded-3xl border border-slate-800/70 bg-slate-900/95 text-slate-100 shadow-[0_30px_60px_rgba(15,23,42,0.45)]",
        className,
      )}
    >
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-500/10 text-red-300 ring-1 ring-red-500/20">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.35em] text-red-400/90">
              {errorName}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {description}
            </p>
          </div>
        </div>

        {onAction ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-black cursor-pointer hover:border-red-400/80 hover:bg-red-500/10 hover:text-white"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
            <p className="text-xs text-slate-500">
              Try again or refresh the page if the issue persists.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default GenericErrorCard;
