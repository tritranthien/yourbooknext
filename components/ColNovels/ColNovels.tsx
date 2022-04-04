import Link from 'next/link';
import React from 'react';
import { SerVerNovel } from '../../interface/_Novel';
type ColNovelsProps = {
    Coltitle: string,
    Coldata: SerVerNovel[]
}


const ColNovels:React.FC<ColNovelsProps> = ({Coltitle,Coldata}: ColNovelsProps) => {
  return <div className='w-1/4 p-2'>
    <span className='text-sky-600 text-xl py-2 font-bold border-b-2 block w-full'>{Coltitle}</span>
    <ul className="w-full list-none">
        {
            Coldata.map((item,index)=>{
                return <li key={index} className="flex py-1 w-full">
                    <span className="w-[calc(100%_-_40px)] text-sm truncate text-gray-700">
                        <Link passHref href={`/truyen/${item.slug}`}><a>{item.title}</a></Link>
                    </span>
                    
                    <span className="w-[40px] text-xs truncate text-gray-400"><Link passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}><a>{`C.${item.chapCount}`}</a></Link></span>
                </li>
            })
        }
    </ul>
  </div>;
};

export default ColNovels;
