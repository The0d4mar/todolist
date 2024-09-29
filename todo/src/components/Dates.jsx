import React, { useState } from 'react';
import CalendarBtn from './UI/calendarButton/CalendarBtn';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const Dates = ({ date, currentWeek, chooseDate }) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const [status,setStatus] = useState(new Date().getDate());

    // Текущая дата
    const today = new Date();
    const isToday = (checkDate) => {
        return (
            checkDate.getDate() === today.getDate() &&
            checkDate.getMonth() === today.getMonth() &&
            checkDate.getFullYear() === today.getFullYear()
        );
    };

    const innerChooseDate = (date) =>{
        chooseDate(date);
        setStatus(date)
    }

    // Смещение первого дня месяца относительно понедельника
    const shift = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    // Считаем, с какого числа начинается текущая неделя
    const startDay = currentWeek * 7 - shift;

    // Получаем даты для текущей недели
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), startDay + i + 1);

        let dayOfWeek = currentDate.getDay();
        dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        const isCurrentMonth = currentDate.getMonth() === date.getMonth();

        dates.push({
            day: currentDate.getDate(),
            dayOfWeek: daysOfWeek[dayOfWeek],
            isCurrentMonth: isCurrentMonth,
            isToday: isToday(currentDate), // Проверяем, является ли дата сегодняшней
        });
    }

    return (
        <div id="dates" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {dates.map((item, index) => (
                <CalendarBtn
                    key={index}
                    item = {item}
                    isToday = {item.isToday}
                    innerChooseDate = {innerChooseDate}
                    statusBtn = {item.day == status ? 1 : 0}
                >
                    {item.day}
                    <div style={{marginLeft: '5px'}}>{item.dayOfWeek}</div>
                </CalendarBtn>
            ))}
        </div>
    );
};

export default Dates;