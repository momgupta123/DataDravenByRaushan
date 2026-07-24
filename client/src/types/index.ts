export interface User {
  id: string;
  name: string;
  email: string;
}

export interface SalesRecord {
  id: string;
  date: string;
  region: string;
  category: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerName: string;
  status: string;
}

export interface KPI {
  title: string;
  value: string | number;
  trend?: number;
  icon: string;
}

export interface FilterState {
  searchTerm: string;
  dateRange: {
    from: string;
    to: string;
  };
  regions: string[];
  category: string;
  status: string;
  sortColumn: string;
  sortOrder: 'asc' | 'desc';
  pageSize: number;
  currentPage: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface DataState {
  sales: SalesRecord[];
  loading: boolean;
  error: string | null;
  total: number;
}

export interface ThemeState {
  isDarkMode: boolean;
}

export interface RootState {
  auth: AuthState;
  data: DataState;
  filters: FilterState;
  theme: ThemeState;
}
