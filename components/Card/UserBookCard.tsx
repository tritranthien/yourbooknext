import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SerVerNovel } from '../../interface/_Novel'

interface CardProps {
    novel: SerVerNovel
}

const UserBookCard: React.FC<CardProps> = ({ novel }: CardProps) => {
    return (
        <Link legacyBehavior href={`/truyen/${novel.slug}`} passHref>
            <a className="block group h-full">
                <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_-5px_rgba(59,130,246,0.2)] hover:border-primary-500/50 transition-all duration-300 h-full flex flex-row md:flex-col p-1.5 md:p-2 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50">
                    {/* Thumbnail */}
                    <div className="relative w-16 md:w-full aspect-[3/4] rounded-lg overflow-hidden shrink-0 shadow-sm">
                        <Image 
                            src={novel.image || '/images/tt.jpg'} 
                            alt={novel.title} 
                            className="object-cover group-hover:scale-110 transition-transform duration-700" 
                            layout="fill"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-2 translate-y-2 group-hover:translate-y-0">
                             <span className="text-[10px] font-black text-white uppercase tracking-widest bg-primary-600/50 backdrop-blur-sm px-2 py-0.5 rounded-md">Đọc ngay</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pl-2.5 md:pl-0 md:mt-2 flex flex-col">
                        <h3 className="text-[11px] md:text-xs font-black text-slate-800 dark:text-slate-100 line-clamp-2 md:line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                            {novel.title}
                        </h3>
                        
                        <div className="mt-1 flex flex-col gap-0.5">
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate opacity-80">
                                {novel.author?.name || 'Vô danh'}
                            </span>
                            
                            <div className="mt-auto pt-1.5 flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase tracking-tighter text-indigo-600 dark:text-indigo-400">
                                    {novel?.category?.cate || 'Truyện'}
                                </span>
                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/80 dark:bg-slate-800/80 rounded-md border border-slate-100 dark:border-slate-700/50 shadow-inner">
                                    <span className="text-[9px] font-bold text-slate-700 dark:text-slate-300">
                                        {novel.chapCount} <span className="font-medium opacity-50 px-0.5">/</span>
                                    </span>
                                    <span className="text-[8px] font-medium text-slate-400 uppercase">Ch</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default UserBookCard