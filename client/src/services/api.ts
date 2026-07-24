const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const signup = async (credentials: SignupCredentials) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }

  return response.json();
};

export const login = async (credentials: LoginCredentials) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
};

export const getSales = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/api/sales`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch sales data');
  }

  return response.json();
};
