import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Autoplay, EffectCube, Pagination } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Maincomponent } from '../../interface/_Maincomponent';

const EditorRecomened:React.FC<Maincomponent> = ({data}:Maincomponent) => {
 const [show,setShow] = useState(0)
 const router=useRouter();
  return <div className="flex flex-col w-full">
      <span className='text-sky-600 text-xl py-2 font-bold border-b-2'>Biên tập viên đê cử</span>
      <div className="flex flex-wrap md:flex-nowrap w-full py-3">
      <div className="w-[70px] md:h-[210px] md:w-[200px]">
          
      <Swiper
        effect={"cube"}
        grabCursor={true}
        autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
        cubeEffect={{
            shadow: false,
            slideShadows: false,
            // shadowOffset: 20,
            // shadowScale: 0.94,
        }}
        speed={5000}
        // onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={(swiper) => setShow(swiper.realIndex)}
        loop={true}
        // pagination={true}
        modules={[Autoplay,EffectCube, Pagination]}
        className="w-[70px] md:w-[200px] h-[70px] md:h-[200px] "
        >
        {
              data.map((item,index)=>{
                  return <SwiperSlide key={index}>
                  <Image width={220} height={220} objectFit="cover" src={item.image} alt={item.title}/>
              </SwiperSlide>
              })
          }
        </Swiper>
      </div>
      {
          data.map((item,index)=>{
              return <div key={index} className={`${index === show ? "flex" : "hidden"} flex-col px-6 md:pl-12 md:pr-10 md:py-4 w-[calc(100%_-_70px)] md:w-[calc(100%_-_450px)]`}>
              <Link passHref href={`/truyen/${item.slug}`}><a><span className="text-gray-700 font-bold text-base md:text-xl">{item.title}</span></a></Link>
              <Link passHref href={`/tac-gia/${item.author.slug}`}><a><span className="text-sky-400 text-base mb-1 font-medium first-letter:uppercase">{item.author.name}</span></a></Link>
              <p className="w-full line-clamp-1 md:line-clamp-3 text-base">{item.description}</p>
              <button onClick={()=>router.push(`/truyen/${item.slug}`)} className='w-max hidden md:block rounded-md text-sm bg-yellow-500 mt-2 md:mt-4 px-2 md:px-3 text-white py-2'>đọc truyện</button>
            </div>
          })
      }
      
      <ul className="w-full text-base md:w-[230px] flex flex-col gap-y-3 justify-center py-3 mt-2 md:mt-0">
          {
              data.map((item,index)=>{
                  return <Link key={index} passHref href={`/truyen/${item.slug}`}><a>
                      <li className="flex items-center flex-1 px-2">
                  <span className={`block w-7 h-7 ${show === index ? 'bg-yellow-500' : 'bg-red-800'} text-center text-white rounded-sm leading-7`}>{index + 1}</span>
                  <span className={`pl-2 md:font-medium line-clamp-1 ${ show === index ? 'text-yellow-500' : '' }`}>{item.title}</span>
              </li></a></Link> 
              })
          }
         
      </ul>

      </div>
      
        
  </div>
  
};

export default EditorRecomened;
