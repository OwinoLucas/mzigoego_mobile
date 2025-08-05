import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearAuth } from '../store/slices/authSlice';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Listen for session expiration events from API service
    const handleSessionExpired = () => {
      console.log('Session expired, clearing auth and redirecting to login');
      dispatch(clearAuth());
      router.replace('/auth/login');
    };

    // For React Native, we'll use a different approach since window events aren't available
    // Instead, we'll handle this through Redux state changes and API error responses
    
    return () => {
      // Cleanup if needed
    };
  }, [dispatch]);

  // If user is not authenticated and we're not on an auth page, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      const currentPath = router.canGoBack() ? window.location?.pathname : '';
      const isAuthPage = currentPath?.includes('/auth/');
      
      if (!isAuthPage && currentPath !== '/') {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default AuthGuard;
