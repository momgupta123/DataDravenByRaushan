import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/index';
import { setAllFilters } from '../features/filtersSlice';
import { FilterState } from '../types/index';

export const useUrlFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters);
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL on mount
  useEffect(() => {
    const urlFilters: Partial<FilterState> = {};

    if (searchParams.has('search')) {
      urlFilters.searchTerm = searchParams.get('search') || '';
    }

    if (searchParams.has('from')) {
      urlFilters.dateRange = urlFilters.dateRange || { from: '', to: '' };
      urlFilters.dateRange.from = searchParams.get('from') || '';
    }

    if (searchParams.has('to')) {
      urlFilters.dateRange = urlFilters.dateRange || { from: '', to: '' };
      urlFilters.dateRange.to = searchParams.get('to') || '';
    }

    if (searchParams.has('regions')) {
      const regionsStr = searchParams.get('regions');
      urlFilters.regions = regionsStr ? regionsStr.split(',') : [];
    }

    if (searchParams.has('category')) {
      urlFilters.category = searchParams.get('category') || '';
    }

    if (searchParams.has('status')) {
      urlFilters.status = searchParams.get('status') || '';
    }

    if (searchParams.has('sortColumn')) {
      urlFilters.sortColumn = searchParams.get('sortColumn') || 'date';
    }

    if (searchParams.has('sortOrder')) {
      urlFilters.sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
    }

    if (searchParams.has('pageSize')) {
      urlFilters.pageSize = parseInt(searchParams.get('pageSize') || '10');
    }

    if (searchParams.has('page')) {
      urlFilters.currentPage = parseInt(searchParams.get('page') || '1');
    }

    if (Object.keys(urlFilters).length > 0) {
      dispatch(setAllFilters(urlFilters));
    }
  }, []); // Only on mount

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.searchTerm) {
      params.set('search', filters.searchTerm);
    }

    if (filters.dateRange.from) {
      params.set('from', filters.dateRange.from);
    }

    if (filters.dateRange.to) {
      params.set('to', filters.dateRange.to);
    }

    if (filters.regions.length > 0) {
      params.set('regions', filters.regions.join(','));
    }

    if (filters.category) {
      params.set('category', filters.category);
    }

    if (filters.status) {
      params.set('status', filters.status);
    }

    if (filters.sortColumn !== 'date') {
      params.set('sortColumn', filters.sortColumn);
    }

    if (filters.sortOrder !== 'desc') {
      params.set('sortOrder', filters.sortOrder);
    }

    if (filters.pageSize !== 10) {
      params.set('pageSize', filters.pageSize.toString());
    }

    if (filters.currentPage !== 1) {
      params.set('page', filters.currentPage.toString());
    }

    setSearchParams(params);
  }, [filters, setSearchParams]);
};
