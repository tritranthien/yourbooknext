import React from 'react';
import { Maincomponent } from '../../interface/_Maincomponent';
import { SerVerNovel } from '../../interface/_Novel';
import Banner from '../Banner/Banner';
import EditorRecomened from '../Editorecomend/EditorRecomened';
import FourCols from '../FourColsLayout/FourCols';
import FullNovels from '../FullNovels/FullNovels';
import Menubox from '../Menubox/Menubox';
import NewNovels from '../NewNovel/NewNovels';
import HasNewChaps from '../Newupdate/HasNewChaps';
import Recomened from '../Recomemed/Recomened';
import TopNovels from '../TopNovels/TopNovels';

const MainHome: React.FC<Maincomponent> = ({data}:Maincomponent) => {
  return <div className='container block z-30 min-h-screen'>
    <EditorRecomened data={data}/>
    <HasNewChaps/>
    <TopNovels/>
    <FourCols/>
    <TopNovels/>

    {/* <Recomened/> */}
    {/* <Banner link='#' imgs='/images/banner1.jpg'/> */}
    {/* <NewNovels/> */}
  </div>;
};

export default MainHome;
