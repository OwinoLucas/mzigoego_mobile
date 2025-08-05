import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Logo } from '../../components/ui/Logo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { LoginCredentials } from '../../services/authService';

interface LoginFormData extends LoginCredentials {}

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const { loginLoading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect after successful login
  useEffect(() => {
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
    }
  }, [isAuthenticated, user]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      Alert.alert('Success', 'Welcome back!');
    } catch (error) {
      Alert.alert('Login Failed', error as string);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 py-8" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-6 self-start"
          >
            <Ionicons name="arrow-back" size={24} color="#171717" />
          </TouchableOpacity>

          <View className="w-20 h-20 bg-white rounded-2xl items-center justify-center mb-6 shadow-sm">
            <Logo variant="shape" size="lg" />
          </View>

          <Text className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-600 text-lg">
            Sign in to your MzigoEgo account
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <Text className="text-red-700 text-center">{error}</Text>
          </View>
        )}

        {/* Login Form */}
        <View className="mb-8">
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Ionicons name="mail-outline" size={20} color="#9CA3AF" />}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry={!showPassword}
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />}
                rightIcon={
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#9CA3AF"
                  />
                }
                onRightIconPress={() => setShowPassword(!showPassword)}
              />
            )}
          />

          <Button
            title="Sign In"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loginLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        {/* Forgot Password */}
        <View className="items-center mb-8">
          <TouchableOpacity>
            <Text className="text-primary-500 font-medium">
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">or</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Social Login */}
        <View className="space-y-3 mb-8">
          <Button
            title="Continue with Google"
            variant="outline"
            size="lg"
            className="w-full"
            leftIcon={<Ionicons name="logo-google" size={20} color="#FF7010" />}
          />
          
          <Button
            title="Continue with Apple"
            variant="outline"
            size="lg"
            className="w-full"
            leftIcon={<Ionicons name="logo-apple" size={20} color="#FF7010" />}
          />
        </View>

        {/* Register Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/auth/register" asChild>
            <TouchableOpacity>
              <Text className="text-primary-500 font-medium">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
