import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SerVerNovel } from '../../interface/_Novel'

interface CardProps{
    novel: SerVerNovel
}

const UserBookCard:React.FC<CardProps> = ({novel} :CardProps) => {
  return (
    <Link legacyBehavior href={`/truyen/${novel.slug}`} passHref><a>
      <div className="w-full bg-white rounded-md h-full flex flex-row md:flex-col py-1 md:p-[10px] md:shadow-lg cursor-pointer relative">
        <div className="w-[70px] md:w-full h-[105px] md:h-[200px] relative rounded-md overflow-hidden">
            <Image src={novel.image} alt={novel.title} className="object-cover" layout="fill"/>
            
        </div>
        <div className="w-[calc(100%_-_70px)] md:w-full pl-2 md:pl-0">
        <span className="font-bold text-orange-900 p-1 first-letter:uppercase line-clamp-2">{novel.title}</span>
        <span className="text-gray-500 truncate px-1 first-letter:uppercase line-clamp-2">{novel.author.name}</span>
        <div className="flex justify-between text-xs">
            <span className="p-1 text-violet-600 ">{novel.category.cate}</span>
            <span className="p-1 bg-blue-500 text-white rounded-sm">{`${novel.chapCount} chương`}</span>
        </div>
        </div>
        
    </div>
      </a></Link>
    
  )
}

export default UserBookCard