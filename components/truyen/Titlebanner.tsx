import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AiFillStar, AiOutlineEye, AiOutlineStar } from 'react-icons/ai';
import { BsPersonFill, BsStackOverflow, BsWifi } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import { RiFilePaperFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SerVerNovel } from '../../interface/_Novel';
import { CancelFollow, checkMyFollow, Follow, voteForNovel } from '../../libs/api/authAPI';

interface TitlebannerProps{
  novel: SerVerNovel,
}

const Titlebanner: React.FC<TitlebannerProps> = ({novel}:TitlebannerProps) => {
  const [followed,setFollowed] = useState(false);
  const [ isLoged, setLoged ] = useState(false);
  const [openVote,setOpen] = useState(false);
  const [goldCard,setGoldcard] = useState('');
  const [content,setContent] = useState('');
  const {data,error,isSuccess,refetch}  = useQuery(['checkFollow',novel._id],()=>checkMyFollow(novel._id),{
    enabled: false,
    onSuccess: (data)=>{
      console.log(data.data);
      if(data.data.followed){
        setFollowed(data.data.followed);
      }
    }
    })
    const followNow = async () => {
      try {
        const res = await Follow(novel._id);
        if(res.status === 200){
          setFollowed(true);
          
        }
      } catch (error) {
        setLoged(false);
      }
    }
    const cancelFollow = async () => {
      try {
        const res = await CancelFollow(novel._id);
        if(res.status === 200){
          setFollowed(false);
        }
      } catch (error) {
        setLoged(false);
      }
    }
    const handleReset = () => {
      setContent('');
      setGoldcard('');
    }
    const handleVote = async () => {
      const newVote = {
        goldcard: parseInt(goldCard),
        content: content
      }
      try {
        const res = await voteForNovel(novel._id,newVote);
        if(res.status == 200){
          toast.success(res.data.message);
          setOpen(false);
          handleReset();
        }
      } catch (error) {
        toast.error('không thể gửi kim phiếu');
      }
    }
    useEffect(()=>{
      if(localStorage && localStorage.getItem('userInfo')){
        setLoged(true);
        refetch();
        // const checkFl = async () => {
        //   try {
        //     const res = await checkMyFollow(novel._id);
        //     if(res.data.followed){
        //       setFollowed(true);
        //     }
        //   } catch (error) {
            
        //   }
        // }
        // checkFl();
        // refetch();
      }
    },[novel._id])
  return <div className="w-full h-[450px] p-50px">
          <div className='w-full h-full bg-black mt-[-28px] relative'>
            <Image src='/images/tt4.jpg' className='absolute opacity-10 object-cover' layout='fill'/>
          <div className="absolute top-0 left-0 w-full h-full">
        <div className="container p-0 py-5 flex h-full justify-center items-center">
        <div className="w-[250px] h-[300px] relative">
            <Image src='/images/tt4.jpg' className='object-cover absolute' layout='fill'/>
        </div>
        <ul className="w-[calc(100%_-_250px)] h-[300px] px-10 text-slate-500">
          <li className='w-full capitalize font-bold text-slate-400 text-4xl'>{novel.title}</li>
          <li className="flex h-8 text-xl mt-4 items-center"><span><BsStackOverflow/></span><span className='ml-2'>{novel.category.cate}</span></li>
          <li className="flex h-8 text-xl mt-4 items-center"><span><BsPersonFill/></span><span className='ml-2'>{novel.author.name}</span></li>
          <li className="flex h-8 text-xl mt-4 items-center"><span><BsWifi/></span><span className='ml-2'>còn tiếp</span></li>
          <li className="flex h-8 text-xl mt-4 items-cente"><span><RiFilePaperFill/></span><span className='ml-2'>{`chương ${novel.chapCount}`}</span></li>
          <ul className='list-none text-yellow-500 flex items-center gap-x-1 text-xl mt-4'>
            <li><AiFillStar/></li>
            <li><AiFillStar/></li>
            <li><AiFillStar/></li>
            <li><AiFillStar/></li>
            <li><AiOutlineStar/></li>
          </ul>
          <ul className='flex list-none mt-4 text-xl gap-x-7'>
              <li className='flex items-center'><span><AiOutlineEye/></span><span>{novel.views}</span></li>
              <li className='flex items-center'><span><FcLike/></span><span>{novel.likes}</span></li>
              <li className='flex items-center'><button onClick={followed ? cancelFollow : followNow} disabled={!isLoged} className='px-4 py-1 text-white bg-orange-500 rounded-md'>{ followed ? 'Hủy theo dõi' : 'Theo dõi'}</button></li>
              <li className='flex items-center'><button onClick={()=>setOpen(true)} disabled={!isLoged} className='px-4 py-1 text-white bg-green-500 rounded-md'>đề cử</button></li>
          </ul>
        </ul>
        
        
    </div>
</div>
  </div>
{
  openVote && <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
    <div className="w-[300px] h-max p-5 bg-white border-2 rounded-md">
      <span className="font-bold text-2xl w-full block mb-2">nhập vào kim phiếu</span>
      <input type="number" min="5" step="10" onChange={(e:ChangeEvent<HTMLInputElement>) =>setGoldcard(e.target.value)} className="w-full outline-none p-1 rounded-sm border-2 mb-4" />
      <span className="font-bold text-2xl w-full block mb-2">nội dung</span>
      <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>) =>setContent(e.target.value)} placeholder='hãy nhận lấy kim phiếu của tôi' className="w-full outline-none p-1 rounded-sm border-2 " />
      <button onClick={handleVote} className="px-3 py-1 mt-4 ml-2 text-white rounded-md bg-blue-500">gửi</button>
      <button onClick={()=>{
        handleReset();
        setOpen(false);
      }} className="px-3 py-1 ml-3 text-white rounded-md bg-gray-500">hủy</button>
    </div>
  </div>
}
  </div>
};
export default Titlebanner;
