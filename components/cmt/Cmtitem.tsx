import React, { ChangeEvent, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { Cmt, ServerCmt } from '../../interface/_Cmt'
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
    setShowmore(true);
    refetch();
  }
  const postRep = async () => {
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
      }
    } catch (error) {
      
      alert('err');
    }
  }
  return (
    <div className="w-full mt-2">
        <span className="w-full px-2 py-1 font-bold text-blue-800">{cmt.auth.username}</span>
        
        <p className="w-full px-3 py-1 text-sm">
          {cmt.content}
        </p>
        <div className="flex text-xs px-2 text-blue-400">
          <span onClick={()=>setRep(!rep)} className="px-1 cursor-pointer">reply</span>
          {
            !showmore && cmt.repCount > 0 && <span onClick={shownow} className="px-1 cursor-pointer font-bold text-black">{`xem thêm ${cmt.repCount} phản hồi`}</span>
          }
        </div>
        { 
          rep && <div className="flex px-2">
          <textarea value={contentRep || ''} onChange={handleInput} onBlur={handleInput} className="p-2 w-[calc(100%_-_60px)] h-24 resize-none border-2 outline-none"></textarea>
          <button onClick={postRep} className="w-[50px] p-2 bg-blue-600"><AiOutlineSend color='#fff' size={30}/></button>
        </div>
        }
        {
          showmore && isSuccess && data.map((item,index)=>{
            return <div key={index} className="w-full ml-5 mt-2">
            <span className="w-full px-2 py-1 font-bold text-blue-800">{item.auth.username}</span>
            
            <p className="w-full px-3 py-1 text-sm">
              {item.content}
            </p>
            <div className="flex text-xs px-2 text-blue-400">
              <span onClick={()=>setRep(!rep)} className="px-1 cursor-pointer">reply</span>
              
            </div>
            
        </div>
          })
        }
    </div>
  )
}

export default Cmtitem