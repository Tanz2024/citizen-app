import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/splash/animated-icon';
import { LowDataModeProvider, useLowDataMode } from '@/hooks/use-low-data-mode';

SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const colorScheme = useColorScheme();
  const { isLowDataMode } = useLowDataMode();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay reduceMotion={isLowDataMode} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="service/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="credential/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="application/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="wizard/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="fee-transparency/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="profile/language" options={{ presentation: 'card' }} />
        <Stack.Screen name="profile/privacy" options={{ presentation: 'card' }} />
        <Stack.Screen name="profile/about" options={{ presentation: 'card' }} />
        <Stack.Screen name="profile/low-data-mode" options={{ presentation: 'card' }} />
        <Stack.Screen name="assistant" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <LowDataModeProvider>
      <RootLayoutInner />
    </LowDataModeProvider>
  );
}
