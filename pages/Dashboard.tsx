import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { User, GameCard, MockExam } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const GAMES: GameCard[] = [
  { id: '1', title: 'Cataloging Blitz', description: 'Correctly assign MARC tags in this fast-paced challenge.', category: 'Cataloging', icon: 'fas fa-tags', difficulty: 'Intermediate' },
  { id: '2', title: 'DDC Climber', description: 'Scale the mountain by correctly identifying class numbers.', category: 'Classification', icon: 'fas fa-mountain', difficulty: 'Beginner' },
  { id: '3', title: 'Reference Quest', description: 'Find the right sources for complex user inquiries.', category: 'Reference Services', icon: 'fas fa-search', difficulty: 'Advanced' },
  { id: '4', title: 'Indexing Maze', description: 'Connect related terms using controlled vocabulary.', category: 'Indexing', icon: 'fas fa-project-diagram', difficulty: 'Intermediate' },
];

const EXAMS: MockExam[] = [
  { id: '1', title: 'Full Mockboard A', questionsCount: 100, durationMinutes: 120, topic: 'Comprehensive' },
  { id: '2', title: 'IT Specialization', questionsCount: 50, durationMinutes: 60, topic: 'Library Tech' },
  { id: '3', title: 'Management Mastery', questionsCount: 40, durationMinutes: 45, topic: 'Organization' },
];

