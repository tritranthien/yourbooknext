import React from 'react';
import { format, parseISO } from 'date-fns';
import { Novel, SerVerNovel } from '../../interface/_Novel';
import Link from 'next/link';
interface HasNewChapsProps{
    hasnews: SerVerNovel[],
    newnovels: SerVerNovel[]
}
const HasNewChaps:React.FC<HasNewChapsProps> = ({hasnews,newnovels}: HasNewChapsProps) => {
  return <div className='flex w-full'>
      <div className="w-3/4">
      <span className='text-sky-600 text-xl py-2 font-bold border-b-2 w-full block'>Truyện mới cập nhật</span>
      
      <ul className="text-sm w-full">
        {
            hasnews.map((item, index)=>{
                return <li key={index} className='text-gray-400 w-full flex justify-between items-center py-2 border-b-[1px]'> 
                    <span className='first-letter:uppercase one-line-hidden w-20'><Link passHref href={`/tonghop/${item.category.slug}`}><a>{item.category.cate}</a></Link></span>
                    <span className='capitalize text-gray-800 ml-3 min-w-[120px] one-line-hidden w-[calc(100%_-_400px)]'><Link passHref href={`/truyen/${item.slug}`}><a>{item.title}</a></Link></span>
                    <span className='text-xs w-[120px] ml-3 one-line-hidden'><Link passHref href={`/tac-gia/${item.author.slug}`}><a>{item.author.name}</a></Link></span>
                    <span className='text-xs w-[100px] ml-3 one-line-hidden'><Link passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}><a>{`Chương ${item.chapCount}`}</a></Link></span>
                    <span className='text-xs w-[100px] ml-3 one-line-hidden'>{format(parseISO(item.updatedAt),'yyyy-MM-dd')}</span>
                </li>
            })
        }
      </ul>
      </div>
        <div className="w-1/4 h-[500px]">
            <span className='text-sky-600 text-xl py-2 font-bold border-b-2 w-full block'>Truyện mới</span>
            <ul className='text-sm tracking-tight leading-5'>
                {
                    newnovels.map((item,index)=>{
                       return <li className="w-full flex flex-nowrap p-2 h-[37px]" key={index}>
                           <span className='w-3/4 text-gray-800 one-line-hidden'>
                               <Link passHref href={`/truyen/${item.slug}`}><a>{item.title}</a></Link>
                               
                            </span>
                           <span className='w-1/4 text-zinc-400 one-line-hidden'><Link passHref href={`/tonghop/${item.category.slug}`}><a>{item.category.cate}</a></Link></span>
                        </li>
                    })
                }
            </ul>
        </div>
    
</div>;
};

export default HasNewChaps;
