import React from 'react';
import { Stay } from '@/types';
import { calculateDaysBetween } from '@/utils/dateUtils';

interface StayCardProps {
  stay: Stay;
  isDarkMode: boolean;
  onRemove: () => void;
  onEdit: () => void;
}

export const StayCard: React.FC<StayCardProps> = ({
  stay,
  isDarkMode,
  onRemove,
  onEdit
}) => {
  return (
    <div className="group/item relative">
      <div className={`absolute -inset-0.5 rounded-xl blur opacity-0 group-hover/item:opacity-30 transition duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-orange-400 to-yellow-400"
          : "bg-gradient-to-r from-black to-orange-600"
      }`}></div>
      <div className={`relative flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 rounded-xl border backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-700/50 to-gray-800/50 border-gray-600/50"
          : "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200/50"
      }`}>
        <div className="flex items-start sm:items-center space-x-4 sm:space-x-6 mb-4 sm:mb-0">
          <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1 sm:mt-0 ${
            isDarkMode
              ? "bg-gradient-to-r from-orange-400 to-yellow-400"
              : "bg-gradient-to-r from-black to-orange-600"
          }`}></div>
          <div className="flex-1 min-w-0">
            <div className={`text-base sm:text-lg font-bold mb-1 truncate ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {stay.title}
            </div>
            <div className={`text-xs sm:text-sm mb-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span>
                  {new Date(stay.start).toLocaleDateString('fr-FR', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="mx-0 sm:mx-3 text-gray-400 hidden sm:inline">→</span>
                <span className="sm:hidden text-gray-400">↓</span>
                <span>
                  {new Date(stay.end).toLocaleDateString('fr-FR', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            <div className={`text-xs sm:text-sm font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              <span className={`bg-clip-text text-transparent ${
                isDarkMode
                  ? "bg-gradient-to-r from-orange-400 to-yellow-400"
                  : "bg-gradient-to-r from-black to-orange-600"
              }`}>
                {calculateDaysBetween(stay.start, stay.end)} jours
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 self-end sm:self-center">
          <button
            onClick={onEdit}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-blue-500 hover:text-white hover:bg-blue-500 font-medium text-xs sm:text-sm rounded-lg transition-all duration-300 border border-blue-200 hover:border-blue-500"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="hidden sm:inline">Modifier</span>
          </button>
          <button
            onClick={onRemove}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-red-500 hover:text-white hover:bg-red-500 font-medium text-xs sm:text-sm rounded-lg transition-all duration-300 border border-red-200 hover:border-red-500"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden sm:inline">Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
};