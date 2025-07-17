import { useState } from 'react';
import { Stay } from '@/types';
import { calculateRemainingDaysForDate } from '@/utils/calculations';

export const useDateSelection = (stays: Stay[]) => {
  const [currentStart, setCurrentStart] = useState<string>("");
  const [currentEnd, setCurrentEnd] = useState<string>("");
  const [stayTitle, setStayTitle] = useState("");
  const [editingStay, setEditingStay] = useState<Stay | null>(null);

  const isDateClickable = (date: string) => {
    const dateObj = new Date(date);
    dateObj.setHours(12, 0, 0, 0);
    
    if (currentStart) {
      const startDate = new Date(currentStart);
      startDate.setHours(12, 0, 0, 0);
      const remainingDaysForStart = calculateRemainingDaysForDate(startDate, stays);
      
      const maxDate = new Date(startDate);
      maxDate.setDate(startDate.getDate() + remainingDaysForStart);
      
      return dateObj >= startDate && dateObj <= maxDate;
    }
    
    const maxReservedDate = stays.reduce((maxDate, stay) => {
      const endDate = new Date(stay.end);
      endDate.setHours(12, 0, 0, 0);
      return endDate > maxDate ? endDate : maxDate;
    }, new Date(0));
    
    if (calculateRemainingDaysForDate(maxReservedDate, stays) <= 0) {
      const remainingDays = calculateRemainingDaysForDate(dateObj, stays);
      return remainingDays > 0;
    }
    
    return true;
  };

  const handleDateClick = (date: string) => {
    if (!isDateClickable(date)) {
      return;
    }

    const clickedDate = new Date(date);
    clickedDate.setHours(12, 0, 0, 0);

    if (!currentStart || (currentStart && currentEnd)) {
      setCurrentStart(date);
      setCurrentEnd("");
    } else if (currentStart && !currentEnd) {
      const startDate = new Date(currentStart);
      startDate.setHours(12, 0, 0, 0);
      
      if (clickedDate < startDate) {
        setCurrentStart(date);
      } else if (clickedDate > startDate) {
        setCurrentEnd(date);
      } else {
        setCurrentStart("");
        setCurrentEnd("");
      }
    }
  };

  const startEdit = (stay: Stay) => {
    setEditingStay(stay);
    setCurrentStart(stay.start);
    setCurrentEnd(stay.end);
    setStayTitle(stay.title || "");
  };

  const cancelEdit = () => {
    setEditingStay(null);
    setCurrentStart("");
    setCurrentEnd("");
    setStayTitle("");
  };

  const clearSelection = () => {
    setCurrentStart("");
    setCurrentEnd("");
    setStayTitle("");
  };

  return {
    currentStart,
    currentEnd,
    stayTitle,
    editingStay,
    setStayTitle,
    handleDateClick,
    startEdit,
    cancelEdit,
    clearSelection,
    isDateClickable
  };
};