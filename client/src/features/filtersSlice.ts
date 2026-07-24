import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../types/index';

const initialState: FilterState = {
  searchTerm: '',
  dateRange: {
    from: '',
    to: '',
  },
  regions: [],
  category: '',
  status: '',
  sortColumn: 'date',
  sortOrder: 'desc',
  pageSize: 10,
  currentPage: 1,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setDateRange: (state, action: PayloadAction<{ from: string; to: string }>) => {
      state.dateRange = action.payload;
      state.currentPage = 1;
    },
    setRegions: (state, action: PayloadAction<string[]>) => {
      state.regions = action.payload;
      state.currentPage = 1;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
      state.currentPage = 1;
    },
    setSortColumn: (state, action: PayloadAction<string>) => {
      if (state.sortColumn === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = action.payload;
        state.sortOrder = 'asc';
      }
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearAllFilters: (state) => {
      return initialState;
    },
    setAllFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setSearchTerm,
  setDateRange,
  setRegions,
  setCategory,
  setStatus,
  setSortColumn,
  setPageSize,
  setCurrentPage,
  clearAllFilters,
  setAllFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
