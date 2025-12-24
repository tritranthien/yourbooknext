import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
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

const NovelPage: React.FC<NovelProps> = ({novel}:NovelProps) => {
  const  [isLoged, setLoged] = useState(false);
  useEffect(()=>{
    if( localStorage && localStorage.getItem('userInfo') ){
      setLoged(true);
    }
  },[])
  return <>
    <Titlebanner novel={novel}/>
    <MainNovels novel={novel}/>
  </>
};

export const getServerSideProps = async ({params}: contextProps) => {
  const { slug } = params;
    const novel = await getNovel(slug);
    if(novel){
      return{
        props:{
          novel
        }
      }
    }
    
    return {
      redirect: {
        permanent: false,
        destination: "/page404",
      },
      props: {}
    }
  
}

export default NovelPage;
