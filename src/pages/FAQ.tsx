
import React, { useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

const FAQ: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const faqData: FAQCategory[] = [
    {
      title: 'Land & Property',
      icon: '🏡',
      items: [
        {
          question: 'How to check land ownership records?',
          answer: 'Visit the local Tehsildar office or use online portals like Webland, Bhulekh, or Land Records portal of your state. You need survey number or plot number to search records.'
        },
        {
          question: 'What documents are needed for property registration?',
          answer: 'Sale deed, NOC from society, property card, survey settlement records, property tax receipts, approved building plan, and identity proofs of both parties.'
        },
        {
          question: 'How to resolve land disputes?',
          answer: 'First approach Village Panchayat, then Tehsildar, Sub-Divisional Magistrate. For court cases, consult a lawyer. Lok Adalat provides mediation services.'
        }
      ]
    },
    {
      title: 'Marriage & Family',
      icon: '👨‍👩‍👧‍👦',
      items: [
        {
          question: 'How to register marriage?',
          answer: 'Submit application to Marriage Registrar within 30 days of marriage. Required: Marriage photos, age proof, address proof, witnesses. Fee varies by state (₹100-500).'
        },
        {
          question: 'What are women\'s rights in divorce?',
          answer: 'Women have rights to maintenance, property share, child custody, and compensation. Consult family court or women\'s legal aid center for specific guidance.'
        },
        {
          question: 'How to file domestic violence case?',
          answer: 'Approach nearest police station, file complaint under Domestic Violence Act 2005. Contact women helpline 181 or visit Mahila Court for immediate protection.'
        }
      ]
    },
    {
      title: 'Criminal Law & FIR',
      icon: '⚖️',
      items: [
        {
          question: 'How to file FIR?',
          answer: 'Visit police station, provide written complaint with details. Police must register FIR for cognizable offenses. If refused, approach SP or use online police portal.'
        },
        {
          question: 'What to do if FIR is not filed?',
          answer: 'Send written complaint to Superintendent of Police, approach Magistrate under Section 156(3) CrPC, or file private complaint in court.'
        },
        {
          question: 'How to check FIR status?',
          answer: 'Use state police website, call investigating officer, or visit police station with FIR copy and acknowledgment receipt.'
        }
      ]
    },
    {
      title: 'Right to Information (RTI)',
      icon: '📋',
      items: [
        {
          question: 'How to file RTI application?',
          answer: 'Submit application to Public Information Officer with ₹10 fee (₹2 for BPL). Include specific information needed. Response within 30 days mandatory.'
        },
        {
          question: 'What information can be sought under RTI?',
          answer: 'Any government records, files, documents, land records, tender details, government decisions. Exempted: Cabinet papers, security matters, personal information.'
        },
        {
          question: 'What if RTI is not answered?',
          answer: 'File first appeal to Appellate Authority within 30 days. If unsatisfied, approach State/Central Information Commission within 90 days.'
        }
      ]
    },
    {
      title: 'Legal Aid & Support',
      icon: '🤝',
      items: [
        {
          question: 'Who is eligible for free legal aid?',
          answer: 'Women, SC/ST, children, disabled persons, BPL families, victims of trafficking, those earning less than ₹9000/month are eligible for free legal services.'
        },
        {
          question: 'How to get free lawyer?',
          answer: 'Contact District Legal Services Authority (DLSA), visit Legal Aid Clinic, or call toll-free number 15100 for legal advice and free lawyer assignment.'
        },
        {
          question: 'What is Lok Adalat?',
          answer: 'Alternative dispute resolution forum for amicable settlement. Cases are settled through compromise. No court fee, no appeal. Conducted monthly by Legal Services Authority.'
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredData = faqData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Legal FAQ</h1>
        <p className="section-subtitle">Find answers to common legal questions</p>
        
        <LanguageSelector 
          currentLanguage={currentLanguage} 
          onLanguageChange={setCurrentLanguage} 
        />

        <div style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ textAlign: 'center' }}
          />
        </div>

        {filteredData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="faq-category">
            <h2 className="faq-category-title">
              {category.icon} {category.title}
            </h2>
            
            {category.items.map((item, itemIndex) => {
              const isOpen = openItems[`${categoryIndex}-${itemIndex}`];
              return (
                <div key={itemIndex} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleItem(categoryIndex, itemIndex)}
                  >
                    {item.question}
                    <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                      ⌄
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {filteredData.length === 0 && searchTerm && (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <h3>No results found</h3>
            <p>Try different keywords or browse categories above</p>
          </div>
        )}

        <div className="card" style={{ marginTop: '40px', textAlign: 'center' }}>
          <h3>Need More Help?</h3>
          <p>Can't find what you're looking for? Our AI chatbot can help with specific questions.</p>
          <a href="/chatbot" className="btn btn-primary">Ask NyayaAI</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
