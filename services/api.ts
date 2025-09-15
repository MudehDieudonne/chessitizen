import axios from 'axios';

interface SendOTPResponse {
  message: string;
}

interface VerifyOTPResponse {
  message: string;
  userId?: string;
}

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.109:3000/api';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Send OTP to email
export const sendOTPRequest = async (email: string) => {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) throw new Error('Email is required');
  return axiosInstance.post<SendOTPResponse>('/auth/otp/send', {
    email: trimmedEmail
  });
};

export const verifyOTPRequest = async (email: string, otp: string) => {
  const trimmedEmail = email.trim();
  const trimmedOtp = otp.trim();
  if (!trimmedEmail || trimmedOtp.length !== 6) {
    throw new Error('Email and 6-digit OTP are required');
  }
  return axiosInstance.post<VerifyOTPResponse>('/auth/otp/verify', {
    email: trimmedEmail,
    otp: trimmedOtp
  });
};
