import { Stay } from '@/types';

export const calculateRemainingDaysForDate = (
  referenceDate: Date, 
  stays: Stay[], 
  debug = true
): number => {
  const normalizedRefDate = new Date(referenceDate);
  normalizedRefDate.setHours(12, 0, 0, 0);

  const startOfWindow = new Date(normalizedRefDate);
  startOfWindow.setDate(normalizedRefDate.getDate() - 179);

  const bookedDays = stays.reduce((total, stay) => {
    const stayStart = new Date(stay.start);
    const stayEnd = new Date(stay.end);
    stayStart.setHours(12, 0, 0, 0);
    stayEnd.setHours(12, 0, 0, 0);

    if (stayEnd < startOfWindow || stayStart > normalizedRefDate) {
      return total
    }

    const windowStart = stayStart < startOfWindow ? startOfWindow : stayStart;
    const windowEnd = stayEnd > normalizedRefDate ? normalizedRefDate : stayEnd;
    const daysDiff = Math.floor((windowEnd.getTime() - windowStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return total + daysDiff;
  }, 0);

  const remainingDays = 90 - bookedDays;
  if (debug) {
    console.log(`Reference Date: ${normalizedRefDate.toLocaleDateString('fr-FR')}, Remaining Days: ${remainingDays}, Booked Days: ${bookedDays}`);
  }
  return Math.max(remainingDays, 0);
};

export const isDateClickable = (
  date: string,
  currentStart: string,
  stays: Stay[]
): boolean => {
  const dateObj = new Date(date);
  dateObj.setHours(12, 0, 0, 0);
  
  if (currentStart) {
    const startDate = new Date(currentStart);
    startDate.setHours(12, 0, 0, 0);
    const remainingDaysForStart = calculateRemainingDaysForDate(startDate, stays);
    
    const maxDate = new Date(startDate);
    maxDate.setDate(startDate.getDate() + remainingDaysForStart -1);
    
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

export const isDateInCurrentSelection = (
  date: string, 
  currentStart: string, 
  currentEnd: string
): boolean => {
  if (!currentStart || !currentEnd) return false;
  const dateObj = new Date(date);
  const startObj = new Date(currentStart);
  const endObj = new Date(currentEnd);
  dateObj.setHours(12, 0, 0, 0);
  startObj.setHours(12, 0, 0, 0);
  endObj.setHours(12, 0, 0, 0);
  return dateObj >= startObj && dateObj <= endObj;
};

export const isDateInStay = (date: string, stays: Stay[]): boolean => {
  return stays.some(stay => {
    const dateObj = new Date(date);
    const startObj = new Date(stay.start);
    const endObj = new Date(stay.end);
    dateObj.setHours(12, 0, 0, 0);
    startObj.setHours(12, 0, 0, 0);
    endObj.setHours(12, 0, 0, 0);
    return dateObj >= startObj && dateObj <= endObj;
  });
};

export const calculateDayInUse = (dateObj: Date, stays: Stay[]): number => {
  // if the current date is in a stay, return the number of days remaining in that stay
  dateObj.setHours(12, 0, 0, 0);
  const stay = stays.find(stay => {
    const startObj = new Date(stay.start);
    const endObj = new Date(stay.end);
    startObj.setHours(12, 0, 0, 0);
    endObj.setHours(12, 0, 0, 0);
    return dateObj >= startObj && dateObj <= endObj;
  });
  if (stay) {
    const startObj = new Date(stay.start);
    const endObj = new Date(stay.end);
    startObj.setHours(12, 0, 0, 0);
    endObj.setHours(12, 0, 0, 0);
    return Math.floor((endObj.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24)) ;
  }
  // if the current date is not in a stay, return 0
  return 0;
}