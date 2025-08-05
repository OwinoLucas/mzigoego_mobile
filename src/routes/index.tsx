import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuthStatus } from '../store/slices/authSlice';

export default function Home() {
  console.log('Home component rendered');
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);
  
  console.log('Auth state:', { isAuthenticated, isLoading, user: user?.email });

  useEffect(() => {
    // Check if user is already authenticated
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // Navigate based on user role
        switch (user.role) {
          case 'admin':
            router.replace('/(admin)');
            break;
          case 'rider':
            router.replace('/(rider)');
            break;
          case 'customer':
          default:
            router.replace('/(customer)');
            break;
        }
      } else {
        // Not authenticated, show simple welcome screen for testing
        router.replace('/simple-welcome');
      }
    }
  }, [isAuthenticated, isLoading, user]);

  // Show loading spinner while checking auth
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background">
      <View className="items-center">
        <View className="w-24 h-24 bg-primary-500 rounded-full items-center justify-center mb-6">
          <Text className="text-white text-3xl font-bold">M</Text>
        </View>
        <ActivityIndicator size="large" color="#FF7010" />
      </View>
    </SafeAreaView>
  );
}
