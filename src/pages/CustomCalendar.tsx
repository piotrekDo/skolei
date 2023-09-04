import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import HolidayService from '../service/HolidayService';

export const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date[]>([]); // Deklaruj jako tablica dat

  const tileClassName = ({ date }: { date: Date }) => {
    if (HolidayService.holidays2023.some(d => date.toDateString() === d.date.toDateString())) {
      return 'holiday';
    }
    return null;
  };

  useEffect(() => {
    const effect = () => {
      console.log(selectedDate);
    };

    effect();
  }, [selectedDate]);

  return (
    <div className='calendar-container'>
      <h1>Kalendarz z Kolorowymi Weekendami</h1>
      <Calendar selectRange={true} tileClassName={tileClassName} onChange={date => setSelectedDate(date as Date[])} />
    </div>
  );
};
