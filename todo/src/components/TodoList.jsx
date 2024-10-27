import React, { useState, useEffect } from 'react';
import classes from './TodoList.module.css';
import Calendar from './Calendar';
import TaskPanel from './TaskPanel.jsx';


const TodoList = ({standartImgWidth, Appearance, userTodo}) => {
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const [chooseDate, setChooseDate] = useState(`${monthNames[new Date().getMonth()]}, ${new Date().getDate()}`);
    const [keyDate, setKeyDate] = useState(`${new Date().getFullYear()}-${monthNames[new Date().getMonth()]}-${new Date().getDate()}`);

    const[taskObject, setTaskObject] = useState({});

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:5000/todoserver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: userTodo }), // Изменяем здесь
        });
        const data = await response.json();

        if(response.ok){
            setTaskObject(data);
        }

    };

    useEffect(() => {
        fetchTasks(); // Вызываем fetchTasks при загрузке страницы
    }, [userTodo]); // Зависимость от username, чтобы перезагружать задачи при его изменении




    if(Object.keys(taskObject).indexOf(keyDate) == -1){
        setTaskObject({
            ...taskObject,
            [keyDate]: [],
        })
    }

    const chooseDateFunc = (date) =>{
        let dateAr = taskObject[date] != undefined ? taskObject[date] : [];
        if(dateAr.length != 0){
            for(let task of dateAr){
                if(task.finish == 0){
                    continue;
                } else{
                    dateAr = dateAr.filter(task => task.finish !== 1);
                    continue;
                }
            }
        }

        setTaskObject({
            ...taskObject,
            [date]: dateAr,
        })
        let actualMontDate = date.split('-');
        setChooseDate(`${actualMontDate[1]}, ${actualMontDate[2]}`);
        setKeyDate(date);
    }

    // Добавление новой задачи
    const setNewTask = async (task) => {
        if (task.length > 0) {
            setTaskObject(prevState => {
                const currentTasks = prevState[keyDate] || [];
                return {
                    ...prevState,
                    [keyDate]: [...currentTasks, ...task], // Объединяем текущие задачи с новыми
                };
            });
    
        }
    };


    return (
        <div className={classes.todoMain}>
            <div className={classes.todoMain__cont}>
                <div className={classes.todoMain__title}>ToDo List</div>
                <Calendar 
                chooseDateFunc = {chooseDateFunc}
                />
                <hr />
                <div className={classes.todoMain__tasksCont}>
                    <TaskPanel
                    setNewTask = {setNewTask}
                    username={userTodo}
                    taskObj={taskObject}
                    chooseDate = {chooseDate}
                    keyDate = {keyDate}
                    update = {fetchTasks}
                    />
                </div>
            </div>
        </div>
    );
};

export default TodoList;