import React, { useRef, useState } from 'react';
import classes from './TaskInfoWindow.module.css';

const TaskInfoWindow = ({ task, closeInfo }) => {
    const [inputName, setInputName] = useState(task.title);
    const [Localtask, setLocalTask] = useState(task);
    const [inputDesc, setInputDesc] = useState(task.desc);
    const taskDate = task.date.split('-');
    const taskDateItog = taskDate.slice(0, 3).join('-');
    const [parsedText, setParsedText] = useState('');
    const textareaRef = useRef(null);

    const handleDescClick = () => {
        if (textareaRef.current) {
            textareaRef.current.focus(); // Устанавливаем фокус на textarea
        }
    };

    // Обработчик изменения input для названия задачи
    const handleInputChangeName = (event) => {
        const newTitle = event.target.value;
        setInputName(newTitle);
        setLocalTask((prevTask) => ({ ...prevTask, title: newTitle }));
    };

    // Обработчик изменения input для описания задачи
    const handleChangeDesc = (event) => {
        const newDesc = event.target.value;
        setInputDesc(newDesc);
        setLocalTask((prevTask) => ({ ...prevTask, desc: newDesc })); // Обновляем task напрямую

        const parsed = parseText(newDesc);
        console.log(parsed)
        setParsedText(parsed);
    };

    const parseText = (text) => {
        // Заменяем курсив *текст* на <em>текст</em>
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        // Заменяем жирный **текст** на <strong>текст</strong>
        text = text.replace(/\^(.+?)\^/g, '<strong>$1</strong>');

        text = text.replace(/\~(.+?)\~/g, '<del>$1</del>');
        text = text.replace(/\_(.+?)\_/g, '<ins>$1</ins>');
        
        return text;
    };

    const closeInfoLocal = (e) => {
        e.preventDefault();
        closeInfo(Localtask, task);
    };

    const handleInputDescChange = (event) => {
        const newDesc = event.target.innerText; // Получаем текст из contentEditable
        setInputDesc(newDesc);
        setLocalTask((prevTask) => ({ ...prevTask, desc: newDesc }));

        const parsed = parseText(newDesc);
        setParsedText(parsed);
    };

    return (
        <div className={classes.taskInfo}>
            <div className={classes.taskInfo__window}>
                <div className={classes.taskInfo__cont}>
                    <div className={classes.taskInfo__btns1}>
                        <button className={classes.taskInfo__close} onClick={closeInfoLocal}>
                            Закрыть
                        </button>
                    </div>
                </div>
                <hr />
                <div className={classes.taskInfo__cont}>
                    <div className={classes.taskInfo__innerCont}>
                        <div className={classes.taskInfo__taskinformation}>
                            <div className={classes.taskInfo__title}>
                                <input
                                    className={classes.taskInfo__titleInput}
                                    type='text'
                                    placeholder={inputName}
                                    onChange={handleInputChangeName}
                                />
                            </div>
                            <div className={classes.taskInfo__desc} onClick={handleDescClick}>
                                <textarea
                                    ref={textareaRef}
                                    textareaRef
                                    onInput={handleInputDescChange}
                                    className={classes.task__descInput}
                                    value={inputDesc}
                                    onChange={handleChangeDesc}
                                    placeholder="Введите описание задачи"


                                />
                                <div
                                    dangerouslySetInnerHTML={{ __html: parsedText }}
                                    className={classes.task__descBlock}
                                />
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
};

export default TaskInfoWindow;
