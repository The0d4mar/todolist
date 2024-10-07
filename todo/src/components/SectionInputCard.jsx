import React, { useState } from 'react';
import classes from './Notes.module.css';

const SectionInputCard = ({ onSubmit, onCancel }) => {
  const [sectionName, setSectionName] = useState('');

  const handleInputChange = (e) => {
    setSectionName(e.target.value);
  };

  return (
    <div className={classes.inputCard}>
      <input
        type="text"
        value={sectionName}
        onChange={handleInputChange}
        placeholder="Название раздела"
      />
      <button onClick={() => {
        if (sectionName.trim()) {
          onSubmit(sectionName);
          setSectionName('');
        }
      }}>Создать раздел</button>
      <button onClick={onCancel}>Отмена</button>
    </div>
  );
};

export default SectionInputCard;