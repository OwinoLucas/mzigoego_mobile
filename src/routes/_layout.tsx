import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';
import ReduxProvider from '../store/Provider';
import { AppSplashScreen } from '../components/SplashScreen';
import '../global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const [appIsReady, setAppIsReady] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    console.log('RootLayoutNav ready');
  }, [appIsReady]);

  if (!appIsReady) {
  return (
    <AppSplashScreen onReady={() => setAppIsReady(true)} />
  );
}

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor="#FF7010" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <ReduxProvider>
      <RootLayoutNav />
    </ReduxProvider>
  );
}
