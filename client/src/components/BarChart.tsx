import React, { useMemo } from 'react';
import { SalesRecord } from '../types/index';
import { Card } from './Card';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: SalesRecord[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    data.forEach((record) => {
      grouped[record.region] = (grouped[record.region] || 0) + record.totalAmount;
    });

    return Object.entries(grouped)
      .map(([region, total]) => ({
        region,
        total: Math.round(total),
      }))
      .sort((a, b) => b.total - a.total);
  }, [data]);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">Revenue by Region</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={chartData}
          aria-label="Revenue distribution by region"
          role="img"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          <Bar
            dataKey="total"
            fill="#10b981"
            name="Total Revenue"
            radius={[8, 8, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </Card>
  );
};
