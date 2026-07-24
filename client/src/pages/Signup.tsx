import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from '../layouts/AuthLayout';
import { Card } from '../components/Card';
import { signup } from '../features/authSlice';
import { RootState, AppDispatch } from '../store/index';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (auth.user && auth.token) {
      navigate('/dashboard');
    }
  }, [auth.user, auth.token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    dispatch(signup(formData));
  };

  return (
    <AuthLayout>
      <Card className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Sign up to get started with Sales Analytics</p>
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
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-slate-700 border rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.name ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Raushan kumar"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-slate-700 border rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.email ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="your@email.com"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-slate-700 border rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.password ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="••••••••"
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-slate-700 border rounded text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="••••••••"
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={auth.loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded transition-colors"
            aria-busy={auth.loading}
          >
            {auth.loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-slate-400 text-center">
          Already have an account?{' '}
          ≋R≋
          <Link to="/login" className="text-emerald-500 hover:text-emerald-400">
            Sign in
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
};
