import React, { useEffect, useState } from 'react';
import classes from './TodoList.module.css';
import AddTaskWindow from './AddTaskWindow.jsx';
import TaskItem from './TaskItem.jsx';
import MyImg from './UI/myImg/MyImg';
import NewTaskImg from '../images/svg/newTask/file_wues5z5rcyxb.svg';
import TaskInfoWindow from './TaskInfoWindow.jsx';

const TaskPanel = ({ setNewTask, username, taskObj, taskArray, chooseDate, keyDate, update }) => {
    const [tasks, setTasks] = useState(taskObj[keyDate]);
    const [chooseTask, setChooseTask] = useState();
    const [isHovered, setIsHovered] = useState(false);
    const [todoModal, setTodoModal] = useState(0);
    const [taskInfo, setTaskInfo] = useState(0);

    useEffect(() => {
        setTasks(taskObj[keyDate]);
    }, [taskObj, keyDate]); // Обновляем tasks при изменении taskObj или keyDate

    const createTaskInfo = (task) => {
        setChooseTask(task);
        setTaskInfo(1);
    };

    const closeTaskInfo = async (newTask, prevTask) => {
        if (newTask && newTask.title) {
            const updatedTasks = tasks.map(task => 
                task === prevTask ? newTask : task
            );

            setTasks(updatedTasks);
            taskObj[keyDate] = updatedTasks;

            try {
                const response = await fetch('http://localhost:5000/addtodo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: username, newTodo: taskObj }),
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log('Response from server:', jsonResponse);
                } else {
                    console.error('Failed to update todo:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setTaskInfo(0);
    };

    const LocalSet = async (newTask) => {
        if (newTask && newTask.title) {
            setNewTask([newTask]);
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            taskObj[keyDate] = updatedTasks;

            try {
                const response = await fetch('http://localhost:5000/addtodo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: username, newTodo: taskObj }),
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log('Response from server:', jsonResponse);
                } else {
                    console.error('Failed to update todo:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setTodoModal(0);
        setIsHovered(false);
    };

    const deleteTask = async (deltask) => {
        console.log(deltask);
        if (deltask && deltask.title) {
            const updatedTasks = tasks.filter(task => task !== deltask);
            setTasks(updatedTasks);
            taskObj[keyDate] = updatedTasks;

            try {
                const response = await fetch('http://localhost:5000/addtodo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: username, newTodo: taskObj }),
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log('Response from server:', jsonResponse);
                } else {
                    console.error('Failed to update todo:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }

            update();
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
                    item && item.title && !item.finish && (
                        <TaskItem key={item.date} task={item} openTaskWindow={createTaskInfo} deleteTask={deleteTask} />
                    )
                ))}
            </div>
            <div className={classes.task__addTask}>
                <button
                    className={`${classes.task__addTaskBtn} ${isHovered ? classes.hovered : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? (
                        <AddTaskWindow taskEditor={LocalSet} currentDate={chooseDate} />
                    ) : (
                        <span className={classes.task__span}>
                            <MyImg img={NewTaskImg} /> New Task
                        </span>
                    )}
                </button>
            </div>
            {taskInfo === 1 && (
                <TaskInfoWindow task={chooseTask} closeInfo={closeTaskInfo} />
            )}
        </div>
    );
};

export default TaskPanel;
