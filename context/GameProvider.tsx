'use client';
import { axiosInstance } from '@/services/api';
import React, { createContext, ReactNode, useState } from 'react';

interface GameContextType {
  createGame: (vsAI?: boolean) => Promise<string>;
  loading: boolean;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const createGame = async (vsAI = false) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post<{ gameId: string }>(
        '/game/create',
        { vsAI }
      );
      setLoading(false);
      return response.data.gameId;
    } catch (err) {
      setLoading(false);
      console.error('Failed to create game:', err);
      throw err;
    }
  };

  return (
    <GameContext.Provider value={{ createGame, loading }}>
      {children}
    </GameContext.Provider>
  );
};
