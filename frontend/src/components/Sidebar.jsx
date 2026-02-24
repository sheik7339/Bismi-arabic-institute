import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Home, Users, BookOpen, Calendar, CreditCard,
    Settings, UserCheck, Video, LayoutDashboard
} from 'lucide-react';

const Sidebar = ({ role }) => {
    const { pathname } = useLocation();
    const { user } = useAuth();

    const getLinks = () => {
        switch (role) {
            case 'admin':
                return [
                    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
                    { name: 'Students', path: '/admin/students', icon: Users },
                    { name: 'Teachers', path: '/admin/teachers', icon: UserCheck },
                    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
                    { name: 'Schedules', path: '/admin/schedules', icon: Calendar },
                    { name: 'Finances', path: '/admin/payments', icon: CreditCard },
                    { name: 'Zoom Meetings', path: '/admin/zoom', icon: Video },
                ];
            case 'teacher':
                return [
                    { name: 'Dashboard', path: '/teacher', icon: LayoutDashboard },
                    { name: 'My Students', path: '/teacher/students', icon: Users },
                    { name: 'Schedules', path: '/teacher/schedule', icon: Calendar },
                    { name: 'Zoom Meetings', path: '/teacher/zoom', icon: Video },
                    { name: 'Profile', path: '/teacher/profile', icon: Settings },
                ];
            case 'student':
                return [
                    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
                    { name: 'My Courses', path: '/student/courses', icon: BookOpen },
                    { name: 'Schedule & Zoom', path: '/student/schedule', icon: Calendar },
                    { name: 'Subscription', path: '/student/subscription', icon: CreditCard },
                    { name: 'Profile', path: '/student/profile', icon: Settings },
                ];
            default:
                return [];
        }
    };

    const links = getLinks();

    return (
        <div className="hidden md:flex flex-col w-64 bg-dark-900 border-r border-gray-200 h-full">
            {/* Brand logo space in the unified dashboard layout */}
            <div className="h-16 flex items-center justify-center border-b border-dark-800 bg-dark-950">
                <Link to="/" className="text-white font-bold text-xl flex items-center gap-2">
                    <BookOpen className="text-primary-500" size={24} />
                    Amma Matharasa
                </Link>
            </div>

            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto w-full">
                {/* User Card */}
                <div className="flex items-center px-4 mb-6 relative">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-700 flex items-center justify-center text-white overflow-hidden shadow-inner">
                        {user?.profile_photo ? (
                            <img src={user.profile_photo} alt="" className="object-cover w-full h-full" />
                        ) : (
                            <span className="font-semibold text-sm">{user?.full_name?.charAt(0) || 'U'}</span>
                        )}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white break-all">{user?.full_name}</p>
                        <p className="text-xs font-medium text-gray-400 capitalize bg-dark-800 inline-block px-2 py-0.5 rounded-full mt-1">{role} Account</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-2 w-full px-2 space-y-1 bg-dark-900">
                    {links.map((link) => {
                        const Icon = link.icon;
                        // Simple active check
                        const isActive = pathname === link.path || (link.path !== `/${role}` && pathname.startsWith(link.path));

                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`${isActive
                                        ? 'bg-primary-600 text-white shadow-sm'
                                        : 'text-gray-300 hover:bg-dark-800 hover:text-white transition-colors'
                                    } group flex items-center px-3 py-2.5 text-sm font-medium rounded-md`}
                            >
                                <Icon
                                    className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                                        } flex-shrink-0 -ml-1 mr-3 h-5 w-5`}
                                    aria-hidden="true"
                                />
                                <span className="truncate">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Sidebar footer (e.g., support) */}
            <div className="flex-shrink-0 flex border-t border-dark-800 p-4">
                <a href="mailto:support@ammamatharasa.com" className="flex-shrink-0 w-full group block">
                    <div className="flex items-center">
                        <div className="ml-3">
                            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-300">
                                Need help? Contact support
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
