import React, { useState, useEffect } from 'react';
import classes from './TaskInfoWindow.module.css'
const TaskInfoWindow = ({task, closeInfo}) =>{
    const [inputName, setInputName] = useState(task.title);
    const [inputDesc, setInputDesc] = useState(task.desc);
    const [Localtask, setLocalTask] = useState(task);
    const taskDate = task.date.split('-');
    const taskDateItog = taskDate.slice(0, 3).join('-');

    // Обработчик изменения input для названия задачи
    const handleInputChangeName = (event) => {
        const newTitle = event.target.value;
        setInputName(newTitle); // Обновляем inputName
        setLocalTask((prevTask) => ({ ...prevTask, title: newTitle })); // Обновляем task напрямую
    };

    // Обработчик изменения input для описания задачи
    const handleInputChangeDesc = (event) => {
        const newDesc = event.target.value;
        setInputDesc(newDesc); // Обновляем inputDesc
        setLocalTask((prevTask) => ({ ...prevTask, desc: newDesc })); // Обновляем task напрямую
    };


    const closeInfoLocal =(e) =>{
        e.preventDefault();
        closeInfo(Localtask, task);
    }

    

    return(
        <div className={classes.taskInfo}>
            <div className={classes.taskInfo__window}>
                <div className={classes.taskInfo__cont}>
                    <div className={classes.taskInfo__btns1}>
                        <button className={classes.taskInfo__close} onClick={e=>{closeInfoLocal(e)}}>
                            Закрыть
                        </button>
                    </div>
                </div>
                    <hr></hr>
                <div className={classes.taskInfo__cont}>
                    <div className={classes.taskInfo__innerCont}>
                        <div className={classes.taskInfo__taskinformation}>
                            <div className={classes.taskInfo__title}>
                                <input className={classes.taskInfo__titleInput} type='text' placeholder={inputName} onChange={handleInputChangeName}/>
                            
                            </div>
                            <div className={classes.taskInfo__desc}>
                                <input className={classes.task__descInput} type='text' placeholder={inputDesc} onChange={handleInputChangeDesc}/>
                            </div>
                        </div>
                        <div className={classes.verticalLine}></div>
                        <div className={classes.taskInfo__infoBLock}>
                            <div className={classes.taskInfo__createDate}>
                                <div className={classes.taskInfo__createDateHeader}>Дата создания: </div>
                                {taskDateItog}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TaskInfoWindow;