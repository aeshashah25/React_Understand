import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../redux/actions/authActions';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mock login - check hardcoded credentials
    if (email === 'user@example.com' && password === 'password') {
      const user = { email, name: 'User' };
      dispatch(loginSuccess(user)); // Dispatch login success
      navigate('/protected'); // Redirect to protected page after successful login
    } else {
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  return (
    <div className="login-container">
     
      <h2>Redux auth routing
      </h2>
            <p>username-user@example.com and password=pasword</p>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
