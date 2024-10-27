import React, { useState, useEffect } from "react";
import AddSection from "./AddSection";
import Section from "./Section";
import classes from './Notes.module.css';

const Notes = ({ standartImgWidth, Appearance, userName }) => {
    const [sectionsObj, setSectionsObj] = useState({});

    const fetchNotes = async () => {
        const response = await fetch('http://localhost:5000/notesserver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: userName }),
        });
        
        if(response.ok){
            const data = await response.json();
            setSectionsObj(data);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []); 

    const updateNotes = async (newNote) => {
        const response = await fetch('http://localhost:5000/addnote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: userName, newNote: newNote }),
        });
        
        if(response.ok){
            const data = await response.json();
            setSectionsObj(data);
        }
    };

    const addSection = async (sectionName) => {
        if(sectionName && sectionName.length > 0){
            const updatedSections = { ...sectionsObj, [sectionName]: [] };
            setSectionsObj(updatedSections);
            await updateNotes(updatedSections);
        }
    };

    const addTaskToSection = async (sectionName, task) => {
        const updatedSections = {
            ...sectionsObj,
            [sectionName]: [...sectionsObj[sectionName], task],
        };
        setSectionsObj(updatedSections);
        await updateNotes(updatedSections);
    };

    const updateTask = async (sectionName, oldTask, newTask) => {
        if (oldTask !== newTask) {
            const updatedSections = {
                ...sectionsObj,
                [sectionName]: sectionsObj[sectionName].map(task => task === oldTask ? newTask : task),
            };
            setSectionsObj(updatedSections);
            await updateNotes(updatedSections);
        }
    };

    const deleteTask = async (sectionName, taskToDelete) => {
        const updatedSections = {
            ...sectionsObj,
            [sectionName]: sectionsObj[sectionName].filter(task => task !== taskToDelete),
        };
        setSectionsObj(updatedSections);
        await updateNotes(updatedSections);
    };

    return (
        <div className={classes.notes}>
            <div className={classes.notes__cont}>
                <div className={classes.notes__title}>Notes</div>
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
