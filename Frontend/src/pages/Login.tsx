// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      onLogin({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName
      });
      
      navigate('/');
    } catch (error: any) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getErrorMessage = (error: any) => {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
        return 'Invalid password';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later';
      default:
        return error.message || 'Login failed';
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="card">
            <h1 style={{ textAlign: 'center', marginBottom: '32px', color: '#1f2937' }}>
              Login to NyayaAI
            </h1>
            
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? <span className="loading"></span> : 'Login'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link to="/forgot-password" style={{ color: '#3b82f6', fontSize: '14px' }}>
                Forgot password?
              </Link>
            </div>

            <p style={{ textAlign: 'center', marginTop: '24px', color: '#6b7280' }}>
              Don't have an account? <Link to="/signup" style={{ color: '#3b82f6' }}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;