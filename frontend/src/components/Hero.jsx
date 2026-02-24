import { Link } from 'react-router-dom';
import { BookOpen, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
    const { isAuthenticated } = useAuth();
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 -tr-10 transform translate-x-1/2 -translate-y-1/2 rounded-full w-[800px] h-[800px] bg-primary/5 blur-3xl mix-blend-multiply opacity-70"></div>
                <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 rounded-full w-[600px] h-[600px] bg-secondary/5 blur-3xl mix-blend-multiply opacity-70"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20 shadow-sm shadow-primary/5">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span>Premium Online Islamic Education</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight mb-8 leading-tight">
                        Master Arabic with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Bismi Arabic Institute</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                        Join the most structured and comprehensive online platform to learn Arabic reading, writing, and comprehension, taught by expert instructors.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to={isAuthenticated ? "/inquiry" : "/login"} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1">
                            Start Learning Now
                            <BookOpen className="w-5 h-5" />
                        </Link>
                        <Link to="/courses" className="flex items-center justify-center gap-2 bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-300 px-8 py-4 rounded-xl text-lg font-bold transition-all">
                            View Courses
                        </Link>
                    </div>

                    <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 font-medium">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden bg-primary/20`}>
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-gray-900 font-bold">500+ Students</p>
                            <p>Already enrolled</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border border-gray-100 bg-white p-2">
                        <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-white to-secondary/10 rounded-2xl flex items-center justify-center border border-gray-50">
                            {/* Decorative image placeholder */}
                            <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20"></div>
                                <BookOpen className="w-32 h-32 text-primary/40" />
                            </div>
                        </div>
                    </div>
                    {/* Floating badge */}
                    <div className="absolute top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-4 animate-bounce">
                        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                            <Star className="w-6 h-6 text-accent fill-accent" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">4.9/5 Rating</p>
                            <p className="text-sm text-gray-500">From parents</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
