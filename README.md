🛡️ SafeSurf — Browse Smart, Browse Safe

SafeSurf is a browser security solution designed to help users identify potentially unsafe, suspicious, or phishing websites before interacting with them.

It analyzes multiple website and domain-level security indicators and generates an easy-to-understand Safety Score from 0–100.

---

🚀 Features

- 🔐 HTTPS Security Check
  
  - Checks whether the website uses a secure HTTPS connection.

- 🌐 Domain Authentication
  
  - Analyzes domain-related information to identify potentially suspicious websites.

- 🎯 Phishing Detection
  
  - Identifies common indicators associated with phishing and fake websites.

- 🧩 Browser Extension Risk Analysis
  
  - Helps identify potentially risky browser-extension-related behavior.

- 🔍 DOM Analysis
  
  - Analyzes webpage structure and suspicious DOM behavior.

- 🤖 Machine Learning Detection
  
  - Uses a Random Forest-based model to classify potentially malicious websites.

- 📊 Safety Score
  
  - Produces a score between 0 and 100 to make security information easier to understand.

- ⚡ Real-Time Analysis
  
  - Designed to analyze websites while users browse.

- 💡 Security Awareness
  
  - Helps users understand why a website may be considered risky.

---

🧠 How SafeSurf Works

                ┌───────────────────┐
                │    User Visits    │
                │     Website       │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Browser Extension │
                └─────────┬─────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │ Website & Domain      │
              │ Security Analysis     │
              └───────────┬───────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
       HTTPS          Domain/URL        DOM
       Check          Analysis        Analysis
          │               │               │
          └───────────────┼───────────────┘
                          ▼
                ┌───────────────────┐
                │ Machine Learning  │
                │ Random Forest     │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Safety Score 0–100│
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ SafeSurf Popup    │
                │ Security Result   │
                └───────────────────┘

---

🛠️ Technology Stack

Frontend / Extension

- HTML5
- CSS3
- JavaScript
- Chrome Extension APIs

Backend

- Python
- Flask
- REST API

Machine Learning

- Scikit-learn
- Random Forest
- Pandas
- NumPy

Security Analysis

- URL analysis
- Domain analysis
- HTTPS verification
- DOM analysis
- Phishing indicators
- Threat intelligence

---

📁 Project Structure

SafeSurf/
│
├── extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.css
│   ├── popup.js
│   ├── content.js
│   └── background.js
│
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── analyzer.py
│   └── requirements.txt
│
├── model/
│   ├── random_forest_model.pkl
│   └── scaler.pkl
│
├── dataset/
│   └── website_dataset.csv
│
├── screenshots/
│   └── safesurf.png
│
└── README.md

---

📊 Safety Score

SafeSurf converts multiple security indicators into a simplified score:

Score| Result
80–100| 🟢 Safe
50–79| 🟡 Use With Caution
0–49| 🔴 Potentially Unsafe

The score is intended as a security-awareness indicator, not as a guarantee that a website is completely safe or malicious.

---

🤖 Random Forest

SafeSurf can use a Random Forest classifier to analyze multiple website features and classify a website.

Example features can include:

HTTPS availability
URL length
Number of special characters
Number of subdomains
Domain characteristics
Suspicious keywords
Redirect behavior
DOM characteristics
External resources
Phishing indicators

The model combines the decisions of multiple decision trees to produce a classification.

---

🔍 DOM Analysis

DOM (Document Object Model) analysis allows SafeSurf to inspect the structure and behavior of a webpage.

Potential indicators include:

- Suspicious forms
- Login/password fields
- Unexpected redirects
- Hidden elements
- Suspicious external links
- Unusual scripts
- iframe usage
- Potentially deceptive webpage structures

---

🔐 Domain Authentication

Domain authentication is one of the indicators SafeSurf can consider when evaluating a website.

The system can examine domain-related characteristics such as:

- Domain validity
- Domain age where reliable data is available
- HTTPS certificate information
- Suspicious domain patterns
- Domain reputation
- URL structure

A single indicator should not determine whether a website is safe. SafeSurf combines multiple signals.

---

⚙️ Installation

1. Clone the Repository

git clone https://github.com/amanch0pra/SafeSurf.git

cd SafeSurf

2. Install Backend Dependencies

cd backend
pip install -r requirements.txt

3. Start the Flask Backend

python app.py

The API will run locally according to the configuration in "app.py".

---

🌐 Load the Chrome Extension

1. Open Chrome.
2. Navigate to:

chrome://extensions/

3. Enable Developer mode.
4. Click Load unpacked.
5. Select the "extension" folder.
6. Pin SafeSurf to the browser toolbar.
7. Open a website and launch SafeSurf.

---

📡 Example API Request

POST /analyze
Content-Type: application/json

Example request:

{
    "url": "https://example.com"
}

Example response:

{
    "score": 85,
    "status": "safe",
    "https": true,
    "domain_authentication": true,
    "phishing": false
}

---

🔄 Detection Flow

Website URL
     ↓
URL Validation
     ↓
HTTPS Check
     ↓
Domain Analysis
     ↓
Phishing Indicators
     ↓
DOM Analysis
     ↓
Feature Extraction
     ↓
Random Forest Model
     ↓
Threat Classification
     ↓
Safety Score
     ↓
User Alert

---

🎯 Project Objectives

The main objectives of SafeSurf are:

1. Detect potentially unsafe websites.
2. Identify common phishing indicators.
3. Provide users with an understandable security score.
4. Perform website analysis without requiring advanced cybersecurity knowledge.
5. Improve cybersecurity awareness.
6. Help users make safer browsing decisions.

---

🔮 Future Improvements

- Real-time threat-intelligence integration
- Improved phishing datasets
- Deep-learning-based detection
- More advanced DOM behavior analysis
- Website reputation scoring
- Automated malicious-link blocking
- Security awareness badges
- Gamification and user rewards
- Cloud-based model updates
- Improved false-positive handling
- Multi-browser support

---

⚠️ Disclaimer

SafeSurf is a cybersecurity research and educational project.

A website receiving a high safety score does not guarantee that it is completely safe. Similarly, a low score does not automatically prove that a website is malicious.

Users should avoid entering sensitive information on unfamiliar websites and follow standard cybersecurity practices.

---

👨‍💻 Team

SafeSurf Team

- Aman Chopra — Extension Development / UI / Project & Pitch
- Ayush — Cybersecurity Research
- Atharva — Backend / Business / Pitch

---

💡 Tagline

«Browse Smart, Browse Safe.»

---

📜 License

This project is intended for educational and research purposes.

Add an appropriate open-source license to the repository if you plan to distribute the project publicly.
