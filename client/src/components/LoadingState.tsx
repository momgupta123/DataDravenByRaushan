import React from 'react';
import { Skeleton } from './Skeleton';

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading sales data">
      {/* KPI Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={`kpi-${i}`} className="h-32" />
        ))}
      </div>

      {/* Chart Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>

      {/* Table Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={`row-${i}`} className="h-16" />
        ))}
      </div>
    </div>
  );
};
