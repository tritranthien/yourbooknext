import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState, ReactNode } from 'react'
import { AiFillHome, AiOutlineHome, AiOutlineMenu } from 'react-icons/ai'
import { BsMailbox, BsPersonBoundingBox } from 'react-icons/bs'
import { FiTablet } from 'react-icons/fi'
import { HiLogout } from 'react-icons/hi'
import { ImBook } from 'react-icons/im'
import { IoIosNotificationsOutline, IoMdClose } from 'react-icons/io'
import { MdOutgoingMail, MdOutlineAlternateEmail } from 'react-icons/md'
import { RiFolderAddFill } from 'react-icons/ri'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { getMe } from '../../libs/api/authAPI'

const USDBlayoutContent: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [useName, setName] = useState('loading');
    const [role, setRole] = useState('');
    const [openMenu, setOpenMenu] = useState(false);

    const logout = async () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('jwtToken');
        router.push('/');
    }

    useEffect(() => {
        setOpenMenu(false);
    }, [router?.asPath])

    useEffect(() => {
        const checkMe = async () => {
            try {
                if (typeof window === 'undefined') return;
                const res = await getMe();
                setName(res.username);
                setRole(res.role || '');
            } catch (error) {
                router.push('/login');
            }
        }
        checkMe();
    }, [router])

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            {!openMenu && <AiOutlineMenu onClick={() => setOpenMenu(true)} className="fixed z-[100] top-3 left-3 opacity-60 block md:hidden text-slate-800 dark:text-slate-200" size={30} />}
            <div className="flex w-full h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 md:px-10 justify-between items-center sticky top-0 z-40">
                <Link legacyBehavior passHref href='/'><a className="hidden md:block transition-transform hover:scale-105"><span><AiFillHome className="text-2xl text-orange-500" /></span></a></Link>   
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 hidden md:block mx-2"></div>
                    <span className="flex items-center gap-3">
                        <div className="relative">
                            <IoIosNotificationsOutline 
                                className='cursor-pointer text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors' 
                                size={28} 
                                onClick={() => router.push('/user/notifications')} 
                            />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                        </div>
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">{useName}</span>
                            <span className="text-[10px] text-orange-500 font-bold uppercase tracking-tighter">{role || 'User'}</span>
                        </div>
                        <button onClick={logout} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all group">
                            <HiLogout className="text-xl group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </span>
                </div>
            </div>
            <div className="w-full flex">
                <div className={`w-[280px] h-[calc(100vh-64px)] border-r border-slate-100 dark:border-slate-800/50 fixed md:sticky top-16 left-0 bg-white dark:bg-slate-900 shadow-xl md:shadow-none z-[100] transition-transform duration-300 ${openMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto custom-scrollbar`}>
                    <div className="flex flex-col h-full py-6 px-4">
                        <div className="p-2 mb-6">
                             <div className="flex items-center gap-3 font-bold text-xl text-slate-800 dark:text-white">
                                <span className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-sm shadow-lg shadow-orange-500/20">MB</span>
                                MyBooks
                             </div>
                             {openMenu && <button onClick={() => setOpenMenu(false)} className="md:hidden absolute top-8 right-6 text-slate-400 hover:text-slate-600"><IoMdClose size={24} /></button>}
                        </div>

                         <div className="flex-1 space-y-1">
                            {role === 'admin' && (
                                <Link legacyBehavior passHref href="/admin">
                                    <a target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold mb-6 border border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all text-sm group">
                                         <AiOutlineHome size={20} className="group-hover:scale-110 transition-transform" />
                                         <span>Quản lý hệ thống</span>
                                     </a>
                                 </Link>
                            )}

                             <Link legacyBehavior passHref href="/">
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-orange-600 dark:hover:text-orange-400 transition-all group">
                                    <AiOutlineHome size={20} className="group-hover:scale-110 transition-transform" />
                                    <span className="font-semibold">Trang chủ</span>
                                </a>
                            </Link>

                            <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-8 mb-3">Cá nhân</p>

                             <Link legacyBehavior passHref href="/user/account">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/user/account' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <BsPersonBoundingBox size={20} />
                                    <span className="font-semibold">Tổng quan</span>
                                </a>
                            </Link>
                             <Link legacyBehavior passHref href="/user/sendmess">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/user/sendmess' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <MdOutlineAlternateEmail size={20} />
                                    <span className="font-semibold">Gửi tin nhắn</span>
                                </a>
                            </Link>
                             <Link legacyBehavior passHref href="/user/messbox">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/user/messbox' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <BsMailbox size={20} />
                                    <span className="font-semibold">Thư đến</span>
                                </a>
                            </Link>
                             <Link legacyBehavior passHref href="/user/sent">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/user/sent' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <MdOutgoingMail size={20} />
                                    <span className="font-semibold">Thư đã gửi</span>
                                </a>
                            </Link>

                            <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-8 mb-3">Tác phẩm</p>

                             <Link legacyBehavior passHref href="/user/novels">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/user/novels' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <ImBook size={20} />
                                    <span className="font-semibold">Truyện của tôi</span>
                                </a>
                            </Link>
                            <Link legacyBehavior passHref href="/user/addnew">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/user/addnew' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <RiFolderAddFill size={20} />
                                    <span className="font-semibold">Thêm truyện mới</span>
                                </a>
                            </Link>
                             <Link legacyBehavior passHref href="/user/inschap">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/user/inschap' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <FiTablet size={20} />
                                    <span className="font-semibold">Đang theo dõi</span>
                                </a>
                            </Link>
                         </div>
                    </div>
                </div>
                <div className="flex-1 p-4 md:p-6 overflow-x-hidden min-h-[calc(100vh-64px)]">
                    {children}
                </div>
            </div>      
        </div>
    )
}

const USDBlayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
        </div>;
    }

    return <USDBlayoutContent>{children}</USDBlayoutContent>;
}

export default USDBlayout;