import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AiFillStar, AiOutlineEye, AiOutlineStar } from 'react-icons/ai';
import { BsPersonFill, BsStackOverflow, BsWifi } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import { RiFilePaperFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import Rating from 'react-rating';
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
      if(typeof window !== 'undefined' && localStorage.getItem('userInfo')){
        setLoged(true);
        refetch();
      }
    },[novel._id, refetch])

  return <div className="w-full relative overflow-hidden">
          {/* Background Layer with Blur and Dark Gradient */}
          <div className='absolute inset-0 z-0'>
            <Image src={novel.image} className="opacity-30 blur-2xl scale-110" objectFit="cover" layout='fill' alt="Background Blur"/>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-slate-950/40"></div>
          </div>

          <div className="container relative z-10 mx-auto px-6 py-12 md:py-20">
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                {/* Book Cover with Premium Shadow */}
                <div className="w-[180px] md:w-[240px] aspect-[3/4] relative flex-shrink-0 group">
                    <div className="absolute inset-0 bg-primary-500 rounded-xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-slate-950/50 border border-white/20">
                        <Image src={novel.image} className='object-cover' layout='fill' alt={novel.title} priority/>
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-full border border-primary-500/20">
                      {novel.category.cate}
                    </span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${novel.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'}`}>
                      {novel.status}
                    </span>
                  </div>

                  <h1 className='text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-6 leading-tight drop-shadow-sm'>
                    {novel.title}
                  </h1>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <BsPersonFill size={20}/>
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="text-slate-400 dark:text-slate-500 font-medium">Tác giả</span>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">{novel.author?.name || 'Đang cập nhật'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <RiFilePaperFill size={20}/>
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="text-slate-400 dark:text-slate-500 font-medium">Số chương</span>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">{novel.chapCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <AiOutlineEye size={20}/>
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="text-slate-400 dark:text-slate-500 font-medium">Lượt xem</span>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">{novel.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <FcLike size={20}/>
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="text-slate-400 dark:text-slate-500 font-medium">Yêu thích</span>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">{novel.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
                     {(() => {
                       const RatingComponent = Rating as any;
                       return (
                        <RatingComponent 
                          initialRating={novel.scores == 0 ? 4.5 : novel.scores}
                          readonly
                          fullSymbol={<AiFillStar className="text-xl md:text-2xl text-yellow-400 drop-shadow-sm"/>}
                          emptySymbol={<AiOutlineStar className="text-xl md:text-2xl text-yellow-400/30"/>}
                        />
                       );
                     })()}
                      <span className="text-yellow-500 dark:text-yellow-400 font-black text-xl ml-1">{novel.scores || 4.5}</span>
                      <span className="text-slate-400 dark:text-slate-600 text-sm ml-2">/ 5.0</span>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <button 
                      onClick={followed ? cancelFollow : followNow} 
                      disabled={!isLoged} 
                      className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all active:scale-95 shadow-lg ${followed ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25'}`}
                    >
                      {followed ? 'Đã theo dõi' : 'Thêm vào kệ sách'}
                    </button>
                    <button 
                      onClick={()=>setOpen(true)} 
                      disabled={!isLoged} 
                      className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-500/25"
                    >
                      Đề cử kim phiếu
                    </button>
                  </div>
                </div>
            </div>
          </div>

          {/* Vote Modal */}
          {openVote && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm transition-all animate-in fade-in duration-300">
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AiFillStar size={32}/>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Gửi Kim Phiếu</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Đề cử để truyện được thăng hạng</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Số lượng phiếu</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={goldCard}
                      onChange={(e:ChangeEvent<HTMLInputElement>) =>setGoldcard(e.target.value)} 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none p-4 rounded-xl text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500/50 transition-all font-bold text-lg"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Lời nhắn (không bắt buộc)</label>
                    <textarea 
                      onChange={(e:ChangeEvent<HTMLTextAreaElement>) =>setContent(e.target.value)} 
                      placeholder='Hãy nhận lấy kim phiếu của tôi! Truyện rất hay!' 
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none p-4 rounded-xl text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500/50 transition-all text-sm min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={()=>{
                        handleReset();
                        setOpen(false);
                      }} 
                      className="flex-1 px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-750 transition-all"
                    >
                      Hủy bỏ
                    </button>
                    <button 
                      onClick={handleVote} 
                      className="flex-1 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 transition-all active:scale-95"
                    >
                      Gửi ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
  </div>
};

export default Titlebanner;
