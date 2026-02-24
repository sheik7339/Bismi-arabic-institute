import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, Twitter, MessageCircle, ArrowRight, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white relative overflow-hidden pt-24 pb-12">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link to="/" className="group inline-flex flex-col">
                            <span className="text-4xl font-black text-primary leading-tight tracking-tighter" style={{ fontFamily: 'Amiri, serif' }}>
                                بِسْمِ العربية
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="h-[2px] w-8 bg-secondary"></div>
                                <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
                                    Bismi Arabic Institute
                                </span>
                            </div>
                        </Link>
                        <p className="text-slate-300 text-lg leading-relaxed font-medium">
                            Empowering students globally with premium, live-interactive Islamic and Arabic education. Master the language of the Qur'an with experts.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: MessageCircle, href: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
                                >
                                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                Academy
                            </h3>
                            <ul className="space-y-5">
                                {[
                                    { name: "Home", path: "/" },
                                    { name: "Our Story", path: "/our-story" },
                                    { name: "All Courses", path: "/courses" },
                                    { name: "Pricing", path: "/pricing" }
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group">
                                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                Support
                            </h3>
                            <ul className="space-y-5">
                                {[
                                    { name: "Student Login", path: "/login" },
                                    { name: "Register Now", path: "/signup" },
                                    { name: "Placement Test", path: "/courses" },
                                    { name: "Privacy Policy", path: "#" }
                                ].map((link, i) => (
                                    <li key={i}>
                                        <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group">
                                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-4 bg-white/[0.03] border border-white/[0.05] rounded-[3rem] p-10">
                        <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Contact Support</h3>
                        <div className="space-y-8">
                            <div className="flex gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                                    <a href="mailto:nasrinbanu.709287@gmail.com" className="text-white font-black hover:text-primary transition-colors">nasrinbanu.709287@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Call/WhatsApp</p>
                                    <a href="tel:+917092873120" className="text-white font-black hover:text-secondary transition-colors">+91 7092873120</a>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Headquarters</p>
                                    <p className="text-white font-black">Tiruppur, India & Male, Maldives</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6 text-center">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                        &copy; 2026 Bismi Arabic Institute. Created for Excellence.
                    </p>
                    <div className="flex gap-10">
                        <a href="#" className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]">Terms of Service</a>
                        <a href="#" className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.2em]">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
