import { create } from 'zustand';
import { mockUser } from '../lib/mockData';

// Zustand auth store — di Fase 5 ini akan diganti dengan Supabase Auth
export const useAuthStore = create((set) => ({
  user: null,       // null = belum login
  isLoggedIn: false,

  // Simulasi login pakai mock user
  login: () => set({ user: mockUser, isLoggedIn: true }),

  // Simulasi logout
  logout: () => set({ user: null, isLoggedIn: false }),
}));
