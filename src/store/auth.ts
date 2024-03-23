/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type user = {
  email: string;
  password: string;
}
interface AuthStore {
  token: string | null;
  profile: user | null;
  isLogged: boolean;
  setToken: (token: string) => void;
  setProfile: (profile: user) => void;
  logout: () => void;
}

interface CredentialsStore {
  credentials: user | null;
  setCredentials: (profile: user) => void;
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
    profile: null,
    isLogged: false,
    setToken: (token: string) => set((state) => ({
      ...state,
      token,
      isLogged: true
    })),
    setProfile: (profile: user) => set((state) => ({
      ...state,
      profile
    })),
    logout: () => set((state) => ({
      ...state,
      token: null,
      profile: null,
      isLogged: false
    }))
  }), {
  name: 'auth-storage', // * The name of the localStorage key
}
))

// * As example we creating another store to save the user credentials in another localStorage key
export const useCredentialsStore = create(persist<CredentialsStore>(
  (set) => ({
    credentials: null,
    setCredentials: (credentials: user) => set((state) => ({
      ...state,
      credentials
    }))
  }), {
  name: 'credentials-storage', // * The name of the localStorage key
}
)) 