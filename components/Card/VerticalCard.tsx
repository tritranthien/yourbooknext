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
        <div className="flex w-full gap-4 md:gap-8 p-4 md:p-6 mb-4 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 dark:hover:border-primary-500/30 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300">
          <div className="flex-shrink-0 w-[100px] h-[150px] lg:w-[130px] lg:h-[190px] relative">
            <div className="absolute inset-0 bg-primary-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <BookCover3D alt={novel.title} src={novel.image} className='w-full h-full relative z-10' />
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="mb-2">
               <span className="inline-block px-2.5 py-1 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary-100/30 dark:border-primary-800/20 mb-3">
                  {novel.category.cate}
               </span>
               <h3 className="font-black text-xl text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight">
                  {novel.title}
               </h3>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {novel.author?.name || 'Vô danh'}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700"></span>
              <span className="text-secondary-500 dark:text-secondary-400 font-black text-[10px] uppercase tracking-widest leading-none bg-secondary-50 dark:bg-secondary-900/20 px-2 py-1 rounded-md">
                 {`${novel.chapCount} chương`}
              </span>
            </div>

            <p className="line-clamp-2 md:line-clamp-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 italic font-medium">
              {novel.description || 'Chưa có mô tả cho tác phẩm này...'}
            </p>

            <div className="flex items-center gap-2 mt-auto">
               <div className="flex -space-x-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                       <Image src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="user" width={24} height={24} unoptimized className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
               <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Đang đọc</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default VerticalCard