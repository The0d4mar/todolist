import React, { useState } from 'react';
import classes from './CalendarBtn.module.css'
const CalendarBtn = ({key, item, isToday, children, innerChooseDate, statusBtn}) =>{

        function calendatBtnChooseDate(){
            innerChooseDate(children[0]);
        }
    return(
        <button
            key={key}
            className={classes.btn}
            style={{
                opacity: item.isCurrentMonth ? 1 : 0.5,
                backgroundColor: isToday ? 'lightblue' : 
                statusBtn ? 'rgb(195, 223, 232)' : 'transparent'

            }}
            onClick={calendatBtnChooseDate}
        >
            {children}
        </button>
    );
}

export default CalendarBtn;