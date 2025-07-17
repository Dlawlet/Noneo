import React from 'react';

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className={`relative z-10 backdrop-blur-lg shadow-lg border-b ${
      isDarkMode
        ? "bg-black/90 border-gray-700/50"
        : "bg-white/90 border-gray-200/50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          <div className="flex items-center">
            <div className="relative">
              <h1 className={`text-2xl sm:text-3xl font-black bg-clip-text text-transparent ${
                isDarkMode
                  ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300"
                  : "bg-gradient-to-r from-black via-orange-600 to-yellow-600"
              }`}>
                NONEO
              </h1>
              <div className={`absolute -inset-1 rounded-lg blur opacity-20 ${
                isDarkMode
                  ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300"
                  : "bg-gradient-to-r from-black via-orange-600 to-yellow-600"
              }`}></div>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-8">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-orange-900/30 text-orange-200 hover:bg-orange-900/50' 
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
              }`}
              title={isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};