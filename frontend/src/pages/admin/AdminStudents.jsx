import { useState, useEffect } from 'react';
import api from '../../services/api';
import { MoreHorizontal } from 'lucide-react';

export default function AdminStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data } = await api.get('/auth/admin/users/?role=student');
                setStudents(data);
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
                <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
                <button className="btn-primary">Add Student</button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-100">
                <ul className="divide-y divide-gray-200">
                    {loading ? (
                        <li className="p-4 text-center text-gray-500">Loading students...</li>
                    ) : students.length === 0 ? (
                        <li className="p-4 text-center text-gray-500">No students found.</li>
                    ) : (
                        students.map((student) => (
                            <li key={student.id}>
                                <div className="block hover:bg-gray-50 px-4 py-4 sm:px-6 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold shadow-inner">
                                                {student.full_name.charAt(0)}
                                            </div>
                                            <div className="ml-4 flex flex-col">
                                                <p className="text-sm font-medium text-primary-600 truncate">{student.full_name}</p>
                                                <p className="text-sm text-gray-500">{student.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {student.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                            <span className="text-xs text-gray-400">Joined: {new Date(student.date_joined).toLocaleDateString()}</span>
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
