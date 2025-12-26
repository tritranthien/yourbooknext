import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import React from 'react'
import VerticalCard from '../../components/Card/VerticalCard'
import { useAuthorNovels } from '../../customHooks/reactQuery/Novelofauthor'
import { Author } from '../../interface/_Author'
import { findBySlug } from '../../libs/api/authorAPI'
interface SSRContext{
  params : {
    tg: string,
  }
}
interface AuthorpageProps{
  author: Author,
}
const Authorpage:React.FC<AuthorpageProps> = ({author}:AuthorpageProps) => {
    const { data, isSuccess, error } = useAuthorNovels(author._id);
 
  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/20 py-8 md:py-16 animate-in fade-in duration-700">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Author Profile Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
             <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800/50 shadow-xl sticky top-24">
                <div className="relative h-64 group">
                  <Image src={author.image || '/images/tt3.jpg'} objectFit='cover' layout="fill" alt={author.name} className="transition-transform duration-700 group-hover:scale-110"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <span className="text-secondary-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1 block leading-none">Tác giả</span>
                     <h2 className="text-2xl font-black text-white">{author.name}</h2>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                         <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tác phẩm</span>
                         <span className="text-xl font-black text-primary-600 dark:text-primary-400">{author.novelCount}</span>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                         <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Năm sinh</span>
                         <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                           {author.birth ? format(parseISO(author.birth),'yyyy') : 'N/A'}
                         </span>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                        Tiểu sử
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-primary-500/20 pl-4 py-1">
                        {author.des && author.des !== '' ? author.des : 'Thông tin về tác giả đang được cập nhật...'}
                      </p>
                   </div>
                </div>
             </div>
          </div>

          {/* Novels List Area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
              <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider">Tác phẩm đã đăng</h1>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {isSuccess && data?.map((item,index)=>(
                <VerticalCard key={index} novel={item}/>
              ))}
              {isSuccess && data?.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                   <p className="text-slate-400 dark:text-slate-600 italic font-medium">Hiện tác giả chưa có tác phẩm nào được công khai.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({params}:SSRContext)=>{
  const { tg } = params;
    const author = await findBySlug(tg);
    if(author){
      return {
        props: {
          author
        }
      }
    }
    return {
      redirect: {
        permanent: false,
        destination: "/page404",
      },
      props:{},
    } 
   
  
}
export default Authorpage