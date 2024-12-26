import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login'; // Import Login component
import ProtectedPage from './components/ProtectedPage'; // Import ProtectedPage component
import Logout from './components/Logout'; // Import Logout component

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Access authentication state from Redux

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes - only accessible if authenticated */}
        <Route
          path="/protected"
          element={isAuthenticated ? <ProtectedPage /> : <Navigate to="/login" />}
        />

        {/* Logout route */}
        <Route path="/logout" element={<Logout />} />

        {/* Catch-all for unmatched routes */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
