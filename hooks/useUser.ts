// hooks/useUser.ts
import { UserContext } from '@/context/userProvider';
import { useContext } from 'react';

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
