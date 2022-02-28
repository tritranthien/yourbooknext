import React from 'react';
import MainNovels from '../../../components/truyen/MainNovels';
import Titlebanner from '../../../components/truyen/Titlebanner';
import { Novel, SerVerNovel } from '../../../interface/_Novel';
import { getNovel } from '../../../libs/api/novelAPI';

interface contextProps{ 
	params : { 
		slug : string 
	} 
} 
interface NovelProps{
  novel: SerVerNovel;
}

const Novel: React.FC<NovelProps> = ({novel}:NovelProps) => {
  return <>
    <Titlebanner novel={novel}/>
    <MainNovels novel={novel}/>
  </>
};

export const getServerSideProps = async ({params}: contextProps) => {
  const { slug } = params;
  const novel = await getNovel(slug);
  return{
    props:{
      novel
    }
  }
}

export default Novel;
