import React from "react";
import classes from './Notes.module.css';
import TaskModal from "./TaskModal";

const Section = ({ sectionName, tasks, addTask, updateTask, deleteTask }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState(null);

  const handleOpenModal = (task) => {
    setCurrentTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <div className={classes.section}>
        <div className={classes.section__cont}>
            <h3 className={classes.section__title}>{sectionName} ({tasks.length})</h3>
            <div className={classes.taskList}>
                {tasks.map((task, index) => (
                <div key={index} className={classes.section__task} onClick={() => handleOpenModal(task)}>
                    {task.title}
                </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Название задачи"
                className={classes.section__newTask}
                onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                    addTask(sectionName, { title: e.target.value, description: "" });
                    e.target.value = ""; // Сброс
                }
                }}
            />
            {isModalOpen && (
                <TaskModal
                task={currentTask}
                onClose={handleCloseModal}
                updateTask={updateTask}
                deleteTask={deleteTask}
                sectionName={sectionName}
                />
            )}
        </div>
    </div>
  );
};

export default Section;
