import React, { useState, useEffect } from 'react';
import MyButton from './UI/myBtn/MyButton';
import classes from './AddTaskWindow.module.css'

const AddTaskWindow = ({taskEditor, id, currentDate}) =>{
    const [inputName, setInputName] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [task, setTask] = useState({ title: '',
        desc: '',
        id: (Number(new Date().getFullYear()) + Number(new Date().getMonth()) + Number(new Date().getDate()) + Number(new Date().getMilliseconds())),
        date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}-${new Date().getMilliseconds()} `,
        finish: 0,
    }
    );

    // Обработчик изменения input для названия задачи
    const handleInputChangeName = (event) => {
        const newTitle = event.target.value;
        setInputName(newTitle); // Обновляем inputName
        setTask((prevTask) => ({ ...prevTask, title: newTitle })); // Обновляем task напрямую
    };

    // Обработчик изменения input для описания задачи
    const handleInputChangeDesc = (event) => {
        const newDesc = event.target.value;
        setInputDesc(newDesc); // Обновляем inputDesc
        setTask((prevTask) => ({ ...prevTask, desc: newDesc })); // Обновляем task напрямую
    };

    // Функция для передачи данных задачи или очистки задачи
    const taskEditorModal = (flag) => {
        if (flag) {
            taskEditor(task); // Передаем задачу
        } else {
            taskEditor(''); // Передаем пустую строку (отмена)
        }
    };

    useEffect(() => {
        setTask({ title: inputName, desc: inputDesc, id: (Number(new Date().getFullYear()) + Number(new Date().getMonth()) + Number(new Date().getDate()) + Number(new Date().getMilliseconds())), date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}-${new Date().getMilliseconds()} `, finish: 0   });
    }, [inputName, inputDesc]);
    return(
            <div className={classes.task_adderWindow}>
            <div className={classes.task__cont}>
                <div className={classes.task__inputs}>
                    <input className={classes.task__inputName} type='text' placeholder='Task name' onChange={handleInputChangeName}/>
                    <input className={classes.task__inputDescribe} type='text' placeholder='Task describe' onChange={handleInputChangeDesc}/>

                </div>
            </div>
            <hr></hr>
            <div className={classes.task__cont}>
                <div className={classes.task__btns}>
                    <button className={classes.modal__add } onClick={() => taskEditorModal(true)} >Add </button>
                </div>
            </div>
            </div>
    )
}

export default AddTaskWindow;