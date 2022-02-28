import React from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { AiFillHome } from 'react-icons/ai'
import { HiLogout } from 'react-icons/hi'
import { BsPersonBoundingBox,BsMailbox } from 'react-icons/bs'
import { BiEnvelopeOpen } from 'react-icons/bi'
import { MdOutgoingMail, MdOutlineAlternateEmail } from 'react-icons/md'
import Link from 'next/link'
import { RiFolderAddFill } from 'react-icons/ri'
import { IoIosAdd } from 'react-icons/io'
import { ImBook } from 'react-icons/im'
import { useRouter } from 'next/router'

const USDBlayout: React.FC = ({ children}) => {
  const { pathname } = useRouter();
  return (
      <div className="">
          <div className="flex w-full h-14 bg-slate-100 px-10 justify-between items-center">
           <Link passHref href='/'><a><span><AiFillHome className="text-2xl"/></span></a></Link>   
           <span className="flex items-center h-10 leading-10">trinhatrau<HiLogout className="ml-3 text-2xl"/></span>
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
                <Link passHref href="/user/inschap"><a><li className="flex w-full p-2 items-center text-xl"><IoIosAdd className="mr-3"/>Thêm chương</li></a></Link>
 
            </ul>
        </div>
        <div className="w-4/5">
            {children}
        </div>
    </div>      
      </div>
    
  )
}

export default USDBlayout