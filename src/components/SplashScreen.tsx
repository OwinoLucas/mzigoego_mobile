import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuthStatus } from '../store/slices/authSlice';
import { Logo } from './ui/Logo';

interface SplashScreenProps {
  onReady: () => void;
}

export const AppSplashScreen: React.FC<SplashScreenProps> = ({ onReady }) => {
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    async function prepare() {
      try {
        try {
          // Check authentication status
          await dispatch(checkAuthStatus()).unwrap();
        } catch (error) {
          console.warn('Session might have expired:', error);
        }

        // Shorter splash screen time to test interactivity
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (e) {
        console.warn('Error during app initialization:', e);
      } finally {
        // Hide splash screen and notify parent component
        await SplashScreen.hideAsync();
        onReady();
      }
    }

    prepare();
  }, [dispatch, onReady]);

  // Show custom splash content while loading
  return (
    <View className="flex-1 items-center justify-center bg-primary-500">
      <View className="w-40 h-40 bg-white rounded-3xl items-center justify-center mb-8 shadow-lg">
        <Logo variant="shape" size="xl" className="w-32 h-32" />
      </View>
      
      <Text className="text-white text-3xl font-bold mb-2">
        MzigoEgo
      </Text>
      
      <Text className="text-primary-100 text-lg">
        Fast. Reliable. Delivery.
      </Text>
      
      {/* Optional loading indicator */}
      <View className="mt-8">
        <View className="w-12 h-1 bg-primary-300 rounded-full overflow-hidden">
          <View className="w-full h-full bg-white rounded-full animate-pulse" />
        </View>
      </View>
    </View>
  );
};
