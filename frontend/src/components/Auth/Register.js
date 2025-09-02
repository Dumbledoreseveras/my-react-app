import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import './Animations.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === 'password') {
      calculateProgress(e.target.value);
    }
    if (error) setError('');
  };
  
  const calculateProgress = (password) => {
    let strength = 0;
    if (password.length > 5) strength += 25;
    if (password.length > 7) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setProgress(strength);
  };
  
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      triggerShake();
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.register(formData);
      
      if (response.status === 'success') {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message);
        triggerShake();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };
  
  const getProgressColor = () => {
    if (progress < 50) return '#ff4d4d';
    if (progress < 75) return '#ffa64d';
    return '#2ecc71';
  };
  
  return (
    <div className="auth-container dark-theme">
      <div className={`floating-container ${shake ? 'shake' : ''} ${success ? 'success' : ''}`}>
        <div className="floating-card dark-card">
          <div className="card-header">
            <h2>Create Account</h2>
            <p>Don’t have an account? Register first to log in</p>
            <p> </p>
          </div>
          
          {error && (
            <Alert variant="danger" className="animated-alert dark-alert">
              <i className="alert-icon">⚠️</i> {error}
            </Alert>
          )}
          
          {success && (
            <Alert variant="success" className="animated-alert dark-alert">
              <i className="alert-icon">✅</i> Registration successful! Redirecting to login...
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control dark-input"
                    placeholder="First name"
                    required
                    disabled={loading || success}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control dark-input"
                    placeholder="Last name"
                    required
                    disabled={loading || success}
                  />
                </div>
              </div>
            </div>
            
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
                  placeholder="Create a strong password"
                  required
                  disabled={loading || success}
                />
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-progress" 
                      style={{ width: `${progress}%`, backgroundColor: getProgressColor() }}
                    ></div>
                  </div>
                  <div className="strength-text">
                    {progress < 50 ? 'Weak' : progress < 75 ? 'Medium' : 'Strong'}
                  </div>
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control dark-input"
                  placeholder="Confirm your password"
                  required
                  disabled={loading || success}
                />
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="password-mismatch">Passwords don't match</div>
              )}
            </div>
            
            <button 
              type="submit" 
              className={`btn-auth ${loading ? 'loading' : ''} ${success ? 'success' : ''}`}
              disabled={loading || success}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : success ? (
                <>
                  <i className="success-icon">✓</i>
                  Success!
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;