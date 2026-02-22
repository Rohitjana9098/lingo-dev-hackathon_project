# TaxLayer Web3 Dashboard

🚀 **Live Deployment (Netlify):** [https://cool-pixie-3ac485.netlify.app/](https://cool-pixie-3ac485.netlify.app/)

TaxLayer is an advanced, fully-responsive Web3 and Crypto tax calculation dashboard. It empowers users to monitor their real-time trading portfolios, estimate complex tax liabilities based on global frameworks, and seamlessly interact with an embedded AI Tax Assistant.

![TaxLayer Preview](https://github.com/Rohitjana9098/Lingo-dev-hackathon_project/assets/mock-preview.png) *(Preview Placeholder)*

## ✨ Key Features

-   **Live Portfolio Ledger**: Dynamic interface to add trades, automatically fetching and tracking live asset market prices (BNB, ETH, BTC, etc.) via Binance WebSockets.
-   **AI Tax Assistant (`TaxLayer Nexus`)**: An embedded smart floating chatbot that explains complex crypto tax laws, wash sale regulations, guides you through the interface, and assists with tax-loss harvesting queries.
-   **Real-Time Analytics Matrix**: Interactive charts built with `recharts` to estimate Gross Profit mapping against estimated Annual Tax Withholding paths.
-   **Zero-Knowledge Compliance (KYC)**: A sophisticated multi-step onboarding UI for legal declarations and tax bracket assignments supporting mock integrations with external centralized exchanges.
-   **Mobile-First Design**: Completely fluid, responsive layouts utilizing CSS Grid, Flexbox, and bottom-fixed navigation bars on smartphone views. Dynamic dark/light token-based themes natively integrated.

## 🛠 Tech Stack

**Frontend Framework Base:**
-   **Next.js 16.1.6 (App Router)** & **React 19**
-   **Tailwind CSS V4** (Native Utility Styling)
-   **Framer Motion** (Fluid layout animations & micro-interactions)
-   **Lucide React** (Consistent SVG Iconography)

**Backend Infrastructure:**
-   **Python 3.x**
-   **FastAPI** (High-performance async API)
-   **SQLite** (Lightweight database for caching KYC and user compliance hashes)

## 🚀 How to Run Locally

To get the entire stack—both the modern UI and the API operations—running correctly on your machine, follow these steps:

### 1. Start the Secure Backend (FastAPI)
The frontend relies on the backend layer to securely submit and process KYC documentation flows.

```bash
# 1. Navigate into the backend directory
cd backend

# 2. Install the necessary Python packages
pip install -r requirements.txt

# 3. Launch the API server locally on Port 8000
uvicorn main:app --reload
```
*The backend API will now be listening securely at `http://localhost:8000/api/kyc`.*

### 2. Start the Frontend (Next.js Application)
Open a **new, separate terminal window** and leave your backend running!

```bash
# 1. Navigate into the frontend directory
cd frontend

# 2. Install all strict Node.js dependencies
npm install

# 3. Run the development environment
npm run dev
```

### 3. Access the Dashboard
Once both services are running smoothly, open your favorite browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

*(If your port 3000 is occupied, Next.js will elegantly fallback to `http://localhost:3001` or another open socket).*

---

## 📂 Project Structure

```text
Lingo-dev-hackathon_project/
├── backend/                  # Python API Logic
│   ├── main.py               # FastAPI Routes and DB initializations
│   └── requirements.txt      # Python dependencies
├── frontend/                 # Next.js Application Root
│   ├── src/
│   │   ├── app/              # Next.js App Router endpoints (Dashboard, KYC, Help)
│   │   └── components/       # Reusable, Animated UI Elements (Sidebar, Charts, AI Bot)
│   ├── public/               # Static Web Assets
│   └── tailwind.config.ts    # Styling Overrides
└── README.md                 # You are here!
```

## ⚖️ License
All rights reserved © 2026 TaxLayer Network.
