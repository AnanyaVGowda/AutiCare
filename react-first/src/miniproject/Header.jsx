import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => `
    text-sm font-semibold transition-colors duration-200
    ${isActive(path)
      ? 'text-blue-600 border-b-2 border-blue-600'
      : 'text-gray-600 hover:text-blue-600'}
  `;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 group-hover:shadow-md transition-all">
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.uGy-6XJ3jjYcsREquHqV9AHaES&pid=Api&P=0&h=180"
                  alt="AutiCare Logo"
                  className="h-10 w-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors hidden sm:block">
                Auti<span className="text-blue-600">Care</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links (Centered) */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={navLinkStyle('/')}>Home</Link>

            {isLoggedIn && (
              <>
                <Link to="/activities" className={navLinkStyle('/activities')}>Activities</Link>
                <Link to="/progress" className={navLinkStyle('/progress')}>Progress</Link>
                <Link to="/rewards" className={navLinkStyle('/rewards')}>Rewards</Link>
                <Link to="/resources" className={navLinkStyle('/resources')}>Resources</Link>
              </>
            )}
          </nav>

          {/* Actions / Auth Section (Right) */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Sign up free
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-full border border-red-200 transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
