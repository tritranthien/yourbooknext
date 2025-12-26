import React, { ChangeEvent, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { type Cmt, ServerCmt } from '../../interface/_Cmt'
import { getReps, postMyCmt } from '../../libs/api/cmtAPI';

interface CmtItemProps{
  cmt: ServerCmt,
  novelId:string
}

const Cmtitem:React.FC<CmtItemProps> = ({cmt,novelId}:CmtItemProps) => {
  const [contentRep,setContentRep] = useState('');
  const [rep,setRep] = useState(false);
  const [showmore, setShowmore] = useState(false);
  
  const { data, error, isSuccess, refetch } = useQuery(['rep',cmt._id],()=>getReps(cmt._id),{
    enabled: false
  })

  const handleInput = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContentRep(e.target.value);
  }

  const shownow = () => {
    setShowmore(!showmore);
    if (!showmore) refetch();
  }

  const postRep = async () => {
    if (!contentRep.trim()) return;
    const newCmt: Cmt = {
      content: contentRep,
      novel: novelId,
      parent: cmt._id
    }
    try {
      const res = await postMyCmt(newCmt);
      if(res.status === 200){
        refetch();
        setShowmore(true);
        setContentRep('');
        setRep(false);
      }
    } catch (error) {
      console.error('Lỗi khi phản hồi:', error);
    }
  }

  return (
    <div className="w-full py-6 group">
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold shrink-0">
                {cmt.auth.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{cmt.auth.username}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">•  vừa xong</span>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                  {cmt.content}
                </p>

                <div className="flex items-center gap-4 text-xs">
                    <button 
                        onClick={()=>setRep(!rep)} 
                        className={`font-bold transition-colors ${rep ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 hover:text-primary-600 dark:hover:text-primary-400'}`}
                    >
                        Phản hồi
                    </button>
                    {cmt.repCount > 0 && (
                        <button 
                            onClick={shownow} 
                            className="font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                            {showmore ? 'Ẩn phản hồi' : `Xem ${cmt.repCount} phản hồi`}
                        </button>
                    )}
                </div>

                {rep && (
                    <div className="mt-4 flex gap-2 animate-in slide-in-from-top-2 duration-300">
                        <textarea 
                            value={contentRep || ''} 
                            onChange={handleInput} 
                            className="flex-1 bg-slate-50 dark:bg-slate-800/50 outline-none rounded-xl p-3 text-slate-800 dark:text-slate-200 resize-none h-20 text-xs border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
                            placeholder={`Phản hồi ${cmt.auth.username}...`}
                        />
                        <button 
                            onClick={postRep} 
                            disabled={!contentRep.trim()}
                            className="w-12 h-20 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 shrink-0"
                        >
                            <AiOutlineSend size={20}/>
                        </button>
                    </div>
                )}

                {showmore && isSuccess && data && (
                    <div className="mt-6 space-y-6 border-l-2 border-slate-100 dark:border-slate-800/50 pl-6 animate-in fade-in slide-in-from-left-2 duration-500">
                        {data.map((item: ServerCmt, index: number) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs font-bold shrink-0">
                                    {item.auth.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">{item.auth.username}</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Cmtitem