import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function Profile({ role }) {
    const { user, checkAuth } = useAuth();
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.full_name || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.patch('/auth/me/', formData);
            toast.success('Profile updated successfully');
            await checkAuth(); // Refresh user data in context
        } catch (err) {
            toast.error('Failed to update profile');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Password Update State
    const [passwords, setPasswords] = useState({
        old_password: '',
        new_password: '',
        new_password_confirm: ''
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            if (passwords.new_password !== passwords.new_password_confirm) {
                toast.error('New passwords do not match');
                return;
            }
            await api.post('/auth/change-password/', passwords);
            toast.success('Password changed successfully');
            setPasswords({ old_password: '', new_password: '', new_password_confirm: '' });
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to change password');
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div className="pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">Account Profile</h1>
                <p className="mt-1 text-sm text-gray-500">Manage your profile details and security settings.</p>
            </div>

            <div className="bg-white shadow rounded-lg border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    name="full_name"
                                    type="text"
                                    className="mt-1 input-field"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    disabled
                                    className="mt-1 input-field bg-gray-50 text-gray-500 cursor-not-allowed"
                                    value={user?.email || ''}
                                />
                                <p className="mt-1 text-xs text-gray-400">Email cannot be changed directly.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    className="mt-1 input-field"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Account Type</label>
                                <input
                                    type="text"
                                    disabled
                                    className="mt-1 flex-1 block w-full rounded-md sm:text-sm border-gray-300 bg-gray-50 px-3 py-2 border shadow-sm capitalize text-gray-500 cursor-not-allowed"
                                    value={role}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-50">
                            <button type="submit" disabled={loading} className="btn-primary">
                                {loading ? 'Saving...' : 'Save Profile Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Password Change Section */}
            <div className="bg-white shadow rounded-lg border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-100">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
                </div>
                <div className="p-6 md:p-8">
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 max-w-md">
                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                <input
                                    type="password"
                                    required
                                    className="mt-1 input-field"
                                    value={passwords.old_password}
                                    onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    required
                                    className="mt-1 input-field"
                                    value={passwords.new_password}
                                    onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    className="mt-1 input-field"
                                    value={passwords.new_password_confirm}
                                    onChange={(e) => setPasswords({ ...passwords, new_password_confirm: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-50">
                            <button type="submit" className="btn-secondary">Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
