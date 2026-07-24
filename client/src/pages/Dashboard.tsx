import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/index';
import { fetchSales } from '../features/dataSlice';
import { useAuth } from '../hooks/useAuth';
import { useSalesData } from '../hooks/useSalesData';
import { useUrlFilters } from '../hooks/useUrlFilters';
import {
  setSearchTerm,
  setDateRange,
  setRegions,
  setCategory,
  setStatus,
  setSortColumn,
  setPageSize,
  setCurrentPage,
  clearAllFilters,
} from '../features/filtersSlice';
import { AppLayout } from '../layouts/AppLayout';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { FilterPanel } from '../components/FilterPanel';
import { LineChart } from '../components/LineChart';
import { BarChart } from '../components/BarChart';
import { PieChart } from '../components/PieChart';
import { Table } from '../components/Table';
import { Pagination } from '../components/Pagination';
import { KPICard } from '../components/KPICard';
import { DetailModal } from '../components/DetailModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { DollarSign, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react';

const TABLE_COLUMNS = [
  { key: 'id' as const, label: 'ID', sortable: true },
  { key: 'date' as const, label: 'Date', sortable: true },
  { key: 'customerName' as const, label: 'Customer', sortable: true },
  { key: 'productName' as const, label: 'Product', sortable: true },
  { key: 'quantity' as const, label: 'Qty', sortable: true },
  { key: 'totalAmount' as const, label: 'Amount', sortable: true },
  { key: 'status' as const, label: 'Status', sortable: true },
];

export const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAuth();
  const filters = useSelector((state: RootState) => state.filters);
  const {
    filteredData,
    sortedData,
    paginatedData,
    totalPages,
    totalRecords,
    loading,
    error,
  } = useSalesData();

  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Initialize URL filters hook
  useUrlFilters();

  // Fetch data on mount
  useEffect(() => {
    if (token) {
      dispatch(fetchSales(token));
    }
  }, [token, dispatch]);

  // Calculate KPIs
  const kpis = React.useMemo(() => {
    if (filteredData.length === 0) {
      return [
        { title: 'Total Revenue', value: '$0', trend: 0, icon: <DollarSign size={24} /> },
        { title: 'Total Orders', value: '0', trend: 0, icon: <ShoppingCart size={24} /> },
        { title: 'Avg Order Value', value: '$0', trend: 0, icon: <TrendingUp size={24} /> },
        { title: 'Refund Rate', value: '0%', trend: 0, icon: <AlertCircle size={24} /> },
      ];
    }

    const totalRevenue = filteredData.reduce((sum, r) => sum + r.totalAmount, 0);
    const totalOrders = filteredData.length;
    const avgOrderValue = totalRevenue / totalOrders;
    const cancelledOrders = filteredData.filter((r) => r.status === 'Cancelled').length;
    const refundRate = (cancelledOrders / totalOrders) * 100;

    return [
      {
        title: 'Total Revenue',
        value: `$${totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        trend: 12,
        icon: <DollarSign size={24} />,
      },
      {
        title: 'Total Orders',
        value: totalOrders.toLocaleString(),
        trend: 8,
        icon: <ShoppingCart size={24} />,
      },
      {
        title: 'Avg Order Value',
        value: `$${avgOrderValue.toFixed(2)}`,
        trend: -3,
        icon: <TrendingUp size={24} />,
      },
      {
        title: 'Refund Rate',
        value: `${refundRate.toFixed(1)}%`,
        trend: -5,
        icon: <AlertCircle size={24} />,
      },
    ];
  }, [filteredData]);

  const handleClearAllFilters = () => {
    dispatch(clearAllFilters());
  };

  if (loading) {
    return (
      <AppLayout>
        <LoadingState />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <ErrorState
          message={error}
          onRetry={() => {
            if (token) {
              dispatch(fetchSales(token));
            }
          }}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <KPICard key={idx} {...kpi} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart data={filteredData} />
          <BarChart data={filteredData} />
        </div>

        {/* Layout: Filters + Data */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              searchTerm={filters.searchTerm}
              onSearchChange={(term) => dispatch(setSearchTerm(term))}
              dateFrom={filters.dateRange.from}
              dateTo={filters.dateRange.to}
              onDateChange={(from, to) => dispatch(setDateRange({ from, to }))}
              regions={filters.regions}
              onRegionsChange={(regions) => dispatch(setRegions(regions))}
              category={filters.category}
              onCategoryChange={(category) => dispatch(setCategory(category))}
              status={filters.status}
              onStatusChange={(status) => dispatch(setStatus(status))}
              onClearAll={handleClearAllFilters}
            />
          </div>

          {/* Data Table & Charts */}
          <div className="lg:col-span-3 space-y-6">
            {/* Pie Chart */}
            <PieChart data={filteredData} />

            {/* Table Section */}
            {filteredData.length === 0 ? (
              <EmptyState onClearFilters={handleClearAllFilters} />
            ) : (
              <div className="space-y-4">
                <Table
                  columns={TABLE_COLUMNS}
                  data={paginatedData}
                  sortColumn={filters.sortColumn}
                  sortOrder={filters.sortOrder}
                  onSort={(column) => dispatch(setSortColumn(column))}
                  onRowClick={(record) => {
                    setSelectedRecord(record);
                    setModalOpen(true);
                  }}
                />
                <Pagination
                  currentPage={filters.currentPage}
                  totalPages={totalPages}
                  pageSize={filters.pageSize}
                  onPageChange={(page) => dispatch(setCurrentPage(page))}
                  onPageSizeChange={(size) => dispatch(setPageSize(size))}
                />
              </div>
            )}
          </div>
        </div>

        {/* Detail Modal */}
        <DetailModal
          record={selectedRecord}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedRecord(null);
          }}
        />
      </div>
    </AppLayout>
  );
};
