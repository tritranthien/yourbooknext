import React from 'react';
import { Novel, SerVerNovel } from '../../interface/_Novel';
const Card: React.FC<{novel: SerVerNovel}> = ({novel}) => {
  return <div className='w-[280px] h-[350px] shadow-sm'>
      <img className='w-full h-2/5 object-cover' src={novel.image}/>
      <span className="text-gray-800 font-bold text-lg p-5 w-full ">{novel.title}</span>
      <p>{novel.description}</p>
  </div>;
};

export default Card;
