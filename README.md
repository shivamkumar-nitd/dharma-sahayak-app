# 🌟 NyayaAI – Accessible Legal Intelligence for Every Citizen

---

## 🧩 Problem Statement

Millions of rural and semi-urban Indians face difficulty understanding legal procedures due to language barriers, document complexity, and limited access to legal aid. There is a lack of easy-to-use digital tools tailored for regional and multilingual users that can assist with document verification, legal queries, and aid discovery.

---

## 🔍 Approach & Solution

**NyayaAI** is a multilingual legal chatbot and document analysis tool designed for rural India. It combines AI, OCR, and NLP technologies to understand legal queries in regional languages, scan and verify documents, and provide simplified legal guidance. The solution is built as a responsive web app accessible even on low-bandwidth networks.

---

## 🚀 Features

1. **Multilingual Legal Chatbot**  
   Understands Hindi, English, Bengali queries, offers legal Q&A, voice I/O  
2. **Document Upload & OCR**  
   Scan/upload images or PDFs (handwritten/printed) with Tesseract + LayoutParser  
3. **Document Classification**  
   Detects type (e.g., FIR, Land Record, Marriage Cert.) using BERT/Vision models  
4. **Authenticity Check**  
   Flags document as Original/Fake/Tampered using login, signup and forgot password  
5. **Summary Extraction**  
   Highlights names, dates, case IDs, involved parties in simple language  
6. **Correction Assistant**  
   Guides on how to fix incorrect or fake documents with links, steps, fees  
7. **Live Camera Scanning**  
   Capture directly from webcam → OCR → classify → summarize  
8. **Legal FAQ Database**  
   Common questions like RTI, FIR, Lok Adalat, categorized and multilingual  
9. **Lost Document Recovery**  
   Step-by-step help to regenerate lost legal documents  
10. **Legal Aid Directory**  
    List of nearby legal aid centers, NGOs, WhatsApp legal support groups  
11. **Responsive UI**  
    Optimized for mobile/desktop + low-bandwidth areas  
12. **Open-Source & Modular**  
    Extendable for more languages, document types, and use-cases  

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Nextjs  
- **OCR**: Tesseract, LayoutParser  
- **AI Models**: BERT, Vision Transformers  
- **Speech I/O**: Web Speech API / Google TTS  
- **Deployment**: Optional support for AWS S3 / Firebase  

---

## 🖼️ Screenshots

> Include screenshots here (e.g., chatbot UI, document upload, summary result, legal aid finder)

---

## ⚙️ Run Instructions

### Frontend

```bash
git clone https: https://github.com/shivamkumar-nitd/dharma-sahayak-app.git
cd frontend
npm install
npm start
npm run dev
