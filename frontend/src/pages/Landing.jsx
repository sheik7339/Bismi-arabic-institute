import { Link } from 'react-router-dom';
import { BookOpen, Users, Video, Calendar, Star, CheckCircle } from 'lucide-react';

export default function Landing() {
    const features = [
        { name: 'Live Zoom Classes', description: 'Interactive learning with Alimahs via clear, high-quality video sessions.', icon: Video },
        { name: 'Flexible Schedules', description: 'Morning, Evening, or Night. Learn at the time that suits you best.', icon: Calendar },
        { name: 'Expert Teachers', description: 'Certified and experienced teachers dedicated to your spiritual growth.', icon: Users },
        { name: 'Comprehensive Curriculum', description: 'From Arabic basics to advanced Quranic Tajweed.', icon: BookOpen },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-primary-50 pt-16 pb-32">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-arabic leading-tight">
                            <span className="block xl:inline">Learn Arabic & Quran</span>{' '}
                            <span className="block text-primary-600 xl:inline mt-2">from the Comfort of Your Home</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Join Amma Matharasa today. Get personal guidance from experienced Alimahs for just ₹500/month.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
                                    Start Learning Now
                                </Link>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <a href="#features" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                                    Explore Features
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-16 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl animate-slide-up">
                            A Better Way to Learn
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            We provide a structured, supportive, and spiritual environment tailored to our students' needs.
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature) => (
                                <div key={feature.name} className="pt-6">
                                    <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
                                        <div className="-mt-6">
                                            <div>
                                                <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                                                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                                            <p className="mt-5 text-base text-gray-500">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div id="pricing" className="bg-gray-50 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-xl text-gray-500">No hidden fees, cancel anytime.</p>
                </div>
                <div className="mt-12 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none hover:scale-105 transition-transform duration-300 w-full max-w-sm mx-auto xl:max-w-md">
                    <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900">Monthly Plan</h2>
                            <p className="mt-4 text-sm text-gray-500">All features included.</p>
                            <p className="mt-8">
                                <span className="text-5xl font-extrabold text-gray-900">₹500</span>
                                <span className="text-base font-medium text-gray-500">/mo</span>
                            </p>
                            <Link to="/register" className="mt-8 block w-full bg-primary-600 border border-transparent rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-primary-700">
                                Subscribe Now
                            </Link>
                        </div>
                        <div className="pt-6 pb-8 px-6">
                            <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                            <ul className="mt-6 space-y-4">
                                {['Live Zoom Classes', 'Access to Course Materials', 'Progress Tracking', 'Personalized Feedback'].map((feature) => (
                                    <li key={feature} className="flex space-x-3">
                                        <CheckCircle className="flex-shrink-0 h-5 w-5 text-emerald-500" aria-hidden="true" />
                                        <span className="text-sm text-gray-500">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-12">Trusted by Students Globally</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100">
                                <div className="flex text-gold-400 mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="currentColor" />)}
                                </div>
                                <p className="text-gray-600 italic mb-6">"Alhamdulillah, the teaching quality is exceptional. My Tajweed has improved significantly within just a few months."</p>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold">
                                        S{i}
                                    </div>
                                    <div className="ml-3 font-medium text-gray-900">Student {i}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
