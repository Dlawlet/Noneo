import React from 'react';
import { Stay } from '@/types';
import { getDaysInMonth, formatDateForInput } from '@/utils/dateUtils';
import { isDateInCurrentSelection, isDateInStay, isDateClickable } from '@/utils/calculations';

interface CalendarGridProps {
  currentDate: Date;
  onDateClick: (date: string) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
  dateSelection: {
    currentStart: string;
    currentEnd: string;
    stayTitle: string;
  };
  stays: Stay[];
  isDarkMode: boolean;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  onDateClick,
  onMonthChange,
  dateSelection,
  stays,
  isDarkMode
}) => {
  const { currentStart, currentEnd } = dateSelection;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onMonthChange('prev')}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h4 className={`text-lg sm:text-xl font-bold text-center ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}>
          {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </h4>
        <button
          onClick={() => onMonthChange('next')}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="p-2 sm:p-3 text-center text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.slice(0, 1)}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(currentDate).map((day, index) => {
          if (!day) {
            return <div key={index} className="p-2 sm:p-3"></div>;
          }
          
          const dateStr = formatDateForInput(day);
          const isInStay = isDateInStay(dateStr, stays);
          const isInCurrentSelection = isDateInCurrentSelection(dateStr, currentStart, currentEnd);
          const isStart = dateStr === currentStart;
          const isEnd = dateStr === currentEnd;
          const isClickable = isDateClickable(dateStr, currentStart, stays);
          
          let buttonClass = 'p-2 sm:p-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden ';
          
          if (isStart) {
            buttonClass += 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 shadow-sm ring-2 ring-blue-300 dark:ring-blue-700 ';
          } else if (isEnd) {
            buttonClass += 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 shadow-sm ring-2 ring-green-300 dark:ring-green-700 ';
          } else if (isInCurrentSelection) {
            buttonClass += 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 ';
          } else if (isInStay) {
            buttonClass += 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700 ';
          } else if (!isClickable) {
            buttonClass += 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60 ';
          } else {
            buttonClass += 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-green-50 dark:hover:bg-green-900/20 border border-gray-200 dark:border-gray-600 ';
          }
          
          if (isClickable) {
            buttonClass += 'hover:scale-105 hover:shadow-lg cursor-pointer';
          } else {
            buttonClass += 'cursor-not-allowed';
          }
          
          return (
            <button
              key={index}
              onClick={() => onDateClick(dateStr)}
              className={buttonClass}
            >
              {day.getDate()}
              {/* Visual indicators */}
              {isStart && (
                <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
              )}
              {isEnd && (
                <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
              )}
              {(isInCurrentSelection || isInStay) && !isStart && !isEnd && (
                <div className="absolute inset-0 bg-green-200 dark:bg-green-700 opacity-10 rounded-lg"></div>
              )}
              {!isClickable && !isInStay && (
                <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};