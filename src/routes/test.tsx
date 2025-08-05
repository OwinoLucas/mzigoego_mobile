import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function TestScreen() {
  const handlePress = () => {
    Alert.alert('Success', 'Button press detected!');
  };

  const handleNavigation = () => {
    router.push('/welcome');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 py-8 items-center justify-center">
        <Text className="text-2xl font-bold text-foreground mb-8">
          Touch Test Screen
        </Text>
        
        {/* Basic TouchableOpacity */}
        <TouchableOpacity
          onPress={handlePress}
          className="bg-primary-500 px-6 py-4 rounded-lg mb-4"
        >
          <Text className="text-white font-semibold text-lg">
            Test Alert
          </Text>
        </TouchableOpacity>

        {/* Navigation test */}
        <TouchableOpacity
          onPress={handleNavigation}
          className="bg-secondary-500 px-6 py-4 rounded-lg mb-4"
        >
          <Text className="text-white font-semibold text-lg">
            Go to Welcome
          </Text>
        </TouchableOpacity>

        {/* Simple styled button */}
        <TouchableOpacity
          onPress={() => console.log('Console log test')}
          style={{
            backgroundColor: '#10B981',
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Console Log Test
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
