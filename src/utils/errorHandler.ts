import { router } from 'expo-router';

export const isSessionExpiredError = (error: string | Error): boolean => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  return errorMessage.includes('Session expired') || 
         errorMessage.includes('Authentication check failed') ||
         errorMessage.includes('Unauthorized');
};

export const handleSessionExpiration = () => {
  console.log('Session expired, clearing auth state and redirecting to login');
  
  // Just redirect to login page - the auth state will be cleared by the login process
  router.replace('/auth/login');
};

export const handleApiError = (error: string | Error) => {
  if (isSessionExpiredError(error)) {
    handleSessionExpiration();
    return true; // Indicates that session expiration was handled
  }
  return false; // Indicates that this was not a session expiration error
};

export const createAsyncThunkErrorHandler = (defaultErrorMessage: string) => {
  return (error: unknown): string => {
    const errorMessage = error instanceof Error ? error.message : defaultErrorMessage;
    
    // Handle session expiration
    if (isSessionExpiredError(errorMessage)) {
      handleSessionExpiration();
    }
    
    return errorMessage;
  };
};
