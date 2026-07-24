import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from './Card';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon }) => {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-white mb-3">{value}</p>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                trend > 0 ? 'text-emerald-500' : trend < 0 ? 'text-red-500' : 'text-slate-400'
              }`}
              aria-label={`${title}: ${trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral'} ${Math.abs(trend)}%`}
            >
              {trend > 0 && <ArrowUp size={16} />}
              {trend < 0 && <ArrowDown size={16} />}
              <span>{Math.abs(trend)}% from last month</span>
            </div>
          )}
        </div>
        <div className="text-slate-500 p-3 bg-slate-700 rounded-lg">{icon}</div>
      </div>
    </Card>
  );
};
