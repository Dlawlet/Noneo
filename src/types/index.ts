export interface Stay {
  id: string;
  start: string;
  end: string;
  title?: string;
}

export interface DateSelection {
  currentStart: string;
  currentEnd: string;
  stayTitle: string;
}

export interface CalendarProps {
  currentDate: Date;
  onDateClick: (date: string) => void;
  onMonthChange: (direction: 'prev' | 'next') => void;
  dateSelection: DateSelection;
  stays: Stay[];
  isDarkMode: boolean;
}