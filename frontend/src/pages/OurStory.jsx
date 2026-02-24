import { Link } from 'react-router-dom';
import { Target, Eye, Globe, BookOpen, Users, Award, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OurStory = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden transition-colors duration-500">

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center pt-16 pb-24 lg:pt-24 lg:pb-48 bg-slate-900 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=2070"
                        alt="Islamic Architecture"
                        className="w-full h-full object-cover opacity-30 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 z-10 text-center flex flex-col items-center justify-center w-full">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-2xl bg-primary/10 text-primary font-black text-[10px] uppercase tracking-[0.3em] border border-primary/20 mb-8 animate-fade-in shadow-xl backdrop-blur-md">
                        <Star className="w-3 h-3 fill-primary" />
                        <span>The Bismi Journey</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1] transition-all">
                        Roots of <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 block md:inline">
                            Elite Excellence.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-bold">
                        Founded with a vision to bridge the gap between complex classical linguistics and modern accessible education.
                    </p>
                </div>
            </section>

            {/* 2. CORE VALUES / MISSION VISION (GLASS CARDS) */}
            <section className="py-24 relative -mt-20 z-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Our Mission",
                                desc: "To provide high-quality Arabic language education as a bridge to understanding rich cultures and the profound wisdom of the Quran."
                            },
                            {
                                icon: BookOpen,
                                title: "Structured Learning",
                                desc: "Step-by-step guidance following a scientifically designed curriculum that ensures steady progress from alphabets to advanced recitation."
                            },
                            {
                                icon: Award,
                                title: "Authentic Values",
                                desc: "Commitment to authentic Islamic education rooted in tradition, taught by expert instructors dedicated to spiritual growth."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-white/5 hover:-translate-y-2 transition-all duration-500 group">
                                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-inner">
                                    <item.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase tracking-tighter">{item.title}</h3>
                                <p className="text-slate-500 dark:text-gray-400 leading-relaxed font-bold text-sm tracking-wide">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. NARRATIVE SECTION */}
            <section className="py-32 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="flex-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary bg-secondary/5 px-4 py-2 rounded-full mb-8 inline-block">The Foundation</span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-tight">Commitment to Global Mastery</h2>
                            <div className="space-y-8 text-lg text-slate-500 dark:text-gray-400 leading-relaxed font-medium">
                                <p>
                                    At <span className="text-primary font-black uppercase">Bismi Arabic Institute</span>, we believe that learning Arabic goes beyond just language. It is a spiritual journey that connects the heart to the Divine message.
                                </p>
                                <p>
                                    Our instructors are not just teachers; they are mentors dedicated to spreading authentic knowledge rooted in tradition while utilizing state-of-the-art interactive pedagogies.
                                </p>
                                <div className="italic text-primary border-l-4 border-primary pl-8 py-6 bg-primary/5 rounded-r-[2rem] font-black">
                                    "We are building a future where every student, regardless of their native tongue, can unlock the secrets of the revelation."
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] z-0 opacity-50 animate-pulse"></div>
                            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white dark:border-slate-900 z-10 group">
                                <img
                                    src="https://png.pngtree.com/thumb_back/fh260/background/20221201/pngtree-online-arabic-school-female-teacher-engaged-with-children-photo-image_43015480.jpg"
                                    alt="Students Learning Arabic"
                                    className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TEACHING ARABIC TO THE WORLD GRID */}
            <section className="py-32 bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/5 px-4 py-2 rounded-full mb-6 inline-block">Worldwide Impact</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Teaching Arabic to the World</h2>
                        <p className="text-slate-700 dark:text-gray-400 font-black uppercase tracking-widest text-xs">Global Outreach & Authentic Education</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            {
                                num: "01",
                                title: "Online Live Classes",
                                desc: "Join our interactive sessions from anywhere in the world with real-time articulation correction."
                            },
                            {
                                num: "02",
                                title: "Elite Syllabus",
                                desc: "Follow a scientifically designed curriculum that ensures steady progress and profound understanding."
                            },
                            {
                                num: "03",
                                title: "Global Community",
                                desc: "Our community brings together learners from 50+ countries united by one spiritual goal."
                            },
                            {
                                num: "04",
                                title: "Purpose-Driven",
                                desc: "Our mission goes beyond language; we aim to foster a deep, lifelong connection with heritage."
                            }
                        ].map((point, idx) => (
                            <div key={idx} className="group p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                <span className="text-5xl font-black text-primary/10 group-hover:text-primary transition-colors mb-8 block">
                                    {point.num}
                                </span>
                                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-snug">
                                    {point.title}
                                </h4>
                                <p className="text-slate-600 dark:text-gray-400 font-bold text-sm tracking-wide">
                                    {point.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION */}
            <section className="pb-32 pt-16 max-w-7xl mx-auto px-6">
                <div className="bg-slate-950 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl border border-white/5 group">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:bg-primary/30 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -ml-64 -mb-64 group-hover:bg-secondary/20 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/10 mb-10">
                            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Ready for Revelation?</span>
                        </div>
                        <h2 className="text-4xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[1]">
                            Begin Your Spiritual <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 italic">Evolution.</span>
                        </h2>
                        <p className="text-gray-400 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                            Join over 2,500+ students worldwide learning from the comfort of their homes.
                        </p>
                        <Link
                            to={isAuthenticated ? "/inquiry" : "/login"}
                            className="inline-flex items-center justify-center gap-4 px-12 py-7 bg-primary text-white text-2xl font-black rounded-[2rem] shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-2 transition-all group border-b-4 border-teal-800 active:border-b-0 active:translate-y-2"
                        >
                            Start Free Trial
                            <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default OurStory;
