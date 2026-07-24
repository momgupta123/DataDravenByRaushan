import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/index';
import { setTokenFromStorage } from './features/authSlice';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { DashboardPage } from './pages/Dashboard';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setTokenFromStorage(token));
    }
  }, [dispatch]);

  const isAuthenticated = !!auth.token;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};
