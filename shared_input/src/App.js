import React, { useState } from 'react';
import './LoginForm.css';

const InputComponent = ({
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  options = []
}) => {
  return (
    <div className="input-container">
      {type === 'textarea' ? (
        <textarea
          className="input-field"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      ) : type === 'radio' || type === 'checkbox' ? (
        options.map((option, index) => (
          <div key={index} className="option-container">
            <input
              id={`${name}-${option.value}`}
              type={type}
              name={name}
              value={option.value}
              checked={type === 'radio' ? value === option.value : value.includes(option.value)}
              onChange={onChange}
              required={required}
            />
            <label htmlFor={`${name}-${option.value}`} className="radio-checkbox-label">
              {option.label}
            </label>
          </div>
        ))
      ) : (
        <input
          className="input-field"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    message: '',
    gender: '',
    subjects: [],
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setIsSubmitted(true);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="login-title">Shared Input Component</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <InputComponent
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="email address"
            required={true}
          />
          <InputComponent
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required={true}
          />
          <InputComponent
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            required={true}
          />
          <InputComponent
            label="Gender"
            name="gender"
            type="radio"
            value={formData.gender}
            onChange={handleChange}
            options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
          />
          <InputComponent
            label="Subjects"
            name="subjects"
            type="checkbox"
            value={formData.subjects}
            onChange={handleChange}
            options={[
              { label: 'Data Structures', value: 'ds' },
              { label: 'Algorithms', value: 'algo' },
              { label: 'Operating Systems', value: 'os' },
              { label: 'DBMS', value: 'dbms' }
            ]}
          />
          <button className="login-button" type="submit">LOGIN</button>
        </form>
      </div>
      {isSubmitted && (
        <div className="data-display">
          {submittedData && (
            <div>
              <h3>Submitted Data</h3>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
