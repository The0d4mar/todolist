import React, { useState } from "react";
import classes from './Notes.module.css';

const AddSection = ({ addSection }) => {
  const [sectionName, setSectionName] = useState("");

  const handleAddSection = () => {
    if (sectionName.trim()) {
      addSection(sectionName);
      setSectionName(""); // Сбросить имя раздела
    }
  };

  return (
    <div className={classes.addSection}>
      <input
        type="text"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
        placeholder="Название раздела"
        className={classes.addSectionInput}
      />
      <button onClick={handleAddSection} className={classes.addSectionBtn}>Добавить раздел</button>
    </div>
  );
};

export default AddSection;