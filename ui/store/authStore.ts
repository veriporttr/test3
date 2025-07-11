import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyId?: number;
  isActive: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  initializeAuth: () => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,

      login: async (email: string, password: string) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
            email,
            password,
          });

          const { token, user } = response.data;
          
          set({ user, token, isLoading: false });
          
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Giriş başarısız');
        }
      },

      register: async (data: RegisterData) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/register`, data);
          
          const { token, user } = response.data;
          
          set({ user, token, isLoading: false });
          
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Kayıt başarısız');
        }
      },

      logout: () => {
        set({ user: null, token: null });
        delete axios.defaults.headers.common['Authorization'];
      },

      setUser: (user: User) => {
        set({ user });
      },

      initializeAuth: () => {
        const { token } = get();
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        set({ isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);

// Initialize auth on store creation
useAuthStore.getState().initializeAuth();