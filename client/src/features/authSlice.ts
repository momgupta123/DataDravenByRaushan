import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '../types/index';
import { signup as signupAPI, login as loginAPI } from '../services/api';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    credentials: { name: string; email: string; password: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await signupAPI(credentials);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      localStorage.setItem('token', response.token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setTokenFromStorage: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setTokenFromStorage } = authSlice.actions;
export default authSlice.reducer;
