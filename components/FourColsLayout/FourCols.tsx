import React from 'react';
import ColNovels from '../ColNovels/ColNovels';
import { recomenedList } from '../../fakedata/recomenedList'
import { SerVerNovel } from '../../interface/_Novel';
interface FourCols{
  mostLikes: SerVerNovel[],
  mostViews: SerVerNovel[],
  mostFollows: SerVerNovel[],
}

const FourCols: React.FC<FourCols>= ({mostLikes,mostViews,mostFollows}:FourCols) => {
  return <div className='w-full flex'>
     <ColNovels Coldata={mostViews} Coltitle='Xem nhiều'/>
     <ColNovels Coldata={mostFollows} Coltitle='Theo dõi nhiều'/>
     <ColNovels Coldata={recomenedList} Coltitle='Đánh giá cao'/>
     <ColNovels Coldata={mostLikes} Coltitle='Yêu thích'/>

  </div>;
};

export default FourCols;
