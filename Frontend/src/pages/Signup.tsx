// src/pages/Signup.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface SignupProps {
  onLogin: (user: any) => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    language: 'en'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      // Save additional user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        language: formData.language,
        createdAt: new Date()
      });

      onLogin({
        uid: userCredential.user.uid,
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        language: formData.language
      });
      
      navigate('/');
    } catch (error: any) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getErrorMessage = (error: any) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      default:
        return error.message || 'Signup failed';
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card">
            <h1 style={{ textAlign: 'center', marginBottom: '32px', color: '#1f2937' }}>
              Create Your NyayaAI Account
            </h1>
            
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
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
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Language</label>
                <select name="language" className="form-input" value={formData.language} onChange={handleChange}>
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min 6 characters)"
                  required
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? <span className="loading"></span> : 'Create Account'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '24px', color: '#6b7280' }}>
              Already have an account? <Link to="/login" style={{ color: '#3b82f6' }}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;