import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'document_guide' | 'quick_action';
  documents?: string[];
  actions?: Array<{label: string, action: string}>;
  language?: string;
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
      timestamp: new Date(),
      language: 'en'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [deepseekApiKey, setDeepseekApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    hi: { name: 'हिंदी', flag: '🇮🇳' },
    bn: { name: 'বাংলা', flag: '🇧🇩' }
  };

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
      
      // Set language based on selection
      const langMap = { en: 'en-US', hi: 'hi-IN', bn: 'bn-IN' };
      recognitionRef.current.lang = langMap[selectedLanguage as keyof typeof langMap] || 'en-US';

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
  }, [selectedLanguage]);

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
      window.speechSynthesis.cancel();
      
      const cleanText = text.replace(/[🏛️📋💒🏠🚔⚖️📘🤔💡❓📚🚨📞⚠️👥🎯⏰💰📄]/g, '').replace(/\*\*/g, '');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Set voice language
      const voices = window.speechSynthesis.getVoices();
      const langMap = { en: 'en', hi: 'hi', bn: 'bn' };
      const targetLang = langMap[selectedLanguage as keyof typeof langMap];
      const voice = voices.find(v => v.lang.startsWith(targetLang)) || voices[0];
      if (voice) utterance.voice = voice;
      
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

  const getSystemPrompt = (language: string) => {
    const prompts = {
      en: `You are NyayaAI, an expert Indian legal assistant chatbot. You help users understand Indian legal procedures, documents, and rights. Always provide accurate, helpful information about Indian law, legal procedures, and constitutional rights. Keep responses conversational but informative. Use emojis appropriately. Focus on practical guidance and actionable advice.`,
      hi: `आप NyayaAI हैं, एक विशेषज्ञ भारतीय कानूनी सहायक चैटबॉट। आप उपयोगकर्ताओं को भारतीय कानूनी प्रक्रियाओं, दस्तावेजों और अधिकारों को समझने में मदद करते हैं। हमेशा भारतीय कानून, कानूनी प्रक्रियाओं और संवैधानिक अधिकारों के बारे में सटीक, सहायक जानकारी प्रदान करें। उत्तर बातचीत के अंदाज में लेकिन जानकारीपूर्ण रखें।`,
      bn: `আপনি NyayaAI, একজন বিশেষজ্ঞ ভারতীয় আইনী সহায়ক চ্যাটবট। আপনি ব্যবহারকারীদের ভারতীয় আইনী প্রক্রিয়া, নথি এবং অধিকার বুঝতে সাহায্য করেন। সর্বদা ভারতীয় আইন, আইনী প্রক্রিয়া এবং সাংবিধানিক অধিকার সম্পর্কে নির্ভুল, সহায়ক তথ্য প্রদান করুন। উত্তরগুলি কথোপকথনমূলক কিন্তু তথ্যবহুল রাখুন।`
    };
    return prompts[language as keyof typeof prompts] || prompts.en;
  };

  const callDeepSeekAPI = async (userMessage: string, language: string): Promise<string> => {
    if (!deepseekApiKey) {
      return language === 'hi' ? 'कृपया पहले DeepSeek API Key सेट करें।' : 
             language === 'bn' ? 'দয়া করে প্রথমে DeepSeek API Key সেট করুন।' : 
             'Please set DeepSeek API Key first.';
    }

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${deepseekApiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: getSystemPrompt(language)
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      return language === 'hi' ? 'क्षमा करें, कुछ तकनीकी समस्या हुई है। कृपया बाद में पुनः प्रयास करें।' : 
             language === 'bn' ? 'দুঃখিত, কিছু প্রযুক্তিগত সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।' : 
             'Sorry, there was a technical issue. Please try again later.';
    }
  };

  const generateConversationalResponse = async (question: string): Promise<Message> => {
    const matchedDocument = analyzeQuery(question);
    
    setConversationHistory(prev => [...prev.slice(-5), question]);
    
    // For document-specific queries, provide structured response
    if (matchedDocument) {
      const docResponse = `I can help you with **${matchedDocument.name}**! Here's what you need to know:\n\n**About:** ${matchedDocument.description}\n\n**Required Documents:**\n${matchedDocument.requiredDocs.map(doc => `• ${doc}`).join('\n')}\n\n**Process Steps:**\n${matchedDocument.process.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\n**Fees:** ${matchedDocument.fees}\n**Processing Time:** ${matchedDocument.timeframe}\n\nDo you need more detailed information about any specific aspect of this process?`;
      
      return {
        id: messages.length + 1,
        text: docResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'document_guide',
        documents: [matchedDocument.name],
        language: selectedLanguage,
        actions: [
          { label: 'Required Documents', action: 'show_documents' },
          { label: 'Step by Step Process', action: 'show_process' },
          { label: 'Find Legal Aid', action: 'find_legal_aid' }
        ]
      };
    }

    // For general queries, use DeepSeek API
    const aiResponse = await callDeepSeekAPI(question, selectedLanguage);
    
    return {
      id: messages.length + 1,
      text: aiResponse,
      sender: 'bot',
      timestamp: new Date(),
      language: selectedLanguage,
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
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setLoading(true);

    try {
      const botResponse = await generateConversationalResponse(currentInput);
      setMessages(prev => [...prev, botResponse]);
      speakText(botResponse.text);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: messages.length + 1,
        text: selectedLanguage === 'hi' ? 'क्षमा करें, कुछ समस्या हुई है।' : 
              selectedLanguage === 'bn' ? 'দুঃখিত, কিছু সমস্যা হয়েছে।' : 
              'Sorry, something went wrong.',
        sender: 'bot',
        timestamp: new Date(),
        language: selectedLanguage
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
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
          timestamp: new Date(),
          language: selectedLanguage
        };
        break;
        
      case 'emergency_contacts':
        actionMessage = {
          id: messages.length + 1,
          text: `🚨 **Emergency Legal Contact Numbers:**\n\n${Object.entries(emergencyContacts).map(([service, number]) => `📞 ${service}: ${number}`).join('\n')}\n\n⚠️ Save these numbers and use them when needed. Remember, in legal emergencies, time is crucial!`,
          sender: 'bot',
          timestamp: new Date(),
          language: selectedLanguage
        };
        break;
        
      case 'find_legal_aid':
        actionMessage = {
          id: messages.length + 1,
          text: `⚖️ **To find your nearest Legal Aid Center:**\n\n1. Tell me your district name\n2. Or provide your PIN code\n3. Or simply ask "legal aid near me"\n\n📞 **Immediate Help:** 15100\n🌐 **Official Website:** nalsa.gov.in\n📧 **Email Support:** Available on website\n\n💡 **Tip:** Legal aid is your constitutional right - don't hesitate to use it!`,
          sender: 'bot',
          timestamp: new Date(),
          language: selectedLanguage
        };
        break;
        
      default:
        actionMessage = {
          id: messages.length + 1,
          text: `I'm processing your request. How else can I assist you with your legal queries?`,
          sender: 'bot',
          timestamp: new Date(),
          language: selectedLanguage
        };
    }
    
    setMessages(prev => [...prev, actionMessage]);
    speakText(actionMessage.text);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    // Update the welcome message in the new language
    const welcomeMessages = {
      en: '🏛️ Hello! I am NyayaAI, your Indian legal assistant. I can help you with legal documents, procedures, and rights information. How can I assist you today?',
      hi: '🏛️ नमस्ते! मैं NyayaAI हूं, आपका भारतीय कानूनी सहायक। मैं आपकी कानूनी दस्तावेजों, प्रक्रियाओं और अधिकारों की जानकारी में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?',
      bn: '🏛️ নমস্কার! আমি NyayaAI, আপনার ভারতীয় আইনী সহায়ক। আমি আপনাকে আইনী নথি, প্রক্রিয়া এবং অধিকারের তথ্য দিয়ে সাহায্য করতে পারি। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?'
    };
    
    setMessages([{
      id: 1,
      text: welcomeMessages[lang as keyof typeof welcomeMessages],
      sender: 'bot',
      timestamp: new Date(),
      language: lang
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏛️ NyayaAI Legal Assistant</h1>
          <p className="text-gray-600">Indian Legal Assistant - Protecting Your Legal Rights</p>
        </div>

        {/* API Key Input */}
        <div className="mb-4">
          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            {deepseekApiKey ? '🔑 API Key Set' : '🔑 Set DeepSeek API Key'}
          </button>
          {showApiKeyInput && (
            <div className="mt-2 flex space-x-2">
              <input
                type="password"
                placeholder="Enter DeepSeek API Key"
                value={deepseekApiKey}
                onChange={(e) => setDeepseekApiKey(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={() => setShowApiKeyInput(false)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-md">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`px-4 py-2 rounded-md font-medium transition-all flex items-center space-x-2 ${
                  selectedLanguage === code
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
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