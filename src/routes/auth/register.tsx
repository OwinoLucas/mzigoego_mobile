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
import { registerUser, clearError } from '../../store/slices/authSlice';
import { RegisterData } from '../../services/authService';

interface RegisterFormData extends RegisterData {}

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const { registerLoading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'customer' | 'rider'>('customer');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
      first_name: '',
      last_name: '',
      phone: '',
      role: 'customer',
    },
  });

  const password = watch('password');

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect after successful registration
  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = { ...data, role: selectedRole };
      await dispatch(registerUser(formData)).unwrap();
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Registration Failed', error as string);
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
            Create Account
          </Text>
          <Text className="text-gray-600 text-lg">
            Join MzigoEgo and start sending packages
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <Text className="text-red-700 text-center">{error}</Text>
          </View>
        )}

        {/* Role Selection */}
        <View className="mb-6">
          <Text className="text-foreground font-medium mb-3 text-base">
            I want to
          </Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={() => setSelectedRole('customer')}
              className={`flex-1 p-4 rounded-lg border-2 ${
                selectedRole === 'customer'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <View className="items-center">
                <Ionicons
                  name="cube-outline"
                  size={24}
                  color={selectedRole === 'customer' ? '#FF7010' : '#9CA3AF'}
                />
                <Text
                  className={`mt-2 font-medium ${
                    selectedRole === 'customer' ? 'text-primary-600' : 'text-gray-600'
                  }`}
                >
                  Send Packages
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedRole('rider')}
              className={`flex-1 p-4 rounded-lg border-2 ${
                selectedRole === 'rider'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <View className="items-center">
                <Ionicons
                  name="bicycle-outline"
                  size={24}
                  color={selectedRole === 'rider' ? '#FF7010' : '#9CA3AF'}
                />
                <Text
                  className={`mt-2 font-medium ${
                    selectedRole === 'rider' ? 'text-primary-600' : 'text-gray-600'
                  }`}
                >
                  Deliver Packages
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Registration Form */}
        <View className="mb-8">
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="first_name"
                rules={{ required: 'First name is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="First Name"
                    placeholder="Enter first name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.first_name?.message}
                    leftIcon={<Ionicons name="person-outline" size={20} color="#9CA3AF" />}
                  />
                )}
              />
            </View>

            <View className="flex-1">
              <Controller
                control={control}
                name="last_name"
                rules={{ required: 'Last name is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Last Name"
                    placeholder="Enter last name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.last_name?.message}
                  />
                )}
              />
            </View>
          </View>

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
            name="phone"
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[+]?[\d\s\-\(\)]+$/,
                message: 'Invalid phone number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.phone?.message}
                keyboardType="phone-pad"
                leftIcon={<Ionicons name="call-outline" size={20} color="#9CA3AF" />}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain uppercase, lowercase, and number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Create a password"
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

          <Controller
            control={control}
            name="password_confirm"
            rules={{
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password_confirm?.message}
                secureTextEntry={!showConfirmPassword}
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />}
                rightIcon={
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#9CA3AF"
                  />
                }
                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          />

          <Button
            title="Create Account"
            variant="primary"
            size="lg"
            className="w-full"
            loading={registerLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        {/* Login Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text className="text-primary-500 font-medium">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
