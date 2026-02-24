import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    ArrowRight, Star, Video, Users, Clock,
    Check, Play, Award, Layout, BookOpen, GraduationCap, Sparkles, Zap, ShieldCheck, Globe
} from 'lucide-react';

const STATIC_TRENDING = [
    {
        id: 1,
        title: "Noorani Qaida for Beginners",
        thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        course_type: "Arabic Language",
        duration_months: 3,
        level: "Beginner",
        price_per_month: "1000"
    },
    {
        id: 2,
        title: "Quranic Arabic & Grammar",
        thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        course_type: "Quran",
        duration_months: 6,
        level: "Intermediate",
        price_per_month: "1800"
    },
    {
        id: 3,
        title: "Advanced Tajweed & Ijazah",
        thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        course_type: "Tajweed",
        duration_months: 12,
        level: "Advanced",
        price_per_month: "3500"
    }
];

function TrendingCourses() {
    const courses = STATIC_TRENDING;

    return (
        <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-4 inline-block">Vibrant Scholars</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Popular <span className="text-primary italic">Programs</span></h2>
                    </div>
                    <Link to="/courses" className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2 group hover:gap-4 transition-all">
                        Explore All Tracks <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {courses.map((course) => (
                        <Link key={`course-${course.id || course.title}`} to="/courses" className="group block h-full">
                            <div className="relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-white/5 h-full border border-slate-100 dark:border-white/5 transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(14,165,164,0.15)] hover:-translate-y-4">
                                <div className="h-72 overflow-hidden relative">
                                    <img
                                        src={course.thumbnail || 'https://images.unsplash.com/photo-1574672033023-e6501725b81a?auto=format&fit=crop&q=80&w=800'}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-8 right-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-2xl border border-white/20">
                                        {course.course_type?.replace('_', ' ')}
                                    </div>
                                </div>
                                <div className="p-10">
                                    <div className="flex items-center gap-4 mb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-secondary" /> {course.duration_months} Months</div>
                                        <div className="flex items-center gap-1.5"><Users className="w-5 h-5 text-primary" /> {course.level}</div>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 leading-tight group-hover:text-primary transition-colors tracking-tighter uppercase">{course.title || 'Elite Arabic Track'}</h3>
                                    <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-white/5">
                                        <div className="text-2xl font-black text-slate-900 dark:text-white">₹{course.price_per_month || '0'}<span className="text-[10px] text-primary uppercase ml-1">/ mo</span></div>
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-primary/40 group-hover:rotate-12">
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    const { isAuthenticated } = useAuth();
    return (
        <div className="flex flex-col flex-1 w-full bg-[#f8fafc] dark:bg-slate-950 overflow-x-hidden transition-colors duration-500">

            {/* SECTION 1 — HERO SECTION */}
            <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        {/* Left Side */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-8 flex flex-col items-center lg:items-start group">
                                <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 text-primary font-black text-[10px] uppercase tracking-[0.3em] border border-slate-100 dark:border-white/10 shadow-sm">
                                    <Sparkles className="w-4 h-4 text-secondary" />
                                    <span className="dark:text-white">Premium Arabic Institute</span>
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-10">
                                Language <br />
                                <span className="text-primary italic">Revelation.</span>
                            </h1>

                            <p className="text-xl text-slate-700 dark:text-gray-300 font-bold leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
                                Join 2,500+ successful students. Start your spiritual journey with our elite, live-interactive coaching.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                                <Link
                                    to={isAuthenticated ? "/inquiry" : "/login"}
                                    className="px-10 py-5 bg-primary text-white text-lg font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 border-b-4 border-teal-800"
                                >
                                    Start Free Trial <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/courses"
                                    className="px-10 py-5 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-lg font-black rounded-2xl border border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-center"
                                >
                                    Explore Paths
                                </Link>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex-1 w-full max-w-2xl">
                            <div className="relative">
                                <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] z-0 opacity-50 animate-pulse"></div>
                                <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white dark:border-slate-900 z-10 group">
                                    <img
                                        src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=2070"
                                        alt="Islamic Education"
                                        className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                </div>
                                <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-white/5 z-20 animate-reveal">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-4">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 bg-gray-200 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?u=student${i}`} alt="user" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-slate-900 dark:text-white">2,500+</p>
                                            <p className="text-[10px] font-black text-slate-700 dark:text-gray-400 uppercase tracking-widest leading-none">Global Students</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — WHY CHOOSE US */}
            <section className="py-32 relative bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5 px-4 py-2 rounded-full mb-6 inline-block">Our Advantage</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">Designed for Mastery</h2>
                        <p className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">Excellence in Islamic education through refined pedagogies and state-of-the-art interactive technology.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: Award,
                                title: "Certified Specialists",
                                description: "Every instructor is Ijazah certified and strictly vetted for linguistic excellence.",
                                color: "text-primary"
                            },
                            {
                                icon: Video,
                                title: "1-on-1 Interactive",
                                description: "Direct, focused attention with real-time articulation correction and personalized feedback.",
                                color: "text-secondary"
                            },
                            {
                                icon: Globe,
                                title: "Global Curriculum",
                                description: "A standardized multi-level track designed for international students of all academic backgrounds.",
                                color: "text-emerald-500"
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-12 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                <div className={`w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-inner`}>
                                    <feature.icon className={`w-10 h-10 ${feature.color} group-hover:text-white transition-colors duration-500`} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-bold text-sm tracking-wide">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* SECTION — TRENDING PROGRAMS */}
            <TrendingCourses />

            {/* SECTION 3 — PRICING SYNC (3 Tiers) */}
            <section className="py-32 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -track-x-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-3 bg-primary/10 dark:bg-primary/20 px-6 py-2.5 rounded-full border border-primary/20 mb-8 backdrop-blur-md">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Elite Investment Plans</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Track.</span></h2>
                        <p className="text-xl text-slate-700 dark:text-gray-300 font-bold max-w-2xl mx-auto uppercase tracking-tight">Standardized excellence for every level of seeker.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                name: 'Starter',
                                price: '₹1000',
                                desc: 'Perfect for casual learners focusing on basic reading.',
                                features: ['Arabic Reading classes', 'Weekly Group Sessions', 'User Portal Access', 'Course Materials'],
                                cta: 'Start Learning',
                                popular: false,
                                icon: Users,
                                theme: 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5'
                            },
                            {
                                name: 'Institute Pro',
                                price: '₹1800',
                                desc: 'Our most popular plan for serious students seeking fluency.',
                                features: ['Everything in Starter', '1-on-1 Evaluation', 'Advanced Tajweed', 'Official Certification'],
                                cta: 'Become a Pro',
                                popular: true,
                                icon: Sparkles,
                                theme: 'bg-slate-900 dark:bg-primary/10 text-white border-primary/20'
                            },
                            {
                                name: 'Scholar specialized',
                                price: '₹3500',
                                desc: 'Intensive track for Ijazah and classical linguistics.',
                                features: ['Everything in Pro', 'Personal Mentorship', 'Classical Grammar', 'Ijazah Track Prep'],
                                cta: 'Join Scholar Track',
                                popular: false,
                                icon: Zap,
                                theme: 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5'
                            }
                        ].map((plan, i) => (
                            <div
                                key={`plan-${i}`}
                                className={`relative group rounded-[3.5rem] p-12 transition-all duration-700 hover:-translate-y-4 flex flex-col border shadow-2xl ${plan.popular ? 'scale-105 z-10 shadow-primary/20' : ''} ${plan.theme}`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/20">
                                        Best Selection
                                    </div>
                                )}

                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 ${plan.popular ? 'bg-primary text-white shadow-xl' : 'bg-primary/10 text-primary'}`}>
                                    <plan.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-3xl font-black mb-3 uppercase tracking-tighter">{plan.name}</h3>
                                <p className={`text-[11px] font-black mb-10 uppercase tracking-widest leading-relaxed ${plan.popular ? 'text-gray-400' : 'text-slate-400 dark:text-gray-500'}`}>{plan.desc}</p>

                                <div className="flex items-baseline gap-2 mb-12">
                                    <span className="text-6xl font-black tracking-tighter transition-all group-hover:scale-105">{plan.price}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">/ Month</span>
                                </div>

                                <ul className="space-y-6 mb-14 flex-1">
                                    {plan.features.map((f, idx) => (
                                        <li key={`feat-${i}-${idx}`} className="flex items-center gap-4">
                                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${plan.popular ? 'bg-secondary text-white' : 'bg-primary/10 text-primary'}`}>
                                                <Check className="w-4 h-4 stroke-[4]" />
                                            </div>
                                            <span className={`text-xs font-black uppercase tracking-wider ${plan.popular ? 'text-gray-300' : 'text-slate-700 dark:text-gray-400'}`}>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={isAuthenticated ? "/inquiry" : "/login"}
                                    className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all shadow-xl ${plan.popular
                                        ? 'bg-primary text-white hover:bg-white hover:text-primary'
                                        : 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-primary hover:text-white'
                                        }`}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4 — CALL TO ACTION */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="relative rounded-[5rem] overflow-hidden bg-slate-950 p-16 lg:p-32 text-center border border-white/10 shadow-[0_40px_100px_-20px_rgba(13,148,136,0.3)] group">
                    {/* Animated background color orbs */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[150px] -mr-96 -mt-96 group-hover:bg-primary/40 transition-all duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[150px] -ml-96 -mb-96 group-hover:bg-secondary/30 transition-all duration-1000"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-3xl px-8 py-3 rounded-full border border-white/10 mb-14 shadow-2xl">
                            <Star className="w-5 h-5 text-accent fill-accent animate-spin-slow" />
                            <span className="text-white text-xs font-black uppercase tracking-[0.4em]">Elite Spiritual Evolution</span>
                        </div>
                        <h2 className="text-5xl md:text-9xl font-black text-white mb-12 leading-[0.9] tracking-tighter">
                            Unlock Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-secondary italic">Potential.</span>
                        </h2>
                        <p className="text-gray-400 text-xl md:text-3xl mb-20 max-w-3xl mx-auto font-bold leading-relaxed transition-all group-hover:text-white">
                            Join 2,500+ souls on the path of authentic articulation. Zero-risk trial starting today.
                        </p>
                        <Link
                            to={isAuthenticated ? "/inquiry" : "/signup"}
                            className="inline-flex items-center justify-center gap-6 px-16 py-8 bg-primary text-white text-3xl font-black rounded-[2.5rem] shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-3 transition-all group border-b-[8px] border-teal-800 active:border-b-0 active:translate-y-2"
                        >
                            Open Account Now
                            <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
