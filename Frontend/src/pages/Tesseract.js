// Real OCR implementation
const result = await Tesseract.recognize(file, 'eng', {
  logger: (m) => {
    if (m.status === 'recognizing text') {
      const progress = Math.round(m.progress * 100);
      setOcrProgress(prev => ({ ...prev, [documentId]: progress }));
    }
  }
});