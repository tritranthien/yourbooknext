import React, { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query';
import { Cmt, ServerCmt } from '../../interface/_Cmt';
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
            alert('error');
        }
    }
  return (
    <div className="md:p-5 w-full">
        <span className="font-bold text-xl px-2 py-1">bình luận</span>
        {
            loged && <div className="lg:mb-5 p-3">
                <textarea value={ cmtContent || '' } onBlur={handleInput} onChange={handleInput} className="w-full outline-none rounded-md border-2 p-2 resize-none h-24"/>
                <button onClick={postCmt} className="px-2 py-1 mt-2 bg-blue-500 text-white rounded-sm">bình luận</button>
            </div>
        }
        
        {
           listCmts.length > 0 ? listCmts.map((item,index)=>{
                return <Cmtitem key={index} novelId={novel._id} cmt={item}/>
            })
            :
            <p className="p-2"><i>hãy là người bình luận đầu tiên</i></p>
        }
    </div>
  )
}

export default Cmt