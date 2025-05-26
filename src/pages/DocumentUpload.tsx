
import React, { useState, useRef } from 'react';

interface UploadedDocument {
  id: number;
  name: string;
  type: string;
  size: number;
  analysisResult?: {
    documentType: string;
    authenticity: string;
    summary: string;
    corrections?: string[];
  };
}

const DocumentUpload: React.FC = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [cameraMode, setCameraMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const documentTypes = [
    'Land Paper/Property Document',
    'Marriage Certificate',
    'FIR/Police Report',
    'Aadhar Card',
    'Legal Notice',
    'Court Order',
    'Birth Certificate',
    'Death Certificate'
  ];

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const document: UploadedDocument = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size
      };

      setUploadedDocuments(prev => [...prev, document]);
      analyzeDocument(document.id);
    });
  };

  const analyzeDocument = async (documentId: number) => {
    setAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const analysisResults = [
        {
          documentType: 'Land Paper/Property Document',
          authenticity: 'Original',
          summary: 'Property ownership document for Plot No. 123, Village ABC. Owner: John Doe. Area: 2 acres. Registration Date: 15/03/2020',
          corrections: []
        },
        {
          documentType: 'Marriage Certificate',
          authenticity: 'Possibly Fake',
          summary: 'Marriage certificate between parties A and B. Issue: Missing official seal and signature verification failed.',
          corrections: ['Visit marriage registrar office', 'Apply for fresh certificate with proper documents', 'Fee: ₹100-500']
        },
        {
          documentType: 'Aadhar Card',
          authenticity: 'Tampered',
          summary: 'Aadhar card with modified date of birth. Original issued in 2015, but DOB appears altered.',
          corrections: ['File complaint with UIDAI', 'Visit nearest Aadhar center', 'Apply for correction with valid documents']
        }
      ];

      const randomResult = analysisResults[Math.floor(Math.random() * analysisResults.length)];

      setUploadedDocuments(prev =>
        prev.map(doc =>
          doc.id === documentId
            ? { ...doc, analysisResult: randomResult }
            : doc
        )
      );
      setAnalyzing(false);
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const startCamera = async () => {
    setCameraMode(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please upload file instead.');
      setCameraMode(false);
    }
  };

  const capturePhoto = () => {
    // In a real implementation, this would capture the photo and process it
    alert('Photo captured! (Feature will be implemented with actual camera API)');
    setCameraMode(false);
  };

  const getAuthenticityBadge = (authenticity: string) => {
    const styles = {
      'Original': { background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' },
      'Possibly Fake': { background: '#fffbeb', color: '#92400e', border: '1px solid #fcd34d' },
      'Tampered': { background: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5' }
    };

    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        ...styles[authenticity as keyof typeof styles]
      }}>
        {authenticity === 'Original' ? '✅' : authenticity === 'Possibly Fake' ? '⚠️' : '❌'} {authenticity}
      </span>
    );
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Document Scanner & Analyzer</h1>
        <p className="section-subtitle">Upload or scan legal documents for instant analysis and verification</p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
          <button
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            📄 Upload Document
          </button>
          <button
            className="btn btn-secondary"
            onClick={startCamera}
          >
            📷 Scan with Camera
          </button>
        </div>

        {!cameraMode ? (
          <div
            className={`upload-zone ${dragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
            <h3>Drop documents here or click to upload</h3>
            <p>Supports: JPG, PNG, PDF files</p>
            <p>Max size: 10MB per file</p>
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center' }}>
            <h3>Camera Scanner</h3>
            <video
              ref={videoRef}
              autoPlay
              style={{ width: '100%', maxWidth: '500px', borderRadius: '8px', marginBottom: '16px' }}
            />
            <div>
              <button className="btn btn-success" onClick={capturePhoto}>
                📸 Capture
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setCameraMode(false)}
                style={{ marginLeft: '12px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files)}
        />

        {analyzing && (
          <div className="alert alert-warning">
            <span className="loading"></span>
            Analyzing document using AI... This may take a few moments.
          </div>
        )}

        {uploadedDocuments.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h2>Uploaded Documents</h2>
            <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
              {uploadedDocuments.map((doc) => (
                <div key={doc.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px 0' }}>{doc.name}</h3>
                      <p style={{ color: '#6b7280', margin: 0 }}>
                        Size: {(doc.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    {doc.analysisResult && getAuthenticityBadge(doc.analysisResult.authenticity)}
                  </div>

                  {doc.analysisResult ? (
                    <div>
                      <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ color: '#3b82f6', marginBottom: '8px' }}>Document Type</h4>
                        <p>{doc.analysisResult.documentType}</p>
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ color: '#3b82f6', marginBottom: '8px' }}>Summary</h4>
                        <p>{doc.analysisResult.summary}</p>
                      </div>

                      {doc.analysisResult.corrections && doc.analysisResult.corrections.length > 0 && (
                        <div>
                          <h4 style={{ color: '#dc2626', marginBottom: '8px' }}>Correction Steps</h4>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {doc.analysisResult.corrections.map((correction, index) => (
                              <li key={index} style={{ marginBottom: '4px' }}>{correction}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
                      Analysis in progress...
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px' }}>
          <h3>Supported Document Types</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginTop: '16px' }}>
            {documentTypes.map((type, index) => (
              <div key={index} className="card" style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📋</div>
                <p style={{ margin: 0, fontWeight: '500' }}>{type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
