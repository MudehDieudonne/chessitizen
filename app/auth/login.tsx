'use client';
import { useAuth } from '@/hooks/useAuthAPI';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { sendOTP } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email) return Alert.alert('Error', 'Please enter your email');
    setLoading(true);
    try {
      const success = await sendOTP(email);
      if (success) {
        router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        Alert.alert('Error', 'Failed to send OTP. Try again.');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F23' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 32 }}
      >
        <View
          style={{
            marginBottom: 48,
            alignItems: 'center',
            shadowColor: '#8B5CF6',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 10
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: '#FFFFFF',
              textShadowColor: '#8B5CF6',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 15
            }}
          >
            🔒
          </Text>
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: 8,
            textAlign: 'center'
          }}
        >
          Welcome Back
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: '#9CA3AF',
            marginBottom: 32,
            textAlign: 'center'
          }}
        >
          Enter your email to continue
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            width: '100%',
            height: 55,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#374151',
            backgroundColor: '#1A1A2E',
            paddingHorizontal: 16,
            fontSize: 16,
            color: '#FFFFFF',
            marginBottom: 32
          }}
          editable={!loading}
        />

        <TouchableOpacity
          onPress={handleContinue}
          disabled={loading || !email}
          style={{
            width: '100%',
            backgroundColor: loading || !email ? '#374151' : '#8B5CF6',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: loading || !email ? '#374151' : '#8B5CF6'
          }}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF'
              }}
            >
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
