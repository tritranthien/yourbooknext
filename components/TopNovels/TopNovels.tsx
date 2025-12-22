import Link from 'next/link';
import React from 'react';
import { SerVerNovel } from '../../interface/_Novel';
import BookCover3D from '../BookCover3D';
import NovelTooltip from '../Tooltip/NovelTooltip';

interface TopNovelsProps {
    novels: SerVerNovel[],
    title: string
}
const TopNovels: React.FC<TopNovelsProps> = ({ novels, title }: TopNovelsProps) => {
    return <div className='w-full px-0'>
        <span className='text-primary-600 text-xl py-2 font-bold border-b-2 border-primary-200 w-full block'>{title}</span>
        <div className="flex flex-col md:flex-row w-full md:gap-1 lg:gap-3 py-2">
            {
                novels.length > 0 && <div className="flex flex-col md:w-1/3 pt-2">
                    <div className="relative w-[140px] h-[200px] mb-3 mx-auto md:mx-0">
                        <BookCover3D src={novels[0].image} alt={novels[0].title} className='w-full h-full' />
                    </div>
                    <span className="text-xl px-2 py-1 font-bold text-gray-800 hover:text-primary-600 transition-colors block">
                        <NovelTooltip novel={novels[0]} className="w-full">
                            <div className="line-clamp-2">
                                <Link legacyBehavior passHref href={`/truyen/${novels[0].slug}`}><a>{novels[0].title}</a></Link>
                            </div>
                        </NovelTooltip>
                    </span>
                    <div className="flex w-full mt-2">
                        <span className="text-gray-500 text-xs px-2 mb-1 border-r border-gray-300 pr-2">
                            {novels[0].category.cate}
                        </span>
                        <span className="text-secondary-600 text-xs px-2 mb-1">{`${novels[0].chapCount} chương`}</span>
                    </div>
                    {novels[0].author.slug ? (
                        <Link legacyBehavior passHref href={`/tac-gia/${novels[0].author.slug}`}>
                            <a className="text-secondary-500 hover:text-secondary-700 px-2 mb-1 block text-sm font-medium">{novels[0].author.name}</a>
                        </Link>
                    ) : (
                        <span className="text-secondary-500 px-2 mb-1 block text-sm font-medium">{novels[0].author.name}</span>
                    )}
                    <p className="text-sm text-gray-500 line-clamp-3 px-2 mb-4 leading-relaxed">{novels[0].description}</p>
                </div>
            }
            <div className="flex md:w-2/3 md:items-start flex-wrap content-start">
                {
                    novels.map((item, index) => {
                        if (index == 0) {
                            return
                        }
                        return <div className='md:w-1/2 lg:w-1/3 w-full p-2 flex items-center border-b md:border-none border-gray-100 py-3' key={index}>
                            <div className="flex w-full items-start">

                                <div className="w-[80px] h-[110px] relative flex-shrink-0">
                                    <Link legacyBehavior passHref href={`/truyen/${item.slug}`}>
                                        <a>
                                            <BookCover3D src={item.image} alt={item.title} className='w-full h-full' />
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex-1 w-0 mx-3 flex flex-col justify-between h-[110px] py-1">

                                    <span className="w-full text-sm font-bold text-gray-800 leading-tight mb-1 hover:text-primary-600 transition-colors block">
                                        <NovelTooltip novel={item} className="w-full">
                                            <div className="line-clamp-2">
                                                <Link legacyBehavior passHref href={`/truyen/${item.slug}`}>
                                                    <a>
                                                        {item.title}
                                                    </a>
                                                </Link>
                                            </div>
                                        </NovelTooltip>
                                    </span>

                                    <span className="w-full text-xs text-secondary-500 font-medium mb-1 truncate">
                                        {item.author.slug ? (
                                            <Link legacyBehavior passHref href={`/tac-gia/${item.author.slug}`}><a>{item.author.name}</a></Link>
                                        ) : (
                                            item.author.name
                                        )}
                                    </span>

                                    <div className="mt-auto flex flex-col gap-1">
                                        <span className="text-gray-400 text-xs truncate">
                                            {item.category.slug ? (
                                                <Link legacyBehavior passHref href={`/tonghop/${item.category.slug}`}><a>{item.category.cate}</a></Link>
                                            ) : (
                                                item.category.cate
                                            )}
                                        </span>
                                        <span className="text-primary-500 text-xs font-semibold">
                                            <Link legacyBehavior passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}>
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
