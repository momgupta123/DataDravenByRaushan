import React, { useMemo } from 'react';
import { SalesRecord } from '../types/index';
import { Card } from './Card';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PieChartProps {
  data: SalesRecord[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    data.forEach((record) => {
      grouped[record.category] = (grouped[record.category] || 0) + record.totalAmount;
    });

    return Object.entries(grouped)
      .map(([category, total]) => ({
        name: category,
        value: Math.round(total),
      }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">Revenue by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart aria-label="Revenue distribution by category" role="img">
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Card>
  );
};
