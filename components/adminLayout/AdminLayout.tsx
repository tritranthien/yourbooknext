import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillHome, AiOutlineHome, AiOutlineMenu, AiOutlineUser, AiOutlineBook, AiOutlineTag, AiOutlineSetting, AiOutlineCheckCircle } from 'react-icons/ai'
import { HiLogout } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineDashboard } from 'react-icons/md'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { getMe } from '../../libs/api/authAPI'



const AdminLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [useName, setName] = useState('loading');
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
                
                const userInfoStr = localStorage.getItem('userInfo');
                if (userInfoStr) {
                    const userInfo = JSON.parse(userInfoStr);
                    if (userInfo.role === 'admin') {
                        setName(userInfo.username);
                    }
                }

                const res = await getMe();
                if (res.role !== 'admin') {
                    router.push('/');
                    return;
                }
                setName(res.username);
                localStorage.setItem('userInfo', JSON.stringify(res));
            } catch (error) {
                router.push('/login');
            }
        }
        checkMe();
    }, [router])

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {!openMenu && <AiOutlineMenu onClick={() => setOpenMenu(true)} className="fixed z-[100] top-3 left-3 opacity-60 block md:hidden text-slate-800 dark:text-slate-200" size={30} />}
            <div className="flex w-full h-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 md:px-10 justify-between items-center sticky top-0 z-40">
                <div className="flex items-center gap-8">
                    <Link legacyBehavior passHref href='/'><a className="hidden md:block transition-transform hover:scale-105"><span><AiFillHome className="text-2xl text-blue-600 dark:text-blue-400" /></span></a></Link>
                    <span className="hidden md:block font-bold text-slate-800 dark:text-slate-100 tracking-wider">ADMIN PANEL</span>
                </div>
                <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">{useName}</span>
                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Online</span>
                        </div>
                        <button onClick={logout} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition-all group">
                            <HiLogout className="text-xl group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full flex">
                <div className={`w-[280px] h-[calc(100vh-64px)] border-r border-slate-100 dark:border-slate-800/50 fixed md:sticky top-16 left-0 bg-white dark:bg-slate-900 shadow-xl md:shadow-none z-[100] transition-all duration-300 ${openMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto custom-scrollbar`}>
                    <div className="flex flex-col h-full py-6 px-4">
                        <div className="p-2 mb-6">
                             <div className="flex items-center gap-3 font-bold text-xl text-slate-800 dark:text-white">
                                <span className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm shadow-lg shadow-blue-500/20">YB</span>
                                YourBook
                             </div>
                             {openMenu && <button onClick={() => setOpenMenu(false)} className="md:hidden absolute top-8 right-6 text-slate-400 hover:text-slate-600"><IoMdClose size={24} /></button>}
                        </div>
                        
                        <div className="flex-1 space-y-1">
                            <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Chính</p>
                            
                            <Link legacyBehavior passHref href="/">
                                <a className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all group">
                                    <AiOutlineHome size={20} className="group-hover:scale-110 transition-transform" />
                                    <span className="font-semibold">Về trang chủ</span>
                                </a>
                            </Link>

                            <Link legacyBehavior passHref href="/admin">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/admin' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <MdOutlineDashboard size={20} className="group-hover:rotate-12 transition-transform" />
                                    <span className="font-semibold">Bảng điều khiển</span>
                                </a>
                            </Link>
                            
                            <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-8 mb-3">Quản lý</p>

                            <Link legacyBehavior passHref href="/admin/users">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/admin/users' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <AiOutlineUser size={20} />
                                    <span className="font-semibold">Người dùng</span>
                                </a>
                            </Link>
                            
                            <Link legacyBehavior passHref href="/admin/novels">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/admin/novels' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <AiOutlineBook size={20} />
                                    <span className="font-semibold">Truyện tác phẩm</span>
                                </a>
                            </Link>

                            <Link legacyBehavior passHref href="/admin/novel-approval">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/admin/novel-approval' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <AiOutlineCheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                                    <span className="font-semibold text-orange-500 dark:text-orange-400">Duyệt truyện</span>
                                </a>
                            </Link>

                            <Link legacyBehavior passHref href="/admin/authors">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/admin/authors' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <AiOutlineUser size={20} />
                                    <span className="font-semibold">Tác giả</span>
                                </a>
                            </Link>

                             <Link legacyBehavior passHref href="/admin/categories">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/admin/categories' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <AiOutlineTag size={20} />
                                    <span className="font-semibold">Thể loại</span>
                                </a>
                            </Link>

                            <Link legacyBehavior passHref href="/admin/tags">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/admin/tags' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <AiOutlineTag size={20} />
                                    <span className="font-semibold">Tags</span>
                                </a>
                            </Link>

                            <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-8 mb-3">Hệ thống</p>

                            <Link legacyBehavior passHref href="/admin/settings">
                                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${router?.pathname === '/admin/settings' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <AiOutlineSetting size={20} />
                                    <span className="font-semibold">Cài đặt</span>
                                </a>
                            </Link>
                        </div>
                        
                        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                             <Link legacyBehavior passHref href="/user/account">
                                <a target="_blank" className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
                                     <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 group-hover:text-blue-600 transition-colors shadow-sm">
                                        <AiOutlineUser size={20} />
                                     </div>
                                     <div className="flex flex-col">
                                         <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">Hồ sơ của tôi</span>
                                         <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">View Account</span>
                                     </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-6 md:p-8 overflow-x-hidden min-h-[calc(100vh-64px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return <AdminLayoutContent>{children}</AdminLayoutContent>;
}

export default AdminLayout;
