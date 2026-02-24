# Bismi Arabic Institute - Frontend

Welcome to the frontend repository for the **Bismi Arabic Coaching Institute**, a premium SaaS-level platform designed to provide elite Arabic mastery, Quranic, and Tajweed education safely and seamlessly to global students.

This is a production-ready, highly optimized, and meticulously designed React application crafted for speed, seamless responsive behaviors, and dark mode capability.

## 🚀 Tech Stack

- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Vanilla setup with dynamic dark/light mode toggling)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Authentication:** Firebase (Google Auth) & Custom Backend Integration context
- **State Management:** React Context API (`AuthContext`)

## 💼 Core Features

- **Premium SaaS Aesthetic:** High-quality, polished UI with glassmorphism, dynamic gradients, and smooth scroll animations.
- **Deep Authentication Integration:** Handles native login flows and incorporates Google pop-up integration tightly coupled to Django backend endpoints. 
- **User Portal System:** A direct, no-dashboard approach to profile settings. Logged-in students can immediately change their names, contact details, and update profile avatars synchronously.
- **Dynamic Theming:** Seamless Dark and Light mode capabilities without flash-of-unstyled-content (FOUC).
- **Responsive Mastery:** Adapts flawlessly across Mobile phones, Tablets, and ultra-wide Desktop screens.

---

## 🛠 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node.js)

---

## 💻 Local Development Setup

To run this project locally, follow these precise steps:

**1. Clone the Repository or Navigate into the Frontend Folder:**
```bash
cd frontend
```

**2. Install Dependencies:**
Using NPM, install the required packages.
```bash
npm install
```

**3. Run the Development Server:**
Start the lightning-fast Vite dev server.
```bash
npm run dev
```
The application will be running at `http://localhost:5173/`.

---

## 🔗 Backend API Expected Endpoints

The frontend is fully configured to talk to a Django backend server running at `http://127.0.0.1:8000/`. To avoid fetch errors, the Django environment should expose the following critical endpoints:

1. **`POST /api/auth/google/`**: Takes Google Auth user data and synchronizes it with the backend database. 
2. **`POST /api/auth/inquiry/`**: The main lead-capture endpoint for processing pricing/course consultation inquiries smoothly.

---

## 🌍 Production Deployment Guide

When you are ready to put this masterpiece live on the internet (e.g., Vercel, Netlify, or AWS), run the following command to generate the optimized production build:

**1. Build the Application:**
```bash
npm run build
```
This will compile the application into a highly optimized `dist/` directory.

**2. Preview Production Build (Optional but Recommended):**
```bash
npm run preview
```
This lets you test the heavily minimized output to ensure everything is perfect.

**3. Deploying the `dist/` Folder:**
- **For Vercel/Netlify:** Simply link your GitHub repository, choose `Vite` as the framework preset, and they will automatically run `npm run build` and publish it for you.
- **For Shared Hosting / Nginx / Apache:** Upload the contents of the `dist/` folder directly to the `public_html` or configuration directory.
  - *Note for Nginx/Apache:* Ensure you add a fallback routing rule to serve `index.html` for any React Router path (e.g., `/courses`) so users don’t see a 404 error when refreshing on nested routes.

---

## ⚠️ Important Note
Do NOT edit core `.jsx` files unless necessary. The exact responsive styling, padding logic, and state management rules have been fine-tuned to perfection.

*Built with precision and mastery.*
