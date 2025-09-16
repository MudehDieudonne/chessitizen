'use client';
import { useUser } from '@/hooks/useUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  sendOTP: (email: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchUserStats } = useUser();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem('@user');
        if (json) {
          const storedUser = JSON.parse(json);
          setUser(storedUser);
        }
      } catch (err) {
        console.error('Failed to load user from storage', err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const sendOTP = async (email: string) => {
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/otp/send`, {
        email
      });
      return true;
    } catch (err) {
      console.error('sendOTP error', err);
      return false;
    }
  };

  const verifyOTP = async (
    email: string,
    otp: string
  ): Promise<User | null> => {
    try {
      const response = await axios.post<{ verified: boolean }>(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/otp/verify`,
        { email, otp }
      );

      if (!response.data.verified) return null;

      // Store email and id only
      const userToStore = { id: response.data.verified.id, email };
      setUser(userToStore);
      await AsyncStorage.setItem('@user', JSON.stringify(userToStore));

      return userToStore;
    } catch (err) {
      console.error('verifyOTP error', err);
      return null;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('@user');
    } catch (err) {
      console.error('logout error', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, sendOTP, verifyOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
