import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  isLoggedIn: false,
  isLoading: true,

  // Inisialisasi session dan dengarkan perubahan auth state
  initializeAuth: async () => {
    try {
      set({ isLoading: true });
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session?.user) {
        // Ambil data profil dari public.users
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({
          user: session.user,
          profile: profile || null,
          isLoggedIn: true,
          isLoading: false,
        });
      } else {
        set({ user: null, profile: null, isLoggedIn: false, isLoading: false });
      }

      // Listener auth change
      supabase.auth.onAuthStateChange(async (_event, newSession) => {
        if (newSession?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', newSession.user.id)
            .single();

          set({
            user: newSession.user,
            profile: profile || null,
            isLoggedIn: true,
            isLoading: false,
          });
        } else {
          set({ user: null, profile: null, isLoggedIn: false, isLoading: false });
        }
      });
    } catch (err) {
      console.error('Error saat inisialisasi auth:', err);
      set({ user: null, profile: null, isLoggedIn: false, isLoading: false });
    }
  },

  // Login dengan Email & Password
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Register pengguna baru (bebas tanpa validasi whitelist NIM)
  register: async ({ email, password, nim, fullName, university, batchYear }) => {
    // Daftarkan akun langsung ke Supabase Auth dengan metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nim: nim || '',
          full_name: fullName,
          university: university || 'UIN Syarif Hidayatullah Jakarta',
          batch_year: batchYear ? parseInt(batchYear, 10) : 2025,
        },
      },
    });

    if (error) throw error;
    return data;
  },

  // Logout
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, profile: null, isLoggedIn: false });
  },
}));
