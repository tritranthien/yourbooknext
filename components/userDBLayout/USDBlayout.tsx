import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsMailbox, BsPersonBoundingBox } from 'react-icons/bs'
import { FiTablet } from 'react-icons/fi'
import { HiLogout } from 'react-icons/hi'
import { ImBook } from 'react-icons/im'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { MdOutgoingMail, MdOutlineAlternateEmail } from 'react-icons/md'
import { RiFolderAddFill } from 'react-icons/ri'
import { ToastContainer } from 'react-toastify'
import { getMe } from '../../libs/api/authAPI'

const USDBlayout: React.FC = ({ children}) => {
    const [ useName,setName ] = useState('loading');
    const router = useRouter();
    const logout = async () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('jwtToken');
        router.push('/');
    }
    useEffect(()=>{
        const checkMe = async () => {
            try {
                const res = await getMe();
                    setName(res.username);
               
            } catch (error) {
                router.push('/login');
            }
        }
        checkMe();
    },[])
    
  return (
      <div className="">
          <div className="flex w-full h-14 bg-slate-100 px-10 justify-between items-center">
           <Link passHref href='/'><a><span><AiFillHome className="text-2xl"/></span></a></Link>   
           <span className="flex items-center h-10 leading-10"><IoIosNotificationsOutline className='cursor-pointer mr-2' size={25} onClick={()=>router.push('/user/notifications')}/>{useName}<HiLogout onClick={logout} className="ml-3 text-2xl cursor-pointer"/></span>
        </div>
<div className="w-full flex">
        <div className="w-1/5 min-h-screen border-r-2">
            <ul className="w-full list-none px-5 py-3">
                <Link passHref href="/user/account"><a><li className="flex w-full p-2 items-center text-xl mt-5"><BsPersonBoundingBox className="mr-3"/>Tổng quan</li></a></Link>
                <Link passHref href="/user/sendmess"><a><li className="flex w-full p-2 items-center text-xl"><MdOutlineAlternateEmail className="mr-3"/>Gửi tin nhắn</li></a></Link>
                <Link passHref href="/user/messbox"><a><li className="flex w-full p-2 items-center text-xl"><BsMailbox className="mr-3"/>Thư đến</li></a></Link>
                <Link passHref href="/user/sent"><a><li className="flex w-full p-2 items-center text-xl"><MdOutgoingMail className="mr-3"/>Thư đã gửi</li></a></Link>
                <li className='mb-5'></li>
                <Link passHref href="/user/novels"><a><li className="flex w-full p-2 items-center text-xl"><ImBook className="mr-3"/>Truyện của tôi</li></a></Link>
                <Link passHref href="/user/addnew"><a><li className="flex w-full p-2 items-center text-xl"><RiFolderAddFill className="mr-3"/>Thêm truyện</li></a></Link>
                <Link passHref href="/user/inschap"><a><li className="flex w-full p-2 items-center text-xl"><FiTablet className="mr-3"/>Đang theo dõi</li></a></Link>
 
            </ul>
        </div>
        <div className="w-4/5">
            {children}
        </div>
    </div>      
    <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              draggable
              pauseOnFocusLoss={false}
        />
      </div>
    
  )
}

export default USDBlayout