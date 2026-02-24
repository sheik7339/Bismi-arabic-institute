import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle, ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://bismi-arabic-institute.onrender.com';
            const baseUrl = rawBaseUrl.replace(/\/$/, '');
            const url = `${baseUrl}/api/auth/register/`;
            console.log("Attempting signup at:", url);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password,
                    password_confirm: formData.confirmPassword
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Signup server error:", response.status, text);
                let errorMessage = 'Signup failed';
                try {
                    const errorData = JSON.parse(text);
                    errorMessage = errorData.detail || Object.values(errorData)[0] || errorMessage;
                } catch (e) {
                    errorMessage = `Server Error ${response.status}: (See console)`;
                }
                throw new Error(errorMessage);
            }

            setIsSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const { login } = useAuth();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const reqUser = {
                email: user.email,
                full_name: user.displayName || user.email.split('@')[0],
                profile_photo: user.photoURL
            };

            // Attempt to sync with backend
            try {
                const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://bismi-arabic-institute.onrender.com';
                const baseUrl = rawBaseUrl.replace(/\/$/, '');
                const url = `${baseUrl}/api/auth/google/`;
                console.log("Attempting Google sync (signup) at:", url);
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reqUser)
                });
                if (res.ok) {
                    const data = await res.json();
                    login(data.user || reqUser, { access: data.access, refresh: data.refresh });
                } else {
                    login(reqUser, { access: 'google_dummy_access', refresh: 'google_dummy_refresh' });
                }
            } catch (err) {
                login(reqUser, { access: 'google_dummy_access', refresh: 'google_dummy_refresh' });
            }
            navigate('/');
        } catch (err) {
            setError("Google sign-in failed or was cancelled.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
            {/* Background Orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] opacity-60"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm w-full relative z-10 px-4 sm:px-0">
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-xl mb-8 group hover:-translate-y-1 transition-all">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-gray-400">Bismi Academy</span>
                    </Link>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                        {isSuccess ? 'Welcome Aboard!' : 'Start Your Journey'}
                    </h2>
                    <p className="text-sm font-bold text-slate-500 dark:text-gray-400">
                        {isSuccess ? 'Your account has been created successfully.' : 'Join 2,500+ students mastering the Quranic language.'}
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm w-full px-4 sm:px-0 relative z-10">
                <div className="bg-white dark:bg-slate-900/50 backdrop-blur-2xl py-8 px-6 shadow-2xl shadow-slate-200/50 dark:shadow-none sm:rounded-[2.5rem] sm:px-8 border border-white dark:border-white/5">
                    {isSuccess ? (
                        <div className="text-center py-12 animate-reveal">
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                            </div>
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">Mubarak!</h3>
                            <p className="text-slate-500 dark:text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-12">Your sacred journey has begun. Redirecting to access portal...</p>
                            <Link to="/login" className="px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">Go to Portal Now</Link>
                        </div>
                    ) : (
                        <>
                            <form className="space-y-6" onSubmit={handleSignup}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-2 ml-1">First name</label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-2xl border-0 py-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-primary sm:text-sm px-5 bg-slate-50/50 dark:bg-white/5 transition-all outline-none"
                                            placeholder="Omar"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-2 ml-1">Last name</label>
                                        <input
                                            name="lastName"
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-2xl border-0 py-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-primary sm:text-sm px-5 bg-slate-50/50 dark:bg-white/5 transition-all outline-none"
                                            placeholder="Farooq"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-2 ml-1">Email address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-2xl border-0 py-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-primary sm:text-sm px-5 bg-slate-50/50 dark:bg-white/5 transition-all outline-none"
                                        placeholder="omar@example.com"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-2 ml-1">Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-2xl border-0 py-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-primary sm:text-sm px-5 bg-slate-50/50 dark:bg-white/5 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-2 ml-1">Confirm</label>
                                        <input
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-2xl border-0 py-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 focus:ring-2 focus:ring-primary sm:text-sm px-5 bg-slate-50/50 dark:bg-white/5 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="rounded-2xl bg-red-500/10 p-4 border border-red-500/20 flex items-start gap-3 animate-reveal">
                                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                        <p className="text-[10px] text-red-600 dark:text-red-400 font-black uppercase tracking-widest leading-relaxed">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary/95 px-4 py-5 text-sm font-black text-white shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all group border-b-4 border-teal-800 active:border-b-0 active:translate-y-1"
                                >
                                    {isLoading ? 'Creating account...' : 'Create account'}
                                    {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>

                            <div className="mt-10">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-white/5" /></div>
                                    <div className="relative flex justify-center text-[10px]">
                                        <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-black uppercase tracking-[0.3em]">Or secure join</span>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white dark:bg-white/5 px-4 py-4 text-xs font-black text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5 uppercase tracking-widest border border-slate-100 dark:border-white/5"
                                    >
                                        <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                        Google OIDC Login
                                    </button>
                                </div>
                            </div>

                            <p className="mt-10 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Already a member?{' '}
                                <Link to="/login" className="text-secondary hover:text-primary transition-colors">
                                    Sign in instead
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
