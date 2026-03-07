import React from 'react';
import { useGameStats } from '../context/GameStatsContext';
import rewardsBg from '../assets/rewards_bg.png';

const Rewards = () => {
  const { gameStats } = useGameStats();

  const badges = [
    {
      id: 'game-explorer',
      name: 'Game Explorer',
      description: 'Try all available games',
      emoji: '🎮',
      isEarned: gameStats.emoji?.gamesPlayed > 0 && gameStats.word?.gamesPlayed > 0 && gameStats.mathPuzzle?.gamesPlayed > 0 && gameStats.math?.gamesPlayed > 0 && gameStats.science?.gamesPlayed > 0 && gameStats.geography?.gamesPlayed > 0
    },
    {
      id: 'high-achiever',
      name: 'High Achiever',
      description: 'Achieve a perfect score of 10 in all games',
      emoji: '🏆',
      isEarned: Object.entries(gameStats).every(([key, stats]) => {
        if (key === 'totalGamesPlayed') return true;
        return stats && stats.gamesPlayed > 0 && stats.highScore >= 10;
      })
    },
    {
      id: 'dedicated-learner',
      name: 'Dedicated Learner',
      description: 'Play 50 total games',
      emoji: '📚',
      isEarned: gameStats.totalGamesPlayed >= 50
    },
    {
      id: 'puzzle-solver',
      name: 'Puzzle Solver',
      description: 'Solve 10 math puzzles',
      emoji: '🧩',
      isEarned: gameStats.mathPuzzle?.puzzlesSolved >= 10 || gameStats.mathPuzzle?.correctAnswers >= 10
    }
  ];

  const earnedBadges = badges.filter(badge => badge.isEarned);
  const remainingBadges = badges.filter(badge => !badge.isEarned);

  // Total progress percentage
  const progressPercentage = Math.round((earnedBadges.length / badges.length) * 100) || 0;

  return (
    <div
      className="min-h-screen pb-24 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${rewardsBg})` }}
    >
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0"></div>
      <div className="relative z-10">

        {/* Page Header */}
        <div className="backdrop-blur-md bg-white/80 border-b border-gray-200/50 pb-16 pt-12 mb-12 shadow-sm">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <div className="inline-block px-4 py-1.5 border border-yellow-200 bg-yellow-50 text-yellow-700 font-bold rounded-full mb-6 text-sm">
              Achievements
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Your Rewards
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Collect badges by playing games, scoring high, and learning new things. Keep playing to collect them all!
            </p>

            {/* Quick Progress Summary */}
            <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-bold">Collection Progress</span>
                <span className="text-xl font-black text-gray-900">{earnedBadges.length} / {badges.length}</span>
              </div>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-6xl">

          {/* Earned Badges Section */}
          {earnedBadges.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-yellow-500 pb-1 inline-block mb-8">
                Unlocked Badges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {earnedBadges.map(badge => (
                  <div key={badge.id} className="relative group bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-400 shadow-xl shadow-yellow-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/40 transition-all duration-300 overflow-hidden">
                    {/* Premium Glow effect background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-yellow-50 to-amber-100 border-4 border-white shadow-xl flex items-center justify-center text-5xl transform group-hover:scale-110 transition-transform duration-300">
                        {badge.emoji}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{badge.name}</h3>
                      <p className="text-gray-600 font-medium">{badge.description}</p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-yellow-700 bg-yellow-100 px-3 py-1.5 rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Earned
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Badges Section */}
          {remainingBadges.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 inline-block mb-8">
                Locked Badges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingBadges.map(badge => (
                  <div key={badge.id} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed border-gray-200 flex flex-col items-center text-center transition-all hover:bg-white hover:border-gray-300">
                    <div className="w-20 h-20 mb-5 border-2 border-gray-100 rounded-full bg-gray-50 flex items-center justify-center text-4xl filter grayscale opacity-50">
                      {badge.emoji}
                    </div>
                    <h3 className="text-lg font-bold text-gray-500 mb-2">{badge.name}</h3>
                    <p className="text-gray-400 text-sm">{badge.description}</p>

                    {/* Small Lock Icon indicator */}
                    <div className="mt-5 text-gray-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Rewards;