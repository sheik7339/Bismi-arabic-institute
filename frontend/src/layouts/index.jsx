import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 bg-gray-50 pt-16">
                <Outlet />
            </main>
            <footer className="bg-dark-900 border-t border-gray-100 py-8 text-center text-gray-500 text-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} Amma Matharasa. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export const DashboardLayout = ({ allowedRoles = [] }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to default dashboard if role is unauthorized for this route
        if (user.role === 'admin') return <Navigate to="/admin" replace />;
        if (user.role === 'teacher') return <Navigate to="/teacher" replace />;
        if (user.role === 'student') return <Navigate to="/student" replace />;
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar role={user.role} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar isDashboard={true} />
                <main className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="pb-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
