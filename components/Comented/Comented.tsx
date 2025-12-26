import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import { getCmted } from '../../libs/api/authAPI';

const Comented = () => {
  const {data,isSuccess,error} = useQuery('myComented',getCmted);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
        <h3 className="font-bold text-xl text-slate-800 dark:text-white uppercase tracking-wider">Bình luận gần đây</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {isSuccess && data?.map((item,index)=>{
          return (
            <div key={index} className="flex flex-col gap-3 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800/50 hover:border-primary-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                 <div className="bg-primary-500/10 text-primary-600 dark:text-primary-400 text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md">Bình luận</div>
              </div>

              <div className="flex-1 min-w-0">
                <Link legacyBehavior passHref href={`/truyen/${item.novel.slug}`}>
                  <a className="text-sm font-black text-slate-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors uppercase tracking-tight">
                    {item.novel.title}
                  </a>
                </Link>
                <div className="mt-3 relative">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-2 border-primary-500/30 pl-4 py-1">
                      &quot;{item.content}&quot;
                    </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800/50 mt-1">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">vừa xong</span>
                 <Link legacyBehavior passHref href={`/truyen/${item.novel.slug}#comments`}>
                    <a className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest hover:underline">Chi tiết →</a>
                 </Link>
              </div>
            </div>
          )
        })}
        {isSuccess && data?.length === 0 && (
          <div className="text-center py-10">
            <p className="text-slate-400 dark:text-slate-600 italic">Bạn chưa để lại bình luận nào.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comented