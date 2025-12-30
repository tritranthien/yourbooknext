import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { SerVerNovel } from '../../interface/_Novel'
import BookCover3D from '../BookCover3D'

interface CardProps {
  novel: SerVerNovel
}

const VerticalCard: React.FC<CardProps> = ({ novel }: CardProps) => {
  return (
    <Link legacyBehavior href={`/truyen/${novel.slug}`} passHref>
      <a className="block group">
        <div className="flex w-full gap-3 md:gap-5 p-3 md:p-4 mb-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 dark:hover:border-primary-500/30 shadow-sm hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300">
          <div className="flex-shrink-0 w-24 h-36 lg:w-28 lg:h-40 relative">
            <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <BookCover3D alt={novel.title} src={novel.image} className='w-full h-full relative z-10' />
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-1.5">
               <span className="inline-block px-2 py-0.5 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-primary-100/30 dark:border-primary-800/20 mb-2">
                  {novel?.category?.cate || 'Truyện'}
               </span>
               <h3 className="font-bold text-base md:text-lg text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1 leading-tight">
                  {novel.title}
               </h3>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {novel.author?.name || 'Vô danh'}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700"></span>
              <span className="text-secondary-500 dark:text-secondary-400 font-extrabold text-[9px] uppercase tracking-widest leading-none bg-secondary-50 dark:bg-secondary-900/20 px-1.5 py-0.5 rounded">
                 {`${novel.chapCount} Ch.`}
              </span>
            </div>

            <p className="line-clamp-2 text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-3 italic font-medium">
              {novel.description || 'Chưa có mô tả cho tác phẩm này...'}
            </p>

            <div className="flex items-center gap-2 mt-auto">
               <div className="flex -space-x-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full border border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                       <Image src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="user" width={20} height={20} unoptimized className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
               <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Đang đọc</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default VerticalCard