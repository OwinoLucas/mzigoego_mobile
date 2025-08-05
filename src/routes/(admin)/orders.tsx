import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminOrders() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Order Management
        </Text>
        <Text className="text-gray-600 text-center">
          Order oversight and management tools will be implemented here
        </Text>
      </View>
    </SafeAreaView>
  );
}
