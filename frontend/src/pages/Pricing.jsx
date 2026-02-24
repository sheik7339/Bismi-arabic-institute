import React, { useState } from 'react';
import { Check, Send, CheckCircle, User, Phone, MessageSquare, Sparkles, Zap, ShieldCheck, ArrowRight, Star, Globe, Clock, Users } from 'lucide-react';

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PRICING_PLANS = [
    {
        name: 'Starter',
        id: 'plan-starter',
        price: '₹1000',
        description: 'Perfect for casual learners focusing on basic reading and understanding.',
        features: [
            'Basic Arabic Reading classes',
            'Weekly Group Sessions (Live)',
            'Access to User Portal',
            'Standard Course Materials',
            'Standard Support (Email)'
        ],
        cta: 'Start Learning',
        popular: false,
        icon: User
    },
    {
        name: 'Institute Pro',
        id: 'plan-pro',
        price: '₹1800',
        description: 'Our most popular plan for serious students seeking holistic fluency.',
        features: [
            'Everything in Starter',
            '1-on-1 Monthly Evaluation',
            'Advanced Tajweed Modules',
            'Lifetime Community Access',
            'Priority Support (WhatsApp)',
            'Official Certification'
        ],
        cta: 'Become a Pro',
        popular: true,
        icon: Sparkles
    },
    {
        name: 'Scholar Specialized',
        id: 'plan-scholar',
        price: '₹3500',
        description: 'Intensive track for those aiming for Ijazah and classical linguistics.',
        features: [
            'Everything in Pro',
            'Personal Mentorship',
            'Classical Grammar (Nahw/Sarf)',
            'Ijazah Track Preparation',
            'Literary Poetry Analysis',
            'Custom Study Roadmaps'
        ],
        cta: 'Join Scholar Track',
        popular: false,
        icon: Zap
    }
];

