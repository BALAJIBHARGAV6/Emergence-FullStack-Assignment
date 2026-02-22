# 🚀 AI-Powered Portfolio Website — Balaji Bhargav

A **production-ready**, modern personal portfolio with an **AI chatbot** powered by Groq LLM that answers questions about me in real-time. Built with React + Three.js on the frontend and FastAPI on the backend.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?logo=three.js&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLM-FF6B35)

---

## ✨ Features

| Feature | Description |
| --- | --- |
| **AI Chat Assistant** | Ask anything about my skills, projects, or experience — powered by Groq LLM with multi-model fallback |
| **3D Animated Hero** | Interactive Three.js scene with floating geometries, particles, and mouse parallax |
| **Loading Animation** | Smooth branded loading screen with animated progress bar |
| **Responsive Design** | Pixel-perfect on mobile, tablet, and desktop |
| **Framer Motion Animations** | Scroll-triggered section reveals, hover effects, staggered text |
| **WebGL Fallback** | Graceful CSS gradient fallback when WebGL is unavailable |
| **Chat History** | Persistent sessions stored in SQLite via async SQLAlchemy |
| **Contact Form** | Built-in form with toast notifications |

---

## 🏗️ Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **Three.js** (`@react-three/fiber` + `@react-three/drei`) — 3D scenes
- **Framer Motion** — animations and transitions
- **Zustand** — lightweight state management for chat
- **Axios** — HTTP client
- **Lucide React** — icon library
- **react-type-animation** — typing effect in hero

### Backend
- **FastAPI** — high-performance Python API framework
- **Uvicorn** — ASGI server
- **SQLAlchemy 2.0** (async) + **aiosqlite** — async database
- **Pydantic v2** — request/response validation
- **httpx** — async HTTP client for Groq API
- **Groq API** — LLM inference (llama-3.3-70b-versatile with fallback chain)

---

## 📁 Project Structure

```
Emergency-ai/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── three/        # Three.js 3D scenes (Hero, Skills, Chat)
│   │   │   ├── chat/         # ChatWidget with AI assistant
│   │   │   └── Navbar.tsx    # Responsive navigation
│   │   ├── sections/         # Page sections (Hero, About, Skills, etc.)
│   │   ├── store/            # Zustand chat store
│   │   ├── config/           # Site configuration & personal data
│   │   ├── App.tsx           # Main app with router & loading screen
│   │   └── main.tsx          # Entry point
│   ├── .env                  # Frontend environment variables
│   ├── tailwind.config.js    # Custom design system
│   └── vite.config.ts        # Vite configuration
├── backend/                  # FastAPI backend
│   ├── main.py               # App entry, CORS, health check
│   ├── routers/
│   │   └── chat.py           # Chat API endpoints
│   ├── services/
│   │   └── ai_service.py     # Groq LLM service with fallback chain
│   ├── db/
│   │   ├── database.py       # Async SQLAlchemy setup
│   │   └── models.py         # ChatSession & ChatMessage models
│   ├── schemas/
│   │   └── chat_schema.py    # Pydantic request/response schemas
│   ├── data/
│   │   └── resume.py         # Complete resume data for AI context
│   ├── utils/
│   │   └── prompts.py        # System prompt for AI assistant
│   └── .env                  # Backend environment variables
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **Groq API Key** — get one free at [console.groq.com](https://console.groq.com)

### 1. Clone the repository

```bash
git clone https://github.com/BALAJIBHARGAV6/Emergence-FullStack-Assignment.git
cd Emergence-FullStack-Assignment
```

### 2. Setup Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
FRONTEND_URL=http://localhost:5173
DATABASE_URL=sqlite+aiosqlite:///./portfolio_chat.db
PORT=8000
```

Start the backend:
```bash
uvicorn main:app --reload --port 8000
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
VITE_OWNER_NAME=Balaji Bhargav
VITE_OWNER_EMAIL=balajibhargav6@gmail.com
```

Start the frontend:
```bash
npm run dev
```

Visit **http://localhost:5173** 🎉

---

## 🌐 Deployment Guide

### Frontend → Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import the repository
3. Set **Root Directory** to `frontend`
4. Set **Framework Preset** to `Vite`
5. Add **Environment Variables**:

| Variable | Value | Description |
| --- | --- | --- |
| `VITE_API_URL` | `https://your-backend.onrender.com` | Your deployed backend URL (no trailing slash) |
| `VITE_OWNER_NAME` | `Balaji Bhargav` | Portfolio owner name |
| `VITE_OWNER_EMAIL` | `balajibhargav6@gmail.com` | Contact email |

6. Click **Deploy**

> **Important:** `VITE_` prefixed variables are baked into the build at compile time. If you change them, you must **redeploy**.

### Backend → Render

1. Go to [render.com](https://render.com) → New **Web Service**
2. Connect your GitHub repo
3. Set **Root Directory** to `backend`
4. Set **Build Command**: `pip install -r requirements.txt`
5. Set **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add **Environment Variables**:

| Variable | Value | Description |
| --- | --- | --- |
| `GROQ_API_KEY` | `gsk_xxxx...` | Your Groq API key from [console.groq.com](https://console.groq.com) |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Your deployed Vercel frontend URL (for CORS) |
| `DATABASE_URL` | `sqlite+aiosqlite:///./portfolio_chat.db` | Database connection string |
| `PORT` | `10000` | Render assigns this automatically |

7. Click **Create Web Service**

> **After both are deployed:** Update `VITE_API_URL` in Vercel to point to your Render URL, and `FRONTEND_URL` in Render to point to your Vercel URL. Then redeploy the frontend.

---

## 🤖 AI Chat — How It Works

The AI chat assistant uses **Groq's ultra-fast LLM inference** with a **4-model fallback chain** for maximum reliability:

```
llama-3.3-70b-versatile → llama-3.1-8b-instant → gemma2-9b-it → mixtral-8x7b-32768
```

- The AI is given my complete resume data as context (skills, projects, experience)
- It responds only about me — stays in character as my personal portfolio assistant
- Chat sessions are persisted in SQLite for conversation continuity
- Suggested questions help visitors get started quickly

---

## 📸 Sections

| Section | Highlights |
| --- | --- |
| **Hero** | 3D animated background, typing animation, profile photo, floating stats |
| **About** | Bio, quick facts, feature cards with hover effects |
| **Skills** | 6 categories with 3D orb background, skill tags |
| **Projects** | Project cards with images, tech tags, live/GitHub links |
| **Experience** | Timeline layout with roles and achievements |
| **Contact** | Contact form with validation, chat nudge card |
| **AI Chat** | Floating chat widget with suggested questions, typing indicator |

---

## 🛠️ API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Health check + model info |
| `POST` | `/chat` | Send message, get AI response |
| `GET` | `/chat/history/{session_id}` | Get chat history for a session |
| `DELETE` | `/chat/history/{session_id}` | Clear a chat session |

---

## 📋 Submission

**Submit here:** [https://forms.gle/7AkdJbKDtj4chqqWA](https://forms.gle/7AkdJbKDtj4chqqWA)

---

## 📄 License

MIT © 2025

---

## 👤 Author

**Balaji Bhargav**
- GitHub: [@BALAJIBHARGAV6](https://github.com/BALAJIBHARGAV6)
- LinkedIn: [Balaji Bhargav](https://www.linkedin.com/in/balaji-bhargav-39a825259/)
- Email: balajibhargav6@gmail.com

---

> Built with ❤️ as part of the Emergence Full Stack Assignment