const PROGRESS_DATA = [
  { day: 'Mon', score: 65 },
  { day: 'Tue', score: 72 },
  { day: 'Wed', score: 68 },
  { day: 'Thu', score: 85 },
  { day: 'Fri', score: 82 },
  { day: 'Sat', score: 90 },
  { day: 'Sun', score: 95 },
];

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'games' | 'exams'>('overview');

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center space-x-3 mb-10 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
            <i className="fas fa-compass"></i>
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">ComPASS</span>
        </div>

        <nav className="space-y-2 flex-grow">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <i className="fas fa-home"></i>
            <span>Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('games')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'games' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <i className="fas fa-gamepad"></i>
            <span>Mini-Games</span>
          </button>
          <button 
            onClick={() => setActiveTab('exams')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'exams' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <i className="fas fa-file-alt"></i>
            <span>Mock Exams</span>
          </button>
          <div className="pt-6 mt-6 border-t border-slate-100">
             <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50">
                <i className="fas fa-chart-line"></i>
                <span>Analytics</span>
             </button>
             <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
             </button>
          </div>
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Log Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Hello, {user.name.split(' ')[0]}! 👋</h1>
            <p className="text-slate-500">Ready to master the board exams today?</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <GlassCard className="px-4 py-2 flex items-center space-x-3 !rounded-full">
               <div className="flex items-center text-orange-500 font-bold">
                 <i className="fas fa-fire mr-2"></i>
                 <span>{user.streak} Days</span>
               </div>
               <div className="h-6 w-px bg-slate-200"></div>
               <div className="flex items-center text-blue-600 font-bold">
                 <i className="fas fa-star mr-2"></i>
                 <span>LVL {user.level}</span>
               </div>
            </GlassCard>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm">
                {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Stats Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Summary */}
              <GlassCard className="h-64">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800 text-lg">Performance Trend</h3>
                  <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">+12% from last week</span>
                </div>
                <div className="h-40 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={PROGRESS_DATA}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                           contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
              </GlassCard>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                   { label: 'Cataloging', icon: 'fa-tags', color: 'text-blue-600', bg: 'bg-blue-50' },
                   { label: 'Admin', icon: 'fa-building', color: 'text-purple-600', bg: 'bg-purple-50' },
                   { label: 'Indexing', icon: 'fa-indent', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                   { label: 'Reference', icon: 'fa-info-circle', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                 ].map((item, idx) => (
                   <button key={idx} className="flex flex-col items-center justify-center p-4 rounded-20 bg-white border border-slate-100 hover:shadow-md transition-all group">
                      <div className={`${item.bg} ${item.color} w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}>
                        <i className={`fas ${item.icon}`}></i>
                      </div>
                      <span className="text-sm font-medium text-slate-600">{item.label}</span>
                   </button>
                 ))}
              </div>

              {/* Featured Mini-Game */}
              <div className="grid md:grid-cols-2 gap-6">
                 {GAMES.slice(0, 2).map((game) => (
                    <GlassCard key={game.id} hoverEffect className="relative overflow-hidden group">
                       <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                            <i className={game.icon}></i>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{game.title}</h4>
                            <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{game.difficulty}</span>
                          </div>
                       </div>
                       <p className="text-sm text-slate-500 mb-6">{game.description}</p>
                       <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold transition-all hover:bg-blue-700">
                          Play Now
                       </button>
                    </GlassCard>
                 ))}
              </div>
            </div>

            {/* Sidebar / Profile Area */}
            <div className="space-y-8">
               {/* Today's Goal */}
               <GlassCard className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none">
                  <h3 className="font-bold text-lg mb-2">Today's Goal</h3>
                  <p className="text-blue-100 text-sm mb-6">Complete 2 Mockboard Simulations to reach Level 13.</p>
                  
                  <div className="mb-2 flex justify-between text-xs">
                    <span>Progress (1/2)</span>
                    <span>50%</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-6">
                    <div className="bg-white h-full" style={{ width: '50%' }}></div>
                  </div>
                  
                  <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold shadow-sm transition-transform active:scale-95">
                    View Daily Tasks
                  </button>
               </GlassCard>

               {/* Recent Activity */}
               <GlassCard>
                  <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Mock Exam Completed', time: '2h ago', points: '+250 XP', icon: 'fa-check-circle', color: 'text-emerald-500' },
                      { action: 'Cataloging Blitz', time: 'Yesterday', points: '+120 XP', icon: 'fa-gamepad', color: 'text-blue-500' },
                      { action: 'Earned "DDC Expert"', time: '2d ago', points: '+500 XP', icon: 'fa-medal', color: 'text-amber-500' },
                    ].map((act, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className={`mt-1 text-lg ${act.color}`}>
                          <i className={`fas ${act.icon}`}></i>
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-semibold text-slate-700">{act.action}</p>
                          <p className="text-xs text-slate-400">{act.time}</p>
                        </div>
                        <span className="text-xs font-bold text-blue-600">{act.points}</span>
                      </div>
                    ))}
                  </div>
               </GlassCard>
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GAMES.map((game) => (
              <GlassCard key={game.id} hoverEffect className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                   <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl">
                      <i className={game.icon}></i>
                   </div>
                   <div className="text-right">
                      <span className="block text-xs text-slate-400 uppercase tracking-tighter font-bold">Category</span>
                      <span className="text-sm font-bold text-slate-800">{game.category}</span>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{game.title}</h3>
                <p className="text-slate-500 text-sm mb-6 flex-grow">{game.description}</p>
                <div className="flex items-center justify-between mt-auto">
                   <span className={`text-xs px-2 py-1 rounded-md font-bold ${
                     game.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600' :
                     game.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-600' :
                     'bg-rose-50 text-rose-600'
                   }`}>
                     {game.difficulty}
                   </span>
                   <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                     Play
                   </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-6">
            <GlassCard className="bg-slate-800 text-white p-10 relative overflow-hidden">
               <div className="relative z-10 max-w-lg">
                  <h2 className="text-3xl font-bold mb-4">Board Exam Simulation</h2>
                  <p className="text-slate-300 mb-8">Test your knowledge under real exam conditions. Our AI-powered feedback will analyze your weak spots after each session.</p>
                  <button className="bg-white text-slate-800 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center">
                    Start Full Simulation <i className="fas fa-arrow-right ml-3"></i>
                  </button>
               </div>
               <div className="absolute right-0 bottom-0 opacity-10 text-[180px] pointer-events-none transform translate-y-12">
                  <i className="fas fa-graduation-cap"></i>
               </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {EXAMS.map((exam) => (
                 <GlassCard key={exam.id} hoverEffect>
                    <div className="flex justify-between items-start mb-4">
                       <h3 className="font-bold text-lg text-slate-800">{exam.title}</h3>
                       <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold uppercase">{exam.topic}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-500 mb-6">
                       <div className="flex items-center">
                          <i className="fas fa-question-circle mr-2"></i>
                          {exam.questionsCount} Items
                       </div>
                       <div className="flex items-center">
                          <i className="fas fa-clock mr-2"></i>
                          {exam.durationMinutes} Min
                       </div>
                    </div>
                    <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-xl font-bold transition-all">
                       Take Mock Exam
                    </button>
                 </GlassCard>
               ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
