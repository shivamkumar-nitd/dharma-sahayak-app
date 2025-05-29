
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          <div>
            <h3 style={{ marginBottom: '16px' }}>🧠 NyayaAI</h3>
            <p style={{ marginBottom: '16px', opacity: 0.8 }}>
              Empowering Rural India with AI-powered legal assistance. Breaking language barriers and making justice accessible to all.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginBottom: '8px' }}><a href="/chatbot" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Legal Chat</a></li>
              <li style={{ marginBottom: '8px' }}><a href="/document-upload" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Document Scanner</a></li>
              <li style={{ marginBottom: '8px' }}><a href="/faq" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>FAQ</a></li>
              <li style={{ marginBottom: '8px' }}><a href="/legal-aid" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Legal Aid</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px' }}>Emergency Contacts</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, opacity: 0.8 }}>
              <li style={{ marginBottom: '8px' }}>Legal Aid: 15100</li>
              <li style={{ marginBottom: '8px' }}>Women Helpline: 181</li>
              <li style={{ marginBottom: '8px' }}>Child Helpline: 1098</li>
              <li style={{ marginBottom: '8px' }}>Cyber Crime: 1930</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px' }}>Languages</h4>
            <p style={{ opacity: 0.8 }}>
              Available in Hindi (हिंदी), English, and Bengali (বাংলা)
            </p>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ margin: 0, opacity: 0.8 }}>
            © 2025 NyayaAI. Built with ❤️ for Rural India. Open source initiative for legal empowerment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
