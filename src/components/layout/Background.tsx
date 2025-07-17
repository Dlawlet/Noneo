import React from 'react';

interface BackgroundProps {
  isDarkMode: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className={`absolute top-10 left-10 sm:top-20 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl animate-pulse ${
        isDarkMode
          ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500"
          : "bg-gradient-to-r from-orange-400 to-yellow-500"
      }`} style={{animationDuration: '4s'}}></div>
      <div className={`absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-80 sm:h-80 rounded-full blur-3xl animate-pulse ${
        isDarkMode
          ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600"
          : "bg-gradient-to-r from-yellow-400 to-orange-500"
      }`} style={{animationDuration: '6s', animationDelay: '2s'}}></div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 rounded-full blur-3xl animate-pulse ${
        isDarkMode
          ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400"
          : "bg-gradient-to-r from-orange-300 to-yellow-400"
      }`} style={{animationDuration: '8s', animationDelay: '4s'}}></div>
    </div>
  );
};