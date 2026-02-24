import React from 'react';
import { Clock, Users, PlayCircle, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CourseCard({
    title,
    description,
    duration,
    lessons,
    students,
    rating,
    image,
    price,
    category,
    level,
    popular
}) {
    return (
        <div className="relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-white/5 h-full border border-slate-100 dark:border-white/5 transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(14,165,164,0.15)] hover:-translate-y-4 group flex flex-col">
            <div className="h-72 overflow-hidden relative break-inside-avoid">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>

                {popular && (
                    <div className="absolute top-8 left-8 bg-secondary/90 text-white backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-1.5 border border-white/20">
                        <Star className="w-3 h-3 fill-white" /> POPULAR
                    </div>
                )}

                <div className="absolute top-8 right-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-2xl border border-white/20">
                    {category}
                </div>
            </div>

            <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-6 text-[10px] font-black uppercase tracking-widest text-slate-400 flex-wrap">
                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-secondary" /> {duration}</div>
                    <div className="flex items-center gap-1.5"><Users className="w-5 h-5 text-primary" /> {level}</div>
                    <div className="flex items-center gap-1.5"><PlayCircle className="w-4 h-4 text-primary" /> {lessons} Modules</div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors tracking-tighter uppercase line-clamp-2">
                    {title}
                </h3>

                <p className="text-slate-500 dark:text-gray-400 text-sm font-bold line-clamp-2 mb-8 leading-relaxed flex-1">
                    {description}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-white/5 mt-auto">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                        {price}
                        <span className="text-[10px] text-primary uppercase ml-1">/ mo</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-primary/40 group-hover:rotate-12">
                        <ArrowRight className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}
