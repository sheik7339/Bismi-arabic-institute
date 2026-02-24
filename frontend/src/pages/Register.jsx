import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirm: '',
        preferred_time_slot: 'morning'
    });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
                <div>
                    <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-lg bg-primary-600 text-white flex items-center justify-center">
                            <BookOpen size={28} />
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            name="full_name"
                            type="text"
                            required
                            className="mt-1 input-field"
                            value={formData.full_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="mt-1 input-field"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            name="phone"
                            type="tel"
                            required
                            className="mt-1 input-field"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preferred Time Slot</label>
                        <select
                            name="preferred_time_slot"
                            className="mt-1 input-field"
                            value={formData.preferred_time_slot}
                            onChange={handleChange}
                        >
                            <option value="morning">Morning (6AM - 12PM)</option>
                            <option value="evening">Evening (12PM - 6PM)</option>
                            <option value="night">Night (6PM - 10PM)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="mt-1 input-field"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            name="password_confirm"
                            type="password"
                            required
                            className="mt-1 input-field"
                            value={formData.password_confirm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm">
                            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                                Already have an account? Log in
                            </Link>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 text-base"
                        >
                            {loading ? 'Creating account...' : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
