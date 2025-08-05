import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RiderProfile() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Rider Profile
        </Text>
        <Text className="text-gray-600 text-center">
          Rider profile settings and documents will be shown here
        </Text>
      </View>
    </SafeAreaView>
  );
}
