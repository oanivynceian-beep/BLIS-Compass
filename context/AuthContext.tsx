
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../src/lib/supabase';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      if (data) {
        return {
          id: data.id,
          name: data.full_name || 'User',
          email: email,
          role: data.role as UserRole,
          level: data.level || 1,
          exp: data.exp || 0,
          streak: data.streak || 0
        };
      }
      return null;
    } catch (err) {
      console.error('Unexpected error:', err);
      return null;
    }
  };

  const refreshProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const profile = await fetchProfile(session.user.id, session.user.email || '');
      setUser(profile);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const profile = await fetchProfile(session.user.id, session.user.email || '');
        setUser(profile);
      }
      setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const profile = await fetchProfile(session.user.id, session.user.email || '');
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};