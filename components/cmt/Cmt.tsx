import React, { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query';
import { type Cmt, ServerCmt } from '../../interface/_Cmt';
import { SerVerNovel } from '../../interface/_Novel';
import { getCmts, postMyCmt } from '../../libs/api/cmtAPI';
import Cmtitem from './Cmtitem'
interface CmtProps{
    loged: boolean,
    novel: SerVerNovel
}
const Cmt:React.FC<CmtProps> = ({loged,novel}: CmtProps) => {
    const [cmtContent,setCmtContent] = useState('');
    const [listCmts,setListCmts] = useState<ServerCmt[]>([]);
    const { error,isSuccess,refetch } = useQuery(['cmts',novel._id],()=>getCmts(novel._id),{onSuccess:data=>{
        setListCmts(data);
    }})
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCmtContent(e.target.value);
    }
    
    const postCmt = async () => {
        if (!cmtContent.trim()) return;
        const newCmt: Cmt = {
            novel: novel._id,
            content: cmtContent,
        }
        try {
            const res = await postMyCmt(newCmt);
            if (res.status === 200) {
                refetch();
                setCmtContent('');
            }
        } catch (error) {
            console.error('Lỗi khi gửi bình luận:', error);
        }
    }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
        {
            loged ? (
                <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800/50 shadow-sm focus-within:border-primary-500/50 transition-all">
                    <textarea 
                        value={ cmtContent || '' } 
                        onChange={handleInput} 
                        className="w-full bg-slate-50 dark:bg-slate-800/50 outline-none rounded-2xl p-4 text-slate-800 dark:text-slate-200 resize-none h-28 text-sm transition-all focus:ring-2 focus:ring-primary-500/20"
                        placeholder="Tham gia thảo luận về tác phẩm..."
                    />
                    <div className="flex justify-end mt-4">
                        <button 
                            onClick={postCmt} 
                            disabled={!cmtContent.trim()}
                            className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-primary-500/25 transition-all active:scale-95 text-sm"
                        >
                            Gửi bình luận
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-6 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Bạn cần đăng nhập để tham gia bình luận.
                    </p>
                </div>
            )
        }
        
        <div className="space-y-6">
            {
               listCmts.length > 0 ? (
                 <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {listCmts.map((item,index)=>{
                        return <Cmtitem key={index} novelId={novel._id} cmt={item}/>
                    })}
                 </div>
               ) : (
                <div className="text-center py-12">
                   <p className="text-slate-400 dark:text-slate-600 italic">Hãy là người bình luận đầu tiên!</p>
                </div>
               )
            }
        </div>
    </div>
  )
}

export default Cmt