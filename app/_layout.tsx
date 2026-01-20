// app/_layout.tsx
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack>
        {/* Tabs navigator as the main entry point */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* You can add auth routes later, e.g. */}
        {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
      </Stack>
    </SafeAreaProvider>
  );
}
