import { Icons } from '@/components';
import { StyledComponent } from '@/hooks/useStyledComponent';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white gap-6">
      <StyledComponent component={Icons.ExpoIcon} className="h-48 w-48 text-black" />
      <Text className="font-black text-3xl text-center">Expo Boilerplate</Text>
    </SafeAreaView>
  );
}
