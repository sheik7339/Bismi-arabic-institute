import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import Pricing from './pages/Pricing';

import OurStory from './pages/OurStory';
import Inquiry from './pages/Inquiry';
import Settings from './pages/Settings';
import FloatingContact from './components/FloatingContact';
import MobileBottomNav from './components/MobileBottomNav';
// Part 2: Fix React Router Routing
// Scroll to top on route change component for React Router v6
function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Wake up server in background
        const wakeServer = async () => {
            try {
                const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://bismi-arabic-institute.onrender.com';
                const baseUrl = rawBaseUrl.replace(/\/$/, '').replace(/\/api$/, '');
                fetch(`${baseUrl}/api/ping/`).catch(() => {}); // Fire and forget
            } catch (e) {}
        };
        wakeServer();
    }, [pathname]);
    
    return null;
}

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <SpeedInsights />
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const location = useLocation();
    const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="flex min-h-screen flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
            {/* Navbar appears conditionally */}
            {!hideNavAndFooter && <Navbar />}

            <main className="flex-1 flex flex-col">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/our-story" element={<OurStory />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/inquiry" element={<Inquiry />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </main>
            {/* Contact Buttons */}
            {!hideNavAndFooter && <FloatingContact />}

            {/* Mobile Bottom Navigation */}
            {!hideNavAndFooter && <MobileBottomNav />}

            {/* Footer appears conditionally */}
            {!hideNavAndFooter && <Footer />}
        </div>
    );
}
