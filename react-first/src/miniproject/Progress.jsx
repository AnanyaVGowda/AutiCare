import React from 'react';
import { useGameStats } from '../context/GameStatsContext';
import progressBg from '../assets/progress_bg.png';

const GameProgressCard = ({ game, stats, emoji, level }) => {
  // Bright Style variations matching the Activities page
  const levelStyles = {
    1: 'from-green-400 to-emerald-500 shadow-green-500/50 text-green-900 bg-green-50 border-green-300 shadow-xl',
    2: 'from-blue-400 to-indigo-500 shadow-blue-500/50 text-blue-900 bg-blue-50 border-blue-300 shadow-xl',
    3: 'from-purple-400 to-pink-500 shadow-purple-500/50 text-purple-900 bg-purple-50 border-purple-300 shadow-xl'
  };

  const colorStyle = levelStyles[level];
  const bgClass = colorStyle.split(' ')[4];
  const borderClass = colorStyle.split(' ')[5];
  const shadowClass = colorStyle.split(' ')[6];

  return (
    <div className={`${bgClass} rounded-2xl p-6 border-2 ${borderClass} ${shadowClass} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${colorStyle.split(' ')[0]} ${colorStyle.split(' ')[1]} shadow-lg ${colorStyle.split(' ')[2]}`}>
          {emoji}
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">
          {game.charAt(0).toUpperCase() + game.slice(1)} <br />
          <span className="text-sm font-medium text-gray-500 font-normal">Game Stats</span>
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            High Score
          </div>
          <span className="text-lg font-bold text-gray-900">{stats.highScore}</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Games Played
          </div>
          <span className="text-lg font-bold text-gray-900">{stats.gamesPlayed}</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-600 font-medium whitespace-nowrap">
            <svg className="w-4 h-4 text-gray-400 min-w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Last Played
          </div>
          <span className="text-sm font-semibold text-gray-700 text-right">
            {stats.lastPlayed ? new Date(stats.lastPlayed).toLocaleDateString() : 'Never'}
          </span>
        </div>
      </div>
    </div>
  );
};

