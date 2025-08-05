import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../store/hooks';

export default function AdminDashboard() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Admin Dashboard
        </Text>
        <Text className="text-lg text-gray-600 mb-2">
          Welcome, {user?.first_name}!
        </Text>
        <Text className="text-gray-600 text-center">
          Admin functionality will be implemented here
        </Text>
      </View>
    </SafeAreaView>
  );
}
