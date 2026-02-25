
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { AlertTriangle, LogOut, RefreshCw } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ErrorPage: React.FC = () => {
  const { signOut, refreshProfile } = useAuth();

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
            We couldn't determine your account role or your profile is missing. Please try refreshing or contact support.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => refreshProfile()}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <RefreshCw size={18} />
              Try Refreshing
            </button>
            <button
              onClick={signOut}
              className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
