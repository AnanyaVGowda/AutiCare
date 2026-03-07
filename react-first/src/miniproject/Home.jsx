import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homepageImage from '../assets/homepage.jpg';

// Inline Icons (to avoid depending on lucide-react if not installed)
const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" /></svg>
);
const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
);
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
);
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

function Home() {
  // Simulate active typing / changing text
  const heroRoles = ["Laugh", "Learn", "Grow", "Play"];
  const [roleIndex, setRoleIndex] = useState(0);

  // Simulated live counters
  const [gamesPlayed, setGamesPlayed] = useState(14023);
  const [activeUsers, setActiveUsers] = useState(1045);

  useEffect(() => {
    // Dynamic text rotation
    const textInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 2500);

    // Simulate real-time stat increases
    const statsInterval = setInterval(() => {
      setGamesPlayed(prev => prev + Math.floor(Math.random() * 3));
      setActiveUsers(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 4500);

    return () => {
      clearInterval(textInterval);
      clearInterval(statsInterval);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 overflow-x-hidden text-gray-800">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center pt-16 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transform scale-105"
          style={{
            backgroundImage: `url(${homepageImage})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Deep gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/60 to-gray-50/100 backdrop-blur-sm"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 border border-blue-300 bg-blue-500/20 backdrop-blur-md rounded-full text-blue-100 text-sm font-semibold tracking-wide mb-8 animate-fade-in-up">
            🌟 Welcome to the leading interactive platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
            Let's <br className="md:hidden" />
            <span className="inline-block min-w-[3.5ch] text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-md transition-all duration-500 ease-in-out">
              {heroRoles[roleIndex]}
            </span> <br className="md:hidden" />
            Together!
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow">
            AutiCare provides an engaging, interactive environment designed to help children develop essential skills through fun educational activities and real-time positive feedback.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              to="/signup"
              className="group relative px-8 py-4 text-lg font-bold text-blue-900 bg-yellow-400 rounded-full hover:bg-yellow-300 transform hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:shadow-[0_0_30px_rgba(250,204,21,0.6)]"
            >
              <span className="flex items-center gap-2">
                Start Learning Free
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 text-lg font-bold text-white border-2 border-white/80 rounded-full hover:bg-white hover:text-blue-900 transform hover:-translate-y-1 transition-all duration-300 shadow-xl backdrop-blur-sm bg-white/10"
            >
              Welcome Back
            </Link>
          </div>
        </div>

        {/* Soft custom shape divider at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 text-blue-50 transform translate-y-1">
          <svg className="block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,121.2,201.3,123.64l1.39-.75,3.77-1.42V0H0V95.8C59.71,118,130.83,121.2,201.3,123.64Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* 2. REAL-TIME STATS SECTION */}
      <section className="py-12 bg-blue-50 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-200">
            <div className="flex flex-col items-center p-4">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <ActivityIcon />
              </div>
              <h3 className="text-4xl font-black text-gray-900 font-mono tracking-tight">{gamesPlayed.toLocaleString()}</h3>
              <p className="text-gray-500 font-medium mt-1 uppercase tracking-wider text-sm">Activities Completed</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h3 className="text-4xl font-black text-gray-900 font-mono tracking-tight">{activeUsers.toLocaleString()}</h3>
              <p className="text-gray-500 font-medium mt-1 uppercase tracking-wider text-sm">Active Learners</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <TrophyIcon />
              </div>
              <h3 className="text-4xl font-black text-gray-900 font-mono tracking-tight">25K+</h3>
              <p className="text-gray-500 font-medium mt-1 uppercase tracking-wider text-sm">Rewards Earned</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SHOWCASE */}
      <section className="py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-2">Platform Features</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900">Why kids & parents love AutiCare</h3>
          </div>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="bg-blue-50 p-4 rounded-2xl shadow-inner transform -rotate-2">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <BrainIcon />
                    <h4 className="text-2xl font-bold mt-4 mb-2 text-gray-900">Interactive Learning</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Our platform offers a diverse array of mini-games tailored to improve cognitive, mathematical, and spatial recognition skills without feeling like "work". Every activity is a new adventure!
                    </p>
                    <ul className="mt-6 space-y-3">
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Word scrambles & Spelling
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Math challenges & Logic puzzles
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Emotion tracking with Emoji games
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2 pl-0 md:pl-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 relative">
                  <span className="absolute -left-4 top-0 w-2 h-full bg-blue-500 rounded-full"></span>
                  Learn Through Play
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  We believe that children learn best when they are engaged and having fun. Our carefully crafted games adapt to your child's pace, constantly encouraging them to reach the next milestone.
                </p>
                <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-2 group">
                  Explore Activities
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 pr-0 md:pr-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 relative">
                  <span className="absolute -left-4 top-0 w-2 h-full bg-yellow-500 rounded-full"></span>
                  Real-time Progress & Rewards
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Monitor achievements, track high scores across different subjects, and visualize growth over time. Our reward system provides continuous positive reinforcement.
                </p>
                <Link to="/signup" className="text-yellow-600 font-semibold hover:text-yellow-700 flex items-center gap-2 group">
                  View Reward System
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>
              <div className="md:w-1/2">
                <div className="bg-yellow-50 p-4 rounded-2xl shadow-inner transform rotate-2">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-4">
                    <TrophyIcon />
                    <div className="space-y-4 mt-2">
                      {/* Mock Progress Bars */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">Math Mastery</span>
                          <span className="text-sm font-bold text-blue-600">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full w-[85%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-700">Vocabulary</span>
                          <span className="text-sm font-bold text-green-500">60%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full w-[60%]"></div>
                        </div>
                      </div>
                      <div className="mt-4 p-4 border border-yellow-200 bg-yellow-50 rounded-lg flex items-center gap-4">
                        <div className="p-2 bg-yellow-400 rounded-full"><StarIcon /></div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">New Achievement!</p>
                          <p className="text-xs text-gray-600">Played 5 games in a row</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-[-10%] w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Supported by our community</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">See how AutiCare is making a difference in the daily routines of families everywhere.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
              <div className="flex gap-1 mb-4">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <p className="text-gray-300 mb-6">"This app has been a game-changer. The emotion tracking emoji game really helped my son articulate how he was feeling in a fun, pressure-free way."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full flex items-center justify-center font-bold">S</div>
                <div>
                  <h4 className="font-bold">Sarah T.</h4>
                  <p className="text-sm text-gray-400">Parent</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl relative top-0 md:top-8">
              <div className="flex gap-1 mb-4">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <p className="text-gray-300 mb-6">"The math puzzle games hold their attention wonderfully. Seeing their face light up when they earn a reward badge makes every session worth it!"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-tr from-green-400 to-teal-500 rounded-full flex items-center justify-center font-bold">M</div>
                <div>
                  <h4 className="font-bold">Mark R.</h4>
                  <p className="text-sm text-gray-400">Educator</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
              <div className="flex gap-1 mb-4">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <p className="text-gray-300 mb-6">"Clean interface, no distracting ads, and the progress tracking allows me to see exactly where we need to focus our learning tomorrow."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full flex items-center justify-center font-bold">E</div>
                <div>
                  <h4 className="font-bold">Elena K.</h4>
                  <p className="text-sm text-gray-400">Parent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to empower their learning journey?</h2>
          <p className="text-xl text-blue-100 mb-10">Sign up today and get access to all interactive games, real-time analytics, and personalized tracking.</p>
          <Link
            to="/signup"
            className="inline-block px-10 py-5 text-xl font-bold text-blue-900 bg-yellow-400 rounded-full hover:bg-yellow-300 transform hover:-translate-y-2 transition-all duration-300 shadow-2xl"
          >
            Create Your Free Account
          </Link>
          <p className="mt-6 text-blue-200 text-sm">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* 6. FOOTER SECTION */}
      <footer className="bg-gray-950 py-10 text-center">
        <div className="container mx-auto px-6 text-gray-400">
          <p className="mb-4">&copy; {new Date().getFullYear()} AutiCare. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Contact Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
