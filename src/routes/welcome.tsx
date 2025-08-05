import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Logo } from '../components/ui/Logo';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 py-8">
        {/* Logo Section */}
        <View className="flex-1 items-center justify-center">
          <View className="w-40 h-40 bg-white rounded-3xl items-center justify-center mb-8 shadow-lg">
            <Logo variant="fallback" size="xl" className="w-32 h-32" />
          </View>
          
          <Text className="text-3xl font-bold text-foreground text-center mb-4">
            Welcome to MzigoEgo
          </Text>
          
          <Text className="text-gray-600 text-center text-lg leading-6 max-w-sm">
            Fast, reliable delivery service at your fingertips. Send packages anywhere, anytime.
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="space-y-4">
          {/* Test Alert Button */}
          <TouchableOpacity
            onPress={() => Alert.alert('Test', 'Touch is working!')}
            style={{
              backgroundColor: '#FF7010',
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Test Touch
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={() => {
              console.log('Sign In pressed');
              router.push('/auth/login');
            }}
            style={{
              backgroundColor: '#FF7010',
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Sign In
            </Text>
          </TouchableOpacity>
          
          {/* Create Account Button */}
          <TouchableOpacity
            onPress={() => {
              console.log('Create Account pressed');
              router.push('/auth/register');
            }}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: '#FF7010',
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FF7010', fontSize: 18, fontWeight: 'bold' }}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View className="mt-6">
          <Text className="text-gray-500 text-sm text-center">
            By continuing, you agree to our{' '}
            <Text className="text-primary-500 underline">Terms of Service</Text>
            {' '}and{' '}
            <Text className="text-primary-500 underline">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
