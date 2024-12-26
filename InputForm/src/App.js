import React, { useState } from 'react';
import './App.css';

const DynamicForm = () => {
  const [fields, setFields] = useState([{ value: '' }]); // Initial field value

  const handleInputChange = (index, event) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, value: event.target.value } : field
    );
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { value: '' }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted:', fields);
  };

  return (
    <div className="form-container">
      <h2>Input Form</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="input-field">
            <input
              type="text"
              value={field.value}
              onChange={(event) => handleInputChange(index, event)}
              placeholder={`Input Field ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              disabled={fields.length === 1}
              className="remove-button"
            >
              X
            </button>
          </div>
        ))}
        <div className="form-buttons">
          <button type="button" onClick={handleAddField} className="add-button">
            Add Field
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
