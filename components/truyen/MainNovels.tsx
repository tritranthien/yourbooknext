import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ImBook } from 'react-icons/im';
import { SerVerNovel } from '../../interface/_Novel';
import avt from '../../public/images/avataaars.svg';
import Cmt from '../cmt/Cmt';
import Chap from './Chap';
import Gt from './Gt';
import Ratting from './Ratting';
interface MainNovels{
  novel: SerVerNovel
}
const MainNovels:React.FC<MainNovels> = ({novel}:MainNovels) => {
  const [act,setAct] = useState<number>(0);
  const [isLoged, setLoged] = useState(false);
  useEffect(()=>{
    if(localStorage && localStorage.getItem('userInfo')){
      setLoged(true);
    }
  },[])
  return <div className='container pt-0 flex'>
      <div className="w-3/4">
        <ul className="flex list-none cursor-pointer p-2">
            <li onClick={()=>setAct(0)} className={`w-[150px] h-[50px] leading-[50px] text-center ${ act == 0 ? 'rounded-md bg-orange-600 text-white' : 'bg-transparent' }`}>Giới thiệu</li>
            <li onClick={()=>setAct(1)} className={`w-[150px] h-[50px] leading-[50px] text-center ${ act == 1 ? 'rounded-md text-white bg-orange-600' : 'bg-transparent' }`}>DS.chương</li>
            <li onClick={()=>setAct(2)} className={`w-[150px] h-[50px] leading-[50px] text-center ${ act == 2 ? 'rounded-md text-white bg-orange-600' : 'bg-transparent' }`}>Đánh giá</li>
            <li className={`w-[150px] h-[50px] leading-[50px] text-center`}><a href='#cmt'>Bình luận</a></li>
        </ul>
        <div className="w-full min-h-[500px] border-top-2 mt-[-2px]">
          { act == 0 && <Gt des={novel.description}/> }
          { act == 1 && <Chap novel={novel}/> }
          { act == 2 && <Ratting loged={isLoged} novel={novel}/> }
        </div>
        <div id='cmt' className="w-full">
          <Cmt novel={novel} loged={isLoged}/>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex w-full rounded-md bg-slate-300 min-h-[100px]">
          <Image src={avt} alt='avatar' />
        </div>
        <span className='block w-full p-2 text-center border-b-2'>Ngô Khai</span>
        <span className='flex w-full p-2 leading-7'><ImBook className='h-7 mr-2'/>Hỏa chi viêm đế</span>
        <span className='flex w-full p-2 leading-7'><ImBook className='h-7 mr-2'/>Khai sơn trác mạn thân</span>

      </div>
  </div>;
};

export default MainNovels;
