
 const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      fullText += pageText + '\n\n'; // Add some spacing between pages
    }

    return fullText;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return '';
  }
};
