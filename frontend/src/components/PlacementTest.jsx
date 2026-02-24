import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, ChevronRight, ChevronLeft, CheckCircle, GraduationCap, ArrowRight, Sparkles, BookOpen, MessageSquare, Zap, Target } from 'lucide-react';

const QUESTIONS = [
    {
        id: 1,
        question: "How would you describe your current Arabic reading ability?",
        options: [
            { label: "Complete Beginner", sublabel: "I don't know the alphabet yet", score: 0, icon: BookOpen },
            { label: "Alphabet Novice", sublabel: "I recognize some letters but can't connect them", score: 1, icon: BookOpen },
            { label: "Connected Reader", sublabel: "I can read words but struggle with speed", score: 3, icon: BookOpen },
            { label: "Fluent Reader", sublabel: "I can read fluently with vowels (Tashkeel)", score: 5, icon: BookOpen }
        ]
    },
    {
        id: 2,
        question: "What is your experience with Qur'anic recitation (Tajweed)?",
        options: [
            { label: "Never Studied", sublabel: "I want to start from the very beginning", score: 0, icon: Target },
            { label: "Basic Reciter", sublabel: "I read but don't know any formal rules", score: 2, icon: Target },
            { label: "Intermediate", sublabel: "I know some rules like Noon Sakinah", score: 4, icon: Target },
            { label: "Advanced", sublabel: "I understand Sifaat, Makharij & complex rules", score: 6, icon: Target }
        ]
    },
    {
        id: 3,
        question: "How well do you understand spoken or written Arabic?",
        options: [
            { label: "No Understanding", sublabel: "I only want to learn to read the Quran", score: 0, icon: MessageSquare },
            { label: "Basic Words", sublabel: "I know common prayers and daily phrases", score: 2, icon: MessageSquare },
            { label: "Sentence Structure", sublabel: "I understand basic grammar (Noun/Verb)", score: 4, icon: MessageSquare },
            { label: "Scholarly", sublabel: "I want to analyze the Quranic linguistics", score: 7, icon: MessageSquare }
        ]
    }
];

