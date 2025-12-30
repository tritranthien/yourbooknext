import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { format, parseISO } from 'date-fns'
import { SerVerNovel } from '../../interface/_Novel'
import BookCover3D from '../BookCover3D'

interface CardProps {
  novel: SerVerNovel
}

const QidianListItem: React.FC<CardProps> = ({ novel }: CardProps) => {
  return (
    <div className="group relative py-4 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors px-4 -mx-4 rounded-xl">
        <div className="flex gap-4">
            {/* Book Cover */}
            <div className="shrink-0 w-[90px] md:w-[110px] transition-all">
                <Link legacyBehavior href={`/truyen/${novel.slug}`} passHref>
                    <a className="block relative aspect-[2/3] overflow-hidden rounded-md">
                        <BookCover3D 
                            src={novel.image} 
                            alt={novel.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                         {novel.chapCount > 0 && (
                            <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                {novel.chapCount}
                            </div>
                        )}
                    </a>
                </Link>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col pt-0.5">
                 <div className="flex justify-between items-start mb-1">
                    <Link legacyBehavior href={`/truyen/${novel.slug}`} passHref>
                        <a className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            <h3 className="text-base md:text-lg font-black text-slate-800 dark:text-slate-100 mb-0.5 line-clamp-1">{novel.title}</h3>
                        </a>
                    </Link>
                 </div>

                 <div className="flex flex-col gap-1 mb-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 hover:text-primary-500 transition-colors cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            {novel.author?.name || 'Vô danh'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                         <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                             {novel?.category?.cate || 'Truyện'}
                         </span>
                         <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${novel.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                            {novel.status === 'completed' ? 'Hoàn thành' : 'Đang ra'}
                        </span>
                    </div>
                 </div>

                 <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2 leading-relaxed max-w-3xl">
                    {novel.description || 'Tác phẩm này chưa có mô tả...'}
                 </p>

                 <div className="mt-auto flex items-center justify-between border-t border-slate-50 dark:border-slate-800/50 pt-2">
                    <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400 dark:text-slate-600">
                         {novel.updatedAt && (
                             <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {format(parseISO(novel.updatedAt), 'dd/MM/yyyy')}
                             </span>
                         )}
                         <span className='hidden sm:inline-block'>•</span>
                         <span className="hidden sm:inline-block">{(novel.views || 0).toLocaleString()} lượt xem</span>
                    </div>

                    <div className="flex items-center gap-2">
                         <Link legacyBehavior href={`/truyen/${novel.slug}`} passHref>
                            <a className="text-[11px] font-bold text-primary-600 dark:text-primary-400 hover:underline">Chi tiết</a>
                         </Link>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  )
}

export default QidianListItem
