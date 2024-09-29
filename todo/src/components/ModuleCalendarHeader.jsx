import React, { useState } from 'react';
import classes from './ModuleCalendar.module.css'
const ModuleCalendarHeader = ({ month, year, onPrevMonth, onNextMonth }) => {
    return (
        <div className={classes.moduleCalendar__header}>
          <button onClick={onPrevMonth}>{"<"}</button>
          <span className={classes.moduleCalendar__month}>{`${month} ${year}`}</span>
          <button onClick={onNextMonth}>{">"}</button>
        </div>
      );
    };

export default ModuleCalendarHeader;