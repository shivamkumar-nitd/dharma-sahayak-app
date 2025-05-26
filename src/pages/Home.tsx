
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: '💬',
      title: 'Multilingual Legal Chat',
      description: 'Get legal advice in Hindi, English, and Bengali with our AI-powered chatbot'
    },
    {
      icon: '📄',
      title: 'Document Scanner',
      description: 'Upload or scan legal documents with OCR technology for instant analysis'
    },
    {
      icon: '🔍',
      title: 'Document Verification',
      description: 'Check authenticity of legal documents and detect tampering'
    },
    {
      icon: '📚',
      title: 'Legal FAQ',
      description: 'Browse comprehensive legal questions organized by category'
    },
    {
      icon: '🏢',
      title: 'Legal Aid Directory',
      description: 'Find nearby legal help centers and NGO support'
    },
    {
      icon: '📋',
      title: 'Lost Document Recovery',
      description: 'Step-by-step guide to recover lost legal documents'
    }
  ];

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Welcome to NyayaAI</h1>
          <p>Empowering Rural India with AI-Powered Legal Assistance</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/chatbot" className="btn btn-primary">
              Start Legal Chat
            </Link>
            <Link to="/document-upload" className="btn btn-secondary">
              Scan Documents
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Features</h2>
          <p className="section-subtitle">
            Comprehensive legal assistance tools designed for everyone
          </p>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="card feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f1f5f9' }}>
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>1️⃣</div>
              <h3>Sign Up</h3>
              <p>Create your account and select your preferred language</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>2️⃣</div>
              <h3>Ask Questions</h3>
              <p>Chat with our AI or upload documents for analysis</p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>3️⃣</div>
              <h3>Get Solutions</h3>
              <p>Receive step-by-step guidance and legal assistance</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
