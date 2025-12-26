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
        <span className='text-primary-600 dark:text-primary-400 text-xl py-2 font-bold border-b-2 block w-full border-primary-100 dark:border-primary-900/50 mb-4 whitespace-nowrap'>{Coltitle}</span>
        <ul className="w-full list-none">
            {
                Coldata.map((item, index) => {
                    if (index === 0) {
                        return (
                            <li key={index} className="flex w-full mb-4 pb-4 border-b border-slate-100 dark:border-slate-800/50">
                                <div className="w-[70px] h-[100px] flex-shrink-0 mr-3 relative">
                                    <Link legacyBehavior passHref href={`/truyen/${item.slug}`}>
                                        <a>
                                            <BookCover3D src={item.image} alt={item.title} className="w-full h-full" />
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex-1 flex flex-col justify-start py-1 min-w-0">
                                    <span className="text-sm font-bold text-gray-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-2 block leading-snug">
                                        <NovelTooltip novel={item} className="w-full">
                                            <div className="line-clamp-2">
                                                <Link legacyBehavior passHref href={`/truyen/${item.slug}`}><a>{item.title}</a></Link>
                                            </div>
                                        </NovelTooltip>
                                    </span>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 mb-2 block truncate">
                                        {item.author?.name || 'Đang cập nhật'}
                                    </span>
                                    <span className="text-xs text-secondary-500 dark:text-secondary-400 font-medium bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded w-fit">
                                        <Link legacyBehavior passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}>
                                            <a>{`Chương ${item.chapCount}`}</a>
                                        </Link>
                                    </span>
                                </div>
                            </li>
                        )
                    }
                    return <li key={index} className="flex py-2 w-full border-b border-dashed border-slate-100 dark:border-slate-800/50 last:border-0 items-center group">
                        <span className={`w-[24px] flex-shrink-0 text-xs font-semibold ${index < 3 ? 'text-primary-500' : 'text-slate-300 dark:text-slate-600'}`}>{index + 1}</span>
                        <span className="flex-1 min-w-0 text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors pr-2 block">
                            <NovelTooltip novel={item} className="w-full">
                                <div className="truncate">
                                    <Link legacyBehavior passHref href={`/truyen/${item.slug}`}><a>{item.title}</a></Link>
                                </div>
                            </NovelTooltip>
                        </span>

                        <span className="text-[10px] uppercase font-bold text-slate-300 dark:text-slate-600 flex-shrink-0 group-hover:text-primary-400/50 transition-colors">
                            <Link legacyBehavior passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}>
                                <a>{`${item.chapCount}C`}</a>
                            </Link>
                        </span>
                    </li>
                })
            }
        </ul>
    </div>;
};

export default ColNovels;
