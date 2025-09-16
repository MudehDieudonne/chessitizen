'use client';

import { AuthProvider } from '@/context/AuthProvider';
import { GameProvider } from '@/context/GameProvider';
import { UserProvider } from '@/context/userProvider';
import { Stack } from 'expo-router';
import { LogBox, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Ignore some logs
LogBox.ignoreLogs([
  '[Reanimated] Reading from `value` during component render'
]);

export default function RootLayout() {
  return (
    <UserProvider>
      <AuthProvider>
        <GameProvider>
          <SafeAreaProvider>
            <View style={styles.background}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: 'transparent' }
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="auth/login" />
                <Stack.Screen name="auth/verify-otp" />
                <Stack.Screen name="lobby" />
              </Stack>
            </View>
          </SafeAreaProvider>
        </GameProvider>
      </AuthProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#0F0F23' }
});
