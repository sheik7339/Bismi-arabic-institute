import React, { useState } from 'react';
import { Send, CheckCircle, MessageSquare, Phone, User, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Inquiry() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.full_name || '',
        phoneNumber: user?.phone || '',
        email: user?.email || '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSlowLoading, setIsSlowLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSlowLoading(false);

        // Timer for slow wake up
        const slowTimer = setTimeout(() => {
            setIsSlowLoading(true);
        }, 3000);

        try {
            const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://bismi-arabic-institute.onrender.com';
            const baseUrl = rawBaseUrl.replace(/\/$/, '').replace(/\/api$/, '');
            // The instruction provided a line for payments, which is not relevant to this file.
            // The existing line for inquiry already correctly uses the baseUrl.
            const url = `${baseUrl}/api/auth/inquiry/`;
            console.log("Attempting inquiry submission at:", url);
            const response = await fetch(url, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: formData.name,
                    phone_number: formData.phoneNumber,
                    email: formData.email,
                    message: formData.message
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                const data = await response.json();
                alert(Object.values(data).join('\n') || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Could not connect to the server. Please check if the backend is running.');
        } finally {
            clearTimeout(slowTimer);
            setIsLoading(false);
            setIsSlowLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pt-32 pb-20 flex items-center justify-center px-4 transition-colors">
                <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[3rem] p-12 text-center shadow-2xl border border-gray-100 dark:border-white/5 animate-reveal">
                    <div className="bg-primary/10 w-28 h-28 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-primary/20 animate-bounce">
                        <CheckCircle className="w-14 h-14 text-primary" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">Mubarak! Request Sent.</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-bold mb-12 leading-relaxed text-center px-4 uppercase tracking-tighter">
                        Thank you, {formData.name.split(' ')[0]}. Our coordination scholars will contact you via WhatsApp/Email within 24 hours.
                    </p>
                    <div className="space-y-4">
                        <a
                            href={`https://wa.me/917092873120?text=Assalamu%20Alaikum%2C%20I%20just%20submitted%20an%20inquiry%20via%20the%20website.%20My%20name%20is%20${encodeURIComponent(formData.name)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] text-white py-6 rounded-3xl font-black shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                            Contact via WhatsApp Directly
                        </a>
                        <button
                            onClick={() => navigate('/courses')}
                            className="w-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 py-6 rounded-3xl font-black hover:bg-slate-200 dark:hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                        >
                            Explore courses while waiting
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pt-16 pb-20 px-4 transition-colors duration-500">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
                {/* Left side: Info */}
                <div className="lg:w-1/2 animate-reveal">
                    <span className="text-primary font-black uppercase tracking-widest text-xs bg-primary/5 dark:bg-primary/10 px-4 py-2 rounded-full inline-block mb-6">Start Your Journey</span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                        Tell us about your <span className="text-secondary italic">Goals.</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10">
                        Whether you're looking for kids' Arabic classes, Quran Tajweed, or advanced grammar, leave a message. No payments required to start a consultation.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-50 dark:border-white/5 shadow-sm">
                            <div className="bg-secondary/10 p-3 rounded-xl"><MessageSquare className="w-6 h-6 text-secondary" /></div>
                            <div>
                                <p className="font-black text-gray-900 dark:text-white">Direct Support</p>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-left">We'll reach out via WhatsApp/Call</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-50 dark:border-white/5 shadow-sm">
                            <div className="bg-accent/10 p-3 rounded-xl"><Phone className="w-6 h-6 text-accent" /></div>
                            <div>
                                <p className="font-black text-gray-900 dark:text-white">Personalized Plan</p>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-left">Tailored curriculum based on your skills</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Form */}
                <div className="lg:w-1/2 w-full animate-reveal" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-white/5">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-600" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 dark:text-white"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-600" />
                                        <input
                                            type="tel"
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 dark:text-white"
                                            placeholder="+91 ..."
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Email (Optional)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-600" />
                                        <input
                                            type="email"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900 dark:text-white"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">What are you looking for?</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none text-slate-900 dark:text-white"
                                    placeholder="I want to learn Arabic for reading the Quran..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary text-white py-5 rounded-2xl font-black hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0 shadow-lg shadow-primary/20 border-b-4 border-teal-800"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">Transmitting Inquiry...</span>
                                ) : (
                                    <>Send Inquiry <Send className="w-5 h-5" /></>
                                )}
                            </button>

                            {isSlowLoading && (
                                <div className="rounded-2xl bg-blue-50 dark:bg-blue-500/10 p-5 border border-blue-100 dark:border-blue-500/20 flex items-start gap-3 animate-reveal">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent flex-shrink-0" />
                                    <p className="text-[10px] text-blue-700 dark:text-blue-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                        Server is waking up (Render cold-start)... This may take 30-40 seconds. Please do not refresh.
                                    </p>
                                </div>
                            )}
                            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                By sending this, you agree to being contacted by Bismi Arabic Coaching.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
