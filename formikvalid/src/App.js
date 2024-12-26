import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEnvelope, FaLock, FaPhone, FaUser } from 'react-icons/fa';

// Custom Input Component
const CustomInput = ({ label, name, type, formik, icon }) => {
  return (
    <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', border: '1px solid #a685e2', borderRadius: '5px', padding: '10px', backgroundColor: '#f9f9f9' }}>
      {icon && <span style={{ marginRight: '10px', color: '#a685e2' }}>{icon}</span>}
      <div style={{ flex: 1 }}>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={label}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name] || ''}
          style={{ border: 'none', outline: 'none', padding: '8px', width: '100%' }}
        />
        {formik.touched[name] && formik.errors[name] ? (
          <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  );
};

// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Required'),
  age: Yup.number()
    .min(18, 'Age must be at least 18')
    .max(100, 'Age must be under 100')
    .required('Required'),
  gender: Yup.string().required('Required'),
  hobbies: Yup.array().min(1, 'Select at least one hobby').required('Required'),
});

// Main Form Component
const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      phoneNumber: '',
      age: '',
      gender: '',
      hobbies: [],
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2)); // Display values in an alert
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column',border:'1px soild #a685e2',borderRadius:'20px' }}>
      <h2 style={{ marginBottom: '20px',color:'#a685e2',fontWeight:'1000',fontSize:'3.3rem' }}>Formik</h2>
      <form onSubmit={formik.handleSubmit} style={{ maxWidth: '300px', width: '100%' }}>
        <CustomInput label="Email" name="email" type="email" formik={formik} icon={<FaEnvelope />} />
        <CustomInput label="Password" name="password" type="password" formik={formik} icon={<FaLock />} />
        <CustomInput label="Phone Number" name="phoneNumber" type="text" formik={formik} icon={<FaPhone />} />
        <CustomInput label="Age" name="age" type="number" formik={formik} icon={<FaUser />} />

        <div style={{ marginBottom: '15px' }}>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={formik.handleChange}
              checked={formik.values.gender === 'male'}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={formik.handleChange}
              checked={formik.values.gender === 'female'}
            />
            Female
          </label>
          {formik.touched.gender && formik.errors.gender ? (
            <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.gender}</div>
          ) : null}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Hobbies:</label>
          <label>
            <input
              type="checkbox"
              name="hobbies"
              value="reading"
              onChange={formik.handleChange}
              checked={formik.values.hobbies?.includes('reading') || false}
            />
            Reading
          </label>
          <label>
            <input
              type="checkbox"
              name="hobbies"
              value="traveling"
              onChange={formik.handleChange}
              checked={formik.values.hobbies?.includes('traveling') || false}
            />
            Traveling
          </label>
          <label>
            <input
              type="checkbox"
              name="hobbies"
              value="sports"
              onChange={formik.handleChange}
              checked={formik.values.hobbies?.includes('sports') || false}
            />
            Sports
          </label>
          {formik.touched.hobbies && formik.errors.hobbies ? (
            <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.hobbies}</div>
          ) : null}
        </div>

        <button type="submit" style={{ padding: '10px 30px', cursor: 'pointer', backgroundColor: '#a685e2', color: 'white', border: 'none', borderRadius: '20px' ,fontSize:'1.2rem'}}>
          Login
        </button>
      </form>
    
    </div>
  );
};

export default LoginForm;