
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ShieldCheck, ArrowRight, Loader2, Compass } from 'lucide-react';
import { supabase } from '../src/lib/supabase';
import GlassCard from '../components/GlassCard';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const IndexEntry: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'staff'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      if (user.role === 'student') navigate('/student');
      else if (user.role === 'faculty' || user.role === 'admin') navigate('/staff');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      
      // Auth change listener in AuthContext will handle redirection
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-indigo-50 to-white flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
            <Compass size={40} />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-slate-800 mb-4 tracking-tight">LIS ComPASS</h1>
        <p className="text-slate-600 max-w-md mx-auto text-lg">
          Your path to Library and Information Science success.
        </p>
      </motion.div>

      <div className="w-full max-w-md">
        <div className="flex p-1 bg-slate-200/50 backdrop-blur-sm rounded-2xl mb-6">
          <button
            onClick={() => setActiveTab('student')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'student' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <GraduationCap size={18} />
            Student
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'staff' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldCheck size={18} />
            Staff
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'student' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'student' ? 20 : -20 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-8 border-white/40">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {activeTab === 'student' ? 'Student Login' : 'Staff Login'}
              </h2>
              <p className="text-slate-500 mb-8 text-sm">
                {activeTab === 'student' 
                  ? 'Access your review materials and mock exams.' 
                  : 'Manage platform content and student progress.'}
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-start gap-3">
                  <div className="mt-0.5">⚠️</div>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1">Password</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50"
                    placeholder="••••••••"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                    activeTab === 'student' 
                      ? 'bg-blue-600 shadow-blue-200 hover:bg-blue-700' 
                      : 'bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700'
                  } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              {activeTab === 'student' && (
                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                  <p className="text-slate-500 text-sm mb-2">Don't have an account?</p>
                  <Link to="/register" className="text-blue-600 font-bold hover:underline">Create Student Account</Link>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="mt-16 text-slate-400 text-xs uppercase tracking-widest font-medium">
        © 2024 LIS ComPASS • Powered by Gemini AI
      </footer>
    </div>
  );
};

export default IndexEntry;