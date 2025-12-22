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
            <div className="absolute left-1/2 bottom-[calc(100%+10px)] w-[320px] -translate-x-1/4 md:-translate-x-1/2 opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible transition-all duration-300 z-[100] bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100 p-4 pointer-events-none transform origin-bottom scale-95 md:group-hover:scale-100">

                <div className="flex gap-4">
                    {/* Small 3D Cover */}
                    <div className="w-[80px] h-[120px] flex-shrink-0 shadow-sm">
                        <BookCover3D src={novel.image} alt={novel.title} className="w-full h-full" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col">
                        <h4 className="font-bold text-gray-800 text-base leading-tight mb-1 line-clamp-2">{novel.title}</h4>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-primary-500 text-xs font-semibold flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                {novel.author.name}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                            <span className="text-[10px] uppercase font-bold tracking-wide bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm">{novel.category.cate}</span>
                            <span className="text-[10px] font-bold bg-primary-50 text-primary-600 px-2 py-0.5 rounded-sm">{itemStat(novel.chapCount)} chương</span>
                        </div>

                        <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">{novel.description}</p>
                    </div>
                </div>

                {/* Arrow */}
                <div className="absolute left-1/4 md:left-1/2 bottom-[-6px] w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45 -translate-x-1/2"></div>
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
