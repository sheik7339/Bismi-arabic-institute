import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronRight, BookOpen, GraduationCap, Globe, Users, Clock, Star, PlayCircle, CheckCircle, ShieldCheck, MessageCircle, BarChart, ArrowRight, Sparkles } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import PlacementTest from '../components/PlacementTest';

const CATEGORIES = ['All', 'Arabic Language', 'Quran', 'Tajweed', 'Islamic Studies'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const COURSES = [
    {
        id: 1,
        title: "Noorani Qaida for Beginners",
        description: "Master the basics of Arabic articulation and pronunciation. The essential foundation for reading the Quran correctly with Tajweed principles from day one.",
        duration: "3 Months",
        lessons: 24,
        students: 850,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        price: "₹1000",
        category: "Arabic Language",
        level: "Beginner",
        popular: true,
        teacher: "Ustadh Yusuf Ali",
        teacherRole: "Master of Tajweed",
        syllabus: ["Alphabet Recognition", "Vowel Connections", "Basic Articulation Points", "Word Construction"]
    },
    {
        id: 2,
        title: "Quranic Arabic & Grammar",
        description: "Deep dive into the linguistic structure of the Holy Quran. Understand the 1,500 most frequent words and essential Nahw (grammar) and Sarf (morphology).",
        duration: "6 Months",
        lessons: 48,
        students: 1200,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        price: "₹1800",
        category: "Quran",
        level: "Intermediate",
        popular: false,
        teacher: "Sheikh Ibrahim",
        teacherRole: "Classical Linguist",
        syllabus: ["Verb Morphology", "Sentence Analysis", "Quranic Logic", "Vocabulary Building"]
    },
    {
        id: 3,
        title: "Advanced Tajweed & Ijazah",
        description: "An intensive certification track for those seeking perfect recitation. Master the poems of Jazariyah and prepare for Ijazah in various recitations.",
        duration: "12 Months",
        lessons: 96,
        students: 450,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        price: "₹3500",
        category: "Tajweed",
        level: "Advanced",
        popular: true,
        teacher: "Qari Ahmed",
        teacherRole: "Ijazah Specialist",
        syllabus: ["Jazariyah Text Analysis", "Advanced Intonation", "Recitation Drill", "Exam Prep"]
    },
    {
        id: 4,
        title: "Islamic Studies Essentials",
        description: "A comprehensive overview of Fiqh, Hadith, and Seerah. Build a solid intellectual foundation of Islamic heritage and practical day-to-day rulings.",
        duration: "4 Months",
        lessons: 32,
        students: 600,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        price: "₹1500",
        category: "Islamic Studies",
        level: "Beginner",
        popular: false,
        teacher: "Dr. Fatima",
        teacherRole: "Hadith Scholar",
        syllabus: ["Basic Fiqh", "Prophetic Biography", "Ethics & Morality", "Aqeedah Basics"]
    },
    {
        id: 5,
        title: "Hifz-ul-Quran Intensive",
        description: "A structured program for complete memorization of the Holy Quran with focus on retention (Muraja'ah) and proper Tajweed implementation.",
        duration: "24 Months",
        lessons: 144,
        students: 300,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        price: "₹2500",
        category: "Quran",
        level: "Advanced",
        popular: true,
        teacher: "Sheikh Hafiz Omar",
        teacherRole: "Memorization Expert",
        syllabus: ["Juz 'Amma Target", "Retention Techniques", "Daily Revision Circles", "Final Assessment"]
    },
    {
        id: 6,
        title: "Spoken Arabic Masterclass",
        description: "Learn to communicate fluently in Modern Standard Arabic (MSA) for travel, business, and daily interactions with native speakers.",
        duration: "5 Months",
        lessons: 40,
        students: 500,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        price: "₹2000",
        category: "Arabic Language",
        level: "Intermediate",
        popular: false,
        teacher: "Ustadh Hamza",
        teacherRole: "Conversational Coach",
        syllabus: ["Daily Greetings", "Business Terminology", "Cultural Context", "Live Dialogues"]
    },
    {
        id: 7,
        title: "Islamic Jurisprudence (Fiqh)",
        description: "Advanced study of Islamic law covering worship, transactions, and family matters based on authentic scholarly consensus.",
        duration: "6 Months",
        lessons: 48,
        students: 250,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        price: "₹2200",
        category: "Islamic Studies",
        level: "Intermediate",
        popular: false,
        teacher: "Mufti Hassan",
        teacherRole: "Senior Jurist",
        syllabus: ["Fiqh of Ibadah", "Modern Transactions", "Family Law Ethics", "Usul-al-Fiqh Basics"]
    },
    {
        id: 8,
        title: "Classical Arabic Literature",
        description: "Explore the beauty of classical Arabic poetry and prose. Understand the literary genius that shaped the language of revelation.",
        duration: "8 Months",
        lessons: 64,
        students: 150,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        price: "₹3000",
        category: "Arabic Language",
        level: "Advanced",
        popular: false,
        teacher: "Dr. Zeyad",
        teacherRole: "Literature Professor",
        syllabus: ["Pre-Islamic Poetics", "Abbasid Literature", "Linguistic Rhetoric", "Quranic Eloquence"]
    },
    {
        id: 9,
        title: "Quranic Miracles (Balagha)",
        description: "Uncover the scientific and linguistic miracles (I'jaz) of the Quran through the lens of Balagha and eloquence.",
        duration: "4 Months",
        lessons: 32,
        students: 400,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800",
        price: "₹1700",
        category: "Quran",
        level: "Intermediate",
        popular: true,
        teacher: "Sheikh Anwar",
        teacherRole: "Balagha Specialist",
        syllabus: ["Linguistic Precision", "Narrative Structures", "Thematic Consistency", "Contemporary Miracles"]
    }
];

export default function Courses() {
    const { isAuthenticated } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);
    const [isPlacementOpen, setIsPlacementOpen] = useState(false);

    const filteredCourses = useMemo(() => {
        return COURSES.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
            const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

            return matchesSearch && matchesCategory && matchesLevel;
        });
    }, [searchQuery, selectedCategory, selectedLevel]);

    const stats = [
        { label: 'Active Courses', value: '15+', icon: BookOpen },
        { label: 'Expert Teachers', value: '10+', icon: GraduationCap },
        { label: 'Happy Students', value: '1,000+', icon: Users },
        { label: 'Online Classes', value: '24/7', icon: Globe },
    ];

    const featuredCourse = COURSES[0];

    return (
        <div className="bg-[#f8fafc] dark:bg-slate-950 min-h-screen pt-16 pb-20 transition-colors duration-500">
            {/* Hero Section — SaaS Vibrant Styling */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-reveal">
                <div className="relative rounded-[3.5rem] p-10 md:p-24 text-white overflow-hidden shadow-[0_50px_100px_-30px_rgba(14,165,164,0.3)] bg-slate-900 group">
                    {/* Dynamic Background */}
                    <div className="absolute top-0 right-0 w-full h-full">
                        <img
                            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=2070"
                            alt="Background"
                            className="w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-primary/20"></div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-2xl border border-white/20 mb-10 shadow-xl">
                                <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase">Elite Learning Tracks</span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[1] tracking-tighter">
                                Master the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 italic">Revelation.</span>
                            </h1>
                            <p className="text-xl text-white/70 mb-14 font-medium leading-relaxed max-w-xl">
                                Join 2,500+ global students in our scientifically structured programs designed for modern excellence.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <Link to={isAuthenticated ? "/inquiry" : "/login"} className="bg-primary text-white px-12 py-6 rounded-2xl font-black hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40 hover:-translate-y-1 flex items-center gap-3 border-b-4 border-teal-800 active:border-b-0 active:translate-y-1">
                                    Start Free Trial <ArrowRight className="w-6 h-6" />
                                </Link>
                                <button onClick={() => setIsPlacementOpen(true)} className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl font-black hover:bg-white/20 transition-all">
                                    Placement Test
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block relative group">
                            <div className="absolute -inset-1 w-full h-full bg-gradient-to-r from-primary to-secondary rounded-[3rem] blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative h-full overflow-hidden rounded-[3rem] shadow-2xl border-[8px] border-white/5 bg-slate-900">
                                <img
                                    src="https://images.pexels.com/photos/318451/pexels-photo-318451.jpeg"
                                    alt="Expert Learning"
                                    className="w-full h-[500px] object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                                <div className="absolute bottom-10 left-10 right-10 flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-white font-black uppercase tracking-widest leading-none mb-1">Ijazah Certified</p>
                                        <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Global Standards</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section — Glass Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 animate-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-white/5 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/5 flex flex-col items-center text-center group hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500">
                            <div className="w-20 h-20 rounded-3xl bg-primary/5 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6">
                                <stat.icon className="w-10 h-10" />
                            </div>
                            <p className="text-4xl font-black text-slate-900 dark:text-white mb-2 leading-none">{stat.value}</p>
                            <p className="text-[10px] font-black text-slate-600 dark:text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Section — SaaS Dashboard Style */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-reveal" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white dark:bg-white/5 p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-white/5 backdrop-blur-3xl">
                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                        <div className="relative w-full lg:max-w-md group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search courses, levels, topics..."
                                className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-700 dark:text-gray-300 font-bold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                            <div className="flex items-center gap-2 mr-2 px-2 border-r border-gray-100">
                                <Filter className="w-4 h-4 text-slate-600" />
                                <span className="text-[10px] font-black text-slate-600 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap">Filter By</span>
                            </div>
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-black transition-all ${selectedCategory === category
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                                        : 'bg-white text-gray-500 hover:text-primary hover:bg-primary/5'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-3 items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 px-2 border-r border-gray-100">Level</span>
                        {LEVELS.map(level => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`px-5 py-2 rounded-full text-xs font-black transition-all border ${selectedLevel === level
                                    ? 'bg-secondary border-secondary text-white'
                                    : 'bg-white border-gray-200 text-gray-500 hover:border-secondary/50'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}

                        {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery !== '') && (
                            <button
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setSelectedLevel('All');
                                    setSearchQuery('');
                                }}
                                className="ml-auto flex items-center gap-1.5 text-[10px] font-black text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all uppercase tracking-widest"
                            >
                                <X className="w-3 h-3" /> Reset Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-reveal" style={{ animationDelay: '0.6s' }}>
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                        {filteredCourses.length} Learning {filteredCourses.length === 1 ? 'Path' : 'Paths'} <span className="text-slate-300 dark:text-gray-600 font-light">|</span> <span className="text-primary text-lg font-bold">Ready to Join</span>
                    </h2>
                </div>

                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredCourses.map((course) => (
                            <div key={course.id} onClick={() => setSelectedCourse(course)} className="cursor-pointer h-full">
                                <CourseCard {...course} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-200 shadow-sm">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Search className="w-12 h-12 text-gray-300" />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4">Mmm, nothing found...</h3>
                        <p className="text-gray-500 max-w-sm mx-auto font-medium text-lg leading-relaxed">
                            We couldn't find any courses matching your current filters. Maybe try another category?
                        </p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setSelectedLevel('All');
                                setSearchQuery('');
                            }}
                            className="mt-10 px-8 py-4 bg-primary text-white rounded-2xl font-black hover:shadow-xl transition-all"
                        >
                            Explore All Paths
                        </button>
                    </div>
                )}
            </div>

            {/* Comparison Section (SaaS Level) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 animate-reveal">
                <div className="text-center mb-16">
                    <span className="text-primary font-black uppercase tracking-widest text-xs bg-primary/5 px-4 py-2 rounded-full">The Bismi Advantage</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-6 tracking-tight">Why students choose us</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Native Teachers', desc: 'Learn from scholars who live and breathe the language.', icon: MessageCircle },
                        { title: 'Track Progress', desc: 'Visual analytics to see your vocabulary growth weekly.', icon: BarChart },
                        { title: 'Verified Ijazah', desc: 'Earn recognized certifications for advanced programs.', icon: ShieldCheck },
                    ].map((feature, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900/50 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none hover:shadow-xl transition-all group">
                            <div className="w-16 h-16 rounded-2xl bg-secondary/5 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-gray-400 font-bold leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-40 animate-reveal">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-2 rounded-full">Common Questions</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-6 tracking-tight">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-6">
                    {[
                        { q: "Do I need any prior Arabic knowledge?", a: "Not at all. We have specific tracks (like Noorani Qaida) designed explicitly for complete beginners to start from zero." },
                        { q: "Are the classes live or pre-recorded?", a: "We believe in the power of live interaction. All our main sessions are live via Zoom, allowing for real-time correction and Q&A." },
                        { q: "Can I switch courses after starting?", a: "Yes! If you find a course too easy or too challenging, our academic team can help you transition to a better-suited learning path." }
                    ].map((faq, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none hover:shadow-md transition-all group">
                            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-3 flex items-center gap-4 tracking-tight">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">?</div>
                                {faq.q}
                            </h4>
                            <p className="text-slate-600 dark:text-gray-400 font-bold leading-relaxed pl-12">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium CTA Section - Refined Size */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pb-20">
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-slate-950 border border-white/5 group leading-none">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>

                    <div className="relative z-10 p-10 md:p-16 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-5 py-2 rounded-full border border-white/10 mb-8">
                            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                            <span className="text-white text-[9px] font-black uppercase tracking-[0.3em]">Join the Elite Cohort</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight max-w-3xl">
                            Ready to unlock the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Language of Revelation?</span>
                        </h2>

                        <p className="text-gray-400 max-w-xl mx-auto mb-12 text-base md:text-lg font-medium leading-relaxed">
                            Join 2,500+ students in a structured, supported, and spiritually uplifting environment.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-lg">
                            <Link to="/inquiry" className="flex-1 bg-primary text-white px-8 py-5 rounded-2xl font-black hover:scale-105 shadow-xl transition-all flex items-center justify-center gap-3 text-lg border-b-4 border-teal-800">
                                Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                onClick={() => setIsPlacementOpen(true)}
                                className="flex-1 bg-white/5 backdrop-blur-2xl border border-white/10 text-white px-8 py-5 rounded-2xl font-black hover:bg-white/10 transition-all text-lg"
                            >
                                Placement Test
                            </button>
                        </div>

                        <div className="mt-16 pt-16 border-t border-white/5 w-full flex flex-wrap justify-center gap-x-12 gap-y-6">
                            {['Ijazah Certified', 'Live 1-on-1 Sessions', 'Lifetime Access', 'Scholar Support'].map((badge, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                    <span className="text-gray-500 font-black text-[10px] uppercase tracking-widest">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Placement Test Modal */}
            <PlacementTest isOpen={isPlacementOpen} onClose={() => setIsPlacementOpen(false)} />

            {/* Course Preview Modal */}
            <Transition show={!!selectedCourse} as={React.Fragment}>
                <Dialog as="div" className="relative z-[60]" onClose={() => setSelectedCourse(null)}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95 translate-y-8"
                                enterTo="opacity-100 scale-100 translate-y-0"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100 translate-y-0"
                                leaveTo="opacity-0 scale-95 translate-y-8"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-[3rem] bg-white p-0 text-left align-middle shadow-2xl transition-all">
                                    {selectedCourse && (
                                        <div className="flex flex-col lg:flex-row">
                                            {/* Modal Header/Image */}
                                            <div className="lg:w-1/3 relative overflow-hidden flex flex-col justify-between">
                                                <img
                                                    src={selectedCourse.image}
                                                    alt={selectedCourse.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                                                <div className="relative z-10 p-10 text-white flex flex-col h-full justify-between">
                                                    <div>
                                                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl inline-block mb-8 border border-white/30">
                                                            < BookOpen className="w-8 h-8" />
                                                        </div>
                                                        <h2 className="text-3xl font-black mb-4 leading-tight">{selectedCourse.title}</h2>
                                                        <div className="flex items-center gap-2 mb-6 text-secondary">
                                                            <Star className="w-5 h-5 fill-secondary" />
                                                            <span className="font-black text-xl text-white">{selectedCourse.rating}</span>
                                                            <span className="text-white/60 font-bold ml-1">Rating</span>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                                            <Clock className="w-5 h-5 text-secondary" />
                                                            <span className="font-bold text-white text-sm">{selectedCourse.duration} Intensive Track</span>
                                                        </div>
                                                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                                            <PlayCircle className="w-5 h-5 text-secondary" />
                                                            <span className="font-bold text-white text-sm">{selectedCourse.lessons} Modules Included</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Modal Content */}
                                            <div className="lg:w-2/3 p-10 lg:p-16 relative">
                                                <button
                                                    onClick={() => setSelectedCourse(null)}
                                                    className="absolute top-6 right-6 p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all"
                                                >
                                                    <X className="w-6 h-6" />
                                                </button>

                                                <div className="mb-10">
                                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Course Overview</h3>
                                                    <p className="text-gray-600 text-lg font-medium leading-relaxed">
                                                        {selectedCourse.description}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                                                    <div>
                                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Learning Path</h3>
                                                        <ul className="space-y-4">
                                                            {selectedCourse.syllabus.map((item, i) => (
                                                                <li key={i} className="flex items-start gap-3">
                                                                    <div className="mt-1 bg-secondary/10 p-1 rounded-md"><CheckCircle className="w-4 h-4 text-secondary" /></div>
                                                                    <span className="font-bold text-gray-700">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Expert Instructor</h3>
                                                        <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                                                                {selectedCourse.teacher[0]}
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-gray-900 leading-none mb-1">{selectedCourse.teacher}</p>
                                                                <p className="text-xs font-bold text-primary uppercase tracking-widest">{selectedCourse.teacherRole}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-10 border-t border-gray-100">
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Pricing Plan</p>
                                                        <p className="text-3xl font-black text-gray-900">{selectedCourse.price} <span className="text-sm font-medium text-gray-400">/month</span></p>
                                                    </div>
                                                    <button
                                                        onClick={() => navigate('/inquiry')}
                                                        className="bg-primary text-white px-10 py-4 rounded-2xl font-black hover:shadow-xl hover:-translate-y-1 transition-all"
                                                    >
                                                        Start Enrollment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
