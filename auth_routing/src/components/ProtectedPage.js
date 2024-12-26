import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const { user } = useSelector((state) => state.auth); // Access user data from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome to the protected page, {user ? user.name : 'Guest'}!</p>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
};

export default ProtectedPage;
