import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../store/slices/authSlice';
import { Button } from '../../components/ui/Button';

export default function CustomerHome() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <View>
            <Text className="text-gray-600 text-lg">Welcome back,</Text>
            <Text className="text-2xl font-bold text-foreground">
              {user?.first_name} {user?.last_name}
            </Text>
          </View>
          <View className="w-12 h-12 bg-primary-500 rounded-full items-center justify-center">
            <Text className="text-white text-lg font-bold">
              {user?.first_name?.charAt(0)}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-foreground mb-4">
            Quick Actions
          </Text>
          <View className="flex-row space-x-4">
            <View className="flex-1 bg-white rounded-xl p-6 border border-primary-100">
              <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="cube-outline" size={24} color="#FF7010" />
              </View>
              <Text className="text-lg font-semibold text-foreground mb-2">
                Send Package
              </Text>
              <Text className="text-gray-600 text-sm">
                Quick and reliable delivery
              </Text>
            </View>

            <View className="flex-1 bg-white rounded-xl p-6 border border-primary-100">
              <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="location-outline" size={24} color="#FF7010" />
              </View>
              <Text className="text-lg font-semibold text-foreground mb-2">
                Track Order
              </Text>
              <Text className="text-gray-600 text-sm">
                Real-time tracking
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Orders */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-foreground mb-4">
            Recent Orders
          </Text>
          <View className="bg-white rounded-xl p-6 border border-primary-100">
            <Text className="text-gray-500 text-center">
              No recent orders found
            </Text>
          </View>
        </View>

        {/* Temporary Logout Button */}
        <Button
          title="Logout"
          variant="outline"
          onPress={handleLogout}
          leftIcon={<Ionicons name="log-out-outline" size={20} color="#FF7010" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
