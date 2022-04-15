import Image from 'next/image';
import React from 'react';
import { SerVerNovel } from '../../interface/_Novel';
const Card: React.FC<{novel: SerVerNovel}> = ({novel}) => {
  return <div className='w-[280px] h-[350px] shadow-sm'>
    <div className='relative w-full h-2/5'>
    <Image className='w-full h-2/5' objectFit='cover' layout='fill' alt={novel.title} src={novel.image}/>
    </div>
      <span className="text-gray-800 font-bold text-lg p-5 w-full ">{novel.title}</span>
      <p>{novel.description}</p>
  </div>;
};

export default Card;
