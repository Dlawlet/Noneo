import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  varDay: number;
  day_inuse: number;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, varDay, day_inuse}) => {
  return (
    <header className="relative z-10 py-10 sm:py-20 text-center px-4">
      <div className="relative">
        <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDarkMode
            ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300"
            : "bg-gradient-to-r from-black via-orange-600 to-yellow-600"
        }`} style={{animationDuration: '3s'}}></div>
        <h2 className={`relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}>
          Jours restants : 
          <span className={`block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent animate-pulse ${
            isDarkMode
              ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300"
              : "bg-gradient-to-r from-black via-orange-600 to-yellow-600"
          }`} style={{animationDuration: '3s'}}>
            {varDay}
          </span>
        </h2>
        <h4 className={`relative text-2xl sm:text-3xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}>
          {day_inuse > 0 && (
            <span className={`block mt-2 text-lg sm:text-xl ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Jours en cours d'utilisation : {day_inuse}
            </span>
          )}
        </h4>
      </div>
      <p className={`text-lg sm:text-xl max-w-3xl mx-auto px-4 leading-relaxed font-light ${
        isDarkMode ? "text-gray-400" : "text-gray-600"
      }`}>
        Planifiez intelligemment vos Nonante jours de séjour sur une fenêtre glissante de 180 jours. Optimisez votre temps et respectez vos droits de séjour en toute sérénité.
      </p>
      <div className="mt-8 flex justify-center">
        <div className={`w-16 sm:w-24 h-1 rounded-full ${
          isDarkMode
            ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300"
            : "bg-gradient-to-r from-black via-orange-600 to-yellow-600"
        }`}></div>
      </div>
    </header>
  );
};