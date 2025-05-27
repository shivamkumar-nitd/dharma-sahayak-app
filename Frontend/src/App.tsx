// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chatbot from './pages/Chatbot';
import DocumentUpload from './pages/DocumentUpload';
import FAQ from './pages/FAQ';
import LegalAid from './pages/LegalAid';
import LostDocuments from './pages/LostDocuments';
import './styles/globals.css';

interface AppUser {
  uid: string;
  email: string | null;
  name: string | null;
  phone?: string;
  language?: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<AppUser | null>(null);

  const handleLogin = (userData: AppUser) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          // Add additional fields from your database if needed
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar isAuthenticated={!!user} onLogout={handleLogout} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
            <Route path="/chatbot" element={<Chatbot  />} />
            <Route path="/document-upload" element={<DocumentUpload  />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/legal-aid" element={<LegalAid />} />
            <Route path="/lost-documents" element={<LostDocuments />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;