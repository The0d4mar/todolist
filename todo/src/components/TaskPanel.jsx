import React, { useEffect, useState } from 'react';
import classes from './TodoList.module.css';
import AddTaskWindow from './AddTaskWindow.jsx';
import TaskItem from './TaskItem.jsx';
import MyButton from './UI/myBtn/MyButton';
import MyImg from './UI/myImg/MyImg';
import NewTaskImg from '../images/svg/newTask/file_wues5z5rcyxb.svg';
import TaskInfoWindow from './TaskInfoWindow.jsx';

const TaskPanel = ({ setNewTask, taskArray, chooseDate }) => {
    const [tasks, setTasks] = useState(taskArray);
    const [chooseTask, setChooseTask] = useState();
    
    useEffect(() => {
        setTasks(taskArray);
    }, [taskArray]); // Добавьте этот useEffect для синхронизации tasks с taskArray

    const currentDate =chooseDate; // Используем формат YYYY-MM-DD

    const [todoModal, setTodoModal] = useState(0);
    const [taskInfo, setTaskInfo] = useState(0);

    const createTaskInfo = (task) => {
        setChooseTask(task);
        setTaskInfo(1);
    };

    const closeTaskInfo = (newTask, prevTask) => {
        if (newTask && newTask.title) {
            // Создаем новый массив задач, заменяя только prevTask на newTask
            const prevPoz = tasks.indexOf(prevTask);
            const updatedTasks = [tasks.splice(prevPoz, 1, newTask)];
            let i = 0;
            for(let task of tasks){
                if(task != updatedTasks[i]){
                    i+=1;
                    continue;
                } else{
                    tasks[i] = updatedTasks[i];
                    break;
                }
            }
    
            setTasks(tasks); // Обновляем локальное состояние
        }
        setTaskInfo(0); // Закрываем окно информации о задаче
    };

    const todoModalFunc = (num) => {
        setTodoModal(num);
    };

    const LocalSet = (newTask) => {
        if (newTask && newTask.title) {
            setNewTask([newTask]); // Передаем новую задачу как массив
        }
        setTodoModal(0);
    };
    const deleteTask = (deltask, oldtask) => {
        console.log(deltask)
        if (deltask && deltask.finish) {
            const prevPoz = tasks.indexOf(oldtask);
            const updatedTasks = [tasks.splice(prevPoz, 1, deltask)];
            let i = 0;
            for(let task of tasks){
                if(task != updatedTasks[i]){
                    i+=1;
                    continue;
                } else{
                    tasks[i].finish = 1;
                    break;
                }
            }

            setTasks(tasks); // Обновляем локальное состояние
        }
    };

    return (
        <div className={classes.task}>
            <div className={classes.task__header}>
                {chooseDate}
            </div>
            <hr />
            <div className={classes.task__tasks}>
                {tasks.map((item) => (
                    item && item.title ?
                        item && !item.finish ?
                            <TaskItem key={item.date} task={item} openTaskWindow={createTaskInfo}  deleteTask={deleteTask} />
                        : null
                    :null
                ))}
            </div>
            <div className={classes.task__addTask}>
                <MyButton
                    mainStyle="white"
                    add="New Task"
                    onClick={() => todoModalFunc(1)}
                >
                    <MyImg img={NewTaskImg} />
                </MyButton>
            </div>
            {todoModal === 1 && (
                <AddTaskWindow taskEditor={LocalSet} currentDate={currentDate} />
            )}
            {taskInfo === 1 && (
                <TaskInfoWindow task={chooseTask} closeInfo={closeTaskInfo} />
            )}
        </div>
    );
};

export default TaskPanel;
