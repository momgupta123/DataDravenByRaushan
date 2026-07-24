import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const pageSizeOptions = [5, 10, 25, 50];

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
      <div className="flex items-center gap-2">
        <label htmlFor="pageSize" className="text-slate-300 text-sm">
          Rows per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
          className="bg-slate-700 text-white px-3 py-1 rounded border border-slate-600 hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Select rows per page"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 hover:bg-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            let pageNum = currentPage - 2 + i;
            if (pageNum < 1 || pageNum > totalPages) return null;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded transition-colors ${
                  pageNum === currentPage
                    ? 'bg-emerald-600 text-white'
                    : 'hover:bg-slate-700 text-slate-300'
                }`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
                aria-label={`Go to page ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 hover:bg-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="text-slate-400 text-sm">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};
