
import React, { useState } from 'react';

interface DocumentType {
  name: string;
  icon: string;
  steps: string[];
  requiredDocs: string[];
  fee: string;
  timeframe: string;
  website: string;
}

const LostDocuments: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);

  const documentTypes: DocumentType[] = [
    {
      name: 'Aadhar Card',
      icon: '🆔',
      steps: [
        'Visit nearest Aadhar Enrollment Center',
        'Fill Aadhar correction/update form',
        'Provide biometric verification',
        'Pay prescribed fee',
        'Collect acknowledgment slip',
        'Download duplicate Aadhar online after 90 days'
      ],
      requiredDocs: ['Any valid ID proof', 'Address proof', 'Mobile number linked to Aadhar'],
      fee: '₹50',
      timeframe: '90 days',
      website: 'uidai.gov.in'
    },
    {
      name: 'Pan Card',
      icon: '💳',
      steps: [
        'File FIR for lost PAN card',
        'Visit NSDL/UTI website',
        'Fill form 49A for duplicate PAN',
        'Attach required documents',
        'Pay processing fee',
        'Submit application online or offline'
      ],
      requiredDocs: ['Copy of FIR', 'Identity proof', 'Address proof', 'Passport size photo'],
      fee: '₹110 (online) / ₹165 (offline)',
      timeframe: '15-20 days',
      website: 'onlineservices.nsdl.com'
    },
    {
      name: 'Passport',
      icon: '📘',
      steps: [
        'File FIR for lost passport',
        'Visit Passport Seva website',
        'Fill form for re-issue of passport',
        'Book appointment at PSK/POPSK',
        'Attend appointment with documents',
        'Pay applicable fees'
      ],
      requiredDocs: ['Copy of FIR', 'Affidavit for lost passport', 'Identity proof', 'Address proof'],
      fee: '₹3500 (normal) / ₹5500 (tatkal)',
      timeframe: '30-45 days (normal) / 7-15 days (tatkal)',
      website: 'passportindia.gov.in'
    },
    {
      name: 'Driving License',
      icon: '🚗',
      steps: [
        'File FIR for lost license',
        'Visit RTO office or online portal',
        'Fill form 26 for duplicate license',
        'Submit required documents',
        'Pay fee and collect receipt',
        'Receive duplicate license'
      ],
      requiredDocs: ['Copy of FIR', 'Form 26', 'Identity proof', 'Address proof', 'Medical certificate'],
      fee: '₹200-500 (varies by state)',
      timeframe: '7-15 days',
      website: 'sarathi.parivahan.gov.in'
    },
    {
      name: 'Voter ID',
      icon: '🗳️',
      steps: [
        'Visit CEO office or BLO',
        'Fill form 8A for duplicate EPIC',
        'Submit affidavit for lost card',
        'Provide required documents',
        'Collect acknowledgment',
        'Receive duplicate voter ID'
      ],
      requiredDocs: ['Affidavit for lost card', 'Address proof', 'Identity proof', 'Passport size photo'],
      fee: 'Free',
      timeframe: '30-45 days',
      website: 'nvsp.in'
    },
    {
      name: 'Birth Certificate',
      icon: '👶',
      steps: [
        'Visit Municipal Corporation office',
        'Fill application for duplicate certificate',
        'Submit affidavit for lost certificate',
        'Provide required documents',
        'Pay prescribed fee',
        'Collect duplicate certificate'
      ],
      requiredDocs: ['Affidavit for lost certificate', 'School leaving certificate', 'Hospital birth record', 'Parents ID proof'],
      fee: '₹50-200 (varies by state)',
      timeframe: '7-30 days',
      website: 'State municipal website'
    },
    {
      name: 'Marriage Certificate',
      icon: '💑',
      steps: [
        'File FIR for lost certificate',
        'Visit Marriage Registrar office',
        'Submit application for duplicate',
        'Provide marriage proof documents',
        'Pay processing fee',
        'Collect duplicate certificate'
      ],
      requiredDocs: ['Copy of FIR', 'Joint affidavit by spouses', 'Wedding photos', 'Witness statements', 'ID proofs'],
      fee: '₹100-500 (varies by state)',
      timeframe: '15-30 days',
      website: 'State registrar website'
    },
    {
      name: 'Property Documents',
      icon: '🏠',
      steps: [
        'File FIR for lost documents',
        'Visit Sub-Registrar office',
        'Apply for certified copies',
        'Submit property details',
        'Pay copying charges',
        'Collect certified copies'
      ],
      requiredDocs: ['Copy of FIR', 'Property tax receipts', 'Survey settlement record', 'Identity proof'],
      fee: '₹50-200 per document',
      timeframe: '7-15 days',
      website: 'State registration department'
    }
  ];

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Lost Document Recovery</h1>
        <p className="section-subtitle">Step-by-step guide to recover your lost legal documents</p>

        <div className="alert alert-warning" style={{ marginBottom: '40px' }}>
          <strong>⚠️ Important:</strong> Always file an FIR (First Information Report) for valuable lost documents to prevent misuse.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {documentTypes.map((doc, index) => (
            <div 
              key={index} 
              className="card" 
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => setSelectedDocument(doc)}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{doc.icon}</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#3b82f6' }}>{doc.name}</h3>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>Click for recovery guide</p>
            </div>
          ))}
        </div>

        {selectedDocument && (
          <div className="card" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '32px', marginRight: '16px' }}>{selectedDocument.icon}</div>
              <h2 style={{ margin: 0, color: '#1f2937' }}>How to Recover {selectedDocument.name}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '16px' }}>📋 Step-by-Step Process</h3>
                <ol style={{ paddingLeft: '20px' }}>
                  {selectedDocument.steps.map((step, index) => (
                    <li key={index} style={{ marginBottom: '8px', lineHeight: '1.5' }}>{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 style={{ color: '#3b82f6', marginBottom: '16px' }}>📄 Required Documents</h3>
                <ul style={{ paddingLeft: '20px' }}>
                  {selectedDocument.requiredDocs.map((doc, index) => (
                    <li key={index} style={{ marginBottom: '4px' }}>{doc}</li>
                  ))}
                </ul>

                <div style={{ marginTop: '24px' }}>
                  <h4 style={{ color: '#059669', marginBottom: '8px' }}>💰 Fee: {selectedDocument.fee}</h4>
                  <h4 style={{ color: '#dc2626', marginBottom: '8px' }}>⏱️ Time: {selectedDocument.timeframe}</h4>
                  <h4 style={{ color: '#7c3aed', marginBottom: '8px' }}>🌐 Website: {selectedDocument.website}</h4>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <h4 style={{ color: '#065f46', marginBottom: '8px' }}>💡 Pro Tips:</h4>
              <ul style={{ color: '#065f46', paddingLeft: '20px', margin: 0 }}>
                <li>Keep photocopies of all important documents separately</li>
                <li>Scan and store digital copies in cloud storage</li>
                <li>Always collect acknowledgment receipts during application</li>
                <li>Follow up regularly if processing takes longer than expected</li>
              </ul>
            </div>
          </div>
        )}

        <div className="card" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <h3 style={{ color: '#1e40af', marginBottom: '16px' }}>🛡️ Prevent Document Loss</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <h4 style={{ color: '#1e40af', marginBottom: '8px' }}>Physical Safety</h4>
              <ul style={{ color: '#1e40af', fontSize: '14px' }}>
                <li>Use document holders/folders</li>
                <li>Store in safe, dry place</li>
                <li>Keep copies in different locations</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#1e40af', marginBottom: '8px' }}>Digital Backup</h4>
              <ul style={{ color: '#1e40af', fontSize: '14px' }}>
                <li>Scan all documents in high quality</li>
                <li>Use cloud storage (Google Drive, Dropbox)</li>
                <li>Email copies to yourself</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: '#1e40af', marginBottom: '8px' }}>Regular Updates</h4>
              <ul style={{ color: '#1e40af', fontSize: '14px' }}>
                <li>Check document expiry dates</li>
                <li>Renew before expiration</li>
                <li>Update address changes promptly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostDocuments;
