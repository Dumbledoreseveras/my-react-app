import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppNavbar from './components/Common/Navbar';
import PrivateRoute from './components/Common/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TeacherForm from './components/Teachers/TeacherForm';
import TeacherList from './components/Teachers/TeacherList';
import { authService } from './services/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authService.verifyToken();
      if (response.status === 'success') {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/teachers" : "/login"} />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/teachers" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/teachers" /> : <Register />} />
          <Route
            path="/teachers"
            element={
              <PrivateRoute>
                <TeacherList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-teacher"
            element={
              <PrivateRoute>
                <TeacherForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;