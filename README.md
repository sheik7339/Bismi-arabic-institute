# 🌙 Bismi Arabic Coaching Institute

A professional full-stack platform for elite Arabic mastery, featuring live sessions, course management, and automated student diagnostics.

---

## 🚀 Features

### 🎓 For Students
- **Interactive Home & Landing**: Premium, responsive UI with smooth animations.
- **User Authentication**: Secure login/signup via Email or Google (Firebase).
- **Placement Test**: A 60-second diagnostic diagnostic to determine the best learning path.
- **Course Catalog**: Browse foundational to advanced Arabic and Tajweed tracks.
- **Direct Inquiries**: WhatsApp-integrated inquiry system for family/group plans.
- **Zoom Integration**: Access to live live coaching sessions.

### 🏫 For Teachers & Admins
- **Role-Based Dashboards**: Dedicated interfaces for managing students and schedules.
- **Course Management**: backend portal to manage curriculum and content.
- **Payment Tracking**: Integrated handling of student subscriptions.

---

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Firebase Auth, Framer Motion (Animations).
- **Backend**: Django, Django REST Framework, JWT Authentication, PostgreSQL/SQLite.
- **Deployment**: Vercel (Frontend), Render (Backend).

---

## 📂 Project Structure

```bash
bismi-arabic-coaching-institute/
├── backend/            # Django REST API
│   ├── apps/           # Local apps (accounts, courses, payments, etc.)
│   ├── core/           # Project settings and URLs
│   └── manage.py
├── frontend/           # React + Vite Application
│   ├── src/            # Components, Pages, Context
│   └── package.json
└── README.md
```

---

## 🔨 Local Setup Instructions

### 1. Prerequisities
- Python 3.10+
- Node.js 18+
- Git

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
# Activate it (Windows)
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the server
python manage.py runserver
```

> [!NOTE]
> Ensure you have a `.env` file in the `backend/` directory for secret keys and database URLs.

### 3. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env

# Start development server
npm run dev
```

---

## 🌍 Production Environment Variables

To run in production (Vercel/Render), ensure the following variables are set:

### Frontend (Vercel)
- `VITE_API_URL`: Your Render backend URL.
- `VITE_FIREBASE_API_KEY`: Firebase API Key.
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase Auth Domain.
- `VITE_FIREBASE_PROJECT_ID`: Firebase Project ID.
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase Storage Bucket.
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase Messaging Sender ID.
- `VITE_FIREBASE_APP_ID`: Firebase App ID.

### Backend (Render)
- `DEBUG`: `False`
- `SECRET_KEY`: A secure random string.
- `ALLOWED_HOSTS`: `your-api.onrender.com,localhost`
- `CORS_ALLOWED_ORIGINS`: `https://your-app.vercel.app,http://localhost:5173`
- `CSRF_TRUSTED_ORIGINS`: `https://your-app.vercel.app`

---

## 📜 License
© 2026 Bismi Arabic Coaching Institute. All Rights Reserved.
