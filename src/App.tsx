
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  language?: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('nyayaai_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nyayaai_user');
  };

  // Check for existing user session on app load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('nyayaai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/document-upload" element={<DocumentUpload />} />
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
