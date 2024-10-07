import React, { useState, useEffect } from "react";
import AddSection from "./AddSection";
import Section from "./Section";
import classes from './Notes.module.css';

const Notes = ({ standartImgWidth, Appearance, usernotes, updateUserData }) => {
  const [sectionsObj, setSectionsObj] = useState(usernotes);

  // Проверка на наличие раздела "Без раздела"
  useEffect(() => {
      if (Object.keys(sectionsObj).indexOf('Без раздела') === -1) {
          setSectionsObj(prevSections => ({
              ...prevSections,
              'Без раздела': [],
          }));
      }
  }, [sectionsObj]);

  const addSection = (sectionName) => {
      setSectionsObj(prevSections => {
          const updatedSections = {
              ...prevSections,
              [sectionName]: [],
          };
          updateUserData({ 'notes': updatedSections }); // Передаём обновлённые данные
          return updatedSections; // Возвращаем новое состояние
      });
  };

  const addTaskToSection = (sectionName, task) => {
      setSectionsObj(prevSections => {
          const updatedSections = {
              ...prevSections,
              [sectionName]: [...prevSections[sectionName], task],
          };
          updateUserData({ 'notes': updatedSections }); // Передаём обновлённые данные
          return updatedSections; // Возвращаем новое состояние
      });
  };

  const updateTask = (sectionName, oldTask, newTask) => {
      setSectionsObj(prevSections => {
          const updatedSections = {
              ...prevSections,
              [sectionName]: prevSections[sectionName].map(task =>
                  task === oldTask ? newTask : task
              ),
          };
          updateUserData({ 'notes': updatedSections }); // Передаём обновлённые данные
          return updatedSections; // Возвращаем новое состояние
      });
  };

  const deleteTask = (sectionName, taskToDelete) => {
      setSectionsObj(prevSections => {
          const updatedSections = {
              ...prevSections,
              [sectionName]: prevSections[sectionName].filter(task => task !== taskToDelete),
          };
          updateUserData({ 'notes': updatedSections }); // Передаём обновлённые данные
          return updatedSections; // Возвращаем новое состояние
      });
  };

  return (
    <div className={classes.notes}>
        <div className={classes.notes__cont}>
            <div className={classes.notes__title}>
                Notes
            </div>
            <div className={classes.notes__notesBlock}>
                <div className={classes.sectionRow}>
                    {Object.keys(sectionsObj).map((sectionName) => (
                    <Section
                        key={sectionName}
                        sectionName={sectionName}
                        tasks={sectionsObj[sectionName]}
                        addTask={addTaskToSection}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                    ))}
                </div>
                <AddSection addSection={addSection} className={classes.notes__fixed} />
            </div>
        </div>
    </div>
  );
};

export default Notes;
