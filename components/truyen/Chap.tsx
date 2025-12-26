import React, { useEffect, useState } from 'react';
import { useChaps } from '../../customHooks/reactQuery/Chap';
import ReactPaginate from 'react-paginate';
import { SerVerNovel } from '../../interface/_Novel';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { format, parseISO } from 'date-fns';
const Chap:React.FC<{novel:SerVerNovel}> = ({novel}:{novel:SerVerNovel}) => {
  const router = useRouter();
  const [path, setPath] = useState('');
  
  useEffect(() => {
    if (router.isReady) {
      setPath(router.asPath);
    }
  }, [router.isReady, router.asPath]);
  const [mychaps, setMychaps] = useState([]);
  const [page,setPage] = useState(1);
  const chaps = useChaps(novel._id,page);
  const handlePageChange = (event:{selected:number}) => {
    setPage(event.selected+1);
  }
  useEffect(()=>{
    chaps.refetch();
  },[page, novel, chaps])

  return <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex items-center justify-between mb-6">
       <div className="flex items-center gap-3">
        <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
        <h3 className="font-bold text-xl text-slate-800 dark:text-white uppercase tracking-wider">Danh sách chương</h3>
      </div>
      { 
        novel.chapCount > 50 && 
        <div className="dark:text-slate-400">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            previousLabel="Prev"
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.ceil(novel.chapCount/50)}
            className="flex items-center gap-1 text-xs"
            activeClassName="!bg-primary-600 !text-white !border-primary-600"
            pageClassName="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-primary-500 transition-all font-bold"
            previousClassName="px-3 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-primary-500 transition-all font-bold"
            nextClassName="px-3 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-primary-500 transition-all font-bold"
            breakClassName="w-8 h-8 flex items-center justify-center text-slate-400"
          />
        </div>
      }
    </div>
      
    <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-sm bg-white dark:bg-slate-900/50">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50">
            <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] w-20 hidden md:table-cell">STT</th>
            <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] w-32">Chương</th>
            <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Tiêu đề chương</th>
            <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] w-40 hidden md:table-cell text-right">Ngày cập nhật</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
          { 
            chaps.isSuccess && chaps.data.map((item,index)=>{
              return <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors" key={index}>
                <td className="py-4 px-6 text-sm text-slate-400 hidden md:table-cell">{(page-1)*50 + index + 1}</td>
                <td className="py-4 px-6 font-bold text-slate-700 dark:text-slate-300">
                  <Link legacyBehavior passHref href={`${path}/${item.chap}`}>
                    <a className="hover:text-primary-500 transition-colors">{`Chương ${item.chap}`}</a>
                  </Link>
                </td>
                <td className="py-4 px-6">
                  <Link legacyBehavior passHref href={`${path}/${item.chap}`}>
                    <a className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">{item.title}</a>
                  </Link>
                </td>
                <td className="py-4 px-6 text-sm text-slate-400 text-right hidden md:table-cell group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  {format(parseISO(item.updatedAt),'dd/MM/yyyy')}
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  </div>;
};

export default Chap;
