import { debounce } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';
import { VscGitPullRequestClosed } from 'react-icons/vsc';
import { FiSearch } from 'react-icons/fi';
import { IoIosNotifications } from 'react-icons/io';
import { MdDarkMode } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useGetAllCates } from '../../customHooks/reactQuery/Categoris';
import { Author } from '../../interface/_Author';
import { ServerNoti } from '../../interface/_Noti';
import { NovelSearch } from '../../interface/_Novel';
import { UserFind } from '../../interface/_User';
import { getMe, getNotis, readNotiInNav } from '../../libs/api/authAPI';
import { followeds, searchAll } from '../../libs/api/novelAPI';
const Navigation: React.FC = () => {
const [openMenu,setOpenMenu] = useState(false);
const [currentPage,setCurrentPage] = useState(0);
const [SearchList,setSearchList] = useState<(NovelSearch | Author)[]>([]);
const [showNoti,setShowNoti] = useState(false);
const [userId,setUserId] = useState('');
const [NotiList,setNotiList] = useState<ServerNoti[]>([]);
const [searchText, setSearch] = useState('');
const route = useRouter();
const [notRead,setNotRead] = useState(0);
const { data, isSuccess, error,refetch } = useQuery(['checkLogin',userId], getMe, {
    enabled: false,
    onError: ()=>{
        localStorage.removeItem('userInfo');
        localStorage.removeItem('jwtToken');
    }
});
const debouncedSave = useCallback(
    debounce( async (nextValue:string) => {
        if(nextValue.length > 0) {
            const res = await searchAll(nextValue);
            setSearchList([...res]); 
        }else{
            setSearchList([]);
        }
    }, 1000),
    [], // will be created only once initially
);
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
const searchNow = (text:string) => {
    setSearch(text);
    debouncedSave(text);
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
useEffect(()=>{
    setOpenMenu(false);
},[route.asPath]);
 return (
  <div className="w-full md:sticky z-30 md:block fixed max-h-screen overflow-y-auto md:overflow-visible">
      {
          !openMenu && <CgMenuGridO onClick={()=>setOpenMenu(true)} className={`fixed top-0 left-0 z-40 md:hidden opacity-60`} size={40} color="orange"/>
      }
      
      <div className={`container ${ route.pathname == '/' ? 'hidden md:flex md:flex-nowrap md:justify-between' : 'hidden'}  mx-auto w-full h-14`}>
        <p className="w-36 h-full text-center text-2xl font-bold leading-[56px] text-sky-200 hidden md:block">Your Book</p>
        <div className="flex h-14 items-center">
            <div className="relative flex flex-nowrap h-8 ring-1 bg-white ring-slate-900/10 ">
                <FiSearch className='self-center w-8 '/>
                <input name="search" value={searchText || ''} onChange={(e:ChangeEvent<HTMLInputElement>)=>searchNow(e.target.value)} type="text" className="w-[calc(100%_-_w-8)] outline-none pr-2 placeholder-gray-300 " placeholder='Tìm kiếm ...'/>
                <ul className="absolute z-50 top-8 left-0 w-full bg-gray-300 box-shadow-md text-sm">
                    {
                        SearchList.length > 0 && SearchList.map((item,index)=>{
                            if('title' in item){
                                return <Link key={index} passHref href={`/truyen/${item.slug}`}><a>
                                            <li className="px-3 py-2">
                                                <b>{item.title}</b>
                                                <br/>
                                                <i>truyện</i>
                                            </li>
                                        </a></Link>
                            }else{
                                return <Link key={index} passHref href={`/tac-gia/${item.slug}`}><a><li className="px-3 py-2">
                                            <b>{item.name}</b>
                                            <br/>
                                            <i>tác giả</i>
                                        </li></a></Link>    
                                }
                        })
                    }
                </ul>
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
      <div className={`w-full max-w-[375px] md:max-w-full relative ${openMenu ? 'block' : 'hidden'} md:block ${ blackbg  && 'bg-black' }`}>
        <VscGitPullRequestClosed onClick={()=>setOpenMenu(false)} className={`absolute top-1 right-1 z-40 md:hidden`} size={30} color="orange"/>
        <div className="mx-auto sticky top-0 text-gray-300 container flex flex-col md:flex-row items-center justify-between md:h-7 w-full bg-gray-800 md:bg-transparent">
            <ul className="md:text-sm font-bold md:font-normal flex flex-col md:flex-row h-full list-none gap-y-1 py-5 md:py-0">
            <li className="px-2 flex items-center hover:text-yellow-500"><Link passHref href='/'><a className="flex items-center"><AiFillHome size={20}/><b className="md:hidden text-yellow-600 text-2xl ml-1">trang chủ</b></a></Link></li>
            <li className="group leading-7 h-full relative px-2 first-letter:uppercase">Thể loại
                            <ul className=" md:absolute md:invisible group-hover:visible hover:visible md:top-7 py-3 px-4 flex md:w-[700px] flex-wrap list-none bg-gray-800 text-teal-600 italic md:text-slate-200">
                                {
                                    allCates.isSuccess && allCates.data.map((item,index)=>{
                                        return <li key={index} className="px-2 py-1 w-1/2 md:w-3/12 first-letter:uppercase hover:text-yellow-500"><Link passHref href={`/tonghop/${item.slug}`}><a>{item.cate}</a></Link></li>
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
