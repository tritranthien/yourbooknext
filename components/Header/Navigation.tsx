import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { IoIosNotifications } from 'react-icons/io';
import { MdDarkMode } from 'react-icons/md';
import { useQuery } from 'react-query';
import { io } from 'socket.io-client';
import { useGetAllCates } from '../../customHooks/reactQuery/Categoris';
import { ServerNoti } from '../../interface/_Noti';
import { getMe, getNotis, readNotiInNav } from '../../libs/api/authAPI';
import { followeds } from '../../libs/api/novelAPI';
import Pusher from 'pusher-js';
import { type } from 'os';
const Navigation: React.FC = () => {
const [currentPage,setCurrentPage] = useState(0);
const [showNoti,setShowNoti] = useState(false);
const [userId,setUserId] = useState('');
const [NotiList,setNotiList] = useState<ServerNoti[]>([]);
// const [userName, setname] = useState('');
const route = useRouter();
const [uid,setUid] = useState('');
const [notRead,setNotRead] = useState(0);
const { data, isSuccess, error,refetch } = useQuery(['checkLogin',userId], getMe, {
    enabled: false,
    onError: ()=>{
        localStorage.removeItem('userInfo');
        localStorage.removeItem('jwtToken');
    }
});
const ck = useQuery('followedFromUser',()=>followeds(),{
    enabled: false,
});
const noti = useQuery('notification',getNotis,{
    enabled: false,
    onSuccess: data=>{
    setNotiList([...data.notis]);
    if(data.count != notRead){
        setNotRead(data.count);
    }
}});
const allCates = useGetAllCates();
const blackbg = route.asPath.includes('lua-chon') || route.asPath.includes('tonghop') || route.asPath.includes('truyen');
const listmap = [
    'truyện chữ',
    'truyện tranh',
    'truyện audio'
]
const listMenu = [
    { 
        headding: 'truyện hot',
        slug: 'truyen-hot'
    },
    { 
        headding: 'truyện mới',
        slug: 'moi-nhat'
    },
    { 
        headding: 'truyện full',
        slug: 'hoan-thanh'
    }
    
]
const turnToReaded = async () => {
  
        const listNotRead = NotiList.reduce((arr,crr)=>{
            if(!crr.read){
                arr.push(crr._id);
            }
            return arr;
        },[] as string[]);
        console.log(listNotRead);
        
        try {
            const res = await readNotiInNav(listNotRead);
            if(res.success) {
                setNotRead(notRead - listNotRead.length);
            }
        } catch (error) {
            
        }
    
}
useEffect(()=>{
    if (localStorage.getItem('userInfo')) {
        const stringUser = localStorage.getItem('userInfo');
        if(stringUser != null) {
            const userData = JSON.parse(stringUser);
            setUserId(userData._id);
        }
        
    }
},[])
useEffect(()=>{
    if( userId && userId.length > 0){
        refetch();
        ck.refetch();
        noti.refetch();
    }
},[userId])
 return (
  <div className="w-full sticky z-30">
      <div className={`container ${ route.pathname == '/' ? 'flex flex-nowrap justify-between' : 'hidden'}  mx-auto w-full h-14`}>
        <p className="w-36 h-full text-center text-2xl font-bold leading-[56px] text-sky-200">Your Book</p>
        <div className="flex h-14 items-center">
            <div className="flex flex-nowrap h-8 rounded-md ring-1 bg-white ring-slate-900/10 overflow-hidden">
                <FiSearch className='self-center w-8 '/>
                <input type="text" className="w-[calc(100%_-_w-8)] outline-none pr-2 placeholder-gray-300" placeholder='Tìm kiếm ...'/>
            </div>
            <ul className="flex list-none px-3 leading-8">
                    {
                        listmap.map((item: string,index: number) => {
                            if(currentPage == index){
                                return <li key={index} className="px-3 first-letter:uppercase text-center rounded-lg bg-sky-700 text-white"><a href='#'>{item}</a></li>
                            }
                            return <li key={index} className="px-3 first-letter:uppercase text-center text-amber-400"><a href='#'>{item}</a></li>
                        })
                    }
                
                </ul>
           
        </div>
        
      </div>
      <div className={`w-full ${ blackbg  && 'bg-black' }`}>
        <div className="mx-auto sticky top-0 text-gray-300 container flex items-center justify-between h-7 w-full bg-transparent">
            <ul className="text-sm flex h-full list-none">
            <li className="px-2 flex items-center hover:text-yellow-500"><Link passHref href='/'><a><AiFillHome size={20}/></a></Link></li>
            <li className="group leading-7 h-full relative hover: px-2 first-letter:uppercase">Thể loại
                            <ul className="absolute invisible group-hover:visible hover:visible top-7 py-3 px-4 flex w-[700px] flex-wrap list-none bg-gray-800 text-slate-200">
                                {
                                    allCates.isSuccess && allCates.data.map((item,index)=>{
                                        return <li key={index} className="px-2 py-1 w-3/12 first-letter:uppercase hover:text-yellow-500"><Link passHref href={`/tonghop/${item.slug}`}><a>{item.cate}</a></Link></li>
                                    })
                                }
                            </ul>
                        </li>
            {
                listMenu.map((item, index)=>{
                    return <li key={index} className="px-2 leading-7 first-letter:uppercase hover:text-yellow-500"><Link passHref href={`/lua-chon/${item.slug}/1`}><a>{item.headding}</a></Link></li>
                })
            }
            </ul>
            
                <div className="flex items-center text-black relative">
                    <span className='text-blue-400 ml-3 p-3 text-sm'>{ isSuccess ? <Link passHref href="/user/account"><a>{data?.username}</a></Link> : <Link passHref href="/login"><a>Đăng nhập</a></Link>}</span>
                    
                    
                    {
                        isSuccess && <span onClick = {()=>{
                            if(!showNoti){
                                turnToReaded();
                            }
                            setShowNoti(!showNoti);
                        }} className="text-blue-500 relative cursor-pointer"><IoIosNotifications size={20}/>{ notRead > 0 && <b className="absolute text-red-500 bg-white text-sm w-4 h-4 rounded-full text-center top-0 left-1/2">{notRead}</b>}</span>
                    }
                    <span className='ml-4 text-xl text-blue-200'><MdDarkMode/></span>
                    {
                        noti.isSuccess && showNoti && <ul className="bg-white box-shadow-md absolute top-10 w-[200px] rounded-md">
                            
                            <li className="px-2 py-1 font-bold w-full text-center">thông báo mới</li>
                            <hr/>
                            {
                                noti.data.notis.length <= 0 && <li className={`px-2 py-1 text-sm line-clamp-2 mb-2 `}>bạn không có thông báo nào</li>
                            }
                            {
                                NotiList.map((item,index)=>{
                                    if(item.type == 'newmess'){
                                        return <Link key={index} passHref href={`/user/messbox`}><a><li className={`px-2 py-1 text-sm line-clamp-2 mb-1 border-b-2 w-full ${!item.read && 'bg-gray-200'}`}>một tin nhắn mới từ <b>{item.sender}</b></li></a></Link>
                                    }
                                    return <Link key={index} passHref href={`/truyen/${item.novel?.slug}/${item.chap}`}><a><li className={`px-2 py-1 text-sm line-clamp-2 mb-1 border-b-2 w-full ${!item.read && 'bg-gray-200'}`}>truyện <b className="text-blue-500">{item.novel?.title}</b> chương <b className="text-blue-500">{item.chap}</b> vừa xuất thế</li></a></Link>
                                })
                            }
                            <Link passHref href='/user/notifications'><a><li className="px-2 py-1 font-bold w-full text-center text-blue-500 mb-1">xem tất cả</li></a></Link>
                        </ul>
                    }
                </div>
                
            </div>
      </div>
      
    
  </div>
 );
  
};

export default Navigation;
