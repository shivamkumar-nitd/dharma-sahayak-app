
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            🧠 NyayaAI
          </Link>
          
          <ul className="navbar-nav">
            <li><Link to="/" className="navbar-link">Home</Link></li>
            <li><Link to="/chatbot" className="navbar-link">Legal Chat</Link></li>
            <li><Link to="/document-upload" className="navbar-link">Document Scan</Link></li>
            <li><Link to="/faq" className="navbar-link">FAQ</Link></li>
            <li><Link to="/legal-aid" className="navbar-link">Legal Aid</Link></li>
            <li><Link to="/lost-documents" className="navbar-link">Lost Docs</Link></li>
            
            {isAuthenticated ? (
              <li>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li><Link to="/login" className="btn btn-secondary">Login</Link></li>
                <li><Link to="/signup" className="btn btn-primary">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
