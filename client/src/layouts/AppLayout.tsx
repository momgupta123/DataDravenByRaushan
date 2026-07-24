import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/index';
import { toggleTheme } from '../features/themeSlice';
import { logout } from '../features/authSlice';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const theme = useSelector((state: RootState) => state.theme);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={theme.isDarkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-slate-900 text-white">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-emerald-600 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* TopBar */}
          <TopBar
            user={user}
            onLogout={handleLogout}
            isDarkMode={theme.isDarkMode}
            onThemeToggle={handleThemeToggle}
            sidebarOpen={sidebarOpen}
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Content */}
          <main
            id="main-content"
            className="flex-1 overflow-auto"
            role="main"
          >
            <div className="p-4 sm:p-6 lg:p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
