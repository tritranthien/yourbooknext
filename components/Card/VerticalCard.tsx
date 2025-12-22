import Link from 'next/link'
import React from 'react'
import { SerVerNovel } from '../../interface/_Novel'
import BookCover3D from '../BookCover3D'

interface CardProps {
  novel: SerVerNovel
}

const VerticalCard: React.FC<CardProps> = ({ novel }: CardProps) => {
  return (
    <Link legacyBehavior href={`/truyen/${novel.slug}`} passHref><a>
      <div className="flex w-full px-2 py-4 md:p-4 group hover:bg-gray-50/50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
        <div className="flex-shrink-0 w-[100px] h-[150px] lg:w-[120px] lg:h-[180px] relative mb-2 md:mb-0">
          <BookCover3D alt={novel.title} src={novel.image} className='w-full h-full' />
        </div>
        <div className="flex-1 w-full pl-3 lg:px-5 flex flex-col">
          <span className="font-bold text-lg text-gray-800 w-full group-hover:text-primary-600 transition-colors mb-1 line-clamp-2">{novel.title}</span>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-secondary-600 font-medium text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {novel.author.name}
            </span>
          </div>

          <p className="w-full line-clamp-3 text-gray-500 text-sm leading-relaxed mb-auto">{novel.description}</p>

          <div className="flex text-xs font-semibold text-white mt-3 gap-2">
            <span className="py-1 px-3 bg-primary-500 rounded-full shadow-sm">{`Chương ${novel.chapCount}`}</span>
            <span className="py-1 px-3 bg-gray-500 rounded-full shadow-sm opacity-80">{novel.category.cate}</span>
          </div>
        </div>
      </div>
    </a></Link>

  )
}

export default VerticalCard