# 🚀 CreatorIQ — AI-Powered Content Analytics & Creator Intelligence Platform

[![Frontend Deployed](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://creater-iq.vercel.app/)
[![Backend Deployed](https://img.shields.io/badge/Backend-Render-informational?style=for-the-badge&logo=render)](https://createriq-backend.onrender.com)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/cloud/atlas)

**CreatorIQ** is a modern, full-stack web application designed for content creators, digital marketers, and brand managers. It leverages AI analytics to evaluate creator content, extract unique Creator DNA insights, recommend brand sponsorships, and provide real-time dashboard performance metrics.

---

## 🔗 Live Application Links

* **Live Web App (Vercel)**: [https://creater-iq.vercel.app/](https://creater-iq.vercel.app/)
* **Backend API Base (Render)**: [https://createriq-backend.onrender.com](https://createriq-backend.onrender.com)
* **Backend Health Check**: [https://createriq-backend.onrender.com/api/v1/health](https://createriq-backend.onrender.com/api/v1/health)

---

## 🌟 Key Features

1. **Authentication & User Profiles**:
   - Secure JWT-based registration, login, and user profile management with password hashing (`bcryptjs`).

2. **Media Upload & Content Management**:
   - Support for image and video uploads with file validation.
   - Dual-storage architecture: Cloudinary integration for cloud storage with local storage fallback.

3. **AI Content Analysis**:
   - Automated content breakdown analyzing tone, engagement hooks, audience sentiment, and performance scores using Groq AI.
   - Intelligent fallback mechanism for robust operation even during external API limits.

4. **Creator DNA Profiling**:
   - Deep algorithmic analysis generating a unique Creator Persona, niche classification, content pillars, and growth strategies.

5. **Brand Sponsorship Recommendations**:
   - Matchmaking engine recommending relevant brand collaboration opportunities based on creator content metrics.

6. **Interactive Analytics Dashboard**:
   - Real-time performance statistics, engagement trends, uploaded video summaries, and interactive charts built with `Recharts`.

7. **Notification Center**:
   - Dynamic user notification feeds tracking upload statuses, analysis completions, and system updates.

---

## 🛠️ Technology Stack

### Frontend
* **Core**: React 19, Vite 8, React Router v7
* **Styling**: Tailwind CSS v4, Framer Motion
* **UI Components**: Lucide React Icons, React Icons
* **Data Visualization**: Recharts
* **HTTP Client**: Axios (with global auth interceptors & fallback error handling)
* **Hosting**: Vercel

### Backend
* **Runtime**: Node.js (ES Modules)
* **Framework**: Express.js (v5)
* **Database**: MongoDB Atlas with Mongoose ODM
* **Authentication**: JSON Web Tokens (JWT), bcryptjs
* **Storage**: Cloudinary SDK, Multer, Multer-Storage-Cloudinary
* **AI Engine**: Groq SDK
* **Security & Logging**: Helmet, CORS, Morgan
* **Hosting**: Render

---

## 📁 Repository Structure

```
CreaterIQ/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, Environment, & Cloudinary config
│   │   ├── controllers/     # Express route handlers
│   │   ├── middleware/      # Auth, error handling, upload validation
│   │   ├── models/          # Mongoose database schemas
│   │   ├── routes/          # REST API endpoints
│   │   ├── services/        # AI & upload services
│   │   ├── utils/           # Custom error handlers & helpers
│   │   ├── app.js           # Express application setup
│   │   └── server.js        # Server startup & database connection
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static assets & images
│   │   ├── components/      # UI components (Navbar, Sidebar, Cards, etc.)
│   │   ├── pages/           # Page views (Dashboard, Upload, Analysis, Creator DNA, Brands)
│   │   ├── services/        # Axios API client setup
│   │   ├── App.jsx          # Main application & routing
│   │   └── main.jsx         # React entry point
│   ├── vercel.json          # SPA rewrite rules for Vercel deployment
│   ├── vite.config.js       # Vite proxy & network settings
│   └── package.json
├── package.json             # Root package script for concurrent dev execution
└── render.yaml              # Render deployment configuration
```

---

## 🔌 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
* `POST /api/auth/signup` — Register a new creator account
* `POST /api/auth/login` — Authenticate user & return JWT token
* `GET /api/auth/profile` — Fetch authenticated user profile

### 📁 Uploads (`/api/uploads`)
* `POST /api/uploads` — Upload media file (Image/Video)
* `GET /api/uploads` — Fetch user uploaded content list
* `GET /api/uploads/:id` — Fetch specific upload details

### 🧠 AI Content Analysis (`/api/analysis`)
* `POST /api/analysis/:uploadId` — Run AI analysis on an uploaded item
* `GET /api/analysis/:uploadId` — Retrieve analysis results

### 🧬 Creator DNA (`/api/creator-dna`)
* `POST /api/creator-dna/generate` — Generate Creator DNA profile
* `GET /api/creator-dna` — Fetch existing Creator DNA profile

### 🤝 Brand Recommendations (`/api/brands`)
* `POST /api/brands/generate` — Generate brand sponsorship matches
* `GET /api/brands` — Fetch saved brand recommendations

### 📊 Dashboard & Notifications (`/api/dashboard` & `/api/notifications`)
* `GET /api/dashboard` — Fetch combined dashboard metrics & recent uploads
* `GET /api/dashboard/stats` — Fetch analytics statistics summary
* `GET /api/notifications` — Fetch user notifications feed
* `PATCH /api/notifications/:id/read` — Mark notification as read

---

## 💻 Local Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Bhoomi0451/CreaterIQ.git
   cd CreaterIQ
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in `backend/`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/creatoriq?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   GROQ_API_KEY=your_groq_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```
   * Frontend will run on `http://localhost:5173` (or `http://localhost:5174`)
   * Backend will run on `http://localhost:5000`

---

## 🚀 Production Deployment Details

### Backend (Render)
* **Build Command**: `npm install`
* **Start Command**: `npm start`
* **Root Directory**: `backend`

### Frontend (Vercel)
* **Framework Preset**: `Vite`
* **Root Directory**: `frontend`
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Environment Variable**: `VITE_API_URL` = `https://createriq-backend.onrender.com`

---

## 📜 License
This project is licensed under the ISC License.
