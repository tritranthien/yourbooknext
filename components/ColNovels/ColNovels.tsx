import Link from 'next/link';
import React from 'react';
import { SerVerNovel } from '../../interface/_Novel';
import BookCover3D from '../BookCover3D';
import NovelTooltip from '../Tooltip/NovelTooltip';

type ColNovelsProps = {
    Coltitle: string,
    Coldata: SerVerNovel[]
}


const ColNovels: React.FC<ColNovelsProps> = ({ Coltitle, Coldata }: ColNovelsProps) => {
    return <div className='w-full md:w-1/4 p-2'>
        <span className='text-primary-600 text-xl py-2 font-bold border-b-2 block w-full border-primary-100 mb-2'>{Coltitle}</span>
        <ul className="w-full list-none">
            {
                Coldata.map((item, index) => {
                    if (index === 0) {
                        return (
                            <li key={index} className="flex w-full mb-3 pb-3 border-b border-gray-100">
                                <div className="w-[70px] h-[100px] flex-shrink-0 mr-3 relative">
                                    <Link legacyBehavior passHref href={`/truyen/${item.slug}`}>
                                        <a>
                                            <BookCover3D src={item.image} alt={item.title} className="w-full h-full" />
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex-1 flex flex-col justify-start py-1 min-w-0">
                                    <span className="text-sm font-bold text-gray-800 hover:text-primary-600 transition-colors mb-1 block">
                                        <NovelTooltip novel={item} className="w-full">
                                            <div className="line-clamp-2">
                                                <Link legacyBehavior passHref href={`/truyen/${item.slug}`}><a>{item.title}</a></Link>
                                            </div>
                                        </NovelTooltip>
                                    </span>
                                    <span className="text-xs text-gray-400 mb-1 block">
                                        {item.author.name}
                                    </span>
                                    <span className="text-xs text-secondary-500 font-medium bg-gray-50 px-2 py-0.5 rounded w-fit">
                                        <Link legacyBehavior passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}>
                                            <a>{`C.${item.chapCount}`}</a>
                                        </Link>
                                    </span>
                                </div>
                            </li>
                        )
                    }
                    return <li key={index} className="flex py-1.5 w-full border-b border-dashed border-gray-100 last:border-0 items-baseline">
                        <span className={`w-[20px] flex-shrink-0 text-xs font-semibold ${index < 3 ? 'text-primary-500' : 'text-gray-400'}`}>{index + 1}</span>
                        <span className="flex-1 min-w-0 text-sm text-gray-700 hover:text-primary-600 transition-colors pr-2 block">
                            <NovelTooltip novel={item} className="w-full">
                                <div className="truncate">
                                    <Link legacyBehavior passHref href={`/truyen/${item.slug}`}><a>{item.title}</a></Link>
                                </div>
                            </NovelTooltip>
                        </span>

                        <span className="text-xs truncate text-gray-400 flex-shrink-0"><Link legacyBehavior passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}><a>{`C.${item.chapCount}`}</a></Link></span>
                    </li>
                })
            }
        </ul>
    </div>;
};

export default ColNovels;
