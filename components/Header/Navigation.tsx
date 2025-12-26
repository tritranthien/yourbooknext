import { debounce } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';
import { VscGitPullRequestClosed } from 'react-icons/vsc';
import { FiSearch } from 'react-icons/fi';
import { IoIosNotifications } from 'react-icons/io';
import { useQuery } from 'react-query';
import { useGetAllCates } from '../../customHooks/reactQuery/Categoris';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { Author } from '../../interface/_Author';
import { ServerNoti } from '../../interface/_Noti';
import { NovelSearch } from '../../interface/_Novel';
import { getMe, getNotis, readNotiInNav } from '../../libs/api/authAPI';
import { followeds, searchAll } from '../../libs/api/novelAPI';

const NavigationContent = () => {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [SearchList, setSearchList] = useState<(NovelSearch | Author)[]>([]);
    const [showNoti, setShowNoti] = useState(false);
    const [userId, setUserId] = useState('');
    const [NotiList, setNotiList] = useState<ServerNoti[]>([]);
    const [searchText, setSearch] = useState('');
    const [notRead, setNotRead] = useState(0);

    const { data, isSuccess, error, refetch } = useQuery(['checkLogin', userId], getMe, {
        enabled: false,
        onError: () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userInfo');
                localStorage.removeItem('jwtToken');
            }
        }
    });

    const debouncedSave = useCallback(
        debounce(async (nextValue: string) => {
            if (nextValue.length > 0) {
                const res = await searchAll(nextValue);
                setSearchList([...res]);
            } else {
                setSearchList([]);
            }
        }, 1000),
        [],
    );

    const ck = useQuery('followedFromUser', () => followeds(), {
        enabled: false,
    });

    const noti = useQuery('notification', getNotis, {
        enabled: false,
        onSuccess: data => {
            setNotiList([...data.notis]);
            if (data.count != notRead) {
                setNotRead(data.count);
            }
        }
    });

    const allCates = useGetAllCates();
    const asPath = router?.asPath || '';
    const blackbg = asPath.includes('lua-chon') || asPath.includes('tonghop') || asPath.includes('truyen');
    
    const listmap = ['truyện chữ', 'truyện tranh', 'truyện audio'];
    const listMenu = [
        { headding: 'truyện hot', slug: 'truyen-hot' },
        { headding: 'truyện mới', slug: 'moi-nhat' },
        { headding: 'truyện full', slug: 'hoan-thanh' }
    ];

    const turnToReaded = async () => {
        const listNotRead = NotiList.reduce((arr, crr) => {
            if (!crr.read) {
                arr.push(crr._id);
            }
            return arr;
        }, [] as string[]);

        try {
            const res = await readNotiInNav(listNotRead);
            if (res.success) {
                setNotRead(notRead - listNotRead.length);
            }
        } catch (error) {}
    }

    const searchNow = (text: string) => {
        setSearch(text);
        debouncedSave(text);
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('userInfo')) {
            const stringUser = localStorage.getItem('userInfo');
            if (stringUser != null) {
                const userData = JSON.parse(stringUser);
                setUserId(userData._id);
            }
        }
    }, [])

    useEffect(() => {
        if (userId && userId.length > 0) {
            refetch();
            ck.refetch();
            noti.refetch();
        }
    }, [userId, refetch, ck, noti])

    useEffect(() => {
        setOpenMenu(false);
    }, [asPath]);

    return (
        <>
            {
                !openMenu && <CgMenuGridO onClick={() => setOpenMenu(true)} className={`fixed top-1 left-1 z-[120] md:hidden opacity-60`} size={40} color="orange" />
            }
            <div className="w-full md:sticky z-30 md:block fixed max-h-screen overflow-x-hidden md:overflow-x-visible overflow-y-auto md:overflow-y-visible mb-6 md:mb-10">
                <div className={`container ${router.pathname == '/' ? 'md:flex md:flex-nowrap md:justify-between' : 'hidden'} mx-auto w-full md:h-14`}>
                    <p className="w-36 h-full text-center text-2xl font-bold leading-[56px] text-primary-400 hidden md:block">Your Book</p>
                    <div className="flex h-14 items-center">
                        <div className="relative flex flex-nowrap h-8 w-full md:w-96 min-w-[280px] ring-2 bg-white dark:bg-slate-800 ring-gray-200 dark:ring-slate-700 rounded-lg overflow-hidden shadow-sm hover:ring-primary-400 transition-all duration-200">
                            <FiSearch className='self-center w-8 text-gray-400 pl-2' />
                            <input name="search" value={searchText || ''} onChange={(e: ChangeEvent<HTMLInputElement>) => searchNow(e.target.value)} type="text" className="flex-1 outline-none pr-3 placeholder-gray-400 text-sm bg-transparent dark:text-slate-200" placeholder='Tìm kiếm truyện, tác giả...' />
                            <ul className="absolute z-50 top-8 left-0 w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-b-lg shadow-lg text-sm max-h-96 overflow-y-auto">
                                {
                                    SearchList.length > 0 && SearchList.map((item, index) => {
                                        if ('title' in item) {
                                            return <Link legacyBehavior key={index} passHref href={`/truyen/${item.slug}`}><a>
                                                <li className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-slate-300">
                                                    <b>{item.title}</b>
                                                    <br />
                                                    <i>truyện</i>
                                                </li>
                                            </a></Link>
                                        } else {
                                            return <Link legacyBehavior key={index} passHref href={`/tac-gia/${item.slug}`}><a><li className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-slate-300">
                                                <b>{item.name}</b>
                                                <br />
                                                <i>tác giả</i>
                                            </li></a></Link>
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <ul className="flex list-none px-3 leading-8">
                            {
                                listmap.map((item: string, index: number) => {
                                    if (currentPage == index) {
                                        return <li key={index} className="px-3 first-letter:uppercase text-center rounded-lg bg-primary-600 text-white"><a href='#'>{item}</a></li>
                                    }
                                    return <li key={index} className="px-3 first-letter:uppercase text-center text-primary-500"><a href='#'>{item}</a></li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className={`w-full max-w-[375px] md:max-w-full relative ${openMenu ? 'block' : 'hidden'} md:block ${blackbg && 'bg-black'} ${router.pathname == '/' && 'mt-[30px] md:mt-0'} bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800`}>
                    <VscGitPullRequestClosed onClick={() => setOpenMenu(false)} className={`absolute top-1 right-1 z-40 md:hidden`} size={30} color="orange" />
                    <div className="mx-auto sticky top-0 text-gray-300 md:text-gray-800 dark:md:text-slate-200 container flex flex-col md:flex-row items-center justify-between w-full bg-gray-800 md:bg-transparent">
                        <ul className="md:text-sm font-bold md:font-normal flex flex-col md:flex-row h-full list-none gap-y-1 py-5 md:pt-0 md:pb-2">
                            <li className="px-2 flex items-center hover:text-yellow-500"><Link legacyBehavior passHref href='/'><a className="flex items-center"><AiFillHome size={20} /><b className="md:hidden text-yellow-600 text-2xl ml-1">trang chủ</b></a></Link></li>
                            <li className="group leading-7 h-full relative px-2 first-letter:uppercase">Thể loại
                                <ul className=" md:absolute md:invisible group-hover:visible hover:visible md:top-7 py-3 px-4 flex md:w-[700px] flex-wrap list-none bg-gray-800 text-teal-600 italic md:text-slate-200 dark:bg-slate-800">
                                    {
                                        allCates.isSuccess && allCates.data.map((item, index) => {
                                            return <li key={index} className="px-2 py-1 w-1/2 md:w-3/12 first-letter:uppercase hover:text-yellow-500"><Link legacyBehavior passHref href={`/tonghop/${item.slug}`}><a>{item.cate}</a></Link></li>
                                        })
                                    }
                                </ul>
                            </li>
                            {
                                listMenu.map((item, index) => {
                                    return <li key={index} className="px-2 leading-7 first-letter:uppercase hover:text-yellow-500"><Link legacyBehavior passHref href={`/lua-chon/${item.slug}/1`}><a>{item.headding}</a></Link></li>
                                })
                            }
                        </ul>

                        <div className="flex items-center text-black dark:text-slate-200 relative gap-3">
                            <span className='text-secondary-400 p-3 text-sm'>{isSuccess ? <Link legacyBehavior passHref href="/user/account"><a>{data?.username}</a></Link> : <Link legacyBehavior passHref href="/login"><a>Đăng nhập</a></Link>}</span>

                            {
                                isSuccess && <span onClick={() => {
                                    if (!showNoti) {
                                        turnToReaded();
                                    }
                                    setShowNoti(!showNoti);
                                }} className="text-secondary-500 relative cursor-pointer"><IoIosNotifications size={20} />{notRead > 0 && <b className="absolute text-red-500 bg-white text-sm w-4 h-4 rounded-full text-center top-0 left-1/2">{notRead}</b>}</span>
                            }
                            <ThemeToggle />
                            {
                                noti.isSuccess && showNoti && <ul className="bg-white dark:bg-slate-800 shadow-xl absolute top-10 right-0 w-[280px] rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 z-[60]">

                                    <li className="px-4 py-3 font-bold w-full text-center bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200">Thông báo mới</li>
                                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                        {
                                            noti.data.notis.length <= 0 && <li className={`px-4 py-6 text-center text-sm text-slate-400 italic`}>Bạn không có thông báo nào</li>
                                        }
                                        {
                                            NotiList.map((item, index) => {
                                                if (item.type == 'newmess') {
                                                    return <Link legacyBehavior key={index} passHref href={`/user/messbox`}><a><li className={`px-4 py-3 text-sm mb-1 border-b border-slate-50 dark:border-slate-700 w-full hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${!item.read && 'bg-blue-50/50 dark:bg-blue-900/10'}`}>Một tin nhắn mới từ <b>{typeof item.sender === 'string' ? item.sender : (item.sender as any)?.username || 'Người dùng'}</b></li></a></Link>
                                                }
                                                return <Link legacyBehavior key={index} passHref href={`/truyen/${item.novel?.slug}/${item.chap}`}><a><li className={`px-4 py-3 text-sm mb-1 border-b border-slate-50 dark:border-slate-700 w-full hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${!item.read && 'bg-blue-50/50 dark:bg-blue-900/10'}`}>Truyện <b className="text-blue-500">{item.novel?.title}</b> chương <b className="text-blue-500">{item.chap}</b> vừa xuất thế</li></a></Link>
                                            })
                                        }
                                    </div>
                                    <Link legacyBehavior passHref href='/user/notifications'><a><li className="px-4 py-3 font-bold w-full text-center text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">Xem tất cả</li></a></Link>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Navigation = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return <NavigationContent />;
};

export default Navigation;
