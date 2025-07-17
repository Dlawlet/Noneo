import React from 'react';
import { Stay } from '@/types';
import { StayCard } from './StayCard';

interface StaysListProps {
  stays: Stay[];
  isDarkMode: boolean;
  onRemoveStay: (id: string) => void;
  onEditStay: (stay: Stay) => void;
}

export const StaysList: React.FC<StaysListProps> = ({
  stays,
  isDarkMode,
  onRemoveStay,
  onEditStay
}) => {
  return (
    <div className="relative group">
      <div className={`absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 ${
        isDarkMode
          ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300"
          : "bg-gradient-to-r from-orange-600 via-yellow-600 to-black"
      }`}></div>
      <div className={`relative backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border ${
        isDarkMode
          ? "bg-gray-800/90 border-gray-700/50"
          : "bg-white/90 border-gray-200/50"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
          <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-0 sm:mr-4 mb-4 sm:mb-0 ${
            isDarkMode
              ? "bg-gradient-to-r from-orange-400 to-yellow-400"
              : "bg-gradient-to-r from-orange-600 to-yellow-600"
          }`}>
            <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${
              isDarkMode ? "text-black" : "text-white"
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-bold bg-clip-text text-transparent ${
            isDarkMode
              ? "bg-gradient-to-r from-white to-gray-300"
              : "bg-gradient-to-r from-gray-900 to-gray-700"
          }`}>
            Séjours Planifiés
          </h3>
        </div>
        
        {stays.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className={`mx-auto w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-6 ${
              isDarkMode
                ? "bg-gradient-to-r from-gray-700 to-gray-600"
                : "bg-gradient-to-r from-gray-200 to-gray-300"
            }`}>
              <svg className={`w-8 h-8 sm:w-12 sm:h-12 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className={`text-lg sm:text-xl font-light ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>Aucun séjour planifié</p>
            <p className={`text-sm mt-2 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}>Ajoutez votre premier séjour pour commencer</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stays.map((stay) => (
              <StayCard
                key={stay.id}
                stay={stay}
                isDarkMode={isDarkMode}
                onRemove={() => onRemoveStay(stay.id)}
                onEdit={() => onEditStay(stay)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};