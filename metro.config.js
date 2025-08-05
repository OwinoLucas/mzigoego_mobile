const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add web polyfills for React Native packages
config.resolver.alias = {
  ...config.resolver.alias,
  '@react-native-async-storage/async-storage': '@react-native-async-storage/async-storage',
};

module.exports = withNativeWind(config, { input: './src/global.css' });
