import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiSearch,FiPhoneCall } from 'react-icons/fi'
import { MdDarkMode } from 'react-icons/md'
const Navigation: React.FC = () => {
const [currentPage,setCurrentPage] = useState(0);
const route = useRouter();
const listmap = [
    'truyện chữ',
    'truyện tranh',
    'truyện audio'
]
const listMenu = [
    'thể loại',
    'truyện hot',
    'truyện mới',
    'truyện sáng tác',
    'truyện full',
    'mới cập nhật'
    
]
const Typeslist = [
    'manhua',
    'manga',
    'anime',
    'trinh thám',
    'ngôn tình',
    'đam mỹ',
    'đồng nhân',
    'kinh dị',
    'lịch sử',
    'khoa huyễn',
    'huyền huyễn',
    'linh dị',
    'dị giới',
    'thể thao',
    'cổ đại',
    'kỳ huyễn',
    'quan trường',
    'hậu cung',
    'mạt thế',
    'ma pháp',
    'phương tây',
    'sắc hiệp',
    'comedy'
]
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
      <div className="w-full">
        <div className="mx-auto sticky text-gray-300 container flex items-center justify-between h-7 w-full bg-transparent">
            <ul className="text-sm flex h-full list-none">
            {
                listMenu.map((item: string, index: number)=>{
                    if (index == 0) {
                        return <li key={index} className="group leading-7 h-full relative hover: px-2 first-letter:uppercase">{item}
                            <ul className="absolute invisible group-hover:visible hover:visible top-7 py-3 px-4 flex w-[700px] flex-wrap list-none bg-gray-800 text-slate-200">
                                {
                                    Typeslist.map((item: string, index: number)=>{
                                        return <li key={index} className="px-2 py-1 w-3/12 first-letter:uppercase">{item}</li>
                                    })
                                }
                            </ul>
                        </li>
                    }
                    return <li key={index} className="px-2 leading-7 first-letter:uppercase"><a href='#'>{item}</a></li>
                })
            }
            </ul>
            
                <div className="flex items-center text-black">
                    <span className='text-blue-400 ml-3 p-3 text-sm'><a href='/user'>Đăng nhập</a> | <a href='#'>Đăng ký</a></span>
                    <span className='ml-4 text-xl text-blue-200'><MdDarkMode/></span>
                </div>
                
            </div>
      </div>
      
    
  </div>
 );
  
};

export default Navigation;
