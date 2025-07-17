"use client";
import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/ui/Navigation';
import { Background } from '@/components/layout/Background';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { Calendar } from '@/components/calendar/Calendar';
import { StaysList } from '@/components/stays/StaysList';
import { useTheme } from '@/hooks/useTheme';
import { useStays } from '@/hooks/useStays';
import { useDateSelection } from '@/hooks/useDateSelection';
import { calculateRemainingDaysForDate } from '@/utils/calculations';
import { calculateDayInUse } from '@/utils/calculations';

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { stays, addStay, removeStay, updateStay } = useStays();
  const { 
    currentStart, 
    currentEnd, 
    stayTitle, 
    setStayTitle,
    editingStay,
    handleDateClick,
    startEdit,
    cancelEdit,
    clearSelection
  } = useDateSelection(stays);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [varDay, setVarDay] = useState(90);

  useEffect(() => {
    const remainingDays = calculateRemainingDaysForDate(new Date(), stays, false) - calculateDayInUse(new Date(), stays)  ;
    setVarDay(remainingDays);
  }, [stays]);

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const CircularBmcButton = () => (
    <a href="https://www.buymeacoffee.com/bigrooms" target="_blank" rel="noopener noreferrer">
      <img 
        src="./bmc-logo-yellow.png"
        alt="Buy Me A Coffee" 
        //cicular styling
        className="rounded-full shadow-lg hover:shadow-xl transition-all hover:transform hover:-translate-y-1"
        style={{ height: "60px", width: "60px" }}
        //cicular styling
      />
    </a>
  );

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      isDarkMode
        ? "bg-gradient-to-br from-black via-yellow-900 to-orange-900"
        : "bg-gradient-to-br from-white via-orange-50 to-yellow-100"
    }`}>
      <Background isDarkMode={isDarkMode} />
      <Navigation isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Header isDarkMode={isDarkMode} varDay={varDay} day_inuse={calculateDayInUse(new Date(), stays)} />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Calendar
          currentDate={currentDate}
          onDateClick={handleDateClick}
          onMonthChange={changeMonth}
          dateSelection={{ currentStart, currentEnd, stayTitle }}
          stays={stays}
          isDarkMode={isDarkMode}
          editingStay={editingStay}
          onStayTitleChange={setStayTitle}
          onAddStay={addStay}
          onUpdateStay={updateStay}
          onClearSelection={clearSelection}
          onCancelEdit={cancelEdit}
        />
        
        <StaysList
          stays={stays}
          isDarkMode={isDarkMode}
          onRemoveStay={removeStay}
          onEditStay={startEdit}
        />

        <div className="flex justify-end mb-10 mt-10">
                  <CircularBmcButton />
        </div>

        <Footer isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}