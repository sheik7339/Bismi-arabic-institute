import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Settings, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MobileBottomNav() {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    
    // Don't show on auth pages
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/courses', icon: BookOpen, label: 'Courses' },
        ...(isAuthenticated 
            ? [{ path: '/settings', icon: Settings, label: 'Settings' }]
            : [{ path: '/login', icon: User, label: 'Log In' }]
        )
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-slate-200 dark:border-white/5 z-40 pb-safe">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link 
                            key={item.path} 
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${active ? 'text-primary' : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200'}`}
                        >
                            <Icon className={`w-5 h-5 ${active ? 'fill-primary/20 bg-primary/10 rounded-full p-0.5' : ''}`} />
                            <span className={`text-[9px] font-black uppercase tracking-wider ${active ? 'text-primary' : ''}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
