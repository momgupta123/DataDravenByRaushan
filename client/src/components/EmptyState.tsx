import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data found',
  message = 'Try adjusting your filters or search criteria',
  onClearFilters,
}) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
      <Inbox className="w-12 h-12 text-slate-500 mx-auto mb-4" />
      <p className="text-lg font-medium text-white mb-2">{title}</p>
      <p className="text-slate-400 mb-6">{message}</p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded transition-colors"
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};
