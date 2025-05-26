
import React, { useState } from 'react';

interface LegalAidCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  services: string[];
  timings: string;
  state: string;
  city: string;
}

const LegalAid: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const legalAidCenters: LegalAidCenter[] = [
    {
      id: 1,
      name: 'Delhi State Legal Services Authority',
      address: 'Patiala House Courts Complex, New Delhi - 110001',
      phone: '011-23357975',
      services: ['Free Legal Aid', 'Lok Adalat', 'Legal Literacy', 'Mediation'],
      timings: '10:00 AM - 5:00 PM',
      state: 'Delhi',
      city: 'New Delhi'
    },
    {
      id: 2,
      name: 'Maharashtra State Legal Services Authority',
      address: 'Old High Court Building, Mumbai - 400032',
      phone: '022-22621672',
      services: ['Free Legal Consultation', 'Women Legal Aid', 'SC/ST Legal Help'],
      timings: '10:30 AM - 5:30 PM',
      state: 'Maharashtra',
      city: 'Mumbai'
    },
    {
      id: 3,
      name: 'West Bengal State Legal Services Authority',
      address: 'Calcutta High Court, Kolkata - 700001',
      phone: '033-22404481',
      services: ['Legal Aid Clinic', 'Mobile Legal Aid', 'Prison Legal Aid'],
      timings: '10:00 AM - 4:00 PM',
      state: 'West Bengal',
      city: 'Kolkata'
    },
    {
      id: 4,
      name: 'Tamil Nadu State Legal Services Authority',
      address: 'High Court Buildings, Chennai - 600104',
      phone: '044-25340772',
      services: ['Free Legal Aid', 'Legal Awareness', 'Alternative Dispute Resolution'],
      timings: '9:30 AM - 5:30 PM',
      state: 'Tamil Nadu',
      city: 'Chennai'
    },
    {
      id: 5,
      name: 'Rajasthan State Legal Services Authority',
      address: 'High Court Premises, Jodhpur - 342001',
      phone: '0291-2970326',
      services: ['Rural Legal Aid', 'Women Empowerment', 'Child Rights'],
      timings: '10:00 AM - 5:00 PM',
      state: 'Rajasthan',
      city: 'Jodhpur'
    }
  ];

  const ngos = [
    {
      name: 'Lawyers Collective',
      focus: 'Human Rights, Women Rights',
      contact: 'info@lawyerscollective.org',
      website: 'www.lawyerscollective.org'
    },
    {
      name: 'PRAJA Foundation',
      focus: 'Governance, RTI, Public Policy',
      contact: 'info@praja.org',
      website: 'www.praja.org'
    },
    {
      name: 'Nyaaya',
      focus: 'Legal Awareness, Simplified Law',
      contact: 'hello@nyaaya.org',
      website: 'www.nyaaya.org'
    }
  ];

  const helplines = [
    { name: 'National Legal Services Authority', number: '15100', description: 'Free legal advice' },
    { name: 'Women Helpline', number: '181', description: '24x7 support for women' },
    { name: 'Child Helpline', number: '1098', description: 'Child protection services' },
    { name: 'Senior Citizen Helpline', number: '14567', description: 'Elder abuse and support' },
    { name: 'Cyber Crime Helpline', number: '1930', description: 'Online fraud and cyber crimes' }
  ];

  const states = ['Delhi', 'Maharashtra', 'West Bengal', 'Tamil Nadu', 'Rajasthan'];
  const cities = {
    'Delhi': ['New Delhi'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'West Bengal': ['Kolkata', 'Siliguri'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Rajasthan': ['Jodhpur', 'Jaipur', 'Udaipur']
  };

  const filteredCenters = legalAidCenters.filter(center => {
    const matchesState = !selectedState || center.state === selectedState;
    const matchesCity = !selectedCity || center.city === selectedCity;
    const matchesSearch = !searchTerm || 
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesState && matchesCity && matchesSearch;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Legal Aid Directory</h1>
        <p className="section-subtitle">Find legal help centers, NGOs, and support services near you</p>

        {/* Emergency Helplines */}
        <div className="card" style={{ marginBottom: '40px', background: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)', color: '#92400e' }}>
          <h3 style={{ marginBottom: '20px', color: '#92400e' }}>🚨 Emergency Legal Helplines</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {helplines.map((helpline, index) => (
              <div key={index} style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '16px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>{helpline.name}</h4>
                <p style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 'bold' }}>📞 {helpline.number}</p>
                <p style={{ margin: 0, fontSize: '14px' }}>{helpline.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '20px' }}>Find Legal Aid Centers</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">State</label>
              <select 
                className="form-input" 
                value={selectedState} 
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                }}
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <select 
                className="form-input" 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
              >
                <option value="">All Cities</option>
                {selectedState && cities[selectedState as keyof typeof cities]?.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Search Services</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Women Legal Aid"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Legal Aid Centers */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '24px' }}>Legal Services Authorities</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {filteredCenters.map((center) => (
              <div key={center.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#3b82f6' }}>{center.name}</h3>
                    <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>📍 {center.address}</p>
                    <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>📞 {center.phone}</p>
                    <p style={{ margin: 0, color: '#6b7280' }}>🕒 {center.timings}</p>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ margin: '16px 0 8px 0', color: '#1f2937' }}>Services Offered:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {center.services.map((service, index) => (
                      <span key={index} style={{
                        background: '#eff6ff',
                        color: '#3b82f6',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NGOs Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '24px' }}>Legal Aid NGOs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {ngos.map((ngo, index) => (
              <div key={index} className="card">
                <h3 style={{ margin: '0 0 12px 0', color: '#3b82f6' }}>{ngo.name}</h3>
                <p style={{ margin: '0 0 8px 0' }}><strong>Focus:</strong> {ngo.focus}</p>
                <p style={{ margin: '0 0 8px 0' }}>📧 {ngo.contact}</p>
                <p style={{ margin: 0 }}>🌐 {ngo.website}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Groups */}
        <div className="card" style={{ background: '#f0fdf4', border: '1px solid #a7f3d0' }}>
          <h3 style={{ color: '#065f46', marginBottom: '16px' }}>💬 WhatsApp Legal Help Groups</h3>
          <p style={{ color: '#065f46', marginBottom: '16px' }}>
            Join community WhatsApp groups for legal discussions and help:
          </p>
          <ul style={{ color: '#065f46', paddingLeft: '20px' }}>
            <li>Rural Legal Aid India - Contact your nearest DLSA for group link</li>
            <li>Women Legal Rights Support - Available through women helpline 181</li>
            <li>Legal Awareness Groups - Contact your state legal services authority</li>
          </ul>
          <p style={{ color: '#065f46', fontSize: '14px', marginTop: '16px', fontStyle: 'italic' }}>
            Note: Official WhatsApp groups are managed by legal authorities. Beware of fake groups.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalAid;
