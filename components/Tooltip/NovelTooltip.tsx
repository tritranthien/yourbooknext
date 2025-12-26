import React from 'react';
import { SerVerNovel } from '../../interface/_Novel';
import BookCover3D from '../BookCover3D';

interface NovelTooltipProps {
    novel: SerVerNovel;
    children: React.ReactNode;
    className?: string;
}

const NovelTooltip: React.FC<NovelTooltipProps> = ({ novel, children, className = "" }) => {
    return (
        <div className={`group relative inline-block ${className}`}>
            {children}
            {/* Tooltip Content */}
            <div className="absolute left-1/2 bottom-[calc(100%+15px)] w-[340px] -translate-x-1/4 md:-translate-x-1/2 opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible transition-all duration-300 z-[100] bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800 p-5 pointer-events-none transform origin-bottom scale-95 md:group-hover:scale-100">

                <div className="flex gap-5">
                    {/* Small 3D Cover */}
                    <div className="w-[90px] h-[130px] flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 dark:group-hover:opacity-100 transition-opacity"></div>
                        <BookCover3D src={novel.image} alt={novel.title} className="w-full h-full relative z-10" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col">
                        <h4 className="font-bold text-slate-800 dark:text-white text-base leading-tight mb-2 line-clamp-2">{novel.title}</h4>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center">
                                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                {novel.author?.name || 'Đang cập nhật'}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-[10px] uppercase font-black tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-700/50">{novel.category?.cate || 'Truyện'}</span>
                            <span className="text-[10px] font-black tracking-widest bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2.5 py-1 rounded-lg border border-primary-200/20 dark:border-primary-800/20">{itemStat(novel.chapCount)} chương</span>
                        </div>

                        <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed font-medium">{novel.description}</p>
                    </div>
                </div>

                {/* Arrow */}
                <div className="absolute left-1/4 md:left-1/2 bottom-[-6px] w-3 h-3 bg-white dark:bg-slate-900 border-b border-r border-slate-100 dark:border-slate-800 transform rotate-45 -translate-x-1/2"></div>
            </div>
        </div>
    );
};

// Helper for stats
const itemStat = (num: number) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k"
    }
    return num
}

export default NovelTooltip;
