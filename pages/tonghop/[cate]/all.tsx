import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useQuery } from 'react-query'
import VerticalCard from '../../../components/Card/VerticalCard'
import { SerVerNovel } from '../../../interface/_Novel'
import { getBySlug } from '../../../libs/api/category'
import { filterInCate, novelsBycate } from '../../../libs/api/novelAPI'
interface contextProps{ 
	params : { 
		cate : string 
	} 
} 
interface AllPageProps{
    novels: SerVerNovel[],
    total: number,
    cateName: string,
    cateId: string,
}
const All:React.FC<AllPageProps> = ({novels,cateName,cateId,total}:AllPageProps) => {
    const [statusNovel,setStatusNovel] = useState('all');
    const [totalFull,setTotal] = useState(total);
    const [page,setPage] = useState(1);
    const [chapNumNovel,setchapNumNovel] = useState(0);
    const [sortNovel,setsortNovel] = useState<'updatedAt' | 'views' | 'likes'>('updatedAt');
    const [novelList,setNovelList] = useState<SerVerNovel[]>(novels);
    const { error,isSuccess,refetch } = useQuery(['novelsInCate',statusNovel,cateName,chapNumNovel,sortNovel,page],()=>filterInCate(cateId,page,statusNovel,chapNumNovel,sortNovel),{
        enabled: false,
        onSuccess: data=>{
            setNovelList([...data.novels]);
            setTotal(data.total);
            if(data.total <= 15){
                setPage(1);
            }
        }
    })
    useEffect(()=>{
        refetch();
        window.scrollTo(0, 0);
    },[statusNovel,chapNumNovel,sortNovel,page,refetch])

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20 animate-in fade-in duration-700">
        <div className="relative w-full h-[250px] overflow-hidden group">
            <Image 
              objectFit='cover' 
              alt={cateName} 
              src={novels.length > 0 ? novels[0].image : '/images/tt3.jpg'} 
              layout="fill"
              className="transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <span className="text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Danh sách</span>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">{`Truyện ${cateName}`}</h1>
            </div>
        </div>

        <div className="container px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filter Sidebar */}
                <div className="w-full lg:w-72 shrink-0 space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800/50 shadow-sm sticky top-24">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                   <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                                   Tình trạng
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                      { id: 'all', label: 'Tất cả' },
                                      { id: 'continue', label: 'Đang ra' },
                                      { id: 'completed', label: 'Hoàn thành' }
                                    ].map(btn => (
                                      <button 
                                        key={btn.id}
                                        onClick={()=>setStatusNovel(btn.id)} 
                                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${statusNovel === btn.id ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/20' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary-500'}`}
                                      >
                                        {btn.label}
                                      </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                   <span className="w-1.5 h-1.5 rounded-full bg-secondary-500"></span>
                                   Số chương
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                      { val: 0, label: 'Tất cả' },
                                      { val: 300, label: '< 300' },
                                      { val: 1000, label: '300-1000' },
                                      { val: 2000, label: '1000-2000' },
                                      { val: 2001, label: '> 2000' }
                                    ].map(btn => (
                                      <button 
                                        key={btn.val}
                                        onClick={()=>setchapNumNovel(btn.val)} 
                                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${chapNumNovel === btn.val ? 'bg-secondary-600 border-secondary-600 text-white shadow-lg shadow-secondary-500/20' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-secondary-500'}`}
                                      >
                                        {btn.label}
                                      </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                   <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                   Sắp xếp theo
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {[
                                      { id: 'updatedAt', label: 'Vừa cập nhật' },
                                      { id: 'likes', label: 'Được yêu thích' },
                                      { id: 'views', label: 'Xem nhiều nhất' }
                                    ].map(btn => (
                                      <button 
                                        key={btn.id}
                                        onClick={()=>setsortNovel(btn.id as any)} 
                                        className={`px-4 py-3 text-xs font-bold rounded-xl border transition-all text-left flex justify-between items-center ${sortNovel === btn.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-500'}`}
                                      >
                                        {btn.label}
                                        {sortNovel === btn.id && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                                      </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-1 gap-2">
                        {novelList.map((item, index) => (
                            <VerticalCard key={index} novel={item}/>
                        ))}
                    </div>

                    {novelList.length <= 0 && (
                        <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                           <p className="text-xl font-bold text-slate-400 dark:text-slate-600 px-6">Hic, không tìm thấy truyện nào đủ điều kiện rồi!</p>
                           <button onClick={() => {setStatusNovel('all'); setchapNumNovel(0); setsortNovel('updatedAt');}} className="mt-4 text-primary-500 font-bold hover:underline">Xóa bộ lọc</button>
                        </div>
                    )}

                    {totalFull > 15 && (
                        <div className="mt-12 flex justify-center">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>}
                                previousLabel={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>}
                                onPageChange={select=>setPage(select.selected + 1)}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={Math.ceil(totalFull/15)}
                                className="flex items-center gap-2"
                                activeClassName="!bg-primary-600 !text-white !border-primary-600 shadow-lg shadow-primary-500/25 scale-110"
                                pageClassName="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:border-primary-500 transition-all font-black text-sm"
                                previousClassName="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:border-primary-500 transition-all font-black"
                                nextClassName="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:border-primary-500 transition-all font-black"
                                breakClassName="w-10 h-10 flex items-center justify-center text-slate-400 font-bold"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
export const getServerSideProps = async ({params}:contextProps) => {
    const { cate } = params;
    const myCate = await getBySlug(cate);
    const novels = await novelsBycate(myCate._id);
    if(myCate && novels){
        return {
            props: {
                novels: novels.novels,
                total: novels.total,
                cateName: myCate.cate,
                cateId: myCate._id,
            }
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/page404"
        },
        props:{}
    }
    
}
export default All