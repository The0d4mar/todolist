import React, { useState } from 'react';
import ModuleCalendarHeader from './ModuleCalendarHeader';
import ModuleCalendarGrid from './ModuleCalendarGrid';
import classes from './ModuleCalendar.module.css'



const ModuleCalendar = ({selectDates, closeModalCalendar}) => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const getMonthNames = () => [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const changeMonth = (increment) => {
        const newDate = new Date(date.getFullYear(), date.getMonth() + increment);
        setDate(newDate);
        setSelectedDate(null); // Сброс выделения при смене месяца
    };

    const generateDates = () => {
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const dates = [];

        // Fill empty days at the start of the month (assumes Monday as the first day of the week)
        for (let i = 0; i < (firstDay.getDay() + 6) % 7; i++) {
        dates.push({ day: '', isSelected: false });
        }

        // Fill dates of the month
        for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push({
            day: i,
            isSelected: selectedDate === i && month === date.getMonth() && year === date.getFullYear(),
        });
        }

        return dates;
    };
    const formatSelectedDate = (day) => {
        const month = date.getMonth();
        const year = date.getFullYear();
        const monthNames = getMonthNames();
        return `${year}-${monthNames[month]}-${day < 10 ? '0' + day : day}`;
      };
    
      const handleDateClick = (day) => {
        const formattedDate = formatSelectedDate(day);
        setSelectedDate(day);
        console.log(formattedDate);
        selectDates(formattedDate);
      };

      const localCloseFunc = () =>{
        closeModalCalendar();
      }

  return (
    <div className={classes.moduleCalendar}>
      <ModuleCalendarHeader
        month={getMonthNames()[date.getMonth()]}
        year={date.getFullYear()}
        onPrevMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
        closeModalCalendar = {() => localCloseFunc()}
      />
      <ModuleCalendarGrid
        dates={generateDates()}
        onDateClick={handleDateClick}
      />
    </div>
  );
};

  
  export default ModuleCalendar;