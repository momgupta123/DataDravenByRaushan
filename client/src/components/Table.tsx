import React from 'react';
import { SalesRecord } from '../types/index';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TableProps {
  columns: Array<{
    key: keyof SalesRecord | string;
    label: string;
    sortable?: boolean;
  }>;
  data: SalesRecord[];
  sortColumn: string;
  sortOrder: 'asc' | 'desc';
  onSort: (column: string) => void;
  onRowClick?: (record: SalesRecord) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  sortColumn,
  sortOrder,
  onSort,
  onRowClick,
}) => {
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-left text-sm"
        role="table"
        aria-label="Sales data table"
      >
        <thead className="bg-slate-700 text-slate-100 border-b border-slate-600">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 font-medium"
                scope="col"
              >
                {col.sortable ? (
                  <button
                    onClick={() => onSort(col.key as string)}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                    aria-label={`Sort by ${col.label}, currently ${
                      sortColumn === col.key
                        ? `sorted ${sortOrder === 'asc' ? 'ascending' : 'descending'}`
                        : 'not sorted'
                    }`}
                  >
                    {col.label}
                    {sortColumn === col.key && (
                      <>
                        {sortOrder === 'asc' && <ChevronUp size={16} />}
                        {sortOrder === 'desc' && <ChevronDown size={16} />}
                      </>
                    )}
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, idx) => (
            <tr
              key={`${record.id}-${idx}`}
              className="border-b border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
              onClick={() => onRowClick?.(record)}
              role="row"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onRowClick?.(record);
                }
              }}
            >
              {columns.map((col) => (
                <td
                  key={`${record.id}-${col.key}`}
                  className="px-6 py-4 text-slate-300"
                >
                  {formatCellValue(record[col.key as keyof SalesRecord])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function formatCellValue(value: any): string {
  if (typeof value === 'number') {
    if (value > 1000) {
      return value.toLocaleString();
    }
    if (value % 1 !== 0) {
      return value.toFixed(2);
    }
    return value.toString();
  }
  if (value instanceof Date) {
    return new Date(value).toLocaleDateString();
  }
  if (typeof value === 'string' && value.includes('T')) {
    return new Date(value).toLocaleDateString();
  }
  return String(value);
}
