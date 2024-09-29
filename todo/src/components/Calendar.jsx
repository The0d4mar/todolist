import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import classes from './TodoList.module.css'
import Dates from './Dates';
import ModuleCalendar from './ModuleCalendar';
const Calendar = ({chooseDateFunc}) =>{


    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(0); // Индекс текущей недели
    const [currentYear, setCurrentYear] = useState();
    const [moduleCalendarStatus, setModuleCalendarStatus] = useState(0);

    // Функция для вычисления недели текущей даты
    const getWeekOfCurrentDate = (date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const shift = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Смещение для начала недели (с Пн)
        const today = new Date();

        // Если месяц и год совпадают, вычисляем неделю текущего дня
        if (date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            const dayOfMonth = today.getDate();
            return Math.floor((dayOfMonth + shift - 1) / 7); // Вычисляем номер недели
        }
        return 0;
    };

    const chooseDat = (date) =>{
        chooseDateFunc(`${currentYear}-${date}`)
    }

    const chooseMonth = (monthYear) =>{
        setCurrentYear(monthYear)
    }


    const showModuleCalendar = (status) =>{
        setModuleCalendarStatus(1)
    }

    const selectModuleKey = (key) =>{
        chooseDateFunc(key);
        setModuleCalendarStatus(0)
    }

    useEffect(() => {
        // Устанавливаем текущую неделю при монтировании компонента
        setCurrentWeek(getWeekOfCurrentDate(currentDate));
    }, [currentDate]);

    const prevWeek = () => {
        if (currentWeek > 0) {
            setCurrentWeek(currentWeek - 1);
        } else {
            // Если находимся в первой неделе, переходим в предыдущий месяц
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
            setCurrentWeek(getTotalWeeksInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1) - 1);
        }
    };

    const nextWeek = () => {
        const totalWeeks = getTotalWeeksInMonth(currentDate.getFullYear(), currentDate.getMonth());
        if (currentWeek < totalWeeks - 1) {
            setCurrentWeek(currentWeek + 1);
        } else {
            // Переходим на следующую неделю и, если конец месяца, на следующий месяц
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
            setCurrentWeek(0);
        }
    };

    const getTotalWeeksInMonth = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Math.ceil((daysInMonth + (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)) / 7);
    };

    return(
        <div className={classes.todoMain__calendar}>
            <CalendarHeader date={currentDate} onPrev={prevWeek} onNext={nextWeek} chooseMonth = {chooseMonth} showModule ={showModuleCalendar} />
            <div className={classes.todoMain__dates}>
                <Dates date={currentDate} currentWeek={currentWeek} chooseDate = {chooseDat} />
            </div>
            {moduleCalendarStatus == 1 ? <ModuleCalendar selectDates = {selectModuleKey}/> : null}
        </div>
    )

}

export default Calendar;