export default function PlacementTest({ isOpen, onClose }) {
    const [step, setStep] = useState(0); // 0: Start, 1-3: Questions, 4: Calculating, 5: Result, 6: Contact, 7: Success
    const [scores, setScores] = useState({});
    const [leadData, setLeadData] = useState({ name: '', phone: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (step === 4) {
            let timer = 0;
            const interval = setInterval(() => {
                timer += 5;
                setProgress(timer);
                if (timer >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStep(5), 500);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [step]);

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const recommendation = getRecommendation();

        try {
            const baseUrl = import.meta.env.VITE_API_URL || '';
            await fetch(`${baseUrl}/api/auth/inquiry/`, {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: leadData.name,
                    phone_number: leadData.phone,
                    message: `[Diagnostic Result]: Path - ${recommendation.path}. Level - ${recommendation.level}. Goal - Personalized Learning.`
                })
            });
            setStep(7);
        } catch (error) {
            console.error("Submission error:", error);
            // Fallback for demo/dev
            setStep(7);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOptionSelect = (questionId, score) => {
        setScores({ ...scores, [questionId]: score });
        if (step < QUESTIONS.length) {
            setStep(step + 1);
        } else {
            setStep(4); // Moving to 'Calculating'
        }
    };

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

    const getRecommendation = () => {
        if (totalScore <= 2) return {
            level: "Foundational Beginner",
            path: "Noorani Qaida & Basic Reading",
            desc: "Perfect! We'll start with the building blocks of Arabic letters and their articulation points.",
            icon: BookOpen,
            color: "text-blue-500",
            bg: "bg-blue-50"
        };
        if (totalScore <= 8) return {
            level: "Early Intermediate",
            path: "Tajweed Essentials & Vocabulary",
            desc: "Great! You have the basics down. Now let's focus on proper recitation and daily conversational Arabic.",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-50"
        };
        return {
            level: "Advanced Scholarly",
            path: "Qur'anic Grammar & Morphology",
            desc: "Excellent! You're ready to dive deep into the classical linguistics and secrets of the Holy Quran.",
            icon: Sparkles,
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        };
    };

    const recommendation = getRecommendation();

    return (
        <Transition show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-[70]" onClose={onClose}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xl" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-[3rem] bg-white dark:bg-slate-900 transition-all relative border border-white dark:border-white/5 shadow-2xl">
                            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-3xl rounded-[2.9rem] p-10">
                                <button
                                    onClick={onClose}
                                    className="absolute top-8 right-8 p-2.5 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all border border-gray-100 dark:border-white/5 shadow-sm z-50"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {step === 0 && (
                                    <div className="text-center py-6">
                                        <div className="bg-primary/5 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-primary/10 relative shadow-inner">
                                            <div className="absolute inset-0 bg-primary/20 rounded-[2rem] animate-ping opacity-20"></div>
                                            <GraduationCap className="w-12 h-12 text-primary relative z-10" />
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight">Your Personalized <br />Learning Roadmap</h2>
                                        <p className="text-slate-500 dark:text-gray-400 font-medium mb-12 leading-relaxed text-lg max-w-sm mx-auto">
                                            Take this 60-second diagnostic to get a tailored curriculum designed for your specific goals.
                                        </p>
                                        <button
                                            onClick={() => setStep(1)}
                                            className="w-full bg-primary text-white py-6 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group border-b-4 border-teal-800"
                                        >
                                            Begin Diagnostic <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <p className="mt-8 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-gray-500">Trusted by 2,500+ global students</p>
                                    </div>
                                )}

                                {step > 0 && step <= QUESTIONS.length && (
                                    <div className="py-2">
                                        <div className="flex items-center justify-between mb-10">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs">0{step}</div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">Step {step} of {QUESTIONS.length}</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                {QUESTIONS.map((_, i) => (
                                                    <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-700 ${step > i ? 'bg-primary shadow-sm' : 'bg-gray-100 dark:bg-white/5'}`}></div>
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 leading-tight min-h-[4rem] tracking-tight">
                                            {QUESTIONS[step - 1].question}
                                        </h3>

                                        <div className="space-y-4">
                                            {QUESTIONS[step - 1].options.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleOptionSelect(QUESTIONS[step - 1].id, opt.score)}
                                                    className="w-full px-6 py-5 text-left border border-slate-100 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 bg-slate-50/50 dark:bg-white/5 hover:bg-primary/[0.02] rounded-3xl transition-all group flex items-center gap-5 shadow-sm hover:shadow-xl"
                                                >
                                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center text-primary border border-slate-50 dark:border-white/5">
                                                        <opt.icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-black text-slate-800 dark:text-white group-hover:text-primary transition-colors leading-tight mb-1">{opt.label}</p>
                                                        <p className="text-xs font-bold text-slate-400 dark:text-gray-500 group-hover:text-primary/60 transition-colors uppercase tracking-wide">{opt.sublabel}</p>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-slate-300 dark:text-gray-600 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                                                </button>
                                            ))}
                                        </div>

                                        {step > 0 && (
                                            <button
                                                onClick={() => setStep(step - 1)}
                                                className="mt-10 flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-gray-500 hover:text-primary transition-all uppercase tracking-widest group"
                                            >
                                                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Previous
                                            </button>
                                        )}
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="text-center py-12 flex flex-col items-center">
                                        <div className="relative w-36 h-36 mb-12">
                                            <div className="absolute inset-0 border-[6px] border-slate-100 dark:border-white/5 rounded-full"></div>
                                            <div
                                                className="absolute inset-0 border-[6px] border-primary rounded-full transition-all duration-300 ease-linear shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                                                style={{
                                                    clipPath: `polygon(50% 50%, -100% -100%, ${progress > 25 ? '200% -100%' : '50% -100%'}, ${progress > 50 ? '200% 200%' : '50% 200%'}, ${progress > 75 ? '-100% 200%' : '50% 200%'}, -100% -100%)`,
                                                    transform: `rotate(${progress * 3.6}deg)`
                                                }}
                                            ></div>
                                            <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-primary">
                                                {progress}%
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 animate-reveal">Analyzing Proficiency</h3>
                                        <p className="text-slate-500 dark:text-gray-500 font-black uppercase tracking-widest text-[10px]">Comparing results with 15+ available tracks...</p>
                                    </div>
                                )}

                                {step === 5 && (
                                    <div className="text-center py-4">
                                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-5 py-2 rounded-full mb-10 border border-emerald-500/20 shadow-xl shadow-emerald-500/5">
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Diagnostic Complete</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Your Optimal Path</h2>
                                        <p className="text-slate-500 dark:text-gray-500 font-black uppercase tracking-widest text-[10px] mb-12 italic tracking-[0.2em]">Level Identified: {recommendation.level}</p>

                                        <div className={`relative p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 mb-10 text-left overflow-hidden group shadow-2xl transition-all ${recommendation.bg.replace('/50', '/10')} dark:bg-slate-950/50`}>
                                            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/20 dark:bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>

                                            <div className="relative z-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
                                                <div className={`p-5 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-50 dark:border-white/10 ${recommendation.color}`}>
                                                    <recommendation.icon className="w-10 h-10" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-black text-slate-900 dark:text-white mb-4 text-3xl leading-[1.1] tracking-tighter">{recommendation.path}</h4>
                                                    <p className="text-slate-500 dark:text-gray-400 font-bold text-sm leading-relaxed tracking-wide">
                                                        {recommendation.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setStep(6)}
                                            className="w-full bg-primary text-white py-6 rounded-2xl font-black shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group text-lg border-b-4 border-teal-800"
                                        >
                                            Get Full Study Plan <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                )}

                                {step === 6 && (
                                    <div className="py-4">
                                        <div className="text-center mb-10">
                                            <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-primary/10 transition-transform hover:rotate-12">
                                                <Target className="w-10 h-10 text-primary" />
                                            </div>
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Almost Finished!</h2>
                                            <p className="text-slate-500 dark:text-gray-400 font-bold text-lg leading-relaxed">Leave your details and we'll send your <br /><span className="text-secondary font-black uppercase text-xs tracking-widest bg-secondary/10 px-3 py-1 rounded-lg">Custom Plan</span> directly via WhatsApp.</p>
                                        </div>

                                        <form onSubmit={handleLeadSubmit} className="space-y-5">
                                            <div className="relative group">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Full Name"
                                                    className="w-full p-6 bg-slate-50/50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 group-hover:border-primary/30 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-black text-slate-950 dark:text-white placeholder:font-black placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none"
                                                    value={leadData.name}
                                                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="relative group">
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="WhatsApp Number"
                                                    className="w-full p-6 bg-slate-50/50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 group-hover:border-primary/30 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-black text-slate-950 dark:text-white placeholder:font-black placeholder:text-slate-400 dark:placeholder:text-gray-600 outline-none"
                                                    value={leadData.phone}
                                                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-primary text-white py-6 rounded-2xl font-black shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-xl mt-6 border-b-4 border-teal-800"
                                            >
                                                {isLoading ? (
                                                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    <>Send My Plan <Sparkles className="w-6 h-6" /></>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {step === 7 && (
                                    <div className="text-center py-10">
                                        <div className="bg-primary/10 w-32 h-32 rounded-[3.5rem] flex items-center justify-center mx-auto mb-10 relative group">
                                            <div className="absolute inset-0 bg-primary/20 rounded-[3.5rem] animate-pulse group-hover:scale-110 transition-transform"></div>
                                            <CheckCircle className="w-16 h-16 text-primary relative z-10" />
                                        </div>
                                        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">Request Received!</h2>
                                        <p className="text-slate-500 dark:text-gray-400 font-bold mb-14 text-lg leading-relaxed max-w-sm mx-auto">
                                            Mubarak! Our academic counselors will contact you on WhatsApp with your <span className="text-primary font-black uppercase text-xs bg-primary/10 px-3 py-1 rounded-lg tracking-widest">Expert Track</span> within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => {
                                                onClose();
                                                setTimeout(() => setStep(0), 500);
                                            }}
                                            className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 py-6 rounded-2xl font-black shadow-2xl hover:bg-primary dark:hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-sm"
                                        >
                                            Explore Other Programs
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
