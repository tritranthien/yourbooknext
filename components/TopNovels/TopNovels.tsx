import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Novel, SerVerNovel } from '../../interface/_Novel';
interface TopNovelsProps{
    novels: SerVerNovel[],
    title: string
}
const TopNovels: React.FC<TopNovelsProps> = ({novels,title}:TopNovelsProps) => {
  return <div className='w-full px-0'>
      <span className='text-sky-600 text-xl py-2 font-bold border-b-2 w-full block'>{title}</span>
      <div className="flex w-full gap-3 py-2">
        {
            novels.length > 0 && <div className="flex flex-col w-1/4 h-[336px] pt-2">
            <Image src={novels[0].image} width={300} height={192}/>
            <span className="text-xl line-clamp-2 px-2 py-1 font-medium text-gray-600 ">{novels[0].title}</span>
            <div className="flex w-full ">
                <span className="text-gray-500 text-xs px-2 mb-1">{novels[0].category.cate}</span>
                <span className="text-blue-500 text-xs px-2 mb-1">{`${novels[0].chapCount} chương`}</span>
            </div>
            <span className="text-orange-700 px-2 mb-1">{novels[0].author.name}</span>
            <p className="text-sm line-clamp-2 px-2 mb-4">{novels[0].description}</p>
        </div>
        }
        <div className="flex w-3/4 flex-wrap">
            {
                novels.map((item,index)=>{
                    if(index == 0){
                        return
                    }
                    return <div className='w-1/3 h-1/3 p-2 flex items-center' key={index}>
                        <div className="flex w-full">
                           
                            <div className="w-[80px] h-[90px] relative">
                                <Link passHref href={`/truyen/${item.slug}`}>
                                    <a>
                                        <Image src = {item.image} className='absolute object-cover' layout='fill'/>
                                    </a>
                                </Link>
                            </div>
                            <div className="w-[calc(100%_-_80px)] mx-2">
                                
                                <span className="w-full line-clamp-2 text-base h-12 font-medium text-gray-600">
                                    <Link passHref href={`/truyen/${item.slug}`}>
                                        <a>
                                            {item.title}
                                        </a>
                                    </Link>
                                </span>
                                <span className="w-full text-sm text-orange-700">{item.author.name}</span>
                                <div className="flex w-full justify-between text-xs ">
                                    <span className="text-gray-500">{item.category.cate}</span>
                                    <span className="text-blue-500">
                                        <Link passHref href={ item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}>
                                            <a>
                                                {`${item.chapCount} chương`}
                                            </a>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                    </div>
                })
            }
        </div>
      </div>
  </div>;
};

export default TopNovels;
