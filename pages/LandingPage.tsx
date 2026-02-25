
import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-indigo-50 to-white">
      <div className="max-w-4xl w-full text-center mb-12 animate-fade-in">
        <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-200">
                <i className="fas fa-compass"></i>
            </div>
        </div>
        <h1 className="text-5xl font-bold text-slate-800 mb-4">LIS ComPASS</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Navigate your path to LIS success. Gamified reviews, mockboard exams, and progress tracking for the modern information professional.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Student Role */}
        <Link to="/login/student" className="group">
          <GlassCard className="h-full flex flex-col items-center text-center p-10 cursor-pointer group-hover:border-blue-400 group-hover:scale-[1.02] transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <i className="fas fa-user-graduate"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Student</h2>
            <p className="text-slate-600 mb-8">Access games, take mock exams, and track your board exam preparation journey.</p>
            <div className="mt-auto bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md group-hover:shadow-blue-200">
              Get Started
            </div>
          </GlassCard>
        </Link>

        {/* Admin Role */}
        <Link to="/login/admin" className="group">
          <GlassCard className="h-full flex flex-col items-center text-center p-10 cursor-pointer group-hover:border-purple-400 group-hover:scale-[1.02] transition-all">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6 text-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <i className="fas fa-user-shield"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Administrator</h2>
            <p className="text-slate-600 mb-8">Manage content, analyze student metrics, and oversee platform operations.</p>
            <div className="mt-auto bg-white text-purple-600 border-2 border-purple-200 px-8 py-3 rounded-full font-semibold group-hover:bg-purple-50">
              Admin Login
            </div>
          </GlassCard>
        </Link>
      </div>

      <footer className="mt-16 text-slate-400 text-sm">
        © 2024 LIS ComPASS. Powered by Gemini AI.
      </footer>
    </div>
  );
};

export default LandingPage;
