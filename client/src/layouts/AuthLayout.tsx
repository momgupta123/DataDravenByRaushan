import React from 'react';
import { BarChart3 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <BarChart3 className="text-emerald-500" size={32} />
          <span className="text-3xl font-bold text-white">Sales Analytics</span>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};
