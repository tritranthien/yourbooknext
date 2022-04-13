import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { MdEditNote } from 'react-icons/md'
import { Author } from '../../interface/_Author'
import { Category } from '../../interface/_Category'
import { Novel, SerVerNovel } from '../../interface/_Novel'
import EditNovelPopup from '../popup/EditNovelPopup'

interface CardProps{
    novel: SerVerNovel
}

const UserBookCard:React.FC<CardProps> = ({novel} :CardProps) => {
  return (
    <Link href={`/truyen/${novel.slug}`} passHref><a>
      <div className="w-full bg-white rounded-md h-full p-[10px] shadow-lg cursor-pointer relative">
        <div className="w-full h-[200px] relative rounded-md overflow-hidden">
            <Image src={novel.image} className="object-cover" layout="fill"/>
            
        </div>
        <span className="font-bold text-orange-900 p-1 first-letter:uppercase line-clamp-2">{novel.title}</span>
        <span className="text-gray-500 truncate px-1 first-letter:uppercase line-clamp-2">{novel.author.name}</span>
        <div className="flex justify-between text-xs">
            <span className="p-1 text-violet-600 ">{novel.category.cate}</span>
            <span className="p-1 bg-blue-500 text-white rounded-sm">{`${novel.chapCount} chương`}</span>
        </div>
        
    </div>
      </a></Link>
    
  )
}

export default UserBookCard