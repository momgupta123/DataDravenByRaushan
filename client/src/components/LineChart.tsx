import React, { useMemo } from 'react';
import { SalesRecord } from '../types/index';
import { Card } from './Card';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  data: SalesRecord[];
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    data.forEach((record) => {
      const date = new Date(record.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      grouped[date] = (grouped[date] || 0) + record.totalAmount;
    });

    return Object.entries(grouped)
      .map(([date, total]) => ({
        date,
        total: Math.round(total),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={chartData}
          aria-label="Revenue trend over time"
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
          <Line
            type="monotone"
            dataKey="total"
            stroke="#10b981"
            dot={{ fill: '#10b981' }}
            strokeWidth={2}
            name="Total Revenue"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </Card>
  );
};
