import Link from 'next/link';
import React, { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRates } from '../../customHooks/reactQuery/Rates';
import { SerVerNovel } from '../../interface/_Novel';
import { rated, SendMyRate } from '../../libs/api/novelAPI';
import RateContent from './RateContent';
interface RateProps{
  novel: SerVerNovel,
  loged: boolean,
}
const Ratting:React.FC<RateProps> = ({novel,loged}: RateProps) => {
  const [rate,setRate] = useState(0);
  const [content,setContent] = useState('');
  const [myrated,setMyRated] = useState(false);
  const { data, isSuccess, error,refetch } = useRates(novel._id);
  
  const RatingComponent = Rating as any;

  const resetdata = () => {
    setContent('');
    setRate(0);
  }

  const sendRate = async () => {
    if (rate === 0) {
      toast.error('Vui lòng chọn số sao đánh giá');
      return;
    }
    const MyRate = {
      novel: novel._id,
      content: content,
      scores: rate
    }
    const idToast = toast.loading('đang gửi đánh giá');
    try {
      const res = await SendMyRate(MyRate);
      if(res.success){
        toast.update(idToast,{ render: "gửi thành công", type: "success", isLoading: false, autoClose: 5000 });
        setMyRated(true);
        refetch();
      }
      resetdata();
    } catch (error) {
      toast.update(idToast,{ render: "gửi thất bại", type: "error", isLoading: false, autoClose: 5000 });
    }
  }

  const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  useLayoutEffect(()=>{
    if(loged){
      const checkRated = async (id:string) => {
        try {
          const res = await rated(id);
          if(res.data.rated){
            setMyRated(true);
          }
        } catch (error) {
          
        }
      }
      checkRated(novel._id);
    }
  },[loged, novel._id])

  return <div className='w-full space-y-10 animate-in fade-in duration-500'>
    { 
      loged ? 
      ( myrated ? 
        <div className="p-8 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
          <p className='text-slate-500 dark:text-slate-400 italic'>Bạn đã gửi đánh giá cho tác phẩm này. Cảm ơn phản hồi của bạn!</p>
        </div> 
        : 
        <div className='w-full p-8 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800/50 shadow-sm'>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-6 bg-primary-500 rounded-full"></span>
            <h3 className="font-bold text-xl text-slate-800 dark:text-white uppercase tracking-wider">Viết đánh giá</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Cảm nhận của bạn</label>
              <textarea 
                value={content || ''} 
                onChange={handleChange} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none h-32 p-4 rounded-2xl text-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500/50 transition-all resize-none shadow-inner"
                placeholder="Hãy chia sẻ cảm nhận của bạn về nội dung, nhân vật và văn phong của tác giả..."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Chấm điểm:</span>
                <div className="flex items-center">
                  <RatingComponent 
                    initialRating={rate}
                    onChange={(num: number)=>setRate(num)}
                    fullSymbol={<AiFillStar className="text-3xl text-yellow-400 drop-shadow-sm transition-transform hover:scale-110"/>}
                    emptySymbol={<AiOutlineStar className="text-3xl text-yellow-400/20 hover:text-yellow-400/50 transition-colors"/>}
                  />
                  {rate > 0 && <span className="ml-3 font-black text-xl text-yellow-500">{rate}</span>}
                </div>
              </div>
              
              <button 
                onClick={sendRate} 
                className="w-full sm:w-auto px-10 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 transition-all active:scale-95"
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      )
      :
      <div className="p-8 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
        <p className='text-slate-500 dark:text-slate-400 italic'>
          Bạn phải <Link legacyBehavior passHref href="/login"><a className='text-primary-600 dark:text-primary-400 font-bold hover:underline'>đăng nhập</a></Link> mới có thể đánh giá truyện
        </p>
      </div>
    }

    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300">Đánh giá từ độc giả</h4>
        <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800/50"></div>
      </div>
      
      {data && data.length <=0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 dark:text-slate-600 italic">Chưa có đánh giá nào. Hãy là người đầu tiên nhé!</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        { isSuccess && data?.map((item,index)=>{
          return <RateContent rate={item} key={index}/>
        }) }
      </div>
    </div>
  </div>;
};

export default Ratting;
