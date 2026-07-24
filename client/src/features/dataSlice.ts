import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DataState } from '../types/index';
import { getSales } from '../services/api';

const initialState: DataState = {
  sales: [],
  loading: false,
  error: null,
  total: 0,
};

export const fetchSales = createAsyncThunk(
  'data/fetchSales',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getSales(token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload.data;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dataSlice.reducer;
