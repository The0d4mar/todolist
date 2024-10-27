import React, { useState } from "react";
import classes from './Notes.module.css';

const TaskModal = ({ task, onClose, updateTask, deleteTask, sectionName }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleDelete = () => {
    deleteTask(sectionName, task);
    onClose();
  };

  const handleSave = () => {
    updateTask(sectionName, task, { ...task, title, description });
    onClose();
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    };

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название задачи"
          className={classes.taskModal__title}
        />
        <textarea 
                    className={classes.descriptionInput} 
                    rows="4" 
                    value={description} 
                    onChange={handleDescriptionChange} 
                    placeholder="Введите описание..." 
                />
        <button onClick={handleDelete}>Удалить задачу</button>
        <button onClick={handleSave}>Сохранить</button>
      </div>
    </div>
  );
};

export default TaskModal;
