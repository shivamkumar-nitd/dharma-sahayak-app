import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'document_guide' | 'quick_action';
  documents?: string[];
  actions?: Array<{label: string, action: string}>;
}

interface LegalDocument {
  name: string;
  description: string;
  requiredDocs: string[];
  process: string[];
  fees: string;
  timeframe: string;
  keywords: string[];
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '🏛️ Hello! I am NyayaAI, your Indian legal assistant. I can help you with legal documents, procedures, and rights information. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const legalDocuments: LegalDocument[] = [
    {
      name: 'RTI Application',
      description: 'Right to Information application for accessing government information',
      requiredDocs: ['Identity Proof', 'Application in prescribed format'],
      process: ['Draft application with specific information needed', 'Pay ₹10 fee (₹2 for BPL)', 'Submit to concerned PIO', 'Receive response within 30 days'],
      fees: '₹10 (₹2 for BPL cardholders)',
      timeframe: '30 days for response',
      keywords: ['rti', 'right to information', 'government information', 'public information']
    },
    {
      name: 'Marriage Certificate',
      description: 'Official certificate proving legal marriage registration',
      requiredDocs: ['Marriage Photos', 'Age Proof', 'Address Proof', 'Two Witnesses', 'Aadhar Cards'],
      process: ['Register marriage within 30 days', 'Fill application form', 'Submit documents with fee', 'Verification by registrar', 'Certificate issuance'],
      fees: '₹100-500 (varies by state)',
      timeframe: '15-30 days',
      keywords: ['marriage certificate', 'marriage registration', 'wedding certificate']
    },
    {
      name: 'Property Registration',
      description: 'Legal registration of property ownership transfer',
      requiredDocs: ['Sale Deed', 'NOC from Society', 'Property Tax Receipts', 'Identity Proofs', 'PAN Cards'],
      process: ['Document verification', 'Stamp duty payment', 'Registration fee payment', 'Biometric verification', 'Registration completion'],
      fees: '1-8% of property value (stamp duty + registration)',
      timeframe: '1-7 days',
      keywords: ['property registration', 'sale deed', 'stamp duty', 'property transfer']
    },
    {
      name: 'Legal Heir Certificate',
      description: 'Certificate establishing legal heirs of deceased person',
      requiredDocs: ['Death Certificate', 'Family Tree', 'Affidavit', 'Address Proof', 'Identity Proofs of heirs'],
      process: ['Submit application with documents', 'Local inquiry by revenue official', 'Publication in local newspaper', 'Verification process', 'Certificate issuance'],
      fees: '₹50-200',
      timeframe: '30-60 days',
      keywords: ['legal heir', 'succession certificate', 'inheritance', 'heir certificate']
    },
    {
      name: 'FIR Registration',
      description: 'First Information Report for criminal complaints',
      requiredDocs: ['Written complaint', 'Evidence (if any)', 'Identity Proof'],
      process: ['Visit police station', 'File written complaint', 'Police verification', 'FIR registration', 'Receive FIR copy'],
      fees: 'Free of cost',
      timeframe: 'Immediate (must be registered)',
      keywords: ['fir', 'first information report', 'police complaint', 'criminal complaint']
    }
  ];

  const quickQuestions = [
    { text: 'How to file RTI application?', emoji: '📋' },
    { text: 'Marriage certificate process', emoji: '💒' },
    { text: 'Property dispute resolution', emoji: '🏠' },
    { text: 'FIR registration process', emoji: '🚔' },
    { text: 'How to get free legal aid?', emoji: '⚖️' },
    { text: 'Passport application process', emoji: '📘' }
  ];

  const emergencyContacts = {
    'Legal Aid': '15100',
    'Women Helpline': '181',
    'Child Helpline': '1098',
    'Cyber Crime': '1930',
    'Police': '100',
    'Consumer Helpline': '1915'
  };

  // Voice Recognition Setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Clean text for better speech
      const cleanText = text.replace(/[🏛️📋💒🏠🚔⚖️📘🤔💡❓📚🚨📞⚠️👥🎯⏰💰📄]/g, '').replace(/\*\*/g, '');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const analyzeQuery = (query: string): LegalDocument | null => {
    const lowerQuery = query.toLowerCase();
    return legalDocuments.find(doc => 
      doc.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()))
    ) || null;
  };

  const generateConversationalResponse = (question: string): Message => {
    const lowerQuestion = question.toLowerCase();
    const matchedDocument = analyzeQuery(question);
    
    // Add to conversation history
    setConversationHistory(prev => [...prev.slice(-5), question]); // Keep last 5 exchanges
    
    if (matchedDocument) {
      return {
        id: messages.length + 1,
        text: `I can help you with **${matchedDocument.name}**! Here's what you need to know:\n\n**About:** ${matchedDocument.description}\n\n**Required Documents:**\n${matchedDocument.requiredDocs.map(doc => `• ${doc}`).join('\n')}\n\n**Process Steps:**\n${matchedDocument.process.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\n**Fees:** ${matchedDocument.fees}\n**Processing Time:** ${matchedDocument.timeframe}\n\nDo you need more detailed information about any specific aspect of this process?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'document_guide',
        documents: [matchedDocument.name],
        actions: [
          { label: 'Required Documents', action: 'show_documents' },
          { label: 'Step by Step Process', action: 'show_process' },
          { label: 'Find Legal Aid', action: 'find_legal_aid' }
        ]
      };
    }

    // Conversational responses based on intent
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
      return {
        id: messages.length + 1,
        text: `Hello! Great to meet you! I'm here to help you navigate India's legal system. Whether you need information about documents, legal procedures, or your rights, I'm here to assist. What specific legal matter can I help you with today?`,
        sender: 'bot',
        timestamp: new Date()
      };
    }

    if (lowerQuestion.includes('thank') || lowerQuestion.includes('thanks')) {
      return {
        id: messages.length + 1,
        text: `You're very welcome! I'm glad I could help. Remember, I'm always here if you have more legal questions. Is there anything else about Indian legal procedures or documents you'd like to know?`,
        sender: 'bot',
        timestamp: new Date()
      };
    }

    if (lowerQuestion.includes('legal aid') || lowerQuestion.includes('free legal help')) {
      return {
        id: messages.length + 1,
        text: `⚖️ **Free Legal Aid in India** - You have the right to legal assistance!\n\n🏛️ **Contact Points:**\n• District Legal Services Authority\n• Nearest Legal Aid Clinic\n• Helpline: 15100\n• Website: nalsa.gov.in\n\n👥 **Eligibility:**\n• Women, SC/ST, Children\n• Persons with disabilities\n• BPL families\n• Senior citizens (60+ years)\n• Victims of trafficking/acid attacks\n\n🎯 **Free Services:**\n• Legal consultation\n• Court representation\n• Document preparation\n• Court fee exemption\n\nWould you like me to help you find the nearest legal aid center?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick_action',
        actions: [
          { label: 'Find Nearest Legal Aid Center', action: 'find_center' },
          { label: 'Emergency Legal Contacts', action: 'emergency_contacts' }
        ]
      };
    }

    if (lowerQuestion.includes('emergency') || lowerQuestion.includes('urgent') || lowerQuestion.includes('help me')) {
      const contactsList = Object.entries(emergencyContacts)
        .map(([service, number]) => `• ${service}: ${number}`)
        .join('\n');
      
      return {
        id: messages.length + 1,
        text: `🚨 **Emergency Legal Contacts:**\n\n${contactsList}\n\n⚠️ **For Immediate Help:**\n• Go to nearest police station immediately\n• Women in distress: Call 181\n• Legal emergency: Call 15100\n• Keep all relevant documents ready\n\nWhat specific emergency situation are you facing? I can provide more targeted guidance.`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'quick_action'
      };
    }

    if (lowerQuestion.includes('lawyer') || lowerQuestion.includes('advocate')) {
      return {
        id: messages.length + 1,
        text: `Finding the right lawyer is crucial for your case. Here's how to proceed:\n\n🔍 **Finding a Lawyer:**\n• Contact your State Bar Council\n• Visit District Court advocate directories\n• Ask for referrals from Legal Aid Centers\n• Check online lawyer directories\n\n💰 **Cost Considerations:**\n• Government rates for various services\n• Free legal aid if you're eligible\n• Always discuss fees upfront\n• Get fee agreement in writing\n\n📋 **What to Prepare:**\n• All relevant documents\n• Clear timeline of events\n• Questions you want to ask\n• Your budget for legal services\n\nWhat type of legal matter do you need a lawyer for?`,
        sender: 'bot',
        timestamp: new Date()
      };
    }

    // Court-related queries
    if (lowerQuestion.includes('court') || lowerQuestion.includes('case') || lowerQuestion.includes('hearing')) {
      return {
        id: messages.length + 1,
        text: `Court procedures can be complex, but I can help you understand them better.\n\n🏛️ **Court System in India:**\n• Supreme Court (Highest)\n• High Courts (State level)\n• District Courts (Local level)\n• Specialized courts (Family, Consumer, etc.)\n\n📅 **Court Procedures:**\n• File petition/application\n• Pay court fees\n• Serve notice to other party\n• Attend hearings as scheduled\n• Follow court orders\n\n💡 **Tips:**\n• Always carry all documents\n• Dress formally\n• Arrive early\n• Bring a lawyer if possible\n• Keep copies of everything\n\nWhat specific court-related question can I help you with?`,
        sender: 'bot',
        timestamp: new Date()
      };
    }

    // Context-aware responses based on conversation history
    const recentContext = conversationHistory.slice(-2).join(' ').toLowerCase();
    
    if (recentContext.includes('property') && lowerQuestion.includes('dispute')) {
      return {
        id: messages.length + 1,
        text: `Since we were discussing property matters, here's specific guidance for property disputes:\n\n⚖️ **Property Dispute Resolution:**\n• Try mediation first (faster & cheaper)\n• Approach Civil Court if mediation fails\n• Gather all property documents\n• Get property survey done\n• Consult property lawyer\n\n📄 **Essential Documents:**\n• Original sale deed\n• Property tax receipts\n• Survey settlement records\n• Mutation records\n• Possession certificates\n\n🎯 **Alternative Resolution:**\n• Lok Adalat (faster resolution)\n• Arbitration (if agreed)\n• Family settlement (for family disputes)\n\nDo you have all the necessary property documents?`,
        sender: 'bot',
        timestamp: new Date()
      };
    }

    // General conversational response
    const responses = [
      `I understand you're asking about "${question}". Let me help you with this legal matter.`,
      `That's a good question about "${question}". Here's what I can tell you based on Indian law.`,
      `Thanks for asking about "${question}". This is an important legal topic.`,
      `I see you're interested in "${question}". Let me provide you with relevant legal information.`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      id: messages.length + 1,
      text: `${randomResponse}\n\nBased on Indian legal system, here are some general guidelines:\n\n🏛️ **Recommendations:**\n1. Contact your local Legal Services Authority\n2. Visit District Court help desk\n3. Call Legal Helpline: 15100\n4. Consult with a qualified advocate\n5. Gather all relevant documents\n\n💡 **For Better Assistance:**\n• Provide more specific details about your situation\n• Mention the state/jurisdiction\n• Specify the type of legal issue\n• Ask about particular documents or procedures\n\n❓ Would you like information about any specific legal document, procedure, or your rights in this matter?`,
      sender: 'bot',
      timestamp: new Date(),
      actions: [
        { label: 'Show All Legal Documents', action: 'show_all_docs' },
        { label: 'Find Legal Aid', action: 'find_legal_aid' },
        { label: 'Emergency Contacts', action: 'emergency_contacts' }
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setLoading(true);

    // Simulate AI processing time with more realistic delay
    setTimeout(() => {
      const botResponse = generateConversationalResponse(currentInput);
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
      
      // Auto-speak bot response
      speakText(botResponse.text);
    }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const handleActionClick = (action: string) => {
    let actionMessage: Message;
    
    switch (action) {
      case 'show_all_docs':
        actionMessage = {
          id: messages.length + 1,
          text: `📚 **Available Legal Document Services:**\n\n${legalDocuments.map((doc, index) => `${index + 1}. **${doc.name}**\n   ${doc.description}\n   Time: ${doc.timeframe} | Fees: ${doc.fees}`).join('\n\n')}\n\nTo get detailed information about any document, just type its name or ask me about it!`,
          sender: 'bot',
          timestamp: new Date()
        };
        break;
        
      case 'emergency_contacts':
        actionMessage = {
          id: messages.length + 1,
          text: `🚨 **Emergency Legal Contact Numbers:**\n\n${Object.entries(emergencyContacts).map(([service, number]) => `📞 ${service}: ${number}`).join('\n')}\n\n⚠️ Save these numbers and use them when needed. Remember, in legal emergencies, time is crucial!`,
          sender: 'bot',
          timestamp: new Date()
        };
        break;
        
      case 'find_legal_aid':
        actionMessage = {
          id: messages.length + 1,
          text: `⚖️ **To find your nearest Legal Aid Center:**\n\n1. Tell me your district name\n2. Or provide your PIN code\n3. Or simply ask "legal aid near me"\n\n📞 **Immediate Help:** 15100\n🌐 **Official Website:** nalsa.gov.in\n📧 **Email Support:** Available on website\n\n💡 **Tip:** Legal aid is your constitutional right - don't hesitate to use it!`,
          sender: 'bot',
          timestamp: new Date()
        };
        break;
        
      default:
        actionMessage = {
          id: messages.length + 1,
          text: `I'm processing your request. How else can I assist you with your legal queries?`,
          sender: 'bot',
          timestamp: new Date()
        };
    }
    
    setMessages(prev => [...prev, actionMessage]);
    speakText(actionMessage.text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏛️ NyayaAI Legal Assistant</h1>
          <p className="text-gray-600">Indian Legal Assistant - Protecting Your Legal Rights</p>
        </div>

        {/* Voice Controls */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4 bg-white rounded-lg p-2 shadow-md">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`px-4 py-2 rounded-md font-medium transition-all flex items-center space-x-2 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <span>{isListening ? '🎙️' : '🎤'}</span>
              <span>{isListening ? 'Stop Listening' : 'Voice Input'}</span>
            </button>
            
            <button
              onClick={isSpeaking ? stopSpeaking : () => {}}
              disabled={!isSpeaking}
              className={`px-4 py-2 rounded-md font-medium transition-all flex items-center space-x-2 ${
                isSpeaking
                  ? 'bg-green-500 text-white animate-pulse cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{isSpeaking ? '🔊' : '🔇'}</span>
              <span>{isSpeaking ? 'Speaking...' : 'Voice Output'}</span>
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">💬 NyayaAI Legal Assistant</h3>
                <p className="text-blue-100">Ask about legal procedures, documents, and your rights</p>
              </div>
              <div className="text-right">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-100">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.text}
                  </div>
                  {message.actions && (
                    <div className="mt-3 space-y-2">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(action.action)}
                          className="block w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-blue-700 transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-md border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                    <span className="text-sm">Analyzing your query...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your legal question here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputText.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                📤 Send
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">⚡ Quick Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question.text)}
                className="bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl p-4 text-left transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{question.emoji}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{question.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🏛️ NyayaAI - Making Indian Justice System Accessible</p>
          <p className="mt-1">Emergency: 📞 Police: 100 | Legal Aid: 15100 | Women Helpline: 181</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;