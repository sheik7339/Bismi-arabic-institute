import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { BookOpen, Video, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get('/courses/my-enrollments/');
                setEnrollments(data);
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 animate-slide-up">Student Dashboard</h1>
                <div className="text-sm text-gray-500">Assalamualaikum, {user?.full_name.split(' ')[0]}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Course Overview */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                        <BookOpen size={20} className="text-primary-600" /> My Current Courses
                    </h2>

                    {loading ? (
                        <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-200 text-center text-gray-500">
                            Loading courses...
                        </div>
                    ) : enrollments.length === 0 ? (
                        <div className="bg-emerald-50 p-6 rounded-xl border border-dashed border-emerald-200 text-center">
                            <p className="text-emerald-700 mb-4 font-medium">You haven't been assigned to a course yet.</p>
                            <Link to="/courses" className="btn-primary">Browse Courses</Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2">
                            {enrollments.map((env) => (
                                <div key={env.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-100 to-transparent rounded-bl-full z-0 opacity-50 transition-opacity group-hover:opacity-100"></div>
                                    <div className="relative z-10">
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">{env.course.title}</h3>
                                        <p className="text-sm text-gray-500 mb-4 h-10 overflow-hidden line-clamp-2">{env.course.description}</p>

                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-2 font-bold text-xs">
                                                {env.teacher_name ? env.teacher_name.charAt(0) : '?'}
                                            </div>
                                            <span>Teacher: <span className="font-medium text-gray-900">{env.teacher_name || 'Unassigned'}</span></span>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                {env.status}
                                            </span>
                                            <button className="text-xs font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-1 group-hover:underline">
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Upcoming Schedule Side Panel */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4 mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-indigo-600" /> Today's Schedule
                    </h2>

                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                        <Clock size={32} className="text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-4">You have no classes scheduled for today.</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"><Video size={16} className="text-blue-500" /> Quick Zoom Join</h3>
                        <button disabled className="w-full btn-outline opacity-50 cursor-not-allowed justify-between">
                            <span>Enter Class Room</span>
                            <span className="text-xs font-normal">Link unavailable</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
