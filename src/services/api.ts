import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// API Configuration
const API_BASE_URL = 'https://mzigoego.com/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

class ApiService {
  private baseURL: string;
  private accessToken: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.initializeToken();
  }

  private async initializeToken() {
    try {
      const token = await AsyncStorage.getItem('access_token');
      this.accessToken = token;
    } catch (error) {
      console.error('Failed to load access token:', error);
    }
  }

  public async setAuthTokens(tokens: AuthTokens) {
    try {
      await AsyncStorage.setItem('access_token', tokens.access);
      await AsyncStorage.setItem('refresh_token', tokens.refresh);
      this.accessToken = tokens.access;
    } catch (error) {
      console.error('Failed to store auth tokens:', error);
    }
  }

  public async clearAuthTokens() {
    try {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
      this.accessToken = null;
    } catch (error) {
      console.error('Failed to clear auth tokens:', error);
    }
  }

  private async getHeaders(includeAuth: boolean = true): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (includeAuth && this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await fetch(`${this.baseURL}/token/refresh/`, {
        method: 'POST',
        headers: await this.getHeaders(false),
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('access_token', data.access);
        this.accessToken = data.access;
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    return false;
  }

  public async request<T = any>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      body?: any;
      includeAuth?: boolean;
    } = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', body, includeAuth = true } = options;

    try {
      let headers = await this.getHeaders(includeAuth);

      const config: RequestInit = {
        method,
        headers,
      };

      if (body && method !== 'GET') {
        if (body instanceof FormData) {
          // Remove Content-Type for FormData to let browser set it with boundary
          delete headers['Content-Type'];
        } else {
          config.body = JSON.stringify(body);
        }
      }

      let response = await fetch(`${this.baseURL}${endpoint}`, config);

      // Handle token refresh for 401 errors
      if (response.status === 401 && includeAuth) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the request with new token
          headers = await this.getHeaders(true);
          config.headers = headers;
          response = await fetch(`${this.baseURL}${endpoint}`, config);
        } else {
          // Refresh failed, clear tokens
          await this.clearAuthTokens();
          // Emit a custom event that the auth system can listen to
          if (typeof window !== 'undefined' && window.dispatchEvent) {
            window.dispatchEvent(new CustomEvent('session-expired'));
          }
          throw new Error('Session expired. Please login again.');
        }
      }

      const responseData = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: responseData,
        };
      } else {
        return {
          success: false,
          message: responseData.message || responseData.detail || 'Request failed',
          errors: responseData.errors || responseData,
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
      
      // Don't log session expiration errors as they are expected and handled
      if (!errorMessage.includes('Session expired')) {
        console.error('API request failed:', error);
      }
      
      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  // Convenience methods
  public get<T>(endpoint: string, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', includeAuth });
  }

  public post<T>(endpoint: string, body: any, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, includeAuth });
  }

  public put<T>(endpoint: string, body: any, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, includeAuth });
  }

  public patch<T>(endpoint: string, body: any, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body, includeAuth });
  }

  public delete<T>(endpoint: string, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', includeAuth });
  }
}

export const apiService = new ApiService();
export default apiService;
