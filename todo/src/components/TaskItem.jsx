import React, { useState, useEffect } from 'react';
import classes from './TodoList.module.css';

const TaskItem = ({ key, task, openTaskWindow, deleteTask }) => {
    const [Localtask, setLocalTask] = useState(task);
    const [delFlag, setDelFlag] = useState(1);
    
    function returnTask(e) {
        e.preventDefault();
        openTaskWindow(task);
    }

    function handleDelete(e) {
        e.stopPropagation();
        setDelFlag(0);
        setLocalTask((prevTask) => ({ ...prevTask, finish: {delFlag} })); // Обновляем task напрямую
        deleteTask(Localtask); // Передаем идентификатор задачи в функцию удаления
    }

    function handleReturn(e) {
        e.stopPropagation();
        setDelFlag(1);
        setLocalTask((prevTask) => ({ ...prevTask, finish: {delFlag} })); // Обновляем task напрямую
        deleteTask(Localtask); // Передаем идентификатор задачи в функцию удаления
    }

    useEffect(() => {
        setLocalTask((prevTask) => ({ ...prevTask, finish: {delFlag} }));
    }, [delFlag]);

    return (
        <div className={classes.task} id={key} onClick={e => returnTask(e)}>
            <div className={delFlag == 1 ?classes.task__container : classes.task__containerDel}>
                <div className={classes.task__text}>
                    {task && task.title ? task.title : 'Задача не найдена'}
                </div>
                {delFlag == 1 ?
                <button className={classes.deleteTaskBtn} onClick={e => {handleDelete(e)}}>Delete</button>    :
                <button className={classes.ReturnTaskBtn} onClick={e => {handleReturn(e)}}>Return</button>
                }
            </div>
            <hr />
        </div>
    );
}

export default TaskItem;
