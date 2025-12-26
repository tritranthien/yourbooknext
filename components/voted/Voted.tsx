import Link from 'next/link';
import React from 'react'
import { BsFillSdCardFill } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { getVoted } from '../../libs/api/authAPI';

const Voted = () => {
  const {data,isSuccess,error} = useQuery('myVoted',getVoted);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
        <h3 className="font-bold text-xl text-slate-800 dark:text-white uppercase tracking-wider">Lịch sử đề cử</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {isSuccess && data?.map((item,index)=>{
          return (
            <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/50 hover:border-primary-500/30 transition-all group">
              <div className="flex items-center gap-2 shrink-0 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <span className="text-orange-500 font-black">x{item.goldcard}</span>
                <BsFillSdCardFill className="text-orange-400" size={18}/>
              </div>
              
              <div className="flex-1 min-w-0">
                <Link legacyBehavior passHref href={`/truyen/${item.novel.slug}`}>
                  <a className="text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline line-clamp-1">
                    {item.novel.title}
                  </a>
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic line-clamp-2 md:line-clamp-1 uppercase font-medium">
                  &quot;{item.content || 'Đã đề cử kim phiếu cho tác phẩm'}&quot;
                </p>
              </div>

              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100/50 dark:bg-slate-900/50 px-3 py-1 rounded-full w-fit">
                 Hoàn thành
              </div>
            </div>
          )
        })}
        {isSuccess && data?.length === 0 && (
          <div className="text-center py-10">
            <p className="text-slate-400 dark:text-slate-600 italic">Bạn chưa đề cử kim phiếu cho bộ truyện nào.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Voted