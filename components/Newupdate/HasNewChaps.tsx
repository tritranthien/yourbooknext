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
                        return <li key={index} className='text-gray-400 dark:text-slate-500 w-full flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800/50'>
                            <span className='first-letter:uppercase one-line-hidden w-20'>
                                {item.category?.slug ? (
                                    <Link legacyBehavior passHref href={`/tonghop/${item.category.slug}`}><a>{item.category.cate}</a></Link>
                                ) : (
                                    item.category?.cate || 'Chưa phân loại'
                                )}
                            </span>
                            <span className='capitalize text-gray-800 dark:text-slate-200 ml-3 min-w-[120px] w-full md:w-[calc(100%_-_400px)] block font-medium'>
                                <NovelTooltip novel={item} className="w-full">
                                    <div className="one-line-hidden w-full">
                                        <Link legacyBehavior passHref href={`/truyen/${item.slug}`}><a className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{item.title}</a></Link>
                                    </div>
                                </NovelTooltip>
                            </span>
                            <span className='text-xs w-[120px] ml-3 one-line-hidden '>
                                {item.author?.slug ? (
                                    <Link legacyBehavior passHref href={`/tac-gia/${item.author.slug}`}><a>{item.author.name}</a></Link>
                                ) : (
                                    item.author?.name || 'Đang cập nhật'
                                )}
                            </span>
                            <span className='text-xs w-[100px] ml-3 one-line-hidden hidden md:block'><Link legacyBehavior passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}><a>{`Chương ${item.chapCount}`}</a></Link></span>
                            <span className='text-xs w-[100px] ml-3 one-line-hidden hidden md:block opacity-60'>{format(parseISO(item.updatedAt), 'yyyy-MM-dd')}</span>
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
                        return <li className="w-full flex flex-nowrap p-2 h-[41px] border-b border-dashed border-slate-100 dark:border-slate-800 last:border-0" key={index}>
                            <span className='w-3/4 text-gray-800 dark:text-slate-200 block font-medium'>
                                <NovelTooltip novel={item} className="w-full">
                                    <div className="one-line-hidden w-full">
                                        <Link legacyBehavior passHref href={`/truyen/${item.slug}`}><a className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{item.title}</a></Link>
                                    </div>
                                </NovelTooltip>
                            </span>
                            <span className='w-1/4 text-zinc-400 dark:text-slate-500 one-line-hidden text-right'>
                                {item.category?.slug ? (
                                    <Link legacyBehavior passHref href={`/tonghop/${item.category.slug}`}><a>{item.category.cate}</a></Link>
                                ) : (
                                    item.category?.cate || 'Chưa phân loại'
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
