# 🌟 NyayaAI – Accessible Legal Intelligence for Every Citizen

## 🧩 Problem Statement

Millions of rural and semi-urban Indians face difficulty understanding legal procedures due to language barriers, document complexity, and limited access to legal aid. There is a lack of easy-to-use digital tools tailored for regional and multilingual users that can assist with document verification, legal queries, and aid discovery.

---

## 🔍 Approach & Solution

NyayaAI is a multilingual legal chatbot and document analysis tool designed for rural India. It combines AI, OCR, and NLP technologies to understand legal queries in regional languages, scan and verify documents, and provide simplified legal guidance. The solution is built as a responsive web app accessible even on low-bandwidth networks.

---

## 🚀 Features

1. **Multilingual Legal Chatbot** – Understands Hindi, English, Bengali queries, offers legal Q&A, voice I/O
2. **Document Upload & OCR** – Scan/upload images or PDFs (handwritten/printed) with Tesseract + LayoutParser
3. **Document Classification** – Detects type (e.g., FIR, Land Record, Marriage Cert.) using BERT/Vision models
4. **Authenticity Check** – Flags document as Original/Fake/Tampered using login, signup and forgot password.
5. **Summary Extraction** – Highlights names, dates, case IDs, involved parties in simple language
6. **Correction Assistant** – Guides on how to fix incorrect or fake documents with links, steps, fees
7. **Live Camera Scanning** – Capture directly from webcam → OCR → classify → summarize
8. **Legal FAQ Database** – Common questions like RTI, FIR, Lok Adalat, categorized and multilingual
9. **Lost Document Recovery** – Step-by-step help to regenerate lost legal documents
10. **Legal Aid Directory** – List of nearby legal aid centers, NGOs, WhatsApp legal support groups
11. **Responsive UI** – Optimized for mobile/desktop + low-bandwidth areas
12. **Open-Source & Modular** – Extendable for more languages, document types, and use-cases

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: FastAPI (Python)
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
```

### Prerequisites
- Node.js 16+
- Python 3.9+
- Tesseract OCR installed locally

---

## 💡 Why NyayaAI? | Innovation & Impact

NyayaAI goes beyond being just a legal chatbot or document scanner — it’s a grassroots legal empowerment tool designed for the digitally underserved.

### 🌍 Real-World Relevance

- **Bridging the Legal Awareness Gap**  
  Millions in India don’t know their rights or how to act on them. NyayaAI empowers them with legal knowledge in simple, understandable, and regional language.

- **Targeted for Rural India**  
  Unlike complex portals designed for urban use, NyayaAI is optimized for low-bandwidth areas and users with limited digital literacy.

### 🌟 Innovative Edge

- **Voice Interaction for the Illiterate**  
  With voice input and text-to-speech output, NyayaAI supports users who cannot read or type — bringing legal help to those who need it most.

- **Camera-to-Insight Experience**  
  Users can simply click a photo of a document, and the system does the rest: extracts, analyzes, classifies, summarizes, and flags issues — all in real time.

- **Step-by-Step Correction Roadmaps**  
  NyayaAI doesn’t stop at showing errors — it guides users through how to fix them, with:
  - Exact documents required  
  - Estimated processing time  
  - Fees involved  
  - Direct links to official portals

- **Recovery Guide for Lost Documents**  
  Unique feature that helps users regenerate lost legal records — from FIRs to marriage certificates — with stepwise clarity.

### 🔓 Designed for Growth

- **Modular & Open-Source Architecture**  
  The platform is designed to be extendable with:
  - More Indian languages (e.g., Marathi, Tamil)  
  - More document types (e.g., Legal Heir, Death Certificates)  
  - More integrations (e.g., eDistrict APIs, WhatsApp bots)

### 🫱🏽‍🫲🏾 Social Impact

- Reduces exploitation by legal middlemen  
- Promotes self-reliance in navigating the justice system  
- Connects users to real legal aid centers and NGOs in their area  
- Builds trust and transparency by verifying document authenticity  

**NyayaAI is not just a tech product — it's a mission for justice through technology.**  
It empowers the common citizen with a virtual legal assistant that fits in their pocket.


## 📤 Submission Info

- **GitHub Repo Link**: https://github.com/shivamkumar-nitd/dharma-sahayak-app
- **Project Title**: NyayaAI
- **Domain**: Open Innovation
- **Short Write-up**: AI-powered legal chatbot and document analysis platform for Indian rural users.
- **Contact Info**: Phone-> +919153628776, e-mail id-> 123shivamkumar123456@gmail.com

---
