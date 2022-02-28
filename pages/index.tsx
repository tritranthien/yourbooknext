import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MainHome from '../components/MainHome/MainHome'
import styles from '../styles/Home.module.css'
import { Novel, SerVerNovel } from '../interface/_Novel'
import { useEffect, useState } from 'react'
import { getModVote, getNovelNewest } from '../libs/api/novelAPI'
import { useRouter } from 'next/router'

interface serverProps{
  errorFetch?:boolean,
  newest?: SerVerNovel[]
  modvote?: SerVerNovel[]
}

const Home: NextPage<serverProps> = ({errorFetch,newest,modvote}:serverProps) => {
  const [show,setShow] = useState(0);
  const router = useRouter();
  useEffect(()=>{
    let to0 = setTimeout(() => {
      setShow(show === 2 ? 0 : show +1);
    }, 7000);
    return (()=>clearTimeout(to0));
  },[show])
  
  if(errorFetch || !newest || !modvote){
    return <div>trang chủ đang bảo trì, vui lòng quay lại sau</div>
  }
  return (
    <div className=" mt-[-84px] z-10" >
      {
        newest.map((item,index)=>{
          if (show === index) {

            return <div key={index} className="w-full min-h-[600px] flex relative">
          <img src={item.image} alt="bg" className="w-full h-full absolute object-cover z-0" />
          <div className="blacktotrans w-full h-full absolute"></div>
          <div className="flex mx-auto container p-12 z-10 pt-[120px]">
            <div className="p-12 w-1/2">
              <ul className="flex mb-4">
                {
                  newest.map((it,i)=>(<li key={i} onClick={()=>setShow(i)} className={`${ show === i ? 'bg-yellow-500' : 'bg-gray-300'} w-10 h-[3px] cursor-pointer`}></li>))
                }
               
              </ul>
              <span className='text-4xl block text-green-500 font-bold first-letter:uppercase mb-3'>{item.title}</span>
              <p className=' first-letter:uppercase text-gray-400 mb-4'>
                {item.description}
              </p>
              <button onClick={()=>router.push(`/truyen/${item.slug}`)} className="px-3 py-2 bg-indigo-300">xem thêm</button>
            </div>
            
          </div>
          
        </div>
            
          }
          
        })
      }
      
      <MainHome data = {modvote}/>
      

    </div>
  )
}
export const getStaticProps = async () => {
 
 try {
  const newest = await getNovelNewest();
  const modvote = await getModVote();
  return {
    props: {
      newest,
      modvote
    }
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
