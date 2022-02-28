import Image from 'next/image';
import React from 'react';
import { BsPersonFill, BsStackOverflow, BsWifi } from 'react-icons/bs';
import { RiFilePaperFill } from 'react-icons/ri';
import { FcLike } from 'react-icons/fc';
import { AiFillStar, AiOutlineEye, AiOutlineStar } from 'react-icons/ai';
import { Author } from '../../interface/_Author';
import { Category } from '../../interface/_Category';
import { Novel } from '../../interface/_Novel';

interface TitlebannerProps{
  novel: Novel<Author,Category>
}

const Titlebanner: React.FC<TitlebannerProps> = ({novel}:TitlebannerProps) => {
  return <div className="w-full h-[450px] p-50px">
      <div className='w-full h-full bg-black mt-[-28px] relative'>
        <Image src='/images/tt4.jpg' className='absolute opacity-10 object-cover' layout='fill'/>
      <div className="absolute top-0 left-0 w-full h-full">
    <div className="container p-0 py-5 flex h-full justify-center items-center">
        <div className="w-[250px] h-[300px] relative">
            <Image src='/images/tt4.jpg' className='object-cover absolute' layout='fill'/>
        </div>
        <ul className="w-[calc(100%_-_250px)] h-[300px] px-10 text-slate-500">
          <li className='w-full capitalize font-bold text-slate-400 text-4xl'>{novel.title}</li>
          <li className="flex h-8 text-xl mt-4 items-center"><span><BsStackOverflow/></span><span className='ml-2'>{novel.category.cate}</span></li>
          <li className="flex h-8 text-xl mt-4 items-center"><span><BsPersonFill/></span><span className='ml-2'>{novel.author.name}</span></li>
          <li className="flex h-8 text-xl mt-4 items-center"><span><BsWifi/></span><span className='ml-2'>còn tiếp</span></li>
          <li className="flex h-8 text-xl mt-4 items-cente"><span><RiFilePaperFill/></span><span className='ml-2'>{`chương ${novel.chapCount}`}</span></li>
          <ul className='list-none text-yellow-500 flex items-center gap-x-1 text-xl mt-4'>
            <li><AiFillStar/></li>
            <li><AiFillStar/></li>
            <li><AiFillStar/></li>
            <li><AiFillStar/></li>
            <li><AiOutlineStar/></li>
          </ul>
          <ul className='flex list-none mt-4 text-xl gap-x-7'>
              <li className='flex items-center'><span><AiOutlineEye/></span><span>201k</span></li>
              <li className='flex items-center'><span><FcLike/></span><span>3k</span></li>
              <li className='flex items-center'><button className='px-2 py-1'>Theo dõi</button></li>
          </ul>
        </ul>
        
        
    </div>
</div>
  </div>

  </div>
};
export default Titlebanner;
