import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Users, GraduationCap, Clock, Calendar, Video } from 'lucide-react';

export default function TeacherDashboard() {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get('/auth/teacher/profile/');
                setProfileData(data);
            } catch (err) {
                console.error('Failed to fetch profile', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
    }

    const statCards = [
        { name: 'Total Students', value: profileData?.total_students || 0, icon: Users, color: 'bg-emerald-500' },
        { name: 'Earnings (MTD)', value: `₹${profileData?.total_earnings || 0}`, icon: GraduationCap, color: 'bg-indigo-500' },
        { name: 'Hours Taught', value: '45', icon: Clock, color: 'bg-primary-500' }, // mock data
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 animate-slide-up">Teacher Dashboard</h1>
                <div className="text-sm text-gray-500">Welcome back, {user?.full_name}</div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`p-3 rounded-md ${item.color} text-white shadow-md`}>
                                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd className="text-2xl font-bold text-gray-900">{item.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {/* Upcoming Classes */}
                <div className="bg-white shadow rounded-lg p-6 border border-gray-100 relative h-full flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-primary-600" /> Upcoming Schedules
                    </h3>
                    <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6">
                        <p className="text-gray-500 text-center">No classes scheduled for today.</p>
                    </div>
                </div>

                {/* Meeting Links */}
                <div className="bg-white shadow rounded-lg p-6 border border-gray-100 h-full flex flex-col relative">
                    <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                        <Video size={20} className="text-indigo-600" /> Quick Zoom Access
                    </h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Your Personal Meeting Room</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input type="text" readOnly value={profileData?.zoom_personal_link || 'Not set'} className="input-field rounded-r-none border-r-0 bg-gray-50 text-gray-500" />
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 border-l-0 rounded-r-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Copy
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button className="btn-primary w-full justify-center">Schedule New Class</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