const Progress = () => {
  const { gameStats } = useGameStats();

  const calculateLevelProgress = () => {
    // Level 1 progress (Emoji game + Animal game eventually, using Emoji for now based on old logic)
    const level1Progress = gameStats.emoji?.highScore >= 10 ? 100 : (gameStats.emoji?.highScore || 0) * 10;

    // Level 2 progress (Word and Math games)
    let level2Progress = 0;
    if (level1Progress === 100) {
      const wordScore = gameStats.word?.highScore || 0;
      const mathScore = gameStats.math?.highScore || 0;
      level2Progress = ((wordScore >= 10 ? 10 : wordScore) + (mathScore >= 10 ? 10 : mathScore)) * 5;
    }

    // Level 3 progress (Science, Math Puzzle, and Geography games)
    let level3Progress = 0;
    if (level2Progress === 100) {
      const scienceScore = gameStats.science?.highScore || 0;
      const mathPuzzleScore = gameStats.mathPuzzle?.highScore || 0;
      const geographyScore = gameStats.geography?.highScore || 0;
      level3Progress = ((scienceScore >= 10 ? 10 : scienceScore) +
        (mathPuzzleScore >= 10 ? 10 : mathPuzzleScore) +
        (geographyScore >= 10 ? 10 : geographyScore)) * (100 / 30);
    }

    return { level1Progress, level2Progress, level3Progress };
  };

  const { level1Progress, level2Progress, level3Progress } = calculateLevelProgress();

  const gameEmojis = {
    emoji: '😊',
    animalsounds: '🐘',
    word: '📝',
    math: '🔢',
    science: '🔬',
    mathPuzzle: '🧮',
    geography: '🌎'
  };

  return (
    <div
      className="min-h-screen pb-24 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${progressBg})` }}
    >
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0"></div>
      <div className="relative z-10">

        {/* Page Header */}
        <div className="backdrop-blur-md bg-white/80 border-b border-gray-200/50 pb-16 pt-12 mb-12 shadow-sm">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <div className="inline-block px-4 py-1.5 border border-indigo-200 bg-indigo-50 text-indigo-700 font-bold rounded-full mb-6 text-sm">
              Performance Analytics
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Your Learning Progress
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Track your milestones and see how far you've come. Every interaction is a step forward!
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-5xl">

          {/* Beautiful Master Progress Bar */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 mb-16">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Overall Journey
            </h3>

            <div className="h-12 w-full rounded-full bg-gray-100 p-1 flex relative shadow-inner">

              {/* Level 1 Segment (Green) */}
              <div className={`relative h-full rounded-full flex items-center justify-center transition-all duration-1000 overflow-hidden ${level1Progress > 0 ? 'bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg shadow-green-500/30' : 'bg-transparent'}`} style={{ width: '33.33%', opacity: level1Progress > 0 ? 1 : 0.4 }}>
                <div className="absolute inset-0 bg-white/20" style={{ width: `${100 - level1Progress}%`, right: 0, left: 'auto' }}></div>
                <span className={`z-10 text-sm font-bold ${level1Progress >= 50 ? 'text-white' : 'text-gray-500'}`}>Lvl 1</span>
              </div>

              {/* Level 2 Segment (Blue) */}
              <div className={`relative h-full rounded-full flex items-center justify-center transition-all duration-1000 border-l-2 border-white/50 overflow-hidden ${level2Progress > 0 ? 'bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/30' : 'bg-transparent'}`} style={{ width: '33.33%', opacity: level2Progress > 0 ? 1 : 0.4 }}>
                <div className="absolute inset-0 bg-white/20" style={{ width: `${100 - level2Progress}%`, right: 0, left: 'auto' }}></div>
                <span className={`z-10 text-sm font-bold ${level2Progress >= 50 ? 'text-white' : 'text-gray-500'}`}>Lvl 2</span>
              </div>

              {/* Level 3 Segment (Purple) */}
              <div className={`relative h-full rounded-full flex items-center justify-center transition-all duration-1000 border-l-2 border-white/50 overflow-hidden ${level3Progress > 0 ? 'bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30' : 'bg-transparent'}`} style={{ width: '33.33%', opacity: level3Progress > 0 ? 1 : 0.4 }}>
                <div className="absolute inset-0 bg-white/20" style={{ width: `${100 - level3Progress}%`, right: 0, left: 'auto' }}></div>
                <span className={`z-10 text-sm font-bold ${level3Progress >= 50 ? 'text-white' : 'text-gray-500'}`}>Lvl 3</span>
              </div>

            </div>

            <div className="flex justify-between mt-4 text-sm font-semibold text-gray-500 px-2">
              <span className={level1Progress === 100 ? 'text-green-600' : ''}>Beginner {Math.round(level1Progress)}%</span>
              <span className={level2Progress === 100 ? 'text-blue-600' : ''}>Intermediate {Math.round(level2Progress)}%</span>
              <span className={level3Progress === 100 ? 'text-purple-600' : ''}>Advanced {Math.round(level3Progress)}%</span>
            </div>
          </div>

          {/* Level 1 Details */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-1 inline-block">Beginner Stats</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gameStats.emoji && (
                <GameProgressCard game="emoji" stats={gameStats.emoji} emoji={gameEmojis.emoji} level={1} />
              )}
              {gameStats.colorMatch && (
                <GameProgressCard game="colorMatch" stats={gameStats.colorMatch} emoji="🎨" level={1} />
              )}
            </div>
          </div>

          {/* Level 2 Details */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-1 inline-block">Intermediate Stats</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gameStats.word && (
                <GameProgressCard game="word" stats={gameStats.word} emoji={gameEmojis.word} level={2} />
              )}
              {gameStats.math && (
                <GameProgressCard game="math" stats={gameStats.math} emoji={gameEmojis.math} level={2} />
              )}
            </div>
          </div>

          {/* Level 3 Details */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-purple-500 pb-1 inline-block">Advanced Stats</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gameStats.science && (
                <GameProgressCard game="science" stats={gameStats.science} emoji={gameEmojis.science} level={3} />
              )}
              {gameStats.mathPuzzle && (
                <GameProgressCard game="mathPuzzle" stats={gameStats.mathPuzzle} emoji={gameEmojis.mathPuzzle} level={3} />
              )}
              {gameStats.geography && (
                <GameProgressCard game="geography" stats={gameStats.geography} emoji={gameEmojis.geography} level={3} />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Progress;