import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type IUser = {
  uid: string;
  email: string;
  name?: string;
  role: string | null;
  avatar?: string;
  // Backend user fields
  userId?: string;
  firstName?: string;
  lastName?: string;

  dateOfBirth?: string; // in ISO format e.g., "2001-01-01"
  address?: string;
  emergencyContact?: string;
  phoneNumber?: string | null;
  institution?: string | null;
  designation?: string | null;
  bio?: string | null;

  isVerified?: boolean;
  createdAt?: string; // dates usually come as ISO strings from API
  updatedAt?: string;
};

type Role = string;

type AuthStore = {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  role: Role | null;
  
  // Actions
  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
  setUserRole: (role: Role) => void;

  clearUser: () => void;
  hasRole: (role: string) => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      token: localStorage.getItem('firebase-auth-token'),
      isAuthenticated: !!localStorage.getItem('firebase-auth-token'),
      setUserRole: (role) => {
        localStorage.setItem('user-role', role),
        set({ role });
      },
      setUser: (user) => {
        // Store backend user info in localStorage
        if (user.userId) localStorage.setItem('user-id', user.userId);
        if (user.email) localStorage.setItem('user-email', user.email);
        if (user.firstName) localStorage.setItem('user-firstName', user.firstName);
        if (user.lastName) localStorage.setItem('user-lastName', user.lastName);
        
        set({ user, isAuthenticated: true });
      },
      setToken: (token) => {
        localStorage.setItem('firebase-auth-token', token);
        set({ token, isAuthenticated: true });
      },
      clearUser: () => {
        localStorage.removeItem('firebase-auth-token');
        // Clear backend user data from localStorage
        localStorage.removeItem('user-id');
        localStorage.removeItem('user-email');
        localStorage.removeItem('user-firstName');
        localStorage.removeItem('user-lastName');
        set({ user: null, token: null, isAuthenticated: false });
      },
      hasRole: (role) => {
        const user = get().user;
        if (!user || !user.role) return false;
        
        if (Array.isArray(role)) {
          return role.includes(user.role);
        }
        return user.role === role;
      }
    }),
    {
      name: 'auth-store',
    }
  )
);

// Subscribe to store changes to update the auth header in API client
useAuthStore.subscribe((state) => {
  if (state.token) {
    // Set token for API client (if needed beyond localStorage)
    console.log('Auth token updated in store');
  }
});
