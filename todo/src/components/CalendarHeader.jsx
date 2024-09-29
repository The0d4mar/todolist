import React, { useState } from 'react';
import classes from './calendar.module.css'
import ModuleCalendar from './ModuleCalendar';
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const CalendarHeader = ({ date, onPrev, onNext, chooseMonth, showModule }) => {
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();

    function showModuleCalendar(e){
        e.stopPropagation();
        showModule(1);
    }

    chooseMonth(`${year}-${month}`);
    return (
        <div>
            <button onClick={onPrev} style={{backgroundColor:'transparent', border:'none'}}>←</button>
            <span className={classes.month} onClick={e => {showModuleCalendar(e)}}>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</span>
            <button onClick={onNext} style={{backgroundColor:'transparent', border:'none'}}>→</button>
        </div>
    );
};

export default CalendarHeader;