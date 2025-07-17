import React from 'react';
import { Stay } from '@/types';
import { CalendarGrid } from './CalendarGrid';
import { StayForm } from '../stays/StayForm';
import { calculateDaysBetween } from '@/utils/dateUtils';
import { calculateRemainingDaysForDate } from '@/utils/calculations';

interface CalendarProps {
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
  editingStay: Stay | null;
  onStayTitleChange: (title: string) => void;
  onAddStay: (stay: Stay) => void;
  onUpdateStay: (id: string, stay: Partial<Stay>) => void;
  onClearSelection: () => void;
  onCancelEdit: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  onDateClick,
  onMonthChange,
  dateSelection,
  stays,
  isDarkMode,
  editingStay,
  onStayTitleChange,
  onAddStay,
  onUpdateStay,
  onClearSelection,
  onCancelEdit
}) => {
  const { currentStart, currentEnd, stayTitle } = dateSelection;

  const handleAddStay = () => {
    if (currentStart && currentEnd) {
      const startDate = new Date(currentStart);
      const endDate = new Date(currentEnd);
      startDate.setHours(12, 0, 0, 0);
      endDate.setHours(12, 0, 0, 0);
      
      const newStayDays = calculateDaysBetween(currentStart, currentEnd);
      const remainingDaysForStart = calculateRemainingDaysForDate(startDate, stays);
      
      if (newStayDays > remainingDaysForStart) {
        alert(`Impossible d'ajouter ce séjour : cela dépasserait vos ${remainingDaysForStart} jours restants pour cette période. Le séjour sélectionné fait ${newStayDays} jours.`);
        return;
      }
      
      const newStay: Stay = {
        id: Date.now().toString(),
        start: currentStart,
        end: currentEnd,
        title: stayTitle || `Séjour ${stays.length + 1}`
      };
      
      onAddStay(newStay);
      onClearSelection();
    }
  };

  const handleUpdateStay = () => {
    if (editingStay && currentStart && currentEnd) {
      const startDate = new Date(currentStart);
      const endDate = new Date(currentEnd);
      startDate.setHours(12, 0, 0, 0);
      endDate.setHours(12, 0, 0, 0);
      
      const newStayDays = calculateDaysBetween(currentStart, currentEnd);
      
      // Temporarily remove current stay to calculate remaining days
      const staysWithoutCurrent = stays.filter(stay => stay.id !== editingStay.id);
      const remainingDaysForStart = calculateRemainingDaysForDate(startDate, staysWithoutCurrent);
      
      if (newStayDays > remainingDaysForStart) {
        alert(`Impossible de modifier ce séjour : cela dépasserait vos ${remainingDaysForStart} jours restants pour cette période. Le séjour modifié fait ${newStayDays} jours.`);
        return;
      }
      
      onUpdateStay(editingStay.id, {
        start: currentStart,
        end: currentEnd,
        title: stayTitle || editingStay.title
      });
      
      onCancelEdit();
    }
  };

  return (
    <div className="relative group mb-8 sm:mb-12">
      <div className={`absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 ${
        isDarkMode
          ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300"
          : "bg-gradient-to-r from-black via-orange-600 to-yellow-600"
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
              : "bg-gradient-to-r from-black to-orange-600"
          }`}>
            <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${
              isDarkMode ? "text-black" : "text-white"
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold ml-0 sm:ml-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Calendrier
          </h2>
        </div>
        
        <CalendarGrid
          currentDate={currentDate}
          onDateClick={onDateClick}
          onMonthChange={onMonthChange}
          dateSelection={dateSelection}
          stays={stays}
          isDarkMode={isDarkMode}
        />
        
        <StayForm
          dateSelection={dateSelection}
          stays={stays}
          isDarkMode={isDarkMode}
          editingStay={editingStay}
          onStayTitleChange={onStayTitleChange}
          onAddStay={handleAddStay}
          onUpdateStay={handleUpdateStay}
          onClearSelection={onClearSelection}
          onCancelEdit={onCancelEdit}
        />
      </div>
    </div>
  );
};