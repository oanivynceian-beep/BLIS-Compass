
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { AlertTriangle, LogOut, RefreshCw, Loader2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const { session, profile, signOut, refreshProfile } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();

  // Redirect to dashboard if profile is found
  useEffect(() => {
    if (session && profile) {
      if (profile.role === 'student') navigate('/student');
      else navigate('/staff');
    }
  }, [session, profile, navigate]);

  // Redirect to home if signed out
  useEffect(() => {
    if (!session && !isSigningOut) {
      navigate('/');
    }
  }, [session, isSigningOut, navigate]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshProfile();
    } catch (err) {
      console.error('Refresh failed:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      // Clear local storage explicitly to be sure
      localStorage.removeItem('lis-compass-auth-token');
      await signOut();
      navigate('/');
    } catch (err) {
      console.error('Sign out failed:', err);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Account Setup Error</h2>
          <p className="text-slate-500 mb-8">
            We couldn't determine your account role or your profile is missing. This usually happens if the profile creation was interrupted.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing || isSigningOut}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isRefreshing ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
              {isRefreshing ? 'Repairing Profile...' : 'Try Repairing Profile'}
            </button>
            <button
              onClick={handleSignOut}
              disabled={isRefreshing || isSigningOut}
              className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {isSigningOut ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
              {isSigningOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
          
          <p className="mt-6 text-xs text-slate-400">
            If repairing fails, please sign out and create a new account.
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