export default function Pricing() {
    const { isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const baseUrl = import.meta.env.VITE_API_URL || '';
            await fetch(`${baseUrl}/api/auth/inquiry/`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: formData.name,
                    phone_number: formData.phone,
                    message: `[Pricing Inquiry]: ${formData.message}`
                })
            });
            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            setIsSubmitted(true); // Fallback for dev
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#fcfdfd] dark:bg-slate-950 min-h-screen pt-16 pb-24 relative overflow-hidden transition-colors duration-500">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full text-center">
                {/* Header Section */}
                <div className="max-w-3xl mx-auto mb-20 animate-reveal">
                    <div className="inline-flex items-center gap-2 bg-primary/5 dark:bg-primary/10 px-6 py-2 rounded-full border border-primary/10 mb-8 backdrop-blur-md">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Secure & Elite Flexible Plans</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1] mb-10 tracking-tighter">
                        Invest in your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Eternal Success.</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-gray-400 font-bold leading-relaxed max-w-2xl mx-auto">
                        Elite Arabic mastery tailored to your lifestyle. All plans include our signature 7-day divine-blessing guarantee.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-32 animate-reveal">
                    {PRICING_PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative group rounded-[3.5rem] p-10 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl ${plan.name === 'Institute Pro'
                                ? 'bg-slate-900 dark:bg-slate-900 text-white shadow-2xl shadow-primary/20 scale-105 z-20 border border-white/10'
                                : 'bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-100 dark:border-white/5'
                                }`}
                        >
                            {plan.name === 'Institute Pro' && (
                                <div className="absolute top-0 left-1/2 -track-x-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 shadow-2xl border border-white/20">
                                    <Star className="w-4 h-4 fill-white" /> Most Popular
                                </div>
                            )}

                            <div className="flex flex-col h-full text-left">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 ${plan.name === 'Institute Pro' ? 'bg-primary/20 text-primary shadow-inner' : 'bg-primary/5 dark:bg-primary/10 text-primary'}`}>
                                    <plan.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-3xl font-black mb-3 uppercase tracking-tighter">{plan.name}</h3>
                                <p className={`text-sm font-bold mb-10 leading-relaxed ${plan.name === 'Institute Pro' ? 'text-gray-300' : 'text-slate-600 dark:text-gray-400'}`}>
                                    {plan.description}
                                </p>

                                <div className="flex items-baseline gap-2 mb-12">
                                    <span className="text-6xl font-black tracking-tighter transition-all group-hover:scale-105">{plan.price}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${plan.name === 'Institute Pro' ? 'text-gray-400' : 'text-slate-600 dark:text-gray-500'}`}>/ monthly</span>
                                </div>

                                <div className="space-y-6 mb-12 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${plan.name === 'Institute Pro' ? 'bg-secondary/20 text-secondary' : 'bg-primary/10 text-primary'}`}>
                                                <Check className="w-4 h-4 stroke-[3]" />
                                            </div>
                                            <span className={`text-xs font-black uppercase tracking-wider ${plan.name === 'Institute Pro' ? 'text-gray-300' : 'text-slate-700 dark:text-gray-400'}`}>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/inquiry"
                                    className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all shadow-xl group/btn ${plan.name === 'Institute Pro'
                                        ? 'bg-primary text-white hover:bg-white hover:text-primary'
                                        : 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-primary hover:text-white'
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features Highlight */}
                <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-24 border border-slate-50 dark:border-white/5 shadow-2xl mb-32 text-left grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-6 inline-block">The Bismi Standard</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1] mb-12 tracking-tighter">Included with <br /><span className="text-primary italic">Every</span> Track.</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            {[
                                { title: 'Authentic Live', desc: 'Real-time articulation correction.', icon: Globe },
                                { title: 'Elite Scholars', desc: 'Direct access to master mentors.', icon: Users },
                                { title: 'Divine Flexibility', desc: 'Pause or cancel journey anytime.', icon: Clock },
                                { title: 'Global Sync', desc: 'Connect with a sacred community.', icon: MessageSquare },
                            ].map((f, i) => (
                                <div key={i} className="group">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm mb-6">
                                        <f.icon className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2">{f.title}</h4>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-500 font-bold uppercase tracking-tight">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[100px] scale-90 -z-10 animate-pulse"></div>
                        <div className="bg-slate-950 rounded-[4rem] p-12 overflow-hidden relative border border-white/10 shadow-3xl">
                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20">
                                    <Zap className="w-8 h-8 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-white text-xl font-black">7-Day Trial</p>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Zero Risk Start</p>
                                </div>
                            </div>
                            <p className="text-gray-400 font-bold mb-14 leading-relaxed italic text-lg opacity-80">
                                "Unlock the linguistic excellence of the Revelation. Start your zero-risk spiritual evolution today."
                            </p>
                            <Link to={isAuthenticated ? "/inquiry" : "/login"} className="flex items-center justify-between bg-primary text-white p-7 rounded-[2rem] font-black group hover:bg-white hover:text-primary transition-all shadow-xl shadow-primary/20">
                                <span className="text-lg">Try Excellence for Free</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 bg-secondary/5 dark:bg-secondary/10 px-6 py-2.5 rounded-full border border-secondary/10 mb-6">
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Customized Inquiries</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Family or Institutional?</h2>
                        <p className="text-slate-500 dark:text-gray-500 font-bold mt-4 uppercase tracking-[0.1em] text-xs">We provide bespoke roadmaps for groups.</p>
                    </div>

                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-3xl rounded-[4rem] border border-slate-100 dark:border-white/5 p-8 md:p-14 shadow-3xl relative overflow-hidden">
                        {isSubmitted ? (
                            <div className="text-center py-16">
                                <div className="bg-emerald-500/10 w-28 h-28 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 animate-bounce border border-emerald-500/20">
                                    <CheckCircle className="w-14 h-14 text-emerald-500" />
                                </div>
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">Mubarak! Request Sent.</h3>
                                <p className="text-slate-500 dark:text-gray-500 font-bold text-lg leading-relaxed max-w-sm mx-auto uppercase tracking-tighter">
                                    Our coordination scholars will contact you via WhatsApp within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-8 text-left">
                                    <div className="relative group">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block ml-4">Full Identity</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            className="w-full p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-transparent group-hover:border-primary/20 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary/5 transition-all font-black text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative group text-left">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block ml-4">WhatsApp Access</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91-000-000-0000"
                                            className="w-full p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-transparent group-hover:border-primary/20 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary/5 transition-all font-black text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-8 flex flex-col text-left">
                                    <div className="relative group flex-1">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 block ml-4">Seeking Mastery In?</label>
                                        <textarea
                                            placeholder="E.g. Family Qaida, Scholar Track, etc."
                                            required
                                            className="w-full p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-transparent group-hover:border-primary/20 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary/5 transition-all font-black text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 h-full min-h-[160px] resize-none outline-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 py-7 rounded-[2rem] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4 text-sm border-b-4 border-slate-800 dark:border-gray-200 active:border-b-0 active:translate-y-1"
                                    >
                                        {isLoading ? 'Transmitting...' : 'Initiate Inquiry'} <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
