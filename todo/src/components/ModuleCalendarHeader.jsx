import React, { useState } from 'react';
import classes from './ModuleCalendar.module.css'
const ModuleCalendarHeader = ({ month, year, onPrevMonth, onNextMonth, closeModalCalendar }) => {
    return (
        <div className={classes.moduleCalendar__header}>
          <div className={classes.moduleCalendar__main}>
            <button onClick={onPrevMonth}>{"<"}</button>
            <span className={classes.moduleCalendar__month}>{`${month} ${year}`}</span>
            <button onClick={onNextMonth}>{">"}</button>
          </div>
          <div className={classes.moduleCalendar__close}>
          <button onClick={closeModalCalendar}>{"x"}</button>
          </div>
        </div>
      );
    };

export default ModuleCalendarHeader;