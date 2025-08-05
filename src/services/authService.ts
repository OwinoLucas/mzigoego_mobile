import apiService, { ApiResponse } from './api';

export interface User {
  id: number;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  role: 'customer' | 'rider' | 'admin';
  is_active: boolean;
  is_online?: boolean;
  profile_picture?: string;
  date_joined: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'customer' | 'rider';
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

class AuthService {
  // Register new user
  async register(userData: RegisterData): Promise<ApiResponse<LoginResponse>> {
    return apiService.post<LoginResponse>('/auth/register/', userData, false);
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    const response = await apiService.post<LoginResponse>('/auth/login/', credentials, false);
    
    if (response.success && response.data) {
      // Store tokens in API service
      await apiService.setAuthTokens({
        access: response.data.access,
        refresh: response.data.refresh,
      });
    }
    
    return response;
  }

  // Logout user
  async logout(): Promise<ApiResponse> {
    const response = await apiService.post('/auth/logout/', {});
    // Clear tokens regardless of response
    await apiService.clearAuthTokens();
    return response;
  }

  // Get user profile
  async getProfile(): Promise<ApiResponse<User>> {
    return apiService.get<User>('/auth/profile/');
  }

  // Update user profile
  async updateProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.patch<User>('/auth/profile/', profileData);
  }

  // Change password
  async changePassword(passwordData: ChangePasswordData): Promise<ApiResponse> {
    return apiService.post('/auth/change-password/', passwordData);
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await this.getProfile();
      return response.success;
    } catch (error) {
      return false;
    }
  }

  // Get current user from storage or API
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.getProfile();
      return response.success && response.data ? response.data : null;
    } catch (error) {
      // Don't log session expiration errors as they are expected
      const errorMessage = error instanceof Error ? error.message : 'Failed to get current user';
      if (!errorMessage.includes('Session expired')) {
        console.error('Failed to get current user:', error);
      }
      return null;
    }
  }
}

export const authService = new AuthService();
export default authService;
