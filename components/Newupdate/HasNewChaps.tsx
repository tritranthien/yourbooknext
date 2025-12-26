import React from 'react';
import { format, parseISO } from 'date-fns';
import { Novel, SerVerNovel } from '../../interface/_Novel';
import Link from 'next/link';
import NovelTooltip from '../Tooltip/NovelTooltip';
interface HasNewChapsProps {
    hasnews: SerVerNovel[],
    newnovels: SerVerNovel[]
}
const HasNewChaps: React.FC<HasNewChapsProps> = ({ hasnews, newnovels }: HasNewChapsProps) => {
    return <div className='flex w-full flex-wrap md:flex-nowrap'>
        <div className="w-full md:w-3/4">
            <span className='text-primary-600 dark:text-primary-400 text-xl py-2 font-bold border-b-2 border-primary-200 dark:border-primary-900/50 w-full block'>Truyện mới cập nhật</span>

            <ul className="text-sm w-full">
                {
                    hasnews.map((item, index) => {
                        return <li key={index} className='text-gray-400 dark:text-slate-500 w-full flex items-center py-2.5 border-b border-slate-100 dark:border-slate-800/50 group h-10'>
                            <span className='first-letter:uppercase one-line-hidden w-20 flex-shrink-0 text-xs md:text-[13px] flex items-center'>
                                {item.category?.slug ? (
                                    <Link legacyBehavior passHref href={`/tonghop/${item.category.slug}`}><a className="hover:text-primary-500 transition-colors uppercase font-bold text-[11px] leading-none">{item.category.cate}</a></Link>
                                ) : (
                                    <span className="leading-none">{item.category?.cate || 'Chưa phân loại'}</span>
                                )}
                            </span>
                            <span className='capitalize text-gray-800 dark:text-slate-200 ml-3 flex-1 font-medium transition-all duration-200 flex items-center h-full'>
                                <NovelTooltip novel={item} className="w-full flex items-center h-full">
                                    <span className="one-line-hidden w-full block leading-none">
                                        <Link legacyBehavior passHref href={`/truyen/${item.slug}`}><a className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{item.title}</a></Link>
                                    </span>
                                </NovelTooltip>
                            </span>
                            <span className='text-xs w-[120px] ml-3 one-line-hidden flex-shrink-0 hidden md:flex items-center'>
                                {item.author?.slug ? (
                                    <Link legacyBehavior passHref href={`/tac-gia/${item.author.slug}`}><a className="leading-none">{item.author.name}</a></Link>
                                ) : (
                                    <span className="leading-none">{item.author?.name || 'Đang cập nhật'}</span>
                                )}
                            </span>
                            <span className='text-xs w-[80px] ml-3 one-line-hidden hidden md:flex items-center justify-end flex-shrink-0 text-right opacity-60'>
                                <Link legacyBehavior passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}>
                                    <a className="leading-none">{`${item.chapCount} Ch`}</a>
                                </Link>
                            </span>
                            <span className='text-xs w-[60px] ml-3 one-line-hidden hidden md:flex items-center justify-end flex-shrink-0 text-right opacity-40 leading-none'>
                                {format(parseISO(item.updatedAt), 'dd/MM')}
                            </span>
                        </li>
                    })
                }
            </ul>
        </div>
        <div className="w-full md:w-1/4 md:pl-6 mt-8 md:mt-0">
            <span className='text-primary-600 dark:text-primary-400 text-xl py-2 font-bold border-b-2 border-primary-200 dark:border-primary-900/50 w-full block'>Truyện mới</span>
            <ul className='text-sm tracking-tight leading-5 mt-2'>
                {
                    newnovels.map((item, index) => {
                        return <li className="w-full flex items-center py-2.5 px-2 border-b border-dashed border-slate-100 dark:border-slate-800 last:border-0 group h-10" key={index}>
                            <span className='flex-1 min-w-0 text-gray-800 dark:text-slate-200 font-medium h-full flex items-center'>
                                <NovelTooltip novel={item} className="w-full flex items-center h-full">
                                    <span className="one-line-hidden w-full block leading-none">
                                        <Link legacyBehavior passHref href={`/truyen/${item.slug}`}><a className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{item.title}</a></Link>
                                    </span>
                                </NovelTooltip>
                            </span>
                            <span className='w-20 flex-shrink-0 text-zinc-400 dark:text-slate-500 one-line-hidden text-right text-[12px] flex items-center justify-end'>
                                {item.category?.slug ? (
                                    <Link legacyBehavior passHref href={`/tonghop/${item.category.slug}`}><a className="leading-none">{item.category.cate}</a></Link>
                                ) : (
                                    <span className="leading-none">{item.category?.cate || 'Chưa phân loại'}</span>
                                )}
                            </span>
                        </li>
                    })
                }
            </ul>
        </div>

    </div>;
};

export default HasNewChaps;
