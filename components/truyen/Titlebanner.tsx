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
  return <div className="w-full relative overflow-hidden font-sans">
          {/* Background Layer - Enhanced with subtle atmospheric elements */}
          <div className='absolute inset-0 z-0 overflow-hidden'>
            <Image src={novel.image} className="opacity-20 blur-[100px] scale-110" objectFit="cover" layout='fill' alt="Background Blur"/>
            
            {/* Glowing Orbs for Depth */}
            <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-primary-500/10 dark:bg-primary-500/5 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-orange-500/10 dark:bg-orange-500/5 blur-[150px] rounded-full"></div>

            {/* Geometric Pattern - Very subtle dots */}
            <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.1]" style={{ backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

            <div className="absolute inset-0 bg-gradient-to-b from-white/40 dark:from-slate-950/40 via-white dark:via-slate-950 to-white dark:to-slate-950"></div>
          </div>

          <div className="container relative z-10 mx-auto px-6 pt-8 pb-12 md:pb-20">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start lg:items-start">
                
                {/* Book Cover - Slimmer and more elegant */}
                <div className="w-[160px] md:w-[220px] lg:w-[240px] aspect-[2/3] relative flex-shrink-0 group">
                    {/* Decorative Offset Border (After Effect) */}
                    <div className="absolute -right-3 -bottom-3 w-full h-full border border-slate-300 dark:border-slate-700 rounded-lg z-0"></div>
                    
                    <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/40 dark:border-slate-800 transition-transform duration-700 ease-out group-hover:scale-[1.03] z-10 bg-white dark:bg-slate-900">
                        <Image src={novel.image} className='object-cover' layout='fill' alt={novel.title} priority/>
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col text-center md:text-left pt-2">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-5">
                    <span className="text-[11px] uppercase font-semibold tracking-[0.15em] text-primary-600 dark:text-primary-400">
                      {novel.category.cate}
                    </span>
                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                    <span className={`text-[11px] uppercase font-semibold tracking-[0.15em] ${novel.status === 'completed' ? 'text-emerald-500' : 'text-blue-500'}`}>
                      {novel.status === 'completed' ? 'Đã hoàn thành' : 'Đang ra'}
                    </span>
                  </div>

                  <h1 className='text-2xl md:text-3xl lg:text-4xl font-normal text-slate-800 dark:text-white mb-8 leading-tight tracking-widest uppercase' style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    {novel.title}
                  </h1>

                  {/* Stats Row - Minimalist & Slim */}
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-10 gap-y-4 mb-10">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-medium text-slate-400 tracking-widest mb-1">Tác giả</span>
                        <span className="text-slate-700 dark:text-slate-200 font-normal text-base hover:text-primary-500 cursor-pointer transition-colors">
                            {novel.author?.name || 'Đang cập nhật'}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-medium text-slate-400 tracking-widest mb-1">Số chương</span>
                        <span className="text-slate-700 dark:text-slate-200 font-normal text-base">{novel.chapCount}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-medium text-slate-400 tracking-widest mb-1">Lượt xem</span>
                        <span className="text-slate-700 dark:text-slate-200 font-normal text-base">{novel.views.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-medium text-slate-400 tracking-widest mb-1">Đánh giá</span>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-700 dark:text-slate-200 font-normal text-base">{novel.scores || 4.5}</span>
                            <AiFillStar className="text-yellow-400 text-sm" />
                        </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <button 
                      onClick={followed ? cancelFollow : followNow} 
                      disabled={!isLoged} 
                      className={`px-8 py-3 rounded-full text-xs uppercase font-bold tracking-widest transition-all duration-300 active:scale-95 ${followed ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-700' : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20'}`}
                    >
                      {followed ? 'Đã theo dõi' : 'Đọc truyện'}
                    </button>
                  </div>
                </div>
            </div>
            {/* Decorative Flourish (Pattern Lines) - Moved one level outside for better alignment */}
            <div className="absolute bottom-12 md:bottom-20 right-6 md:right-10 w-80 h-40 opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none">
               <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-900 dark:text-white">
                  <path d="M0 100 H40 L80 60 H140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M0 100 H45 L90 55 H155" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M0 100 H50 L100 50 H170" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
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
