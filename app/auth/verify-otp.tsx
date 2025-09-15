import { useAuth } from '@/context/AuthProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function VerifyOTP() {
  const router = useRouter();
  const searchParams = useLocalSearchParams(); // correct hook
  const email = searchParams.email || ''; // get email from query
  const { verifyOTP } = useAuth();

  const [otpInput, setOtpInput] = useState<string>('');

  const handleVerify = async () => {
    if (otpInput.length !== 6) {
      Alert.alert('Error', 'OTP must be 6 digits');
      return;
    }

    try {
      const success = await verifyOTP(email, otpInput);
      if (success) {
        router.replace('/lobby');
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
      console.error('verifyOTP failed', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otpInput}
        onChangeText={setOtpInput}
        keyboardType="numeric"
        maxLength={6}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center'
  },
  button: { backgroundColor: '#7C3AED', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
