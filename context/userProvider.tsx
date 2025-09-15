import axios from 'axios';
import React, { createContext, ReactNode, useState } from 'react';

export interface UserStats {
  overview: {
    rating: number;
    streak: number;
  };
}

interface UserContextType {
  userStats: UserStats | null;
  loading: boolean;
  fetchUserStats: (userId: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserStats = async (userId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://192.168.1.109:3000/api/users/${userId}/stats`
      );
      setUserStats(response.data);
    } catch (error) {
      console.error('fetchUserStats error:', error);
    }
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ userStats, loading, fetchUserStats }}>
      {children}
    </UserContext.Provider>
  );
};
