import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { ServerRatting } from '../../interface/_Ratting';
interface RateContentProps{
  rate: ServerRatting
}
const RateContent:React.FC<RateContentProps> = ({rate}:RateContentProps) => {
  const RatingComponent = Rating as any;
  
  return <div className='w-full p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/50 transition-all hover:border-primary-500/30'>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold">
            {rate.rater.username.charAt(0).toUpperCase()}
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200">{rate.rater.username}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <RatingComponent 
            initialRating={rate.scores}
            readonly
            fullSymbol={<AiFillStar className="text-xl text-yellow-400"/>}
            emptySymbol={<AiOutlineStar className="text-xl text-yellow-400/20"/>}
          />
          <span className="text-sm font-black text-yellow-500 ml-1">{rate.scores}</span>
        </div>
      </div>
      
      <div className="pl-13 ">
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-slate-200 dark:border-slate-700 pl-4">
          &quot;{rate.content}&quot;
        </p>
      </div>
  </div>;
};

export default RateContent;
