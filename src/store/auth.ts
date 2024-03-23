/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  token: string | null;
  setToken: (token: string) => void;
}

/*
* Without persist
export const useAuthStore = create<AuthStore>((set) => ({ // * This callback must return an object
  token: null,
  setToken: (token: string) => set((state) => ({ // * This fc updates the token
    ...state,
    token
  })),
})) 
*/

export const useAuthStore = create(persist<AuthStore>(
  (set) => ({
    token: null,
    setToken: (token: string) => set((state) => ({
      ...state,
      token
    })),
  }), {
  name: 'auth-storage', // * The name of the localStorage key
}
)) 