import React from 'react';
import { BarChart3, Home, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onClose}
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-700 p-4 transition-transform duration-300 z-40 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-emerald-500" size={28} />
            <span className="text-xl font-bold text-white">Sales</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Logo - Desktop only */}
        <div className="hidden lg:flex items-center gap-2 mb-8">
          <BarChart3 className="text-emerald-500" size={28} />
          <span className="text-xl font-bold text-white">Sales Analytics</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-emerald-500 rounded transition-colors font-medium"
                onClick={onClose}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer - Desktop only */}
        <div className="hidden lg:block absolute bottom-4 left-4 right-4 p-4 bg-slate-800 rounded text-xs text-slate-400">
          <p className="font-medium mb-2">≋R≋</p>
          <p>Real-time sales analytics</p>
        </div>
      </div>
    </>
  );
};
