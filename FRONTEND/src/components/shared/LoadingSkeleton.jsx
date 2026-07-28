import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/5", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900/50 p-4 space-y-4">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-3 border-b border-white/5 px-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
}

export default function LoadingSkeleton({ type = 'card', count = 4, className }) {
  const skeletons = Array(count).fill(0);

  if (type === 'table') {
    return (
      <div className={cn("w-full border border-white/10 rounded-xl overflow-hidden bg-neutral-900/30", className)}>
        <div className="bg-white/5 h-12 w-full"></div>
        {skeletons.map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {skeletons.map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
