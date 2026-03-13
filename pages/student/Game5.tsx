/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, Info, Play, RefreshCw, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MARC_TAGS, MARC_QUESTIONS, MARCQuestion, MARCTag } from './data/marcMatchData';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface GameState {
  status: 'start' | 'instructions' | 'playing' | 'gameover';
  difficulty: Difficulty;
  score: number;
  lives: number;
  timeLeft: number;
  currentQuestion: MARCQuestion | null;
  options: MARCTag[];
}

const DIFFICULTY_CONFIG = {
  Easy: { time: 20, timeBonus: 1, showLabels: true, optionsCount: 5 },
  Medium: { time: 20, timeBonus: 1, showLabels: false, optionsCount: 5 },
  Hard: { time: 15, timeBonus: 0.5, showLabels: false, optionsCount: 5 },
};

export default function MARCMatch() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    status: 'start',
    difficulty: 'Easy',
    score: 0,
    lives: 3,
    timeLeft: 20,
    currentQuestion: null,
    options: [],
  });

  const [instructionPage, setInstructionPage] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomQuestion = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * MARC_QUESTIONS.length);
    return MARC_QUESTIONS[randomIndex];
  }, []);

  const getRandomOptions = useCallback((correctTag: string, count: number) => {
    const correctOption = MARC_TAGS.find(t => t.tag === correctTag)!;
    const otherOptions = MARC_TAGS.filter(t => t.tag !== correctTag)
      .sort(() => 0.5 - Math.random())
      .slice(0, count - 1);
    
    return [correctOption, ...otherOptions].sort(() => 0.5 - Math.random());
  }, []);

  const startNewRound = useCallback((difficulty: Difficulty) => {
    const question = getRandomQuestion();
    const options = getRandomOptions(question.correctTag, DIFFICULTY_CONFIG[difficulty].optionsCount);
    setGameState(prev => ({
      ...prev,
      status: 'playing',
      difficulty,
      score: 0,
      lives: 3,
      timeLeft: DIFFICULTY_CONFIG[difficulty].time,
      currentQuestion: question,
      options,
    }));
  }, [getRandomQuestion, getRandomOptions]);

  // Add missing startGame function
  const startGame = (difficulty: Difficulty) => {
    startNewRound(difficulty);
  };

  const handleMatch = (tag: string) => {
    if (!gameState.currentQuestion) return;

    if (tag === gameState.currentQuestion.correctTag) {
      const config = DIFFICULTY_CONFIG[gameState.difficulty];
      setGameState(prev => ({
        ...prev,
        score: prev.score + 1,
        timeLeft: Math.min(config.time, prev.timeLeft + config.timeBonus),
      }));
      startNewRound(gameState.difficulty);
    } else {
      setGameState(prev => {
        const newLives = prev.lives - 1;
        if (newLives <= 0) {
          return { ...prev, lives: 0, status: 'gameover' };
        }
        return { ...prev, lives: newLives };
      });
      // Optional: Visual feedback for wrong answer
    }
  };

  const renderStartScreen = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-tighter italic" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
        MARC MATCH
      </h1>
      <div className="flex flex-col space-y-4 w-64">
        {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(diff => (
          <button
            key={diff}
            onClick={() => {
              setGameState(prev => ({ ...prev, difficulty: diff }));
              setGameState(prev => ({ ...prev, status: 'instructions' }));
            }}
            className="px-8 py-3 bg-gradient-to-b from-slate-700 to-slate-800 border-2 border-slate-500 rounded-2xl text-2xl font-bold text-slate-200 hover:from-slate-600 hover:to-slate-700 transition-all shadow-xl"
          >
            {diff}
          </button>
        ))}
      </div>
    </div>
  );

  const renderInstructions = () => (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-8 text-center">
      <h2 className="text-5xl font-bold text-cyan-400 mb-8 uppercase italic">HOW TO PLAY</h2>
      
      {instructionPage === 1 ? (
        <div className="space-y-6 text-xl text-cyan-100 leading-relaxed font-medium uppercase italic">
          <p>1. Click and drag the (Rectangle) to its corresponding MARC Tag</p>
          <p>2. You will be given {DIFFICULTY_CONFIG[gameState.difficulty].time}/{DIFFICULTY_CONFIG[gameState.difficulty].time}/{DIFFICULTY_CONFIG[gameState.difficulty].time === 20 ? 15 : 20} sec to match as many (Rectangles) as possible</p>
          <p>3. Correct match will add {DIFFICULTY_CONFIG[gameState.difficulty].timeBonus} sec to the timer (Timer won't exceed {DIFFICULTY_CONFIG[gameState.difficulty].time} sec), while wrong match lose your life up to 3 life and after that its game over.</p>
        </div>
      ) : (
        <div className="space-y-6 text-xl text-cyan-100 leading-relaxed font-medium uppercase italic">
          <p>4. MARC Tags are randomized each round</p>
        </div>
      )}

      <div className="mt-12 flex space-x-4">
        {instructionPage === 1 ? (
          <button
            onClick={() => setInstructionPage(2)}
            className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-xl font-bold text-xl uppercase italic hover:bg-cyan-400 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => startGame(gameState.difficulty)}
            className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-xl font-bold text-xl uppercase italic hover:bg-cyan-400 transition-colors"
          >
            Start Game
          </button>
        )}
      </div>
    </div>
  );

  const renderGameOver = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <h2 className="text-6xl font-bold text-red-500 uppercase italic">GAME OVER</h2>
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 text-center space-y-4">
        <p className="text-2xl text-slate-400 uppercase italic">Final Score</p>
        <p className="text-7xl font-bold text-cyan-400">{gameState.score}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => setGameState(prev => ({ ...prev, status: 'start' }))}
          className="px-8 py-3 bg-slate-700 text-white rounded-xl font-bold text-xl uppercase italic hover:bg-slate-600 transition-colors"
        >
          Main Menu
        </button>
        <button
          onClick={() => startGame(gameState.difficulty)}
          className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-xl font-bold text-xl uppercase italic hover:bg-cyan-400 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );

  const renderGame = () => {
    const config = DIFFICULTY_CONFIG[gameState.difficulty];
    const progress = (gameState.timeLeft / config.time) * 100;

    return (
      <div className="flex flex-col h-full p-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="w-64">
            <div className="h-4 w-full bg-slate-800 rounded-full border border-slate-700 overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 to-yellow-500"
                initial={{ width: '100%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-2xl font-bold text-white italic">
              {Math.ceil(gameState.timeLeft)} sec (+{config.timeBonus} sec)
            </p>
          </div>

          <div className="text-3xl font-bold text-white italic uppercase">
            {gameState.difficulty}
          </div>

          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-10 h-10 ${i < gameState.lives ? 'text-red-500 fill-red-500' : 'text-slate-700'}`}
              />
            ))}
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-20">
          <AnimatePresence mode="wait">
            {gameState.currentQuestion && (
              <motion.div
                key={gameState.currentQuestion.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="relative group cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={1}
                onDragEnd={(_, info) => {
                  // Check if dropped near any box
                  // This is a simplified hit detection
                  const dropY = info.point.y;
                  if (dropY > window.innerHeight * 0.6) {
                    const dropX = info.point.x;
                    const boxWidth = window.innerWidth / config.optionsCount;
                    const index = Math.floor(dropX / boxWidth);
                    if (index >= 0 && index < gameState.options.length) {
                      handleMatch(gameState.options[index].tag);
                    }
                  }
                }}
              >
                <div className="bg-gradient-to-b from-yellow-400 to-orange-500 p-1 rounded-[2rem] shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                  <div className="bg-slate-900 px-12 py-8 rounded-[1.8rem] border-4 border-yellow-500/50 min-w-[300px] text-center">
                    <p className="text-3xl font-bold text-white italic leading-tight">
                      {gameState.currentQuestion.content.toLowerCase()}
                    </p>
                  </div>
                </div>
                {/* Decorative handles */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-yellow-500 rounded-l-xl border-2 border-yellow-600" />
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-yellow-500 rounded-r-xl border-2 border-yellow-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Options Area */}
        <div className="grid grid-cols-5 gap-4 mt-auto">
          {gameState.options.map((option, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMatch(option.tag)}
                className="relative group"
              >
                {/* Box SVG */}
                <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 40L60 20L110 40V80L60 100L10 80V40Z" fill="#78350F" stroke="#451A03" strokeWidth="2"/>
                  <path d="M10 40L60 60L110 40" stroke="#451A03" strokeWidth="2"/>
                  <path d="M60 60V100" stroke="#451A03" strokeWidth="2"/>
                  <path d="M10 40L30 10L80 10L110 40" fill="#92400E" stroke="#451A03" strokeWidth="2"/>
                  <rect x="35" y="65" width="50" height="25" fill="#B45309" rx="4" />
                  <text x="60" y="83" textAnchor="middle" fill="white" className="text-2xl font-bold italic">{option.tag}</text>
                </svg>
              </motion.button>
              {config.showLabels && (
                <p className="text-white text-center font-bold italic leading-tight text-sm">
                  {option.label}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans selection:bg-cyan-500/30">
      <div className="max-w-5xl mx-auto h-screen flex flex-col">
        {/* Navigation */}
        <div className="p-4 flex justify-between items-center">
          <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-xl font-bold italic">{gameState.score}</span>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="flex-1">
          {gameState.status === 'start' && renderStartScreen()}
          {gameState.status === 'instructions' && renderInstructions()}
          {gameState.status === 'playing' && renderGame()}
          {gameState.status === 'gameover' && renderGameOver()}
        </div>
      </div>
    </div>
  );
}
