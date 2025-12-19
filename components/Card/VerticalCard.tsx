import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SerVerNovel } from '../../interface/_Novel'

interface CardProps{
    novel: SerVerNovel
}

const VerticalCard:React.FC<CardProps> = ({novel} :CardProps) => {
  return (
    <Link legacyBehavior href={`/truyen/${novel.slug}`} passHref><a>
      <div className="flex w-full px-2 py-4 md:p-4">
        <div className="lg:w-[150px] lg:h-[150px] relative">
          <Image layout='fill' objectFit='cover' alt={novel.title} src={novel.image} />
        </div>
        <div className="w-full lg:px-5">
          <span className="font-bold block text-neutral-500 w-full">{novel.title}</span>
          <span className="block text-orange-700 w-full">{novel.author.name}</span>
          <p className="w-full line-clamp-3 text-gray-500 text-sm">{novel.description}</p>
          <div className="flex text-sm text-white mt-2">
          <span className="py-1 px-3 bg-purple-500">{`Chương ${novel.chapCount}`}</span>
          <span className="py-1 px-3 bg-gray-500 ml-2">{novel.category.cate}</span>
          </div>
        </div>
      </div>
      </a></Link>
    
  )
}

export default VerticalCard