'use client';

import { useAuth } from '@/hooks/useAuthAPI';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
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

export default function VerifyOtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string;

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const inputs = useRef<(TextInput | null)[]>([]);
  const { verifyOTP, sendOTP } = useAuth();

  // Redirect back if no email
  useEffect(() => {
    if (!email) router.back();
  }, [email]);

  // Resend countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) return;

    setLoading(true);
    try {
      const user = await verifyOTP(email, enteredOtp);
      if (user) {
        // Navigate to lobby after successful verification
        router.replace('/lobby');
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (err) {
      console.error('verifyOTP error', err);
      Alert.alert('Error', 'Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    setLoading(true);
    try {
      const success = await sendOTP(email);
      if (success) {
        setResendTimer(60);
        Alert.alert('Success', 'New OTP sent to your email');
      } else {
        Alert.alert('Error', 'Failed to resend OTP');
      }
    } catch {
      Alert.alert('Error', 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F23' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '600',
              color: '#8B5CF6',
              marginRight: 24
            }}
          >
            Chessizen
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 32
          }}
        >
          {/* Logo */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 48,
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
            Verify Your Email
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: '#9CA3AF',
              marginBottom: 8,
              textAlign: 'center'
            }}
          >
            We sent a 6-digit code to
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: '#8B5CF6',
              marginBottom: 40,
              textAlign: 'center',
              fontWeight: '600'
            }}
          >
            {email}
          </Text>

          {/* OTP Input */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: 32,
              paddingHorizontal: 10
            }}
          >
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref!)}
                style={{
                  width: 45,
                  height: 55,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: digit ? '#8B5CF6' : '#374151',
                  backgroundColor: '#1A1A2E',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#FFFFFF'
                }}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                editable={!loading}
              />
            ))}
          </View>

          {/* Resend Timer */}
          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              marginBottom: 32,
              textAlign: 'center'
            }}
          >
            {resendTimer > 0 ? (
              `Resend code in ${resendTimer}s`
            ) : (
              <TouchableOpacity onPress={handleResendOTP} disabled={loading}>
                <Text
                  style={{
                    color: loading ? '#6B7280' : '#8B5CF6',
                    fontWeight: '600'
                  }}
                >
                  Resend code
                </Text>
              </TouchableOpacity>
            )}
          </Text>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleVerify}
            disabled={loading || otp.join('').length !== 6}
            style={{
              width: '100%',
              backgroundColor:
                loading || otp.join('').length !== 6 ? '#374151' : '#8B5CF6',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor:
                loading || otp.join('').length !== 6 ? '#374151' : '#8B5CF6'
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
                Verify
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
