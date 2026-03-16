/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check, Play, Info, RotateCcw, Home } from 'lucide-react';
import { CLASSIFY_LEVELS, MAIN_CLASSES, ALL_SUBCLASSES, ClassifyLevel, ClassifyOption } from './data/classifyData';
import { Link } from 'react-router-dom';

type Screen = 'START' | 'INSTRUCTIONS' | 'LEVEL_SELECT' | 'STEP_1' | 'STEP_2' | 'STEP_3' | 'STEP_4' | 'RESULTS';

export default function ClassifyGame() {
  const [screen, setScreen] = useState<Screen>('START');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [selectedMainClass, setSelectedMainClass] = useState<string | null>(null);
  const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null);
  const [authorNumber, setAuthorNumber] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const currentLevel = CLASSIFY_LEVELS.find(l => l.id === currentLevelId) || CLASSIFY_LEVELS[0];

  const startLevel = (id: number) => {
    setCurrentLevelId(id);
    setSelectedMainClass(null);
    setSelectedSubclass(null);
    setAuthorNumber('');
    setStartTime(Date.now());
    setScreen('STEP_1');
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}M : ${seconds}S`;
  };

  const currentSubclasses = selectedMainClass ? ALL_SUBCLASSES[selectedMainClass] || [] : [];

  const isMainClassCorrect = selectedMainClass === currentLevel.correctMainClassId;
  const isSubclassCorrect = selectedSubclass === currentLevel.correctSubclassId;
  const isAuthorNumberCorrect = authorNumber.toUpperCase() === currentLevel.correctAuthorNumber.toUpperCase();

  const renderHeader = (title: string) => (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-black text-[#88ccff] tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(136,204,255,0.5)] italic">
        {title}
      </h1>
    </div>
  );

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-[#1a2344] text-white font-sans p-4 flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {screen === 'START' && (
          <motion.div key="start" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="text-center space-y-6">
            {renderHeader('CLASSIFY!')}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setScreen('LEVEL_SELECT')}
                className="bg-gradient-to-b from-[#b4b8e2] to-[#7c82b1] text-[#2a1b3d] px-16 py-3 rounded-full text-2xl font-black shadow-[0_4px_0_#4a4e69] hover:translate-y-1 hover:shadow-none transition-all border-2 border-[#d1d5f0]"
              >
                Start
              </button>
              <button
                onClick={() => setScreen('INSTRUCTIONS')}
                className="bg-gradient-to-b from-[#b4b8e2] to-[#7c82b1] text-[#2a1b3d] px-16 py-3 rounded-full text-2xl font-black shadow-[0_4px_0_#4a4e69] hover:translate-y-1 hover:shadow-none transition-all border-2 border-[#d1d5f0]"
              >
                Instructions
              </button>
              <Link
                to="/"
                className="text-[#88ccff] hover:underline flex items-center justify-center gap-2 mt-4 font-bold"
              >
                <Home size={20} /> Main Menu
              </Link>
            </div>
          </motion.div>
        )}

        {screen === 'INSTRUCTIONS' && (
          <motion.div key="instructions" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="max-w-2xl w-full">
            {renderHeader('HOW TO PLAY')}
            <div className="bg-[#1a2344] p-8 space-y-8">
              <ol className="space-y-6 text-xl font-black text-[#88ccff] uppercase leading-tight text-center italic">
                <li>1. You will be shown a book with its title, author, and keywords from the book</li>
                <li>2. You should identify its main class and subclass by clicking the provided button</li>
                <li>3. You should provide the author's number</li>
              </ol>
              <div className="flex justify-center">
                <button
                  onClick={() => setScreen('START')}
                  className="bg-gradient-to-b from-[#b4b8e2] to-[#7c82b1] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black shadow-[0_4px_0_#4a4e69] hover:translate-y-1 hover:shadow-none transition-all border-2 border-[#d1d5f0]"
                >
                  Back
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'LEVEL_SELECT' && (
          <motion.div key="levels" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="max-w-4xl w-full">
            {renderHeader('SELECT LEVEL')}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-4 p-4">
              {CLASSIFY_LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => startLevel(level.id)}
                  className="aspect-square rounded-xl text-2xl font-black flex items-center justify-center transition-all border-4 bg-white text-[#88ccff] border-white hover:bg-[#88ccff] hover:text-white"
                >
                  {level.id}
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setScreen('START')}
                className="bg-gradient-to-b from-[#b4b8e2] to-[#7c82b1] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black shadow-[0_4px_0_#4a4e69] hover:translate-y-1 hover:shadow-none transition-all border-2 border-[#d1d5f0]"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'STEP_1' && (
          <motion.div key="step1" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="max-w-4xl w-full">
            <div className="flex justify-center mb-4">
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Level {currentLevelId}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center bg-[#1a2344] p-8 rounded-3xl border-4 border-[#b4b8e2]">
              <div className="w-full md:w-1/3 aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                <img src={currentLevel.book.imageUrl} alt="Book Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="w-full md:w-2/3 bg-[#b4b8e2] p-6 rounded-3xl text-[#2a1b3d] space-y-4 font-black uppercase italic text-xl">
                <p>Title: {currentLevel.book.title}</p>
                <p>Author: {currentLevel.book.author}</p>
                <p>Keywords: {currentLevel.book.keywords.join(' ')}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-8 px-4">
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Step 1/4
              </div>
              <button onClick={() => setScreen('STEP_2')} className="text-[#b4b8e2] hover:scale-110 transition-transform">
                <ChevronRight size={80} strokeWidth={4} />
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'STEP_2' && (
          <motion.div key="step2" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="max-w-5xl w-full">
            <div className="flex justify-center mb-4">
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Level {currentLevelId}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {MAIN_CLASSES.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedMainClass(option.id)}
                  className={`flex items-center gap-2 p-3 rounded-full text-sm font-black uppercase italic transition-all border-4 ${
                    selectedMainClass === option.id 
                      ? 'bg-[#b4b8e2] text-[#2a1b3d] border-[#a044ff]' 
                      : 'bg-[#b4b8e2] text-[#2a1b3d] border-transparent hover:border-white'
                  }`}
                >
                  <div className={`w-6 h-6 border-2 border-[#2a1b3d] flex items-center justify-center bg-white`}>
                    {selectedMainClass === option.id && <div className="w-4 h-4 bg-[#2a1b3d]" />}
                  </div>
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center mt-8 px-4">
              <button onClick={() => setScreen('STEP_1')} className="text-[#b4b8e2] hover:scale-110 transition-transform">
                <ChevronLeft size={80} strokeWidth={4} />
              </button>
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Step 2/4
              </div>
              <button 
                disabled={!selectedMainClass}
                onClick={() => setScreen('STEP_3')} 
                className={`text-[#b4b8e2] hover:scale-110 transition-transform ${!selectedMainClass && 'opacity-50 cursor-not-allowed'}`}
              >
                <ChevronRight size={80} strokeWidth={4} />
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'STEP_3' && (
          <motion.div key="step3" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="max-w-5xl w-full">
            <div className="flex justify-center mb-4">
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Level {currentLevelId}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {currentSubclasses.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedSubclass(option.id)}
                  className={`flex items-center gap-2 p-3 rounded-full text-sm font-black uppercase italic transition-all border-4 ${
                    selectedSubclass === option.id 
                      ? 'bg-[#b4b8e2] text-[#2a1b3d] border-[#a044ff]' 
                      : 'bg-[#b4b8e2] text-[#2a1b3d] border-transparent hover:border-white'
                  }`}
                >
                  <div className={`w-6 h-6 border-2 border-[#2a1b3d] flex items-center justify-center bg-white`}>
                    {selectedSubclass === option.id && <div className="w-4 h-4 bg-[#2a1b3d]" />}
                  </div>
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center mt-8 px-4">
              <button onClick={() => setScreen('STEP_2')} className="text-[#b4b8e2] hover:scale-110 transition-transform">
                <ChevronLeft size={80} strokeWidth={4} />
              </button>
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Step 3/4
              </div>
              <button 
                disabled={!selectedSubclass}
                onClick={() => setScreen('STEP_4')} 
                className={`text-[#b4b8e2] hover:scale-110 transition-transform ${!selectedSubclass && 'opacity-50 cursor-not-allowed'}`}
              >
                <ChevronRight size={80} strokeWidth={4} />
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'STEP_4' && (
          <motion.div key="step4" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="max-w-6xl w-full">
            <div className="flex justify-center mb-4">
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Level {currentLevelId}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:w-1/2 bg-white p-2 rounded-lg border-4 border-[#a044ff]">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cutter_Table.png/640px-Cutter_Table.png" 
                  alt="Cutter Table" 
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="bg-[#b4b8e2] p-8 rounded-3xl text-[#2a1b3d] text-center space-y-4">
                  <h2 className="text-4xl font-black uppercase italic">Author's Number</h2>
                  <input 
                    type="text"
                    value={authorNumber}
                    onChange={(e) => setAuthorNumber(e.target.value)}
                    placeholder="----"
                    className="bg-transparent border-b-4 border-[#2a1b3d] text-4xl font-black uppercase italic w-full text-center focus:outline-none placeholder:text-[#2a1b3d]/30"
                  />
                </div>
                
                {selectedMainClass && selectedSubclass && authorNumber && (
                  <div className="bg-[#b4b8e2] p-6 rounded-3xl text-[#2a1b3d] space-y-2 font-black uppercase italic text-lg relative">
                    <p>Main Class: {MAIN_CLASSES.find(m => m.id === selectedMainClass)?.label}</p>
                    <p>Subclass: {currentSubclasses.find(s => s.id === selectedSubclass)?.label}</p>
                    <p>Author's Number: {authorNumber}</p>
                    <button 
                      onClick={() => {
                        setEndTime(Date.now());
                        setScreen('RESULTS');
                      }}
                      className="absolute bottom-4 right-4 bg-white text-[#2a1b3d] px-8 py-1 rounded-full border-2 border-[#2a1b3d] hover:bg-[#2a1b3d] hover:text-white transition-all"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-8 px-4">
              <button onClick={() => setScreen('STEP_3')} className="text-[#b4b8e2] hover:scale-110 transition-transform">
                <ChevronLeft size={80} strokeWidth={4} />
              </button>
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Step 4/4
              </div>
              <div className="w-20" /> {/* Spacer */}
            </div>
          </motion.div>
        )}

        {screen === 'RESULTS' && (
          <motion.div key="results" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="max-w-5xl w-full">
            <div className="flex justify-center mb-4">
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Level {currentLevelId}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3 bg-[#b4b8e2] p-8 rounded-3xl text-[#2a1b3d] space-y-6 font-black uppercase italic text-2xl">
                <div className="flex items-center justify-between">
                  <p>Main Class: {MAIN_CLASSES.find(m => m.id === selectedMainClass)?.label}</p>
                  {isMainClassCorrect ? <Check className="text-green-600" strokeWidth={4} size={40} /> : <span className="text-red-600">X</span>}
                </div>
                <div className="flex items-center justify-between">
                  <p>Subclass: {currentSubclasses.find(s => s.id === selectedSubclass)?.label}</p>
                  {isSubclassCorrect ? <Check className="text-green-600" strokeWidth={4} size={40} /> : <span className="text-red-600">X</span>}
                </div>
                <div className="flex items-center justify-between">
                  <p>Author's Number: {authorNumber}</p>
                  {isAuthorNumberCorrect ? <Check className="text-green-600" strokeWidth={4} size={40} /> : <span className="text-red-600">X</span>}
                </div>
                {!isMainClassCorrect || !isSubclassCorrect || !isAuthorNumberCorrect ? (
                  <div className="mt-4 p-4 bg-white/50 rounded-xl text-sm normal-case not-italic font-medium">
                    <p className="font-bold uppercase italic">Explanation:</p>
                    {currentLevel.explanation}
                  </div>
                ) : null}
              </div>
              <div className="w-full md:w-1/3 bg-[#b4b8e2] p-8 rounded-3xl text-[#2a1b3d] flex flex-col items-center justify-center space-y-4">
                <h3 className="text-3xl font-black uppercase italic">Time</h3>
                <p className="text-5xl font-black uppercase italic">{formatTime(endTime - startTime)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-8 px-4">
              <button 
                onClick={() => setScreen('LEVEL_SELECT')} 
                className="text-[#b4b8e2] hover:scale-110 transition-transform"
              >
                <ChevronLeft size={80} strokeWidth={4} />
              </button>
              <div className="bg-[#b4b8e2] text-[#2a1b3d] px-12 py-2 rounded-full text-xl font-black italic uppercase">
                Step 4/4
              </div>
              <button 
                onClick={() => setScreen('LEVEL_SELECT')}
                className="bg-[#b4b8e2] text-[#2a1b3d] p-4 rounded-full hover:bg-white transition-all"
              >
                <RotateCcw size={40} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
