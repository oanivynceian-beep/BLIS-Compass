
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ConfirmEmailPage: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email address';

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-indigo-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center border-white/40">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6 shadow-inner">
              <Mail size={40} />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Check your email</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We've sent a confirmation link to <span className="font-bold text-slate-800">{email}</span>. 
              Please click the link in the email to verify your account and start using ComPASS.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100 text-left">
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                <p>If you don't see the email, check your <span className="font-medium">spam</span> or <span className="font-medium">promotions</span> folder.</p>
              </div>
              
              <Link 
                to="/" 
                className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Back to Login
              </Link>
            </div>
          </GlassCard>
        </motion.div>
        
        <p className="text-center mt-8 text-slate-400 text-sm">
          Didn't receive the email? <button className="text-blue-600 font-semibold hover:underline">Resend link</button>
        </p>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
