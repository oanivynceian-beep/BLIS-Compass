  /**
   * @license
   * SPDX-License-Identifier: Apache-2.0
   */

  import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    initialLives: 5,
    showLabels: true,
    optionsCount: 5
  };

  export default function MARCMatch() {
    const [gameState, setGameState] = useState<GameState>({
      status: 'start',
      difficulty: 'Easy',
      score: 0,
      lives: 5,
      timeLeft: 0,
      currentQuestion: null,
      options: [],
    });

    const [instructionPage, setInstructionPage] = useState(1);

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

    const startNewRound = useCallback(() => {
      const question = getRandomQuestion();
      const options = getRandomOptions(question.correctTag, DIFFICULTY_CONFIG.optionsCount);
      
      setGameState(prev => ({
        ...prev,
        currentQuestion: question,
        options,
      }));
    }, [getRandomQuestion, getRandomOptions]);

    const startGame = () => {
      setGameState({
        status: 'playing',
        difficulty: 'Easy',
        score: 0,
        lives: DIFFICULTY_CONFIG.initialLives,
        timeLeft: 0,
        currentQuestion: null,
        options: [],
      });
      startNewRound();
    };

    const handleMatch = (tag: string) => {
      if (!gameState.currentQuestion) return;

      if (tag === gameState.currentQuestion.correctTag) {
        setGameState(prev => {
          const newScore = prev.score + 1;
          let newLives = prev.lives;
          
          // Every 5 points gain a heart, max 5
          if (newScore > 0 && newScore % 5 === 0) {
            newLives = Math.min(5, prev.lives + 1);
          }

          return {
            ...prev,
            score: newScore,
            lives: newLives
          };
        });
        startNewRound();
      } else {
        setGameState(prev => {
          const newLives = prev.lives - 1;
          if (newLives <= 0) {
            return { ...prev, lives: 0, status: 'gameover' };
          }
          return { ...prev, lives: newLives };
        });
      }
    };

    const renderStartScreen = () => (
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-tighter italic" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
          MARC MATCH
        </h1>
        <div className="flex flex-col space-y-4 w-64">
          <button
            onClick={() => {
              setGameState(prev => ({ ...prev, status: 'instructions' }));
            }}
            className="px-8 py-4 bg-gradient-to-b from-cyan-500 to-cyan-600 border-2 border-cyan-400 rounded-2xl text-3xl font-bold text-slate-900 hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] uppercase italic"
          >
            START GAME
          </button>
        </div>
      </div>
    );

    const renderInstructions = () => (
      <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-8 text-center">
        <h2 className="text-5xl font-bold text-cyan-400 mb-8 uppercase italic">HOW TO PLAY</h2>
        
        {instructionPage === 1 ? (
          <div className="space-y-6 text-xl text-cyan-100 leading-relaxed font-medium uppercase italic">
            <p>1. Click and drag the (Rectangle) to its corresponding MARC Tag</p>
            <p>2. You start with {DIFFICULTY_CONFIG.initialLives} lives. Match as many as possible!</p>
            <p>3. Correct match adds 1 point. Every 5 points, you gain +1 heart (Max 5 hearts).</p>
          </div>
        ) : (
          <div className="space-y-6 text-xl text-cyan-100 leading-relaxed font-medium uppercase italic">
            <p>4. Wrong match loses 1 heart. Game over if you run out of hearts!</p>
            <p>5. MARC Tags are randomized each round</p>
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
              onClick={() => startGame()}
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
            onClick={() => startGame()}
            className="px-8 py-3 bg-cyan-500 text-slate-900 rounded-xl font-bold text-xl uppercase italic hover:bg-cyan-400 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );

    const renderGame = () => {
      const config = DIFFICULTY_CONFIG;

      return (
        <div className="flex flex-col h-full p-8 relative overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div className="w-64">
              <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="text-2xl font-bold text-white italic">{gameState.score}</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-white italic uppercase">
              MARC MATCH
            </div>

            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-8 h-8 ${i < gameState.lives ? 'text-red-500 fill-red-500' : 'text-slate-700'}`}
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
