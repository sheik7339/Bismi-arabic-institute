import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut, User as UserIcon, ChevronDown, Settings, CreditCard, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Theme setup and toggle
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') !== 'light';
        }
        return true;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Our Story', path: '/our-story' },
        { name: 'Courses', path: '/courses' },
        { name: 'Pricing', path: '/pricing' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 w-full bg-white dark:bg-slate-950 z-50 border-b border-slate-100 dark:border-white/5 transition-all duration-300 py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex flex-col items-center justify-center group">
                            <span className="text-2xl font-bold text-primary mb-0.5" style={{ fontFamily: 'Amiri, serif' }}>بِسْمِ العربية</span>
                            <span className="text-[10px] font-black tracking-[0.3em] text-slate-700 dark:text-gray-400 group-hover:text-primary transition-colors uppercase">Bismi Arabic Institute</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-bold transition-all duration-300 hover:text-primary relative group ${isActive(link.path) ? 'text-primary' : 'text-slate-700 dark:text-gray-300'}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-left ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Right Actions */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-6">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all hover:-translate-y-0.5 shadow-sm border border-slate-200 dark:border-white/10"
                            title="Toggle Theme"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                        </button>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-white/10 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform overflow-hidden">
                                        {user?.profile_photo ? (
                                            <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <UserIcon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="text-left hidden sm:block">
                                        <p className="text-xs font-black text-slate-900 dark:text-white leading-none mb-1 uppercase tracking-wider">
                                            {user?.full_name?.split(' ')[0] || 'User'}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">User Profile</p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-0"
                                            onClick={() => setIsProfileOpen(false)}
                                        ></div>
                                        <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-white/10 py-6 px-4 z-10 animate-in fade-in zoom-in-95 duration-200">
                                            <div className="px-4 mb-6">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 text-center">Active Session</p>
                                                <div className="p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-center">
                                                    <p className="text-sm font-black text-slate-900 dark:text-white truncate mb-1">{user?.full_name || 'User'}</p>
                                                    <p className="text-[10px] font-bold text-slate-500 truncate lowercase tracking-wide">{user?.email}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <Link
                                                    to="/settings"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-primary/5 text-slate-700 dark:text-gray-300 hover:text-primary transition-all group"
                                                >
                                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform border border-slate-200 dark:border-white/10">
                                                        <img
                                                            src={user?.profile_photo ? user.profile_photo : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'User')}&background=random&size=64`}
                                                            alt="avatar"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="text-xs font-black uppercase tracking-widest">Profile & Settings</span>
                                                </Link>

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-700 dark:text-gray-300 hover:text-red-600 transition-all group"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                                                        <LogOut className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className={`text-xs font-black uppercase tracking-widest transition-all px-5 py-2.5 rounded-xl ${isActive('/login') ? 'text-primary bg-primary/10' : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile toggle and menu button */}
                    <div className="flex items-center lg:hidden gap-4">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-white/5 active:scale-95 transition-transform"
                        >
                            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-white/5 shadow-xl absolute w-full pb-6 animate-in slide-in-from-top-2 duration-300 z-50">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-4 rounded-xl text-sm font-black uppercase tracking-[0.2em] transition-colors ${isActive(link.path) ? 'text-primary bg-primary/10' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-100 dark:border-white/5 px-4 flex flex-col space-y-3">
                        {isAuthenticated ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 px-4 py-4 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 mb-2">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-primary/20 overflow-hidden">
                                        {user?.profile_photo ? (
                                            <img src={user.profile_photo} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <UserIcon className="w-6 h-6" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-slate-900 dark:text-white truncate uppercase tracking-wider">{user?.full_name}</p>
                                        <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 truncate lowercase tracking-wide">{user?.email}</p>
                                    </div>
                                </div>

                                <Link
                                    to="/settings"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-left flex items-center gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-700 dark:text-gray-300 font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 transition-all"
                                >
                                    <Settings className="w-5 h-5 text-primary" />
                                    Profile & Settings
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left flex items-center gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-red-600 font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out Securely
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="text-center font-black uppercase tracking-widest text-[10px] py-4 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="text-center bg-primary text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-xl shadow-md"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
