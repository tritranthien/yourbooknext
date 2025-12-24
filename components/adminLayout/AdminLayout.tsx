import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillHome, AiOutlineHome, AiOutlineMenu, AiOutlineUser, AiOutlineBook, AiOutlineTag, AiOutlineSetting } from 'react-icons/ai'
import { HiLogout } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineDashboard } from 'react-icons/md'
import { ToastContainer } from 'react-toastify'
import { getMe } from '../../libs/api/authAPI'

const AdminLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [useName, setName] = useState('loading');
    const [openMenu, setOpenMenu] = useState(false);
    const router = useRouter();

    const logout = async () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('jwtToken');
        router.push('/');
    }

    useEffect(() => {
        setOpenMenu(false);
    }, [router.asPath])

    useEffect(() => {
        const checkMe = async () => {
            try {
                const userInfoStr = localStorage.getItem('userInfo');
                if (userInfoStr) {
                    const userInfo = JSON.parse(userInfoStr);
                    if (userInfo.role === 'admin') {
                        setName(userInfo.username);
                    }
                }

                const res = await getMe();
                console.log("Admin check response:", res);
                if (res.role !== 'admin') {
                    console.warn("User is not admin, role:", res.role);
                    router.push('/');
                    return;
                }
                setName(res.username);
                // Sync localStorage just in case
                localStorage.setItem('userInfo', JSON.stringify(res));
            } catch (error) {
                console.error("Admin check failed:", error);
                router.push('/login');
            }
        }
        checkMe();
    }, [])

    return (
        <div className="">
            {!openMenu && <AiOutlineMenu onClick={() => setOpenMenu(true)} className="fixed z-[100] top-3 left-3 opacity-60 block md:hidden" size={30} />}
            <div className="flex w-full h-14 bg-slate-800 text-white px-10 md:justify-between items-center justify-end">
                <Link legacyBehavior passHref href='/'><a className="hidden md:block"><span><AiFillHome className="text-2xl text-white" /></span></a></Link>
                <div className="flex items-center">
                    <span className="mr-5 font-bold text-yellow-400">ADMIN PANEL</span>
                    <span className="flex items-center h-10 leading-10">{useName}<HiLogout onClick={logout} className="ml-3 text-2xl cursor-pointer" /></span>
                </div>
            </div>
            <div className="w-full flex">
                <div className={`w-[250px] min-h-screen border-r-2 fixed md:sticky top-0 left-0 bg-white z-[100] ${openMenu ? 'block' : 'hidden'} md:block`}>
                    <ul className="w-full list-none px-5 py-3 relative">
                        {openMenu && <IoMdClose onClick={() => setOpenMenu(false)} className="absolute md:hidden top-2 right-2" size={30} />}
                        <Link legacyBehavior passHref href="/"><a><li className="flex w-full p-2 items-center text-lg mt-5 hover:bg-slate-100 rounded-md transition-colors"><AiOutlineHome className="mr-3" />Trang chủ</li></a></Link>
                        <li className="border-b my-4"></li>
                        <Link legacyBehavior passHref href="/admin"><a><li className={`flex w-full p-2 items-center text-lg mt-2 hover:bg-slate-100 rounded-md transition-colors ${router.pathname === '/admin' ? 'bg-slate-200 font-semibold' : ''}`}><MdOutlineDashboard className="mr-3" />Dashboard</li></a></Link>
                        <Link legacyBehavior passHref href="/admin/users"><a><li className={`flex w-full p-2 items-center text-lg mt-2 hover:bg-slate-100 rounded-md transition-colors ${router.pathname === '/admin/users' ? 'bg-slate-200 font-semibold' : ''}`}><AiOutlineUser className="mr-3" />Quản lý User</li></a></Link>
                        <Link legacyBehavior passHref href="/admin/novels"><a><li className={`flex w-full p-2 items-center text-lg mt-2 hover:bg-slate-100 rounded-md transition-colors ${router.pathname === '/admin/novels' ? 'bg-slate-200 font-semibold' : ''}`}><AiOutlineBook className="mr-3" />Quản lý Truyện</li></a></Link>
                        <Link legacyBehavior passHref href="/admin/authors"><a><li className={`flex w-full p-2 items-center text-lg mt-2 hover:bg-slate-100 rounded-md transition-colors ${router.pathname === '/admin/authors' ? 'bg-slate-200 font-semibold' : ''}`}><AiOutlineUser className="mr-3" />Quản lý Tác giả</li></a></Link>
                        <Link legacyBehavior passHref href="/admin/categories"><a><li className={`flex w-full p-2 items-center text-lg mt-2 hover:bg-slate-100 rounded-md transition-colors ${router.pathname === '/admin/categories' ? 'bg-slate-200 font-semibold' : ''}`}><AiOutlineTag className="mr-3" />Quản lý Thể loại</li></a></Link>
                        <Link legacyBehavior passHref href="/admin/settings"><a><li className={`flex w-full p-2 items-center text-lg mt-2 hover:bg-slate-100 rounded-md transition-colors ${router.pathname === '/admin/settings' ? 'bg-slate-200 font-semibold' : ''}`}><AiOutlineSetting className="mr-3" />Cài đặt hệ thống</li></a></Link>
                    </ul>
                </div>
                <div className="w-full md:w-[calc(100%_-_250px)] p-6 bg-slate-50">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
