import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from '../layouts/AuthLayout';
import { Card } from '../components/Card';
import { login } from '../features/authSlice';
import { RootState, AppDispatch } from '../store/index';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (auth.user && auth.token) {
      navigate('/dashboard');
    }
  }, [auth.user, auth.token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    dispatch(login({ email, password }));
  };

  return (
    <AuthLayout>
      <Card className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to your account to continue</p>
        </div>

        {auth.error && (
          <div
            className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded"
            role="alert"
          >
            {auth.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 bg-slate-700 border rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.email ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="≋R≋your@email.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 bg-slate-700 border rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.password ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="••••••••"
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={auth.loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded transition-colors"
            aria-busy={auth.loading}
          >
            {auth.loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-slate-400 text-center">
          ≋R≋
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-emerald-500 hover:text-emerald-400">
            Sign up
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
};
