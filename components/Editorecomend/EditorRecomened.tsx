import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'; // Added useEffect
import { Autoplay, EffectCube, Pagination } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Maincomponent } from '../../interface/_Maincomponent';
import BookCover3D from '../BookCover3D';

const EditorRecomened: React.FC<Maincomponent> = ({ data }: Maincomponent) => {
  const [show, setShow] = useState(0)
  const [mounted, setMounted] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false); // New state for pause
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      // Only advance slide if not paused
      if (!isPaused) {
        setShow((prev) => (prev + 1) % data.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [data.length, isPaused]); // Added isPaused to dep array

  if (!mounted || !data || data.length === 0) return null;

  return <div className="flex flex-col w-full border border-gray-200 p-3">
    {/* <span className='text-primary-600 text-xl py-2 font-bold border-b-2 border-primary-200'>Biên tập viên đề cử</span> */}
    {/* Pause on hover by updating isPaused state */}
    <div
      className="flex flex-wrap md:flex-nowrap w-full gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Hero Card with Qidian-style Book Layout */}
      {
        data.map((item, index) => {
          return <div
            key={index}
            className={`${index === show ? "flex" : "hidden"} relative w-full md:w-[calc(100%_-_250px)] h-[320px] md:h-auto overflow-hidden shadow-lg group bg-gray-900 transition-all duration-300 cursor-pointer`}
            onClick={() => router.push(`/truyen/${item.slug}`)}
          >
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        })
      }

      {/* List on the right - Click to switch slide instead of navigate */}
      <ul className="w-full text-sm md:w-[230px] flex flex-col gap-y-1.5 justify-center py-2 mt-2 md:mt-0">
        {
          data.map((item, index) => {
            return (
              <li
                key={index}
                className="flex items-center gap-2 px-1 cursor-pointer group/item"
                onClick={() => setShow(index)} // Switch slide on click
              >
                <span className={`flex-shrink-0 w-6 h-6 ${index === show ? 'bg-primary-500' : 'bg-gray-200 text-gray-500'} text-xs text-center text-white rounded-sm leading-6 font-normal transition-colors duration-200`}>
                  {index + 1}
                </span>
                <span className={`flex-1 min-w-0 line-clamp-1 group-hover/item:text-primary-500 transition-colors duration-200 ${index === show ? 'text-primary-500' : 'text-gray-600'}`}>
                  {item.title}
                </span>
              </li>
            )
          })
        }
      </ul>

    </div>


  </div>

};

export default EditorRecomened;
