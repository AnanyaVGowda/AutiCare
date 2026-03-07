import React from 'react';
import { useGameStats } from '../context/GameStatsContext';
import resourcesBg from '../assets/resources_bg.png';

const ResourceCard = ({ title, description, type, difficulty, link }) => (
  <div className={`relative group bg-white rounded-2xl p-6 border-2 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 overflow-hidden ${difficulty === 'Beginner' ? 'border-green-200 hover:border-green-400 hover:shadow-green-500/20' :
    difficulty === 'Intermediate' ? 'border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-500/20' :
      'border-red-200 hover:border-red-400 hover:shadow-red-500/20'
    }`}>
    <div className="flex items-center justify-between mb-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
        difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
          'bg-red-100 text-red-600'
        }`}>
        {difficulty === 'Beginner' ? '🌱' : difficulty === 'Intermediate' ? '⭐' : '🔥'}
      </div>
      <span className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wide font-extrabold border ${difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
        difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
          'bg-red-50 text-red-700 border-red-200'
        }`}>
        {difficulty}
      </span>
    </div>

    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 h-20">{description}</p>

    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-md">{type}</span>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </a>
      ) : (
        <span className="text-gray-400 text-sm italic font-medium">Coming Soon</span>
      )}
    </div>
  </div>
);

function Resources() {
  const { gameStats } = useGameStats();

  const getRecommendedResources = () => {
    const resources = [];

    // Math-related recommendations
    if (gameStats.math?.gamesPlayed > 0 || gameStats.mathPuzzle?.gamesPlayed > 0) {
      const mathScore = (gameStats.math?.highScore || 0) + (gameStats.mathPuzzle?.highScore || 0);
      resources.push({
        title: mathScore < 50 ? 'Basic Math Operations' : 'Advanced Math Concepts',
        description: mathScore < 50 ?
          'Master the fundamentals of addition, subtraction, multiplication, and division.' :
          'Explore advanced mathematical concepts and problem-solving strategies.',
        type: 'Mathematics',
        difficulty: mathScore < 50 ? 'Beginner' : 'Intermediate',
        link: 'https://www.khanacademy.org/math'
      });
    }

    // Language-related recommendations
    if (gameStats.word?.gamesPlayed > 0) {
      resources.push({
        title: 'Vocabulary Builder',
        description: 'Enhance your vocabulary with interactive exercises and word games.',
        type: 'Language',
        difficulty: gameStats.word.highScore < 30 ? 'Beginner' : 'Intermediate',
        link: 'https://www.vocabulary.com'
      });
    }

    // Geography-related recommendations
    if (gameStats.geography?.gamesPlayed > 0) {
      resources.push({
        title: 'World Geography Explorer',
        description: 'Learn about countries, capitals, and cultures around the world.',
        type: 'Geography',
        difficulty: 'Intermediate',
        link: 'https://www.nationalgeographic.com/education'
      });
    }

    // Science-related recommendations
    if (gameStats.science?.gamesPlayed > 0) {
      resources.push({
        title: 'Science Discovery Hub',
        description: 'Explore fascinating scientific concepts and experiments.',
        type: 'Science',
        difficulty: gameStats.science.correctAnswers < 20 ? 'Beginner' : 'Intermediate',
        link: 'https://www.sciencekids.co.nz'
      });
    }

    // Emoji game recommendations
    if (gameStats.emoji?.gamesPlayed > 0) {
      resources.push({
        title: 'Emotional Intelligence',
        description: 'Learn more about understanding and expressing emotions.',
        type: 'Social Skills',
        difficulty: gameStats.emoji.highScore < 5 ? 'Beginner' : 'Intermediate',
        link: 'https://www.understood.org/articles/emotional-intelligence-what-it-is-and-why-it-matters'
      });
    }

    // Add default resources for new users
    if (Object.keys(gameStats).length === 0 || !Object.values(gameStats).some(stat => stat?.gamesPlayed > 0)) {
      resources.push({
        title: 'Getting Started Guide',
        description: 'Learn how to make the most of our educational games and resources.',
        type: 'General',
        difficulty: 'Beginner',
        link: null
      });
    }

    return resources;
  };

  const recommendedResources = getRecommendedResources();

  return (
    <div
      className="min-h-screen pb-24 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${resourcesBg})` }}
    >
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0"></div>
      <div className="relative z-10">

        {/* Page Header */}
        <div className="backdrop-blur-md bg-white/80 border-b border-gray-200/50 pb-16 pt-12 mb-12 shadow-sm">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <div className="inline-block px-4 py-1.5 border border-purple-200 bg-purple-50 text-purple-700 font-bold rounded-full mb-6 text-sm">
              Curated For You
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Learning Resources
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Expand your knowledge with these hand-picked educational links, tailored to your current learning progress and level.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-purple-500 pb-1 inline-block">
                Recommended Content
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedResources.map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </div>

          {/* Achievement Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 pb-1 inline-block">
                Skill Masteries
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(gameStats).map(([game, stats]) => {
                if (!stats || !stats.gamesPlayed || game === 'totalGamesPlayed') return null;
                return (
                  <div key={game} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm mb-4 border-2 border-green-100">
                      🏆
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2 capitalize">{game.replace(/([A-Z])/g, ' $1').trim()} Master</h3>
                    <p className="text-gray-600 font-medium text-sm">Completed <span className="text-green-700 font-bold">{stats.gamesPlayed}</span> games with a top score of <span className="text-green-700 font-bold">{stats.highScore}</span>!</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;