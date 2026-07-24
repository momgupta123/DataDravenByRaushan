import React from 'react';
import { LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { User } from '../types/index';

interface TopBarProps {
  user: User | null;
  onLogout: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  sidebarOpen: boolean;
  onMenuToggle: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  user,
  onLogout,
  isDarkMode,
  onThemeToggle,
  sidebarOpen,
  onMenuToggle,
}) => {
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 hover:bg-slate-700 rounded transition-colors"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-2xl font-bold text-white">Sales Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className="p-2 hover:bg-slate-700 rounded transition-colors"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-red-900 rounded transition-colors text-red-500 hover:text-red-400"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
