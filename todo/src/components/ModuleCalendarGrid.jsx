import React, { useState } from 'react';
import classes from './ModuleCalendar.module.css'

const ModuleCalendarGrid = ({ dates, onDateClick }) => {
    return (
        <div>
          <div className ={classes.moduleCalendar__weekGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', fontWeight: 'bold' }}>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className = {classes.moduleCalendar__dateGrid}>
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => onDateClick(date.day)}
                onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(215, 211, 211, 0.697)')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = date.isSelected ? 'rgb(195, 223, 232)' : 'white')}
                className={classes.moduleCalendar__date}
                style={{
                  backgroundColor: date.isSelected ? 'rgb(195, 223, 232)' : 'white',
                }}
              >
                {date.day}
              </button>
            ))}
          </div>
        </div>
      );
    };

export default ModuleCalendarGrid;