import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Camera, Save, User as UserIcon, Mail, Phone, ShieldCheck, LogOut } from 'lucide-react';

export default function Settings() {
    const { user, isAuthenticated, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Form state mock
    const [formData, setFormData] = useState({
        fullName: user?.full_name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });
    const [avatar, setAvatar] = useState(user?.profile_photo || null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const placeholderImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'User')}&background=random&size=200`;
    const avatarSrc = avatar || placeholderImg;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Mocking file upload with local object URL
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveSuccess(false);

        // Making it "real" by permanently updating the React Context and localStorage
        setTimeout(() => {
            updateUser({
                full_name: formData.fullName,
                phone: formData.phone,
                profile_photo: avatar
            });
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="flex-1 bg-slate-50 dark:bg-slate-950 flex flex-col pt-8 pb-16 px-4 sm:px-6 relative overflow-hidden transition-colors duration-500">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-70"></div>
            </div>

            <div className="max-w-3xl mx-auto w-full relative z-10">
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">My Profile</h1>
                    <p className="text-slate-500 dark:text-gray-400 font-bold uppercase tracking-widest text-[10px]">Manage your personal information and preferences.</p>
                </div>

                <div className="bg-white dark:bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 overflow-hidden">
                    {/* Header Banner */}
                    <div className="h-32 bg-gradient-to-r from-primary to-emerald-500 w-full relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    <div className="px-8 pb-10 sm:px-12 relative">
                        {/* Avatar Section */}
                        <div className="relative -mt-16 mb-8 flex flex-col sm:flex-row sm:items-end gap-6">
                            <div className="relative inline-block group">
                                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800 overflow-hidden shadow-xl relative z-10">
                                    <img src={avatarSrc} alt="Profile Avatar" className="w-full h-full object-cover" />
                                </div>
                                <button
                                    onClick={handleAvatarClick}
                                    className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 hover:scale-110 transition-transform z-20"
                                    title="Change Photo"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            <div className="pb-2">
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">{formData.fullName || 'User'}</h2>
                                <p className="text-sm font-bold text-slate-500 dark:text-gray-400 mt-1">{formData.email}</p>
                            </div>
                        </div>

                        {/* Settings Form */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 ml-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <UserIcon className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-2xl border-0 py-4 pl-12 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-primary bg-slate-50 dark:bg-white/5 transition-all outline-none sm:text-sm font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 ml-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-2xl border-0 py-4 pl-12 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-primary bg-slate-50 dark:bg-white/5 transition-all outline-none sm:text-sm font-medium opacity-70 cursor-not-allowed"
                                            readOnly
                                            title="Email cannot be changed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 ml-1">WhatsApp / Phone</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+91 "
                                            className="block w-full rounded-2xl border-0 py-4 pl-12 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-primary bg-slate-50 dark:bg-white/5 transition-all outline-none sm:text-sm font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-white/5 mt-8">
                                <div className="flex items-center gap-2 text-slate-400 hidden sm:flex">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-[10px] uppercase font-black tracking-widest">Data Securely Preserved</span>
                                </div>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 border-b-4 border-teal-800 active:border-b-0"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                        {!isSaving && <Save className="w-4 h-4 ml-1" />}
                                    </button>
                                </div>
                            </div>

                            {saveSuccess && (
                                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 animate-reveal">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase tracking-widest">Profile updated successfully!</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
