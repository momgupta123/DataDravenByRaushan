import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/index';
import { logout, setTokenFromStorage } from '../features/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSetTokenFromStorage = (token: string) => {
    dispatch(setTokenFromStorage(token));
  };

  return {
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
    error: auth.error,
    logout: handleLogout,
    setTokenFromStorage: handleSetTokenFromStorage,
  };
};
