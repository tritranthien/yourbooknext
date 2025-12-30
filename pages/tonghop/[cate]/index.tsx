import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React from 'react'
import TopNovels from '../../../components/TopNovels/TopNovels'
import { SerVerNovel } from '../../../interface/_Novel'
import { getAllCates, getBySlug } from '../../../libs/api/category'
import { bestViewsInCate, novelsBycate, novelsCompletedByCate } from '../../../libs/api/novelAPI'

interface contextProps{ 
	params : { 
		cate : string,
    cate_id: string
	} 
} 
interface TpageProps{
  novelsUpdated: SerVerNovel[],
  novelsCompleted: SerVerNovel[],
  novelsBestViews: SerVerNovel[],
  cateName: string,

}
const Tpage:React.FC<TpageProps> = ({novelsUpdated,novelsCompleted,novelsBestViews,cateName}:TpageProps) => {
  const router = useRouter(); 
  
  if(router.isFallback){
     return <div>Loading...</div>
  }
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-700 bg-slate-200/50 dark:bg-slate-950/60 pb-20">
      <div className="relative w-full h-[140px] overflow-hidden group shadow-lg">
        <Image 
          layout='fill' 
          alt={cateName} 
          src={novelsUpdated.length > 0 ? novelsUpdated[0].image : '/images/tt3.jpg'} 
          objectFit='cover'
          className="transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
          <span className="text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 animate-in slide-in-from-top-4 duration-700">Thể loại</span>
          <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight animate-in slide-in-from-bottom-4 duration-700 delay-100">{cateName}</h1>
          <div className="mt-4 flex items-center gap-2 animate-in fade-in duration-700 delay-300">
            <span className="h-[1px] w-6 bg-white/30"></span>
            <span className="text-white/60 text-xs font-medium">{novelsUpdated.length} Tác phẩm</span>
            <span className="h-[1px] w-6 bg-white/30"></span>
          </div>
        </div>
      </div>

      <div className="container px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main List */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
              <h2 className="font-bold text-lg text-slate-800 dark:text-white uppercase tracking-wider">Vừa cập nhật</h2>
            </div>

            <ul className="space-y-1">
              {novelsUpdated.length > 0 ? (
                novelsUpdated.map((item, index) => (
                  <li key={index} className='group flex items-center gap-4 py-2 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-900/40 px-3 rounded-xl transition-all cursor-default'> 
                    <span className='hidden lg:flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-800/50 w-24 py-1.5 rounded-full border border-slate-100 dark:border-slate-800 group-hover:border-primary-500/30 transition-colors'>
                      {item.category.cate}
                    </span>
                    
                    <div className="flex-1 min-w-0">
                      <Link legacyBehavior passHref href={`/truyen/${item.slug}`}>
                        <a className='text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors block truncate'>
                          {item.title}
                        </a>
                      </Link>
                    </div>

                    <div className='hidden md:flex items-center gap-2 w-48 shrink-0'>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                      <span className='text-xs text-slate-500 dark:text-slate-500 truncate'>
                        {item.author?.slug ? (
                          <Link legacyBehavior passHref href={`/tac-gia/${item.author.slug}`}>
                            <a className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">{item.author.name}</a>
                          </Link>
                        ) : (
                          item.author?.name || 'Đang cập nhật'
                        )}
                      </span>
                    </div>

                    <div className='w-32 shrink-0 flex justify-end lg:justify-start'>
                      <Link legacyBehavior passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}>
                        <a className='text-[10px] font-black tracking-widest uppercase bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-lg border border-primary-100 dark:border-primary-900/30 group-hover:bg-primary-600 group-hover:text-white transition-all'>
                          {`Ch. ${item.chapCount}`}
                        </a>
                      </Link>
                    </div>

                    <span className='hidden lg:block text-[10px] font-bold text-slate-400 dark:text-slate-600 w-24 shrink-0 text-right uppercase tracking-tighter'>
                      {format(parseISO(item.updatedAt),'dd/MM/yyyy')}
                    </span>
                  </li>
                ))
              ) : (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-slate-400 dark:text-slate-600">Thể loại này chưa có truyện nào được đăng cả :(</p>
                  <Link legacyBehavior passHref href='/'>
                    <a className='text-primary-500 hover:underline mt-4 inline-block font-bold'>Tìm truyện khác tại trang chủ</a>
                  </Link>
                </div>
              )}
            </ul>
            
            {novelsUpdated.length > 0 && (
              <button 
                onClick={()=>Router.push(`/tonghop/${router.query.cate}/all`)} 
                className='mt-10 w-full py-4 bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 hover:text-white text-slate-600 dark:text-slate-400 font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-[0.98] text-xs'
              >
                Xem tất cả danh sách
              </button>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
            {novelsBestViews.length > 0 && (
              <div className="space-y-8 sticky top-24">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-secondary-500 rounded-full"></span>
                  <h2 className="font-bold text-xl text-slate-800 dark:text-white uppercase tracking-wider">Xem nhiều nhất</h2>
                </div>

                <div className="space-y-6">
                  {/* Top 1 Highlight */}
                  <Link legacyBehavior passHref href={`/truyen/${novelsBestViews[0].slug}`}>
                    <a className="block group relative rounded-[2rem] overflow-hidden shadow-xl border border-white dark:border-slate-800">
                      <div className="relative aspect-[3/4] w-full">
                        <Image layout="fill" objectFit='cover' alt={novelsBestViews[0].title} src={novelsBestViews[0].image} className="transition-transform duration-700 group-hover:scale-110"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                      </div>
                      
                      <div className="absolute top-4 left-4 w-8 h-8 rounded-xl bg-secondary-500 text-white flex items-center justify-center font-black shadow-lg">1</div>
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1 text-[10px] font-black text-white uppercase tracking-widest">{`Chương ${novelsBestViews[0].chapCount}`}</div>
                      
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-2 group-hover:text-primary-400 transition-colors">{novelsBestViews[0].title}</h3>
                        <p className='text-slate-400 text-xs font-bold uppercase tracking-wider'>{novelsBestViews[0].author?.name || 'Đang cập nhật'}</p>
                      </div>
                    </a>
                  </Link>

                  {/* Top 2-5 List */}
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800/50 shadow-sm space-y-4">
                    {novelsBestViews.map((item, index) => {
                      if (index === 0) return null;
                      return (
                        <div key={index} className="flex items-center gap-4 group/item">
                          <span className={`w-6 h-6 shrink-0 flex items-center justify-center rounded-lg text-xs font-black ${index < 3 ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'text-slate-300 dark:text-slate-600'}`}>{index + 1}</span>
                          <div className="flex-1 min-w-0">
                            <Link legacyBehavior passHref href={`/truyen/${item.slug}`}>
                              <a className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors block truncate">{item.title}</a>
                            </Link>
                          </div>
                          <Link legacyBehavior passHref href={item.chapCount > 0 ? `/truyen/${item.slug}/${item.chapCount}` : `/truyen/${item.slug}`}>
                            <a className="text-[10px] font-bold text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-700">{`${item.chapCount}C`}</a>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800/50">
          {novelsCompleted.length > 0 ? (
            <TopNovels title={`Truyện ${cateName} đã hoàn thành`} novels={novelsCompleted || []}/>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] p-12 text-center border border-slate-100 dark:border-slate-800">
               <p className="text-slate-500 dark:text-slate-400 italic font-medium">{`Chưa có tác phẩm ${cateName} nào hoàn thành tại thời điểm này.`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
    try {
      const cates = await getAllCates();
      const paths = cates.map(item=>({
        params: {cate: item.slug},
      }))
      return { paths, fallback: 'blocking' }
    } catch (error) {
      console.error("Error fetching paths for cates:", error);
      return { paths: [], fallback: 'blocking' }
    }
}

export const getStaticProps = async ({params}:contextProps) => {
  const { cate } = params;
  try {
    const myCate = await getBySlug(cate);
    const novelsUpdated = await novelsBycate(myCate._id);
    const novelsCompleted = await novelsCompletedByCate(myCate._id);
    const novelsBestViews = await bestViewsInCate(myCate._id);
    return {
      props: {
        novelsUpdated: novelsUpdated.novels || [],
        novelsCompleted: novelsCompleted || [],
        novelsBestViews: novelsBestViews || [],
        cateName: myCate.cate || cate,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error(`Error fetching data for cate ${cate}:`, error);
    return {
      props: {
        novelsUpdated: [],
        novelsCompleted: [],
        novelsBestViews: [],
        cateName: cate,
      },
      revalidate: 60,
    }
  }
}

export default Tpage