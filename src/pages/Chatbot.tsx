
import React, { useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I am NyayaAI, your legal assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    'How to file an RTI?',
    'Marriage certificate process',
    'Land dispute resolution',
    'FIR filing procedure',
    'How to get legal aid?'
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1500);
  };

  const generateResponse = (question: string): string => {
    const responses = {
      'rti': 'To file an RTI (Right to Information): 1) Write your application in the prescribed format 2) Pay ₹10 fee (₹2 for BPL) 3) Submit to the concerned Public Information Officer 4) You should receive response within 30 days. Visit rtionline.gov.in for online filing.',
      'marriage': 'For marriage certificate: 1) Register marriage within 30 days 2) Submit application with photos, age proof, address proof 3) Pay prescribed fee 4) Get certificate from registrar office. Required documents: Aadhar, photos, witnesses.',
      'land': 'For land disputes: 1) Check revenue records 2) Consult with local Patwari 3) File complaint with Sub-Divisional Magistrate 4) Consider mediation through Lok Adalat 5) Legal consultation recommended for complex cases.',
      'fir': 'To file FIR: 1) Visit nearest police station 2) Provide detailed written complaint 3) Ensure FIR copy is given to you 4) Note FIR number 5) If police refuse, approach SP or online police portal 6) FIR must be filed for cognizable offenses.',
      'legal aid': 'For free legal aid: 1) Contact District Legal Services Authority 2) Visit nearest Legal Aid Clinic 3) Call 15100 for legal advice 4) Eligible: Women, SC/ST, children, disabled, BPL families 5) Services include free lawyer, court fees waiver.'
    };

    const lowerQuestion = question.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    return 'Thank you for your question. This seems like a specific legal query. I recommend: 1) Consulting with a local legal aid center 2) Visiting your nearest court\'s help desk 3) Calling the legal helpline 15100 4) For urgent matters, contact emergency services. Would you like me to help you find legal aid centers in your area?';
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Legal Chat Assistant</h1>
        <p className="section-subtitle">Get instant legal guidance in your preferred language</p>
        
        <LanguageSelector 
          currentLanguage={currentLanguage} 
          onLanguageChange={setCurrentLanguage} 
        />

        <div className="chat-container">
          <div className="chat-header">
            <h3>💬 NyayaAI Legal Assistant</h3>
            <p>Ask me anything about legal procedures, documents, or rights</p>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <div className="message-content">
                  <span className="loading"></span> Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your legal question here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="btn btn-primary" onClick={handleSendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Quick Questions</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="btn btn-secondary"
                onClick={() => handleQuickQuestion(question)}
                style={{ fontSize: '14px', padding: '8px 16px' }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
