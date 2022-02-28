import React from 'react';
import ColNovels from '../ColNovels/ColNovels';
import { recomenedList } from '../../fakedata/recomenedList'
const FourCols: React.FC = () => {
  return <div className='w-full flex'>
     <ColNovels Coldata={recomenedList} Coltitle='Xem nhiều'/>
     <ColNovels Coldata={recomenedList} Coltitle='Theo dõi nhiều'/>
     <ColNovels Coldata={recomenedList} Coltitle='Đánh giá cao'/>
     <ColNovels Coldata={recomenedList} Coltitle='Yêu thích'/>

  </div>;
};

export default FourCols;
