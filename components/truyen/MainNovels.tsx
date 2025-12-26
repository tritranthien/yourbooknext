import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { ImBook } from 'react-icons/im';
import { useAuthorNovels } from '../../customHooks/reactQuery/Novelofauthor';
import { SerVerNovel } from '../../interface/_Novel';
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
  const {data, isSuccess,error} = useAuthorNovels(novel.author?._id || '');
  
  useEffect(()=>{
    if(typeof window !== 'undefined' && localStorage.getItem('userInfo')){
      setLoged(true);
    }
  },[])

  return <div className='container mx-auto px-6 py-12 flex flex-wrap lg:flex-nowrap gap-12'>
      <div className="w-full lg:w-3/4">
        <div className="flex border-b border-slate-100 dark:border-slate-800 mb-8 overflow-x-auto custom-scrollbar">
            <button 
              onClick={()=>setAct(0)} 
              className={`px-8 py-4 text-sm font-bold transition-all relative ${act === 0 ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Giới thiệu
              {act === 0 && <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 dark:bg-primary-400 rounded-t-full"></span>}
            </button>
            <button 
              onClick={()=>setAct(1)} 
              className={`px-8 py-4 text-sm font-bold transition-all relative ${act === 1 ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Danh sách chương
              {act === 1 && <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 dark:bg-primary-400 rounded-t-full"></span>}
            </button>
            <button 
              onClick={()=>setAct(2)} 
              className={`px-8 py-4 text-sm font-bold transition-all relative ${act === 2 ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Đánh giá
              {act === 2 && <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 dark:bg-primary-400 rounded-t-full"></span>}
            </button>
            <a 
              href='#cmt' 
              className="px-8 py-4 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-all hidden md:block"
            >
              Bình luận
            </a>
        </div>

        <div className="w-full min-h-[400px]">
          { act == 0 && <Gt des={novel.description}/> }
          { act == 1 && <Chap novel={novel}/> }
          { act == 2 && <Ratting loged={isLoged} novel={novel}/> }
        </div>

        <div id='cmt' className="w-full mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Bình luận</h2>
            <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
          </div>
          {novel && <Cmt novel={novel} loged={isLoged}/>}
        </div>
      </div>

      <div className="w-full lg:w-1/4">
        <div className="sticky top-24 space-y-10">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800/50 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Về tác giả</span>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800 flex-shrink-0">
                {novel.author?.image ? (
                  <Image src={novel.author.image} width={64} height={64} objectFit='cover' alt='avatar' />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                    <BsPersonFill size={28}/>
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg font-bold text-slate-800 dark:text-white truncate">
                  {novel.author?.name || 'Đang cập nhật'}
                </span>
                {novel.author?.slug && (
                  <Link legacyBehavior passHref href={`/tac-gia/${novel.author.slug}`}>
                    <a className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline">Xem hồ sơ tác giả</a>
                  </Link>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Truyện khác cùng tác giả</span>
              <div className="space-y-3">
                {isSuccess && data?.filter(item => item._id !== novel._id).length > 0 ? (
                  data?.filter(item => item._id !== novel._id).slice(0, 5).map((item, index) => (
                    <Link key={index} legacyBehavior passHref href={`/truyen/${item.slug}`}>
                      <a className="flex items-center gap-3 p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all group">
                        <div className="w-8 h-10 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                          <Image src={item.image} width={32} height={40} objectFit="cover" alt={item.title}/>
                        </div>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1 transition-colors">
                          {item.title}
                        </span>
                      </a>
                    </Link>
                  ))
                ) : (
                    <p className="text-xs text-slate-400 italic">Không có truyện khác nào.</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-primary-500/20">
            <h3 className="text-xl font-bold mb-3">Tải Ứng Dụng</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">Đọc truyện mượt mà hơn, nhận thông báo chương mới tức thì trên smartphone!</p>
            <button className="w-full py-3 bg-white text-primary-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg">Tải Ngay</button>
          </div>
        </div>
      </div>
  </div>;
};

export default MainNovels;
