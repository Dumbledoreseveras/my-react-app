import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import './Animations.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };
  
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.login(formData.email, formData.password);
      
      if (response.status === 'success') {
        setSuccess(true);
        setTimeout(() => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          navigate('/teachers');
        }, 1000);
      } else {
        setError(response.message);
        triggerShake();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-container dark-theme">
      <div className={`floating-container ${shake ? 'shake' : ''} ${success ? 'success' : ''}`}>
        <div className="floating-card dark-card">
          <div className="card-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your account</p>
          </div>
          
          {error && (
            <Alert variant="danger" className="animated-alert dark-alert">
              <i className="alert-icon">⚠️</i> {error}
            </Alert>
          )}
          
          {success && (
            <Alert variant="success" className="animated-alert dark-alert">
              <i className="alert-icon">✅</i> Login successful! Redirecting...
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control dark-input"
                  placeholder="Enter your email"
                  required
                  disabled={loading || success}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control dark-input"
                  placeholder="Enter your password"
                  required
                  disabled={loading || success}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`btn-auth ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
              disabled={loading || success}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : success ? (
                <>
                  <i className="success-icon">✓</i>
                  Success!
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register" className="auth-link">Create one here</Link></p>
            <Link to="/forgot-password" className="auth-link">Forgot your password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;