import React from 'react';
import { SerVerNovel } from '../../interface/_Novel';
import ColNovels from '../ColNovels/ColNovels';
interface FourCols{
  mostLikes: SerVerNovel[],
  mostViews: SerVerNovel[],
  mostFollows: SerVerNovel[],
  bestRates: SerVerNovel[]
}

const FourCols: React.FC<FourCols>= ({mostLikes,mostViews,mostFollows,bestRates}:FourCols) => {
  return <div className='w-full flex flex-wrap md:flex-nowrap'>
     <ColNovels Coldata={mostViews} Coltitle='Xem nhiều'/>
     <ColNovels Coldata={mostFollows} Coltitle='Theo dõi nhiều'/>
     <ColNovels Coldata={bestRates} Coltitle='Đánh giá cao'/>
     <ColNovels Coldata={mostLikes} Coltitle='Yêu thích'/>

  </div>;
};

export default FourCols;
