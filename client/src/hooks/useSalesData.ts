import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { SalesRecord } from '../types/index';

export const useSalesData = () => {
  const data = useSelector((state: RootState) => state.data);
  const filters = useSelector((state: RootState) => state.filters);

  const filteredData = data.sales.filter((record: SalesRecord) => {
    const { searchTerm, dateRange, regions, category, status } = filters;

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (
        !record.productName.toLowerCase().includes(term) &&
        !record.customerName.toLowerCase().includes(term)
      ) {
        return false;
      }
    }

    // Date range filter
    if (dateRange.from || dateRange.to) {
      const recordDate = new Date(record.date);
      if (dateRange.from && recordDate < new Date(dateRange.from)) {
        return false;
      }
      if (dateRange.to && recordDate > new Date(dateRange.to)) {
        return false;
      }
    }

    // Regions filter
    if (regions.length > 0 && !regions.includes(record.region)) {
      return false;
    }

    // Category filter
    if (category && record.category !== category) {
      return false;
    }

    // Status filter
    if (status && record.status !== status) {
      return false;
    }

    return true;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    const { sortColumn, sortOrder } = filters;
    let aVal: any = a[sortColumn as keyof SalesRecord];
    let bVal: any = b[sortColumn as keyof SalesRecord];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate data
  const startIndex = (filters.currentPage - 1) * filters.pageSize;
  const endIndex = startIndex + filters.pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedData.length / filters.pageSize);

  return {
    filteredData,
    sortedData,
    paginatedData,
    totalPages,
    totalRecords: filteredData.length,
    loading: data.loading,
    error: data.error,
  };
};
