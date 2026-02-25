
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { UserRole } from '../types';
import { supabase } from '../src/lib/supabase';

const LoginPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isStudent = role === 'student';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        // Check if role matches
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profileError) throw profileError;
        
        let userProfile = profile;

        if (!userProfile) {
          // Auto-repair: If auth succeeds but profile is missing, create a default one
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                full_name: data.user.user_metadata?.full_name || 'New User',
                role: isStudent ? UserRole.STUDENT : UserRole.ADMIN,
                level: 1,
                exp: 0,
                streak: 0
              }
            ])
            .select('role')
            .single();

          if (createError) {
            await supabase.auth.signOut();
            throw new Error("Your account exists but we couldn't set up your profile. Please check your database permissions (RLS).");
          }
          userProfile = newProfile;
        }

        const expectedRole = isStudent ? UserRole.STUDENT : UserRole.ADMIN;
        if (userProfile.role !== expectedRole) {
          await supabase.auth.signOut();
          throw new Error(`This account is not registered as ${isStudent ? 'a student' : 'an administrator'}.`);
        }

        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <i className="fas fa-arrow-left mr-2"></i> Back to Home
        </Link>
        
        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Welcome Back!</h2>
            <p className="text-slate-500">Log in as {isStudent ? 'a Student' : 'an Administrator'}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
              <i className="fas fa-exclamation-circle mr-2"></i> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center ${isStudent ? 'bg-blue-600 shadow-blue-200' : 'bg-purple-600 shadow-purple-200'} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {isStudent && (
            <div className="mt-8 text-center">
              <p className="text-slate-500">Don't have an account?</p>
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">Create a Student Account</Link>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default LoginPage;
