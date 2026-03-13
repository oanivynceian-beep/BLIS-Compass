/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { Trophy, BookOpen, HelpCircle, ChevronLeft, Play, Info, Home, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHELF_SHUFFLE_LEVELS, ShelfBook, ShelfShuffleLevel, Difficulty } from './data/shelfShuffleData';

type Screen = 'START' | 'INSTRUCTIONS' | 'DIFFICULTY_SELECT' | 'LEVEL_SELECT' | 'GAME' | 'RESULTS';

export default function ShelfShuffle() {
  const [screen, setScreen] = useState<Screen>('START');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Easy');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [shuffledBooks, setShuffledBooks] = useState<ShelfBook[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  // Load completed levels from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('shelfShuffle_completed');
    if (saved) {
      setCompletedLevels(JSON.parse(saved));
    }
  }, []);

  const saveCompletedLevel = (id: number) => {
    const updated = [...new Set([...completedLevels, id])];
    setCompletedLevels(updated);
    localStorage.setItem('shelfShuffle_completed', JSON.stringify(updated));
  };

  const startLevel = (levelId: number) => {
    const level = SHELF_SHUFFLE_LEVELS.find(l => l.id === levelId);
    if (level) {
      setCurrentLevelId(levelId);
      // Shuffle books for the game
      const shuffled = [...level.books].sort(() => Math.random() - 0.5);
      setShuffledBooks(shuffled);
      setIsCorrect(null);
      setScreen('GAME');
    }
  };

  const checkShelf = () => {
    const level = SHELF_SHUFFLE_LEVELS.find(l => l.id === currentLevelId);
    if (!level) return;

    const correctOrderIds = level.books.map(b => b.id);
    const currentOrderIds = shuffledBooks.map(b => b.id);

    const isWin = JSON.stringify(correctOrderIds) === JSON.stringify(currentOrderIds);
    setIsCorrect(isWin);
    
    if (isWin) {
      saveCompletedLevel(currentLevelId);
      setTimeout(() => setScreen('RESULTS'), 1500);
    }
  };

  const renderStart = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1c3a] text-white p-6">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-6xl font-bold mb-12 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        style={{ fontFamily: "'Anton', sans-serif" }}
      >
        SHELF SHUFFLE
      </motion.h1>

      <div className="flex flex-col gap-6 w-full max-w-xs">
        <button
          onClick={() => setScreen('DIFFICULTY_SELECT')}
          className="group relative px-8 py-4 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full border-4 border-slate-300 shadow-[0_4px_0_rgb(71,85,105)] active:shadow-none active:translate-y-1 transition-all"
        >
          <span className="text-2xl font-bold text-slate-900 drop-shadow-sm">Start</span>
        </button>

        <button
          onClick={() => setScreen('INSTRUCTIONS')}
          className="group relative px-8 py-4 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full border-4 border-slate-300 shadow-[0_4px_0_rgb(71,85,105)] active:shadow-none active:translate-y-1 transition-all"
        >
          <span className="text-2xl font-bold text-slate-900 drop-shadow-sm">Instructions</span>
        </button>

        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors mt-4"
        >
          <Home size={20} />
          <span>Main Menu</span>
        </Link>
      </div>
    </div>
  );

  const renderInstructions = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1c3a] text-white p-8">
      <h2 className="text-5xl font-bold mb-12 text-cyan-400 tracking-tight">HOW TO PLAY</h2>
      
      <div className="max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <p className="text-xl leading-relaxed">
            1. Click on a book with your mouse (or your finger on a touch device) and hold down while dragging it into the correct order.
          </p>
          <p className="text-xl leading-relaxed">
            2. When you think your books are in the correct order, click the <span className="text-cyan-400 font-bold">Check My Shelf</span> button at the top of the screen to see if you are right.
          </p>
        </div>

        <button
          onClick={() => setScreen('START')}
          className="mt-8 px-8 py-3 bg-slate-600 hover:bg-slate-500 rounded-full border-2 border-slate-400 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );

  const renderDifficultySelect = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1c3a] text-white p-8">
      <h2 className="text-5xl font-bold mb-12 text-cyan-400 tracking-tight">SELECT DIFFICULTY</h2>
      
      <div className="flex flex-col gap-6 w-full max-w-xs">
        {(['Easy', 'Average', 'Difficult'] as Difficulty[]).map(diff => (
          <button
            key={diff}
            onClick={() => {
              setSelectedDifficulty(diff);
              setScreen('LEVEL_SELECT');
            }}
            className="group relative px-8 py-4 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full border-4 border-slate-300 shadow-[0_4px_0_rgb(71,85,105)] active:shadow-none active:translate-y-1 transition-all"
          >
            <span className="text-2xl font-bold text-slate-900 drop-shadow-sm">{diff}</span>
          </button>
        ))}

        <button
          onClick={() => setScreen('START')}
          className="mt-8 text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          <ChevronLeft size={24} />
          <span>Back</span>
        </button>
      </div>
    </div>
  );

  const renderLevelSelect = () => {
    const levels = SHELF_SHUFFLE_LEVELS.filter(l => l.difficulty === selectedDifficulty);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1c3a] text-white p-8">
        <h2 className="text-5xl font-bold mb-12 text-cyan-400 tracking-tight uppercase">{selectedDifficulty} Levels</h2>
        
        <div className="grid grid-cols-5 gap-4 max-w-2xl w-full">
          {levels.map(level => {
            const isCompleted = completedLevels.includes(level.id);

            return (
              <button
                key={level.id}
                onClick={() => startLevel(level.id)}
                className={`
                  aspect-square rounded-xl text-3xl font-bold flex items-center justify-center transition-all
                  ${isCompleted 
                    ? 'bg-green-500 text-white shadow-[0_4px_0_rgb(21,128,61)] hover:scale-105' 
                    : 'bg-white text-purple-400 shadow-[0_4px_0_rgb(200,200,200)] hover:scale-105'}
                `}
              >
                {level.id > 20 ? level.id - 20 : level.id > 10 ? level.id - 10 : level.id}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setScreen('DIFFICULTY_SELECT')}
          className="mt-12 text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ChevronLeft size={24} />
          <span>Back to Difficulty</span>
        </button>
      </div>
    );
  };

  const renderGame = () => {
    const level = SHELF_SHUFFLE_LEVELS.find(l => l.id === currentLevelId);
    if (!level) return null;

    const bookCount = shuffledBooks.length;
    const bookWidth = bookCount > 15 ? 'w-12' : bookCount > 10 ? 'w-16' : 'w-24';
    const spineWidth = bookCount > 15 ? 'w-8' : bookCount > 10 ? 'w-12' : 'w-16';
    const labelSize = bookCount > 15 ? 'text-[6px]' : bookCount > 10 ? 'text-[8px]' : 'text-[10px]';

    return (
      <div className="flex flex-col min-h-screen bg-[#1a1c3a] text-white">
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-black/20 backdrop-blur-sm border-b border-white/10">
          <button
            onClick={() => setScreen('LEVEL_SELECT')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Levels</span>
          </button>
          
          <div className="relative">
            <div className="bg-[#d97706] px-6 py-2 rounded-sm border-2 border-[#92400e] shadow-lg">
              <span className="font-serif font-bold text-white uppercase">{selectedDifficulty} - Activity {currentLevelId % 10 === 0 ? 10 : currentLevelId % 10}</span>
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-400"></div>
          </div>

          <button
            onClick={checkShelf}
            className="px-6 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg"
          >
            Check Shelf
          </button>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-hidden">
          <div className="relative w-full max-w-6xl bg-[#f5e6d3] p-12 rounded-lg shadow-2xl border-x-8 border-b-8 border-[#d4b483]">
            {/* Shelf Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12">
              <div className="w-full h-12 bg-[#e5d5c0] rounded-full flex items-center justify-end pr-8">
                <div className="w-0 h-0 border-y-[30px] border-y-transparent border-l-[50px] border-l-[#e5d5c0] translate-x-12"></div>
              </div>
            </div>

            {/* Books */}
            <Reorder.Group
              axis="x"
              values={shuffledBooks}
              onReorder={setShuffledBooks}
              className="relative flex justify-center gap-1 h-80"
            >
              {shuffledBooks.map((book) => (
                <Reorder.Item
                  key={book.id}
                  value={book}
                  className={`relative ${bookWidth} h-full cursor-grab active:cursor-grabbing`}
                >
                  <div className="w-full h-full bg-gradient-to-b from-rose-500 to-rose-600 rounded-t-sm shadow-md flex flex-col justify-end">
                    {/* Spine Detail */}
                    <div className={`absolute top-4 left-1/2 -translate-x-1/2 ${spineWidth} h-4/5 bg-rose-400/30 rounded-sm`}></div>
                    
                    {/* Label */}
                    <div className={`bg-white m-0.5 p-1 text-slate-900 ${labelSize} leading-tight font-mono border border-slate-200 text-center`}>
                      {book.callNumber.prefix && <div>{book.callNumber.prefix}</div>}
                      <div className="font-bold">{book.callNumber.line1}</div>
                      <div>{book.callNumber.line2}</div>
                      {book.callNumber.line3 && <div>{book.callNumber.line3}</div>}
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>

          {/* Feedback Overlay */}
          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={`mt-12 flex items-center gap-4 px-8 py-4 rounded-full text-2xl font-bold ${
                  isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 size={32} />
                    <span>Perfectly Arranged!</span>
                  </>
                ) : (
                  <>
                    <XCircle size={32} />
                    <span>Not quite right yet...</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1c3a] text-white p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md p-12 rounded-3xl border border-white/20 text-center max-w-md w-full"
      >
        <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
          <Trophy size={48} className="text-yellow-900" />
        </div>
        
        <h2 className="text-4xl font-bold mb-4">Activity {currentLevelId % 10 === 0 ? 10 : currentLevelId % 10} Complete!</h2>
        <p className="text-slate-300 mb-12">You've mastered the order of these books in {selectedDifficulty} mode. Great job!</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              const nextId = currentLevelId + 1;
              const nextLevel = SHELF_SHUFFLE_LEVELS.find(l => l.id === nextId);
              if (nextLevel && nextLevel.difficulty === selectedDifficulty) {
                startLevel(nextId);
              } else {
                setScreen('LEVEL_SELECT');
              }
            }}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors"
          >
            Next Activity
          </button>
          
          <button
            onClick={() => setScreen('LEVEL_SELECT')}
            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
          >
            Level Select
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {screen === 'START' && <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderStart()}</motion.div>}
        {screen === 'INSTRUCTIONS' && <motion.div key="instructions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderInstructions()}</motion.div>}
        {screen === 'DIFFICULTY_SELECT' && <motion.div key="difficulty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderDifficultySelect()}</motion.div>}
        {screen === 'LEVEL_SELECT' && <motion.div key="levels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderLevelSelect()}</motion.div>}
        {screen === 'GAME' && <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderGame()}</motion.div>}
        {screen === 'RESULTS' && <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderResults()}</motion.div>}
      </AnimatePresence>
    </div>
  );
}
