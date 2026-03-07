import React from 'react';
import { Link } from 'react-router-dom';
import { useGameStats } from '../context/GameStatsContext';
import activitiesBg from '../assets/activities_bg.png';

// Simple Lock Icon for disabled states
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);

const GameCard = ({ title, description, path, icon, level }) => {
  const { gameStats } = useGameStats();

  const getGameStats = (path) => {
    const gameType = path.split('/').pop();
    return gameStats[gameType] || {};
  };

  const stats = getGameStats(path);
  const hasProgress = stats.gamesPlayed > 0;

  const checkLevelAccess = () => {
    if (level === 1) return true;

    if (level === 2) {
      return gameStats.emoji?.highScore >= 10;
    }

    if (level === 3) {
      return gameStats.word?.highScore >= 10 && gameStats.math?.highScore >= 10;
    }

    return false;
  };

  const isLocked = !checkLevelAccess();

  // Bright Style variations based on level
  const levelStyles = {
    1: 'from-green-400 to-emerald-500 shadow-green-500/50 text-green-900 bg-green-50 border-green-300 hover:shadow-green-500/40',
    2: 'from-blue-400 to-indigo-500 shadow-blue-500/50 text-blue-900 bg-blue-50 border-blue-300 hover:shadow-blue-500/40',
    3: 'from-purple-400 to-pink-500 shadow-purple-500/50 text-purple-900 bg-purple-50 border-purple-300 hover:shadow-purple-500/40'
  };

  const colorStyle = levelStyles[level];
  const bgClass = colorStyle.split(' ')[4];
  const borderClass = colorStyle.split(' ')[5];
  const textClass = colorStyle.split(' ')[3];
  const hoverShadow = colorStyle.split(' ')[6];

  return (
    <div className={`relative block group ${isLocked ? 'cursor-not-allowed' : ''}`}>
      <Link to={isLocked ? '#' : path} className={isLocked ? 'pointer-events-none' : ''}>
        <div className={`h-full ${bgClass} rounded-2xl overflow-hidden transition-all duration-300 border-2 ${borderClass} 
          ${isLocked ? 'opacity-75 grayscale-[0.8]' : `hover:-translate-y-2 hover:shadow-2xl shadow-xl ${hoverShadow}`}
        `}>
          {/* Top accent line */}
          <div className={`h-3 w-full bg-gradient-to-r ${colorStyle.split(' ')[0]} ${colorStyle.split(' ')[1]}`}></div>

          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br ${colorStyle.split(' ')[0]} ${colorStyle.split(' ')[1]} shadow-lg ${colorStyle.split(' ')[2]}`}>
                {icon}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
              {description}
            </p>

            {/* Locked Overlay / Message */}
            {isLocked && (
              <div className="mt-4 p-4 rounded-xl bg-gray-100 border border-gray-200 flex items-start gap-3">
                <div className="mt-0.5"><LockIcon /></div>
                <div className="text-sm font-medium text-gray-600">
                  {level === 2
                    ? 'Score 10 or higher in Level 1 to unlock.'
                    : 'Score 10 or higher in all Level 2 games to unlock.'}
                </div>
              </div>
            )}

            {/* Action text for unlocked items */}
            {!isLocked && (
              <div className="mt-4 flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                Play Now
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            )}

          </div>
        </div>
      </Link>
    </div>
  );
};

function Activities() {
  return (
    <div
      className="min-h-screen pb-24 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${activitiesBg})` }}
    >
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0"></div>

      <div className="relative z-10">

        {/* Page Header */}
        <div className="backdrop-blur-md bg-white/80 border-b border-gray-200/50 pb-16 pt-12 mb-12 shadow-sm">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <div className="inline-block px-4 py-1.5 border border-indigo-200 bg-indigo-50 text-indigo-700 font-bold rounded-full mb-6 text-sm">
              Interactive Modules
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Fun Learning Games
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore our curated collection of activities. Complete beginner levels to unlock more advanced and challenging games!
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl">

          {/* Level 1 Games */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl border border-green-200 hidden sm:flex">1</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Beginner Mode</h2>
                <p className="text-gray-500 mt-1">Start your journey with fundamental concepts.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GameCard
                title="Emoji Match"
                description="Match emotions with the correct emoji! Learn about different expressions and feelings representation."
                path="/activities/emoji"
                icon="😊"
                level={1}
              />
              <GameCard
                title="Color Match"
                description="Match the name to the color! Learn how to identify and read your favorite colors."
                path="/activities/colormatch"
                icon="🎨"
                level={1}
              />
            </div>
          </div>

          {/* Level 2 Games */}
          <div className="mb-20 relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-200 hidden sm:flex">2</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Intermediate Challenge</h2>
                <p className="text-gray-500 mt-1">Unlock these by mastering beginner games.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GameCard
                title="Word Scramble"
                description="Unscramble letters to discover words. Expand your vocabulary and practice spelling patterns."
                path="/activities/wordscramble"
                icon="📝"
                level={2}
              />
              <GameCard
                title="Math Magic"
                description="Practice basic addition, subtraction, and multiplication operations in a fun and fast-paced way!"
                path="/activities/mathgame"
                icon="🔢"
                level={2}
              />
            </div>
          </div>

          {/* Level 3 Games */}
          <div className="mb-12 relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl border border-purple-200 hidden sm:flex">3</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Advanced Master</h2>
                <p className="text-gray-500 mt-1">The ultimate test of knowledge and skill.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GameCard
                title="Science Quiz"
                description="Test your knowledge of natural sciences, biology, and physics with exciting questions and facts!"
                path="/activities/sciencequiz"
                icon="🔬"
                level={3}
              />
              <GameCard
                title="Puzzle Adventure"
                description="Solve complex, story-based math logic puzzles navigating through a magical world of numbers!"
                path="/activities/mathpuzzle"
                icon="🧮"
                level={3}
              />
              <GameCard
                title="Geography Explorer"
                description="Travel the globe to spot countries, learn capitals, and discover fascinating geographical facts!"
                path="/activities/geography"
                icon="🌎"
                level={3}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Activities;