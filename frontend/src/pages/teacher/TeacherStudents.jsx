import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function TeacherStudents() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data } = await api.get('/courses/my-students/');
                setEnrollments(data);
            } catch (err) {
                console.error('Failed to fetch students', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-100">
                <ul className="divide-y divide-gray-200">
                    {loading ? (
                        <li className="p-4 text-center text-gray-500">Loading your students...</li>
                    ) : enrollments.length === 0 ? (
                        <li className="p-4 text-center text-gray-500">You currently have no assigned students.</li>
                    ) : (
                        enrollments.map((enrollment) => (
                            <li key={enrollment.id}>
                                <div className="block hover:bg-gray-50 px-4 py-4 sm:px-6 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold shadow-inner border border-indigo-200">
                                                {enrollment.student_name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">{enrollment.student_name}</p>
                                                <p className="text-sm text-gray-500">{enrollment.course_title}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
