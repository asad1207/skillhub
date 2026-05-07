import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthUser {
  id:       string;
  email:    string;
  name:     string;
  branch:   string;
  year:     string;
  initials: string;
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function useAuth() {
  const [user, setUser]       = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  // ── Listen to auth state changes ──────────────────────────────────────────
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadProfile(session.user);
      else setLoading(false);
    });

    // Listen for changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) loadProfile(session.user);
        else { setUser(null); setLoading(false); }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Load profile from DB after auth ───────────────────────────────────────
  const loadProfile = async (authUser: User) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (data) {
      setUser({
        id:       data.id,
        email:    data.email,
        name:     data.name,
        branch:   data.branch,
        year:     data.year,
        initials: getInitials(data.name),
      });
    }
    setLoading(false);
  };

  // ── SIGN UP ───────────────────────────────────────────────────────────────
  const signUp = async (
    email: string,
    password: string,
    name: string,
    branch: string,
    year: string
  ): Promise<string | null> => {
    setError('');
    setLoading(true);

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, branch, year },
        },
      });

      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error('Signup failed. Try again.');

      // 2. Save profile to DB
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id:         authData.user.id,
          email,
          name,
          branch,
          year,
          created_at: new Date().toISOString(),
        });

      if (profileError) throw new Error(profileError.message);

      return null; // no error
    } catch (err: any) {
      const msg = err.message || 'Something went wrong.';
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  // ── LOG IN ────────────────────────────────────────────────────────────────
  const logIn = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw new Error(authError.message);
      return null;
    } catch (err: any) {
      const msg = err.message || 'Invalid email or password.';
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  // ── LOG OUT ───────────────────────────────────────────────────────────────
  const logOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, error, signUp, logIn, logOut };
}
