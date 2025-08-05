import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RiderDeliveries() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-foreground mb-4">
          My Deliveries
        </Text>
        <Text className="text-gray-600 text-center">
          Available deliveries and current orders will be shown here
        </Text>
      </View>
    </SafeAreaView>
  );
}
