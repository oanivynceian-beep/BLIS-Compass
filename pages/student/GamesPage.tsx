import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../components/GlassCard';
import { GameCard } from '../../types';
import { 
  Gamepad2, 
  Tags,
  Mountain,
  Search,
  Network,
  Info,
  Building2,
  Indent
} from 'lucide-react';

export const GAMES: GameCard[] = [
  { id: '5', title: 'Reference Crush Pro', description: 'Test your reference skills in a fast-paced matching game.', category: 'Reference Services', icon: 'Search', difficulty: 'Advanced' },
  { id: '6', title: 'Source Detectives', description: 'Investigate and identify the correct sources in challenging scenarios.', category: 'Reference Services', icon: 'Search', difficulty: 'Intermediate' },
  { id: '7', title: 'Classify', description: 'Classify items correctly in this new challenge.', category: 'Classification', icon: 'Mountain', difficulty: 'Beginner' },
  { id: '8', title: 'Shelf Shuffle', description: 'Arrange books in the correct order on the shelf.', category: 'Cataloging', icon: 'Tags', difficulty: 'Intermediate' },
  { id: '9', title: 'Marc Match', description: 'Match MARC fields to their correct uses.', category: 'Cataloging', icon: 'Tags', difficulty: 'Intermediate' },
];

export const IconMap: Record<string, any> = {
  Tags, Mountain, Search, Network, Info, Building2, Indent
};

const GamesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {GAMES.map((game) => (
        <GlassCard key={game.id} hoverEffect className="flex flex-col border-white/60">
          <div className="flex items-center justify-between mb-4">
             <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                {React.createElement(IconMap[game.icon] || Gamepad2, { size: 28 })}
             </div>
             <div className="text-right">
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">Category</span>
                <span className="text-sm font-bold text-slate-800">{game.category}</span>
             </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{game.title}</h3>
          <p className="text-slate-500 text-sm mb-6 flex-grow">{game.description}</p>
          <div className="flex items-center justify-between mt-auto">
             <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider ${
               game.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600' :
               game.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-600' :
               game.difficulty === 'Advanced' ? 'bg-rose-50 text-rose-600' :
               game.difficulty === 'Pro' ? 'bg-blue-50 text-blue-600' :
               'bg-slate-50 text-slate-600'
             }`}>
               {game.difficulty}
             </span>
             <button
               className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
               onClick={() => {
                 if (game.title === 'Reference Crush Pro') {
                   navigate('/game1');
                 } else if (game.title === 'Source Detectives') {
                   navigate('/game2');
                 } else if (game.title === 'Classify') {
                   navigate('/game3');
                 } else if (game.title === 'Shelf Shuffle') {
                   navigate('/game4');
                 } else if (game.title === 'Marc Match') {
                   navigate('/game5');
                 }
               }}
             >
               Play
             </button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};

export default GamesPage;
