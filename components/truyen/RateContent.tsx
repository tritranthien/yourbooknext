import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { ServerRatting } from '../../interface/_Ratting';
interface RateContentProps{
  rate: ServerRatting
}
const RateContent:React.FC<RateContentProps> = ({rate}:RateContentProps) => {
  return <div className='w-full mb-2'>
      <div className="flex w-full items-center">
        <span className="px-3 py-2 font-bold">{rate.rater.username}</span>
        <span className="px-3 py-2">
        <Rating 
          initialRating={rate.scores}
          readonly
          fullSymbol={<AiFillStar size={25} color={'yellow'}/>}
          emptySymbol={<AiOutlineStar size={25} color={'yellow'}/>}
        />
        </span>
      </div>
      <p className="px-4 py-1">
        
        <i>{rate.content}</i>
      </p>
  </div>;
};

export default RateContent;
