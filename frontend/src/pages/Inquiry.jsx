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
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/inquiry/', {
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
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-gray-100 animate-reveal">
                    <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Request Sent!</h2>
                    <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                        Thank you for your interest, {formData.name.split(' ')[0]}. Our coaching team will review your message and contact you shortly to discuss your learning path.
                    </p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-black hover:shadow-xl transition-all"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pt-16 pb-20 px-4 transition-colors duration-500">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
                {/* Left side: Info */}
                <div className="lg:w-1/2 animate-reveal">
                    <span className="text-primary font-black uppercase tracking-widest text-xs bg-primary/5 px-4 py-2 rounded-full inline-block mb-6">Start Your Journey</span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                        Tell us about your <span className="text-secondary">Goals.</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
                        Whether you're looking for kids' Arabic classes, Quran Tajweed, or advanced grammar, leave a message. No payments required to start a consultation.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                            <div className="bg-secondary/10 p-3 rounded-xl"><MessageSquare className="w-6 h-6 text-secondary" /></div>
                            <div>
                                <p className="font-black text-gray-900">Direct Support</p>
                                <p className="text-sm font-medium text-gray-500">We'll reach out via WhatsApp/Call</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                            <div className="bg-accent/10 p-3 rounded-xl"><Phone className="w-6 h-6 text-accent" /></div>
                            <div>
                                <p className="font-black text-gray-900">Personalized Plan</p>
                                <p className="text-sm font-medium text-gray-500">Tailored curriculum based on your skills</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Form */}
                <div className="lg:w-1/2 w-full animate-reveal" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
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
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input
                                            type="tel"
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                            placeholder="+91 ..."
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Email (Optional)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input
                                            type="email"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
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
                                    className="w-full p-6 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                                    placeholder="I want to learn Arabic for reading the Quran..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary text-white py-5 rounded-2xl font-black hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">Processing...</span>
                                ) : (
                                    <>Send Inquiry <Send className="w-5 h-5" /></>
                                )}
                            </button>
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
