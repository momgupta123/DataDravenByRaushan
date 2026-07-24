import React from 'react';
import { Card } from './Card';

interface FilterPanelProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateChange: (from: string, to: string) => void;
  regions: string[];
  onRegionsChange: (regions: string[]) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  onClearAll: () => void;
}

const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'];
const CATEGORIES = ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Sports'];
const STATUSES = ['Completed', 'Pending', 'Cancelled'];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  onSearchChange,
  dateFrom,
  dateTo,
  onDateChange,
  regions,
  onRegionsChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  onClearAll,
}) => {
  const hasActiveFilters =
    searchTerm || dateFrom || dateTo || regions.length > 0 || category || status;

  return (
    <Card className="space-y-6">
      {/* Search */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-slate-300 mb-2">
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by product or customer..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Search sales records"
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateFrom" className="block text-sm font-medium text-slate-300 mb-2">
            From
          </label>
          <input
            id="dateFrom"
            type="date"
            value={dateFrom}
            onChange={(e) => onDateChange(e.target.value, dateTo)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Start date"
          />
        </div>
        <div>
          <label htmlFor="dateTo" className="block text-sm font-medium text-slate-300 mb-2">
            To
          </label>
          <input
            id="dateTo"
            type="date"
            value={dateTo}
            onChange={(e) => onDateChange(dateFrom, e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="End date"
          />
        </div>
      </div>

      {/* Regions Multi-Select */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Regions</label>
        <div className="space-y-2">
          {REGIONS.map((region) => (
            <label key={region} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={regions.includes(region)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onRegionsChange([...regions, region]);
                  } else {
                    onRegionsChange(regions.filter((r) => r !== region));
                  }
                }}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
                aria-label={`Filter by region: ${region}`}
              />
              <span className="text-slate-300">{region}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category Select */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Status Select */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-2">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Clear All Button */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded transition-colors"
          aria-label="Clear all filters"
        >
          Clear All Filters
        </button>
      )}
    </Card>
  );
};
