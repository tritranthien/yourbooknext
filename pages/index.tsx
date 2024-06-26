import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import EditorRecomened from '../components/Editorecomend/EditorRecomened'
import FourCols from '../components/FourColsLayout/FourCols'
import HasNewChaps from '../components/Newupdate/HasNewChaps'
import TopNovels from '../components/TopNovels/TopNovels'
import { SerVerNovel } from '../interface/_Novel'
import { bestRates, bestvotes, getHasNewChaps, getModVote, getMostFollows, getMostLikes, getMostViews, getNewNovels, getNovelNewest } from '../libs/api/novelAPI'

interface serverProps{
  errorFetch?:boolean,
  newestList?: SerVerNovel[],
  modVotesList?: SerVerNovel[],
  hasNewList?: SerVerNovel[],
  newNovelsList?: SerVerNovel[],
  mostLikesList?: SerVerNovel[],
  mostViewsList?: SerVerNovel[],
  mostFollowsList?: SerVerNovel[],
  bestRateList?: SerVerNovel[],
  bestVotesList? : SerVerNovel[],
}

const Home: NextPage<serverProps> = ({errorFetch,newestList,modVotesList,hasNewList,newNovelsList,mostLikesList,mostViewsList,mostFollowsList,bestRateList,bestVotesList}:serverProps) => {
  const [show,setShow] = useState(0);
  const router = useRouter();
  useEffect(()=>{
    let to0 = setTimeout(() => {
      setShow(show === 2 ? 0 : show +1);
    }, 7000);
    return (()=>clearTimeout(to0));
  },[show])
  
  if(errorFetch){
    return <div>trang chủ đang bảo trì, vui lòng quay lại sau</div>
  }
  return (
    <div className=" mt-[-84px] z-10" >
      {
        newestList?.map((item,index)=>{
          if (show === index) {

            return <div key={index} className="w-full h-screen md:h-[600px] flex relative">
          <Image src={item.image} alt="bg" layout='fill' objectFit='cover'/>
          <div className="blacktotrans w-full h-full absolute"></div>
          <div className="flex mx-auto container p-6 md:p-12 z-10 pt-[120px]">
            <div className="md:p-6 lg:p-12 flex flex-col justify-center w-full md:w-1/2">
              
              <span className='text-2xl lg:text-4xl block text-yellow-500  font-bold first-letter:uppercase mb-3'>{item.title}</span>
              <p className=' first-letter:uppercase line-clamp-3 text-gray-400 mb-4'>
                {item.description}
              </p>
              <button onClick={()=>router.push(`/truyen/${item.slug}`)} className="px-3 py-2 bg-indigo-300 w-max">xem thêm</button>
            </div>
            
          </div>
          
        </div>
            
          }
          
        })
      }
      
    <div className='container block z-30 min-h-screen'>
    <EditorRecomened data={modVotesList || []}/>
    <HasNewChaps newnovels={newNovelsList || []} hasnews={hasNewList || []}/>
    <TopNovels title='Truyện đề cử' novels = {bestVotesList || []}/>
    <FourCols 
      mostLikes = {mostLikesList || []}
      mostViews= {mostViewsList || []}
      mostFollows = {mostFollowsList || []}
      bestRates = {bestRateList || []}
    />
    {/* <TopNovels/> */}

    {/* <Recomened/> */}
    {/* <Banner link='#' imgs='/images/banner1.jpg'/> */}
    {/* <NewNovels/> */}
  </div>
      

    </div>
  )
}
export const getStaticProps = async () => {
 
 try {
  const newestList = await getNovelNewest();
  const modVotesList = await getModVote();
  const hasNewList = await getHasNewChaps();
  const newNovelsList = await getNewNovels();
  const mostLikesList = await getMostLikes();
  const mostViewsList = await getMostViews();
  const mostFollowsList = await getMostFollows();
  const bestRateList = await bestRates();
  const bestVotesList = await bestvotes();
  return {
    props: {
      newestList,
      modVotesList,
      hasNewList,
      newNovelsList,
      mostLikesList,
      mostViewsList,
      mostFollowsList,
      bestRateList,
      bestVotesList
    },
    revalidate: 320
  }
 } catch (error) {
  return {
    props: {
      errorFetch:true
    }
  }
 }
 
}
export default Home
